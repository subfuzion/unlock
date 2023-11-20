import { Figlet, FileReader, parse, render } from "@subfuzion/terminal-md";
import chalk from "chalk";
import gradient from "gradient-string";

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

/**
 * An Unlock handler.
 * @callback UnlockHandler
 * @param {UnlockRequest} request
 * @return {Promise<string>}
 */

class Unlock {
  handlers = new Map();

  /**
   * Registers a handler for the resource.
   * @param {string} name The resource to return.
   * @param {UnlockHandler} handler Handles the request and returns a resource.
   */
  register(name, handler) {
    this.handlers.set(name, handler);
  }

  /**
   *
   * @param request
   * @return {Promise<UnlockResponse>}
   */
  async handle(request) {
    const name = request.args[0];
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`[unlock] No handler for resource: ${name}`);
    }
    const content = await handler(request);
    return {
      code: 200,
      content: content,
    };
  }
}

export const unlock = new Unlock();

/**
 * @param {string} name
 * @param {UnlockHandler} req
 */
unlock.register("sphere", async (req) => {
  const f = new Figlet();
  await f.init();

  const lines = [" The new", "way to", "  Cloud"];

  let filter;
  let rainbow;
  if (req.options && req.options.color && req.options.color === "millions") {
    filter = Figlet.rainbowFilter;
    rainbow = gradient.rainbow;
  } else {
    // assume "256"
    filter = rainbow256;
    rainbow = rainbow256;
  }

  const content = await f.render(lines, filter);

  // const white = chalk.whiteBright;
  const gray = chalk.gray;
  const blue = chalk.blueBright;

  const more = [
    "\n\n\n",
    "Let's build cool stuff at Google Cloud Next '24\n",
    "Las Vegas, April 9-11\n",
    "\n",
    "Visit " +
      blue("g.co/cloud/next") +
      " and use registration code " +
      rainbow("next100_dh1000\n"),
    "to snag a $499 ticket\n",
    "\n",
    gray("*\n"),
    gray("The $499 price is only valid with code next100_dh1000\n"),
    gray("through 11:59 pm PT on December 31, 2023, or until sold out.\n"),
  ];

  return content + more.join("");
});

function rainbow256(s) {
  // https://ss64.com/bash/syntax-colors.html
  const red = 9; // Red (SYSTEM)
  const yellow = 220; // Gold1
  const blue = 69; // CornflowerBlue
  const green = 34; // Green3

  const colors = [red, yellow, green, blue];
  const nColors = colors.length;

  return s
    .split("")
    .map((c, i) => {
      const color = colors[i % nColors];
      // return chalk[color](c);
      return chalk.ansi256(color)(c);
    })
    .join("");
}
