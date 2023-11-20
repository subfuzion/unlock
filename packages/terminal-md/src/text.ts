import figlet from "figlet";
import gradient from "gradient-string";
import { stdout } from "node:process";

const DefaultOptions: figlet.Options = {
  font: "Isometric3",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: stdout.columns || 80,
  whitespaceBreak: true,
};

/**
 * @example
   const f = new Figlet();
   await f.init();

   const lines = [" The new", "way to", "  render"];
   const s = await f.render(lines, Figlet.rainbowFilter);
   console.log(s);
 */
export class Figlet {
  #options: figlet.Options;
  #height: number = -1;

  constructor(options: figlet.Options = DefaultOptions) {
    this.#options = options;
  }

  async init(): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      figlet.loadFont(this.font, (err: any, fontOptions: any) => {
        if (err) {
          reject(err);
        } else {
          this.#height = fontOptions.height;
          resolve();
        }
      });
    });
  }

  get font(): figlet.Fonts {
    return this.#options.font || DefaultOptions.font!;
  }
  get options(): figlet.Options {
    return this.#options;
  }

  get height(): number {
    if (this.#height < 0) {
      throw new Error("can't read height before calling init()");
    }
    return this.#height;
  }

  get width(): number {
    return this.#options.width || DefaultOptions.width!;
  }

  /**
   * Transforms string to printable string based on this font, font height,
   * and terminal width.
   * @param {string} s
   * @return {Promise<string>}
   */
  async render(
    s: string | string[],
    filter?: (s: string) => string,
  ): Promise<string> {
    if (Array.isArray(s)) {
      let text = "";
      for (const line of s) {
        let t = await this.render(line);
        if (filter) {
          t = filter(t);
        }
        text += t + "\n";
      }
      // Trim the last newline
      return text.slice(0, -1);
    }

    return new Promise((resolve, reject) => {
      figlet(s, this.#options, (err: any, data: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  /**
   * Transforms string to printable string based on this font, font height,
   * and terminal width. Each logical line of text is centered within this
   * width.
   * @param {string} s
   * @return {Promise<string>}
   */
  async center(s: string): Promise<string> {
    const content = await this.render(s);

    // Split the formatted string into an array of separate padded rows
    const rows = this.splitFigletString(content);

    // Divide the rows into logical lines of text based on the font height
    // and center each line
    const centeredRows: string[] = [];
    for (let index = 0; index < rows.length; index += this.height) {
      centeredRows.push(
        ...this.centerFigletLine(rows.slice(index, index + this.height)),
      );
    }

    return centeredRows.join("\n");
  }

  private splitFigletString(s: string, delim: string = "\n"): string[] {
    const lines: string[] = [];
    let buf = "";
    for (const c of s) {
      if (c === delim) {
        lines.push(buf);
        buf = "";
      } else {
        buf += c;
      }
    }
    lines.push(buf);
    return lines;
  }

  /**
   * Returns a copy of rows with centered lines.
   * @param {string[]} rows
   * @param targetWidth
   * @return {string[]}
   * @private
   */
  private centerFigletLine(
    rows: string[],
    targetWidth: number = this.width,
  ): string[] {
    if (!rows || rows.length === 0) return [];
    const centered: string[] = [];

    for (const row of rows) {
      // Indices of the first and last non-whitespace character in each row
      // We could assume that the text already starts left-aligned, but just
      // in case, we scan both ends of a row to be sure.
      const rowLeft = row.search(/\S/);
      const rowRight = row.search(/\S\s*$/);
      const s = row.slice(rowLeft, rowRight + 1);
      const padding = Math.floor((targetWidth - s.length) / 2);
      centered.push("".padStart(padding, " ") + s);
    }

    return centered;
  }

  static rainbowFilter(s: string): string {
    return gradient.rainbow.multiline(s);
  }
}
