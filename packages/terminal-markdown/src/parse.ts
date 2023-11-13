import { log } from "node:console";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { remark } from "remark";
import { inspect } from "node:util";
import * as yaml from "yaml";
import {
  Code,
  Emphasis,
  Heading,
  List,
  ListItem,
  Nodes, // Nodes is a union of other Node types
  Paragraph,
  Root,
} from "mdast";

import { Result } from "./result.js";
import { FileReader } from "./reader.js";

export class RenderError {
  node: Nodes;
  reason: string;

  constructor(node: Nodes, reason: string) {
    this.node = node;
    this.reason = reason;
  }

  inspect() {
    return `${this.reason}\n\t${inspect(this.node)}`;
  }
}
export class RenderResult extends Result {
  #content?: string;
  #errors?: RenderError[];

  constructor(ok: boolean = true, reason?: string) {
    super(ok, reason);
  }

  override get ok(): boolean {
    return !this.#errors || this.errors.length === 0;
  }

  override get reason(): string {
    if (this.#errors?.length) {
      return this.#errors.map((e) => e.inspect()).join("\n");
    }
    return super.reason;
  }

  get content() {
    return this.#content || "";
  }

  set content(value: string) {
    this.#content = value;
  }

  get errors(): RenderError[] {
    return this.#errors || [];
  }

  addError(node: Nodes, reason: string) {
    if (!this.#errors) this.#errors = [];
    this.#errors.push(new RenderError(node, reason));
  }

  override toString() {
    return `ok: ${this.ok}, reason: ${this.reason}, errors: ${inspect(
      this.errors,
    )}`;
  }
}

function parseYaml(node: string): object {
  return yaml.parse(node);
}

export function parse(doc: string): Nodes {
  return remark().use(remarkFrontmatter).use(remarkGfm).parse(doc);
}

type BlockItemElement = Code;
type BlockChildrenElement = Paragraph | Heading;
type BlockListElement = List;
type BlockListItemElement = ListItem;
type InlineElement = Text | Emphasis;

class Context {
  node: Nodes;
  index: number = 0;

  constructor(node: Nodes) {
    this.node = node;
  }
}

export function render(ast: Nodes, context?: Context): RenderResult {
  const result = new RenderResult();
  const chunks: string[] = [];

  const blockItem = (node: BlockItemElement) => {
    let v = node.value;
    chunks.push(v);
    chunks.push("\n\n");
  };

  const blockChildren = (node: BlockChildrenElement, context?: Context) => {
    for (const child of node.children) {
      visit(child, node);
    }
    if (context) {
      chunks.push("\n");
    } else {
      chunks.push("\n\n");
    }
  };

  const blockList = (node: BlockListElement) => {
    let context = new Context(node);
    context.index = node.start || 1;
    for (const child of node.children) {
      visit(child, node, context);
    }
    chunks.push("\n\n");
  };

  const blockListItem = (
    node: BlockListItemElement,
    parent: List,
    context?: Context,
  ) => {
    if (context && context.node.type === "list" && context.node.ordered) {
      chunks.push(`  ${context.index++}. `);
    } else {
      chunks.push(`  - `);
    }
    for (const child of node.children) {
      visit(child, node, context);
    }
  };

  const visit = (node: Nodes, parent?: Nodes, context?: Context) => {
    // log(inspect(node));
    switch (node.type) {
      case "yaml":
        const yast = parseYaml(node.value);
        chunks.push(inspect(yast));
        break;

      case "root":
        for (const child of node.children) {
          visit(child, node);
        }
        break;

      case "paragraph":
      case "heading":
        blockChildren(node, context);
        break;

      case "text":
        let t = node.value.replace(/\s+/gm, " ").split("\n").join(" ");
        chunks.push(t);
        break;

      case "emphasis":
      case "strong":
        for (const child of node.children) {
          visit(child, node);
        }
        break;

      case "inlineCode":
        let ic = node.value;
        chunks.push(ic);
        break;

      case "code":
        blockItem(node);
        break;

      case "list":
        blockList(node);
        break;

      case "listItem":
        blockListItem(node, parent as List, context);
        break;

      case "link":
        for (const child of node.children) {
          visit(child, node);
        }
        chunks.push(" (");
        chunks.push(node.url);
        chunks.push(")");
        break;

      default:
        result.addError(node, `Unhandled type: ${node.type}`);
    }
  };

  visit(ast);

  result.content = chunks
    .join("")
    .replace(/\n\n\n+/gm, "\n\n")
    .trimEnd();
  return result;
}

export async function parseFile(pathname: string): Promise<Nodes> {
  const doc = await FileReader.readFile(pathname);
  return parse(doc);
}
