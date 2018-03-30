const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
var webpack = require('webpack')
    // const extractSass = new ExtractTextPlugin(
    // {
    //     filename: "index.css",
    //     disable: process.env.NODE_ENV === "development"
    // });

module.exports = {
    devtool: 'eval-source-map',
    entry:
    {
        entry: __dirname + "/app/main_1.js", //已多次提及的唯一入口文件
        entry2: __dirname + "/app/main_2.js",
    },

    performance:
    {
        hints: false
    },

    output:
    {
        // path: __dirname + "/public", //打包后的文件存放的地方
        // filename: "bundle.js" //打包后输出文件的文件名
        // path:path.resolve(__dirname,'/public'),
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
            }

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

        ]


    },

    plugins: [
        new ExtractTextPlugin(
        {
            filename: 'common.css'
        }),
        new HtmlWebpackPlugin(
        {
            template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.ProvidePlugin(
        {
            $: 'jquery',
            jquery: 'jquery',
            jQuery: 'jquery',
            _: 'lodash'
        }),
    ]


}