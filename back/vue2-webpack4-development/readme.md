之前搞过一个使用 webpack3 构建 react 开发环境的玩具（[http://www.ptbird.cn/webpack3-react-development.html](http://www.ptbird.cn/webpack3-react-development.html)），之后 webpack 就出 4 了 =  =

闲着没事儿，看了看 webpack4 的一些东西，发现也没什么大的变化。3比2还是变化蛮大的。

## 一、需要使用的依赖

因为暂时不需要 vue-router/vuex，所以我的依赖就没安装。

我忘记从哪个版本（好像是3），webpack 的 CLI 就移入了 `webpack-cli` ，因此需要安装这个依赖。

依赖列表：

```bash
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.4",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.1",
    "babel-runtime": "^6.26.0",
    "css-loader": "^0.28.10",
    "file-loader": "^1.1.11",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.0.6",
    "less": "^3.0.1",
    "less-loader": "^4.1.0",
    "node-sass": "^4.7.2",
    "sass-loader": "^6.0.7",
    "style-loader": "^0.20.3",
    "url-loader": "^1.0.1",
    "vue": "^2.5.15",
    "vue-html-loader": "^1.2.4",
    "vue-loader": "^14.2.1",
    "vue-template-compiler": "^2.5.15",
    "webpack": "^4.1.1",
    "webpack-cli": "^2.0.11",
    "webpack-dev-server": "^3.1.1"
```


同样的，现在还有的人发文章说使用 `babel-preset-es2015` 的人也是有些过分的。

因为是个玩具，所以没有加 `postcss` 也没有加 `extract`，也没有单独搞 `.babelrc`。


## 二、配置 webpack.config.js

插件主要是用了两个：

```bash
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
```

使用的 loader 如下：

```javascript
module:{
        rules:[
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:['env'],
                        plugins:['transform-runtime']
                    }
                }
            },
            {test:/\.vue$/,use:'vue-loader'},
            {test:/\.css$/,use:['style-loader','css-loader']},
            {test:/\.less$/,use:['style-loader','css-loader','less-loader']},
            {test:/\.scss$/,use:['style-loader','css-loader','sass-loader']},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:'assets/images/[name].[hash:7].[ext]'
                }
            },
        ]
           
    },
```


## 三、项目目录的规划


![1.jpg][1]

 
## 四、git仓库

暂时做了这么多，还没有完全弄完，在 github 和 gitosc 都有仓库，可以一起搞搞呗，这也不是造轮子，主要是对 webpack 有更深的认识吧。

**Github:**

- [https://github.com/postbird/webpack-react-development](https://github.com/postbird/webpack-react-development)

**Gitosc:**

- [https://gitee.com/postbird/vue2-webpack4-development](https://gitee.com/postbird/vue2-webpack4-development)


## 五、目前没解决（可能会解决）的问题

- html中引用的 img src 无法正确的在开发的过程中加载 （这个问题参照 vue-cli 的解决方案）

- 没有 postcss

- ... 其他没想到



  [1]: http://www.ptbird.cn/usr/uploads/2018/03/3324640642.jpg