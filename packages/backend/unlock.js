import { FileReader, parse, render } from "@subfuzion/terminal-md";

/**
 * Terminal properties spec
 * @typedef  {Object}  TerminalInfo
 * @property {boolean} [istty=true] Allow terminal format codes
 * @property {number}  [width]      Terminal width
 * @property {number}  [height]     Terminal height
 */

/**
 * Request spec for the unlock api
 * @typedef  {Object}                 UnlockRequest
 * @property {string[]}               args     Command positional arguments
 * @property {Object.<string,string>} options  Command options map
 * @property {TerminalInfo}           terminfo Terminal information
 */

/**
 * Response spec for the unlock api
 * @typedef  {Object} UnlockResponse
 * @property {number} code    API HTTP response status code
 * @property {string} content Response content to display
 */

/**
 * @param  {UnlockRequest} request
 * @return {Promise<UnlockResponse>}
 */
export async function unlock(request) {
  const name = request.args[0];
  let contentType = "ascii";

  // TODO: placeholder until we can look this up
  const contentMap = new Map();
  contentMap.set("sphere", "ascii");

  if (contentMap.has(name)) {
    contentType = contentMap.get(name);
  }

  const content = await getContent(name, contentType);
  return {
    code: 200,
    content: content,
  };
}

/**
 * Fetches the named content.
 * @param  {string} name Content name. For now, a file name minus ext.
 * @param  {string} contentType Content type. For now, a file ext.
 * @return {Promise<string>} The requested content.
 */
async function getContent(name, contentType) {
  switch (contentType) {
    case "md":
      return getMarkdown(name);
    case "ascii":
      return getAscii(name);
    default:
      throw new Error(`Unsupported content type: ${contentType}`);
  }
}

async function getMarkdown(name) {
  const dir = new URL("content", import.meta.url);
  const reader = new FileReader(dir);
  const doc = await reader.readFileExt(name, "md");
  const ast = parse(doc);
  const result = render(ast);

  if (result.ok) {
    return result.content;
  } else {
    throw new Error(result.reason);
  }
}

async function getAscii(name) {
  const dir = new URL("content", import.meta.url);
  const reader = new FileReader(dir);
  return reader.readFileExt(name, "ascii");
}
