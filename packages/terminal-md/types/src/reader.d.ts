export declare class FileReader {
    dir: URL;
    constructor(dir: URL);
    readFileExt(name: string, ext: string): Promise<string>;
    static readFile(name: URL | string, trimTrailing?: boolean): Promise<string>;
}
//# sourceMappingURL=reader.d.ts.map