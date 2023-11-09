// import React from "react";
// import { render } from "ink";
// import process from "node:process";
import { spawn } from "node:child_process";
// import * as pty from 'node-pty';
//
// const shell = "bash";
//
// const proc = pty.spawn(shell, [], {
//   name: 'xterm',
//   cols: 80,
//   rows: 30,
//   cwd: "./ptyuser",
//   env: {
//     TERM: "xterm-256color",
//     HOME: "./ptyuser",
//     SHELL: "/bin/bash",
//     BASH_SILENCE_DEPRECATION_WARNING: "1",  // for testing on macOS
//   }
// });
//
// proc.onData((data) => {
//   if (data === "END") {
//     process.stdout.write("\0");
//     proc.kill();
//   } else {
//     process.stdout.write(data);
//   }
//   proc.kill();
// });
//
// proc.write('echo $SHELL\n');
// proc.write('ls -a\n');
// proc.write("END");

// proc.resize(20, 5);
// proc.write('ls -a\n');

// import Sample from "./templates/sample.js";
//
// const name = "World";
// render(<Sample name={name} />, proc);


const term = spawn("bash", {
  stdio: "pipe",
  cwd: "./ptyuser",
  env: {
    TERM: "xterm-256color",
    HOME: "./ptyuser",
    SHELL: "/bin/bash",
    FORCE_COLOR: "1",
    BASH_SILENCE_DEPRECATION_WARNING: "1",  // for testing on macOS
  }
});

term.stdout.on("data", (data) => {
  console.log(`${data}`);
});

term.stderr.on("data", (data) => {
  console.log(`${data}`);
});

term.on("close", (/*code*/) => {
  console.log(`DONE`);
});

term.stdin.write('echo Hello Tony\n');
term.stdin.write("stty size\n")
term.stdin.end(() => {
  term.kill();
});
