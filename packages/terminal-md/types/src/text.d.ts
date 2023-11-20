import figlet from "figlet";
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
     * @param {string} s
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
    private splitFigletString;
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
//# sourceMappingURL=text.d.ts.map