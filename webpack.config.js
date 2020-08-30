const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/bootstrap.js",
  output: {
    library: "ZzoTree",
    libraryTarget: "umd",
    globalObject: "this",
    filename: "zzotree.js",
    path: path.resolve(__dirname, "lib")
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            sourceType: "module",
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 3,
                  useESModules: true
                }
              ],
              ["@babel/plugin-proposal-class-properties"]
            ],
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "entry",
                  targets: { chrome: 58, ie: 9 },
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  }
};
