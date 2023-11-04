module.exports = {
  unlock
}

//
// NOTES
// To minimize package dependencies, this isn't in a shared types package.
// Keep these types manually in sync with the backend for now.
// This is just a demo anyway; the final CLI implementation will be python.
//

/**
 * @typedev {Object} TerminalInfo
 * @property {boolean} [istty=true] Allow terminal format codes
 * @property {number} [width] Terminal width
 * @property {number} [height] Terminal height
 */

/**
 * @typedev {Object} UnlockRequest
 * @property {string[]}             args     Command positional arguments
 * @property {Object.<string,any>}  options  Command options map
 * @property {TerminalInfo}         terminfo Terminal information
 */

/**
 * @typedef {Object} UnlockResponse
 * @property {number}  code     API HTTP response status code
 * @property {string}  content  Response content to display
 */

/**
 * @param {UnlockRequest} request
 * @return {Promise<UnlockResponse>}
 */
async function unlock(request) {
  return await Promise.resolve({
    code: 200,
    content: "Hello, world!",
  });
}
