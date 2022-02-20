const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  baseUrl:'',
  outputDir: process.env.outputDir,
  assetsDir: 'qrassets',
  chainWebpack: (config) => {
    config.externals({
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      bootstrap: 'bootstrap',
    });
  },
};
