// webpack.config.js
const path = require("path");

module.exports = {
  target: "node",
  entry: "./bin/gkloud",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, ".build"),
  },
  mode: "production",
};
