// webpack.config.js
const path = require("path");

module.exports = {
  mode: "production", // or "development"
  entry: "./src/main.js", // あなたのエントリーポイント
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  experiments: {
    outputModule: true, // 必要であれば true（type: "module" を使う場合）
  },
};
