const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  baseUrl:'/prize_wall/',
  outputDir: 'dist',
  assetsDir: 'static',
  chainWebpack: (config) => {
    config.externals({
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      bootstrap: 'bootstrap',
    });
  },
};
