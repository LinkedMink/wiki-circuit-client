const ESLintPlugin = require("eslint-webpack-plugin");
const { HotModuleReplacementPlugin, EnvironmentPlugin } = require("webpack");
const { merge } = require("webpack-merge");

const config = require("./webpack.local.config.js");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "source-map",
  plugins: [
    //new ESLintPlugin({}),
    new HotModuleReplacementPlugin(),
    new EnvironmentPlugin({
      LOCAL_CONFIG: JSON.stringify(config),
    }),
  ],
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "source-map-loader",
      },
    ],
  },
  devServer: {
    contentBase: "./public",
    hot: true,
    port: 8080,
  },
});
