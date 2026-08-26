const path = require('path');
// MiniCssExtractPlugin 用于把 CSS 从 JavaScript 中提取成独立的 CSS 文件。
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 打包入口
  entry: path.resolve(__dirname, 'src/index.js'),

  // 打包输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',

    // 每次构建前清空 dist，避免残留
    clean: true,

    // 把项目打成组件库
    library: {
      name: 'ComponentLearning',
      type: 'umd',
    },

    // 兼容浏览器和 Node 环境
    globalObject: 'this',
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          // 负责让 Webpack 理解 CSS 文件中的内容和依赖关系
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    // 使用 MiniCssExtractPlugin 插件把 CSS 提取成独立的文件
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],

  devtool: 'source-map',
};