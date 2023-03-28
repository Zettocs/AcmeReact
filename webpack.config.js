const path = require("path");
const webpack = require("webpack");

module.exports = {
  //...
  resolve: {
    fallback: {
      util: require.resolve("util/"),
      buffer: require.resolve("buffer/"),
      net: require.resolve("net"),
      process: require.resolve("process/browser"),
      crypto: require.resolve("crypto-browserify"),
    },
  },
};
