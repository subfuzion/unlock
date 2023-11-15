import { Nodes } from "mdast";
import { Result } from "./result.js";
export declare class RenderError {
    node: Nodes;
    reason: string;
    constructor(node: Nodes, reason: string);
    inspect(): string;
}
export declare class RenderResult extends Result {
    #private;
    constructor(ok?: boolean, reason?: string);
    get ok(): boolean;
    get reason(): string;
    get content(): string;
    set content(value: string);
    get errors(): RenderError[];
    addError(node: Nodes, reason: string): void;
    toString(): string;
}
export declare function parse(doc: string): Nodes;
declare class Context {
    node: Nodes;
    index: number;
    constructor(node: Nodes);
}
export declare function render(ast: Nodes, context?: Context): RenderResult;
export declare function parseFile(pathname: string): Promise<Nodes>;
export {};
//# sourceMappingURL=parse.d.ts.map