const cli = require('commander');

function run() {
  cli.option('-h, --help', 'Display help information.');
  cli.parse(process.argv);

  console.log(cli.args);
}

module.exports = {
  run,
};
