import { log, error } from "node:console";
import { appendFile, opendir, writeFile } from "node:fs/promises";
import { exit } from "node:process";

import { FileReader } from "../src/reader.js";
import { parse, render } from "../src/parse.js";

const TestLog = "test.log";

async function readSample(
  name: string,
  ext: string,
  samplesDir: string = "samples",
): Promise<string> {
  const dir = new URL(samplesDir, import.meta.url);
  const reader = new FileReader(dir);
  return reader.readFileExt(name, ext);
}

let testCount = 0;
let testPass = 0;
let testFail = 0;

try {
  await writeFile(TestLog, "", { encoding: "utf8", flag: "w" });
  const dir = await opendir("test/samples");
  for await (const dirent of dir) {
    // match test document (ex: 001.md)
    if (dirent.name.match(/^\d{3}\.md$/)) {
      testCount++;

      const name = dirent.name.substring(0, dirent.name.indexOf("."));
      const input = await readSample(name, "md");
      const expected = await readSample(name, "term");

      const ast = parse(input);
      const result = render(ast);
      const actual = result.content;

      // it parsed ok
      let ok = result.ok;
      let reason = result.reason;

      // but does actual match expected?
      if (expected !== actual) {
        ok = false;
        if (expected !== actual) {
          if (reason) reason += "\n";
          reason = `${reason}Error: actual doesn't match expected`;
        }
      }

      if (ok) {
        testPass++;
      } else {
        testFail++;

        const sep1 = `---[ INPUT  ]--------------------------\n`;
        const sep2 = `---[ EXPECT ]--------------------------\n`;
        const sep3 = `---[ ACTUAL ]--------------------------\n`;
        const div = "========================================\n";
        const logMessage = `FAIL: ${name}\n${sep1}${input}\n${sep2}${expected}\n${sep3}${reason}\n${actual}\n${div}`;
        await appendFile(TestLog, logMessage);

        // error(`FAIL: ${name}`);
        error(logMessage);
      }
    }
  }

  log(`TESTS : ${testCount}`);
  log(`PASS  : ${testPass}`);

  if (testFail) {
    log(`FAIL  : ${testFail}`);
    exit(1);
  }
} catch (err) {
  error(err);
  exit(1);
}
