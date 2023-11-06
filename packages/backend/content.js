const fs = require('fs/promises');
const path = require("path");

const PATH = path.join(__dirname, "content");
const EXT = "text";

/**
 * Fetch content by name.
 * @param {string} name
 * @return {Promise<string>}
 */
async function fetchContent(name) {
  const f = path.join(PATH, `${name}.${EXT}`);
  const data = await fs.readFile(f, { encoding: 'utf8' });
  return data;
}

module.exports = { fetchContent };
