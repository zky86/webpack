/**
 * Webpack configuration
 * @Created by 汤圆
 * @Created at 2018.4.3
 */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const colors = require('colors');
const webpack = require('webpack')

module.exports = {
    entry:
    {
        entry: __dirname + "/app/main_1.js", //已多次提及的唯一入口文件
        entry2: __dirname + "/app/main_2.js",
    },

    performance:
    {
        hints: false
    },

    resolve:
    {
        extensions: [".js", ".json", ".jsx", ".css", '.vue']
    },

    output:
    {
        // path: __dirname + "/public", //打包后的文件存放的地方
        // filename: "bundle.js" //打包后输出文件的文件名
        // path:path.resolve(__dirname,'./public'),
        //        //输出的文件名称
        //        filename:'[name].js'
        path: __dirname + "/public",
        filename: '[name].js'
    },

    plugins: [
        new ExtractTextPlugin(
        {
            // filename: 'common.css'
            filename: 'common.css'
        }),
        new HtmlWebpackPlugin(
        {
            template: __dirname + "/app/index.tmpl.html", //new 一个这个插件的实例，并传入相关的参数,
            minify:
            { //压缩HTML文件
                removeComments: false, //移除HTML中的注释
                collapseWhitespace: false, //删除空白符与换行符
                userName: "汤圆"
            }
        }),
        new webpack.ProvidePlugin(
        {
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            _: 'lodash'
        }),
        new webpack.HotModuleReplacementPlugin(),
    ]
};