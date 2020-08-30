const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/bootstrap.js",
  output: {
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
            sourceType: "script",
            plugins: [
              [
                "@babel/plugin-transform-runtime",
                {
                  corejs: 3,
                  useESModules: true
                }
              ]
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
