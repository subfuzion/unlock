//
// TYPE NOTES
// To minimize package dependencies, this isn't in a shared types package.
// Keep these types manually in sync with the backend for now.
// This is just a demo anyway; the final CLI implementation will be python.
//

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

class UnlockClient {
  constructor(url) {
    this.url = url;
    let u = new URL(url);
    u.pathname = "/api/unlock";
    this.endpoint = u.href;
  }

  /**
   * @param  {UnlockRequest} request
   * @return {Promise<UnlockResponse>}
   */
  async unlock(request) {
    const response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    return response.json();
  }
}

module.exports = { UnlockClient };
