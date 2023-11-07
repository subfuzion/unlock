const { Command } = require("commander");
const { UnlockClient } = require("./client");
const { description, version } = require("./package.json");

const UnlockUrl =
  process.env.UNLOCK_URL || "https://gcloud-unlock-api-imhauua6kq-uc.a.run.app";

/**
 * @param {import("commander").OptionValues} options
 * @param {import("commander").Command} cmd
 * @return {Promise<void>}
 */
async function unlockAction(options, cmd) {
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

  const client = new UnlockClient(UnlockUrl);
  let response = await client.unlock(request);
  console.log(response.content);
}

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
    .action(unlockAction);

  await cli.parseAsync();
}

module.exports = { run };
