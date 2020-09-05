const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 自动生成 index.html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 自动清理 /dist
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development', // 开发环境

  // 文件入口
  entry: {
    index: './src/index.js',
    another: './src/another-module.js',
  },

  devtool: 'inline-source-map', // 

  // 使用webpack-dev-server
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },

  // 插件
  plugins: [
    // 自动清理/dist文件夹
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // 自动生成html文件
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './public/index.html'
    }),
    // 复制public目录到dist
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/static', to: './static' },
      ],
    }),
    // 映射dll清单
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./public/static/js/dll/lodash-manifest.json')
    }),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./public/static/js/dll/moment-manifest.json')
    }),
  ],

  // 文件出口
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  
  // 代码分离
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  
  module: {
    rules: [
      // 加载CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },

      // 加载图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },

      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },

      // 加载数据
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader',
        ],
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader',
        ],
      },
    ],
  },
};