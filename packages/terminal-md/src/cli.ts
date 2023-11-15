import { log, error } from "node:console";
import { argv, exit } from "node:process";

import { FileReader, parse, render } from "./index.js";
import { parseFile } from "./parse.js";

const args = argv.slice(2);
if (args.length !== 1) {
  error("Usage: md2ascii <filename>");
  exit(1);
}

async function main() {
  const filename = args[0];
  const ast = await parseFile(filename!);
  const result = render(ast);
  if (result.ok) {
    log(result.content);
  } else {
    error(result.reason);
    exit(1);
  }
}

try {
  await main();
} catch (err: any) {
  error(err?.message || err.toString());
  exit(1);
}
