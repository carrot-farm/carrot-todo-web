const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.tsx",
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'dist/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      { // # typescript loader
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      { // # svg loader
        test: /\.svg/,
        use: {
          loader: 'svg-url-loader',
        }
      },
      { // # file loader
        test   : /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        loader : 'file-loader'
      }
    ],
  },
  devServer: {
    // # 리프레시 시 cannot GET에러 방지를 위해 한곳을 바라보게 한다.
    historyApiFallback: true,
  },
  plugins: [
    // # html entrypoing
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    // # dotenv 적용
    new Dotenv({
      path: path.join(process.env.PWD, `env/.env.${process.env.NODE_ENV}`),
    })
  ]
};

