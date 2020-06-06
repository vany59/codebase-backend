const webpack = require("webpack");
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const Dotenv = require("dotenv-webpack");
require("dotenv").config({ path: "./.env" });

module.exports = {
  entry: ["webpack/hot/poll?100", "./src/index.js"],
  output: {
    pathinfo: false,
  },
  watch: true,
  target: "node",
  node: {
    __dirname: false,
    __filename: false,
  },
  externals: [
    nodeExternals({
      whitelist: ["webpack/hot/poll?100"],
    }),
    { fs: "commonjs fs" },
  ],
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        exclude: /nod_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  resolve: {
    alias: {
      "@environments": path.resolve(__dirname, "./src/environments"),
      "@logger": path.resolve(__dirname, "./src/configs/logger"),
      "@apolloServer": path.resolve(__dirname, "./src/configs/apolloServer"),
      "@resolvers": path.resolve(__dirname, "./src/resolvers"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@middlewares": path.resolve(__dirname, "./src/middlewares"),
    },
    extensions: [".ts", ".js"],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin({
      format:
        chalk.hex("#6c5ce7")("build ") +
        chalk.hex("#0984e3")("▯:bar▯ ") +
        chalk.hex("#00b894")("(:percent) ") +
        chalk.hex("#ffeaa7")(":msg"),
      complete: "▰",
      incomplete: "▱",
      clear: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new Dotenv({
      path: "./.env",
      silent: true,
    }),
  ],

  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
};
