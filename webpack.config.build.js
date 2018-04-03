/**
 * Webpack configuration
 * @Created by 汤圆
 * @Created at 2018.4.3
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const colors = require('colors');  
// const extractSass = new ExtractTextPlugin(
// {
//     filename: "index.css",
//     disable: process.env.NODE_ENV === "development"
// });
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
console.log("当前环境-------->发布模式" ['green']);

module.exports = merge(common,
{
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


});