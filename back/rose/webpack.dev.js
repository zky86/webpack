var webpack = require('webpack')
var path = require('path')
var _ = require('lodash')
var baseConfig = require('./webpack.base')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var AssetsPlugin = require('assets-webpack-plugin')
var autoprefixer = require('autoprefixer')

var config = _.extend({}, {
  devtool: 'sourcemap',
  output: {
    path: path.join(__dirname, '/../dist'),
    // 手机联调 publicPath: 'http://192.168.253.*:' + baseConfig.devServer.port + '/dist/',
    publicPath: 'http://localhost:' + baseConfig.devServer.port + '/dist/',
    filename: '[name].dev.js'
  },
  entry: {
    base: ['vue', 'jquery', 'lodash'],
    main: path.join(__dirname, '/../src/entry/main')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components|src\/io|src\/utils)/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.scss$|\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': 'development'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
}, baseConfig)

module.exports = config