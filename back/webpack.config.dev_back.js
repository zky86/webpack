/**
 * Webpack configuration
 * @Created by 汤圆
 * @Created at 2018.4.3
 */

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

var webpack = require('webpack')

    // const extractSass = new ExtractTextPlugin(
    // {
    //     filename: "index.css",
    //     disable: process.env.NODE_ENV === "development"
    // });


module.exports = {
    // devtool: 'eval-source-map', //开发版本带调试
    devtool: '', 
    entry:
    {
        entry: __dirname + "/app/main_1.js", //已多次提及的唯一入口文件
        entry2: __dirname + "/app/main_2.js",
    },

    performance:
    {
        hints: false
    },

    // watchOptions:
    // {
    //     aggregateTimeout: 300,
    //     poll: 1000
    // },

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
    devServer:
    {
        contentBase: "./public", //本地服务器所加载的页面所在的目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        // hot: true
    },
    module:
    {
        rules: [

            {
                test: /(\.jsx|\.js)$/,
                use:
                {
                    loader: "babel-loader",
                    options:
                    {
                        presets: [
                            "env", "react"
                        ]
                    }
                },
                exclude: /node_modules/
            },

            // {
            //     test: /\.jsx?$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/,
            //     query: {
            //         presets: ['es2015']
            //     }
            // },

            // {
            //     test: /\.css$/,
            //    use: ExtractTextPlugin.extract('css-loader')
            //     // loader: ExtractTextPlugin.extract("style-loader","css-loader")
            // },


            // {
            //     test: /\.scss/,
            //     use: [{
            //     loader: 'style-loader'
            // }, {
            //     loader: 'css-loader'
            // }, {
            //     loader: 'sass-loader'
            //     }]
            // }

            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                {
                    use: 'css-loader'
                })
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                {
                    fallback: 'style-loader',
                    //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
                    use: ['css-loader', 'sass-loader']
                })
            }, 　

            {
                //处理图片，会在 output 目录中生成图片文件，js 中需要使用 require("*.jpg")先行引入才可以，同样 html 中通过 background-image 设置的图片不可以，但 css 中通过 background-image 设置的图片可以
                test: /\.(jpg|png)$/,
                use:
                {
                    loader: "file-loader",
                    options:
                    {
                        outputPath: "images/", //这里的 images 貌似没什么作用，但不写不行，可以是任意的一个或多个字符
                        name: "[name].[hash:8].[ext]", //8表示截取 hash 的长度
                        useRelativePath: true //这个必须与 outputPath 结合使用才可以处理 css 中的引入的图片
                    }
                }
            },
            {
                //处理 html 中通过 img 引入的图片，background-image 设置的图片不可以
                test: /\.html$/,
                use: "html-loader"
            },

            {
                test: /\.vue$/,
                use: 'vue-loader'
            },


        ]


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
                userName : "汤圆"
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
        // new UglifyJsPlugin({
        //    sourceMap: false
        // })


    ]


}