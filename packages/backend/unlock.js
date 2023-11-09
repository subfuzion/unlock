import { FileReader, parse, render } from "terminal-markdown";

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

  const dir = new URL("content", import.meta.url);
  const reader = new FileReader(dir);
  const doc = await reader.readFileExt(name, "md");
  const ast = parse(doc);
  const result = render(ast);

  if (result.ok) {
    return {
      code: 200,
      content: result.content,
    };
  } else {
    throw new Error(result.reason);
  }
}
