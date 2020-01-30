const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");

/*
module (loader) : ���������� ���ϵ��� �ϳ��� �ڹٽ�ũ��Ʈ���Ϸ� �������. .vue .css���� (������ �ٽ�)
 plugins : �׿ܿ� �߰������� �ƿ�ǲ���� �ؾ��Ұ͵� ���شٰ� �����ϸ��
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
