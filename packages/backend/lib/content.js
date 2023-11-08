const fs = require("fs/promises");
const path = require("path");

const EXT = "text";

class FileResourceFetcher {
  constructor(dir) {
    this.dir = dir;
  }

  /**
   * Fetch content by name.
   * @param {string} name
   * @return {Promise<string>}
   */
  async fetch(name) {
    const f = path.join(this.dir, `${name}.${EXT}`);
    try {
      // TODO: use streaming instead of reading whole file into memory
      const content = await fs.readFile(f, { encoding: "utf8" });
      // Don't trim leading spaces
      return content.trimEnd();
    } catch (err) {
      if (err.message.startsWith("ENOENT")) {
        const relPathname = path.relative(__dirname, f);
        throw new Error(
          `Content "${name}": resource not found: ${relPathname}`,
        );
      } else throw f;
    }
  }
}

module.exports = { FileResourceFetcher };
