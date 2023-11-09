const { Command } = require("commander");
const { UnlockClient } = require("./client");
const { description, version } = require("./package.json");

const UnlockUrl =
  process.env.UNLOCK_URL || "https://gcloud-unlock-api-gsaaz6raqa-uc.a.run.app";

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

  try {
    console.log(UnlockUrl);
    const client = new UnlockClient(UnlockUrl);
    let response = await client.unlock(request);
    console.log(response.content);
  } catch (err) {
    console.error("Service unavailable");
  }
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
    .description("Display Google Cloud marketing information")
    .allowExcessArguments(true)
    .action(unlockAction);

  await cli.parseAsync();
}

module.exports = { run };
