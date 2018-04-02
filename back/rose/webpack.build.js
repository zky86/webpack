var webpack = require('webpack')
var path = require('path')
var _ = require('lodash')
var baseConfig = require('./webpack.base')
var extractTextPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var assetsPlugin = require('assets-webpack-plugin')

var config = _.defaultsDeep({}, {
  output: {
    path: 'dist/',
    publicPath: '../dist/',
    filename: '[name]-[chunkhash].js'
  },
  entry: {
    'base': ['vue', 'jquery', 'lodash'],
    'main': path.join(__dirname, '/../src/entry/main')
  },
  resolve: {
    alias: {
      'settings': path.join(__dirname, 'setting-build')
    }
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|src\/io)/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        // loader: 'vue!eslint'
        loader: 'vue'
      },
      {
        test: /\.(eot|woff|woff2|ttf)$/,
        loader: 'url-loader?limit=30000&name=fonts/[name]-[chunkhash].[ext]'
      },
      {
        test: /\.scss$|\.css$/,
        // loader: extractTextPlugin.extract('style', 'css!postcss!sass'),
        loader: extractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: { autoprefixer: false, sourceMap: true, importLoaders: 1 }
            },
            'css!postcss!sass'
          ]
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=images/[hash].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ]
  },
  postcss: [
    autoprefixer({ browsers: ['> 1%', 'last 2 versions'] })
  ],
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jquery: 'jquery',
      jQuery: 'jquery',
      _: 'lodash'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: {
        except: ['$', 'exports', 'require']
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin({
      minSizeReduce: 1.5,
      moveToParents: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),
    new extractTextPlugin('main-[chunkhash].css'),
    // new extractTextPlugin({
    //   filename: '[name].css?main-[chunkhash].css',
    //   disable: false,
    //   allChunks: true
    // }),
    new webpack.optimize.CommonsChunkPlugin('base', 'base-[chunkhash].js'),
    new assetsPlugin({
      fullPath: false,
      prettyPrint: true
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]
}, baseConfig)

module.exports = config