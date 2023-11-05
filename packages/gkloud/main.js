const { Command } = require("commander");

const { unlock } = require("./client.js");

const { description, version } = require("./package.json");

module.exports = { run };

async function run() {
  const cli = new Command();
  cli
    .name("gkloud")
    .description(description)
    .version(version)
    .helpOption(false);

  // hack: delete default version option (ignore cli.options readonly)
  // eslint-disable
  // noinspection JSConstantReassignment
  cli.options = cli.options.filter((item) => item.long !== "--version");
  // eslint-enable

  // add dedicated version command
  cli
    .command("version")
    .description("Print version")
    .action(() => {
      console.log(version);
    });

  // add unlock command
  cli
    .command("unlock")
    .description("Display information about Google Cloud events")
    .allowExcessArguments(true)
    .action(async (options, cmd) => {
      /** @type {import("./client.js").TerminalInfo} */
      let terminfo = {
        tty: true,
      };

      /** @type {import("./client.js").UnlockRequest} */
      let request = {
        args: cmd.args,
        options: options,
        terminfo: terminfo,
      };

      let response = await unlock(request);
      console.log(response);
    });

  await cli.parseAsync();
}
