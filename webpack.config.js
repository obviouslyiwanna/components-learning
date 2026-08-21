const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // 打包入口
  entry: path.resolve(__dirname, 'src/index.js'),

  // 打包输出
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',

    // 每次构建前清空 dist
    clean: true,

    // 作为组件库输出
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
          MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'index.css',
    }),
  ],

  // 生成 source map，方便调试
  devtool: 'source-map',
};