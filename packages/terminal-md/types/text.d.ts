import { ChalkInstance } from "chalk";
import figlet from "figlet";
export declare const DefaultOptions: figlet.Options;
/**
 * @example
   const f = new Figlet();
   await f.init();

   const lines = [" The new", "way to", "  render"];
   const s = await f.render(lines, Figlet.rainbowFilter);
   console.log(s);
 */
export declare class Figlet {
    #private;
    constructor(options?: figlet.Options);
    init(): Promise<void>;
    get font(): figlet.Fonts;
    get options(): figlet.Options;
    get height(): number;
    get width(): number;
    /**
     * Transforms string to printable string based on this font, font height,
     * and terminal width.
     * @param {string | string[]} s
     * @return {Promise<string>}
     */
    render(s: string | string[], filter?: (s: string) => string): Promise<string>;
    /**
     * Transforms string to printable string based on this font, font height,
     * and terminal width. Each logical line of text is centered within this
     * width.
     * @param {string} s
     * @return {Promise<string>}
     */
    center(s: string): Promise<string>;
    static splitFigletString(s: string, delim?: string): string[];
    /**
     * Returns a copy of rows with centered lines.
     * @param {string[]} rows
     * @param targetWidth
     * @return {string[]}
     * @private
     */
    private centerFigletLine;
    static rainbowFilter(s: string): string;
}
export type AnsiStyle = "bold" | "dim" | "italic" | "underline" | "inverse" | "hidden" | "strikethrough";
export type AnsiIndexColor = number;
export declare class TerminalText {
    str: string;
    chalk: ChalkInstance;
    private constructor();
    static ansi256(char: string, chalk: ChalkInstance, color?: AnsiIndexColor): TerminalText;
    static bgAnsi256(char: string, chalk: ChalkInstance, color?: AnsiIndexColor): TerminalText;
    static createChalk256(): ChalkInstance;
    static initFigletFont(font?: figlet.Fonts, width?: number): Promise<Figlet>;
    render(filter?: (s: string, chalk: ChalkInstance) => string): string;
    renderRainbow(): string;
    static renderFiglet(text: string[], figlet: Figlet): Promise<string>;
    static rainbow256(str: string, chalk: ChalkInstance): string;
}
//# sourceMappingURL=text.d.ts.map