const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

/*
module (loader) : 여러가지의 파일들을 하나의 자바스크립트파일로 만들어줌. .vue .css전부 (웹팩의 핵심)
 plugins : 그외에 추가적으로 아웃풋전에 해야할것들 해준다고 생각하면됨
*/

module.exports = {
  mode: "development",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".vue"]
  },
  entry: {
    app: path.join(__dirname, "./main.js")
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader"
      },
      {
        test: /\.css$/,
        use: ["vue-style-loader", "css-loader"]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()],
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./dist"),
    publicPath: "/dist"
  }
};
