import path from 'path'
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import { ENDPOINT } from './config'

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('development') }
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, './views/index.ejs'),
    title: "Title dev",
    filename: "./index.html",
    production: false,
    inject: true
  })
]

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    bundle: path.join(__dirname, 'client', 'app', 'index.js')
  },
  output: {
    path: "/",
    filename: 'dev.bundle.js',
    publicPath: "/"
  },
  module: {
    rules: [{
        exclude: /node_modules/,
        loader: 'babel-loader',
        test: /\.js$/,
      }, {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ]
  },
  resolve: {
    alias: {
      App: path.resolve(__dirname, 'client', 'app'),
      Client: path.resolve(__dirname, 'client')
    }
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, "public"),
    publicPath: '/',
    stats: { colors: true },
    proxy: {
      '/graphql': ENDPOINT + '/graphql'
    },
    historyApiFallback: true,
    port: 3003,
    watchContentBase: true,
    hot: true
  }
}
