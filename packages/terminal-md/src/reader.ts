import { readFile } from "fs/promises";
import { join, relative } from "path";

export class FileReader {
  dir: URL;

  constructor(dir: URL) {
    this.dir = dir;
  }
  async readFileExt(name: string, ext: string): Promise<string> {
    const url = new URL(this.dir);
    url.pathname = join(url.pathname, `${name}.${ext}`);
    try {
      return await FileReader.readFile(url);
    } catch (err: any) {
      if (err.message.startsWith("ENOENT")) {
        const relPathname = relative(".", url.href);
        throw new Error(
          `Content "${name}": resource not found: ${relPathname}`,
        );
      } else throw err;
    }
  }

  static async readFile(name: URL | string): Promise<string> {
    const content = await readFile(name, { encoding: "utf8" });
    // Only trim trailing whitespace
    return content.trimEnd();
  }
}
