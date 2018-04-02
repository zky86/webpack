var webpack = require('webpack')
var path = require('path')
var srcPath = path.join(__dirname, '/../src')

module.exports = {
  devServer: {
    port: 2017,
    inline: true,
    hot: true,
    publicPath: '/dist/',
    contentBase: path.join(__dirname, '/../src/')
  },

  resolve: {
    modulesDirectories: ['node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'styles': srcPath + '/assets/scss',
      'images': srcPath + '/assets/images',
      'dumbComponent': srcPath + '/v-components/dumb-component',
      'smartComponent': srcPath + '/v-components/smart-component',
      'assets': srcPath + '/assets',
      'io': srcPath + '/io',
      'server': srcPath + '/server',
      'utils': srcPath + '/utils',
      'libs': srcPath + '/v-libs',
      'plugins': srcPath + '/v-plugins',
      'filters': srcPath + '/v-filters'
    }
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'windows.jQuery': 'jquery',
      _: 'lodash'
    })
  ]
}