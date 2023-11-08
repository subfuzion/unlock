const path = require("path");
const { FileResourceFetcher } = require("./lib/content");
const { renderContent } = require("./lib/render");
const Path = path.join(__dirname, "content");

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
async function unlock(request) {
  const name = request.args[0];

  renderContent(name);

  const fetcher = new FileResourceFetcher(Path);
  const content = await fetcher.fetch(name);
  return {
    code: 200,
    content,
  };
}

module.exports = { unlock };
