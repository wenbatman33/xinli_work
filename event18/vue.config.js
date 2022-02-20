const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
// /////////////////////////////////////////////////////////////////////
const fs = require('fs');
const glob = require('glob');

// 简单学习 glob https://www.cnblogs.com/liulangmao/p/4552339.html
const pages = {};
let entries;
try {
  entries = glob('src/views/*/main.js', { sync: true });
} catch (err) {
  entries = [];
  throw err;
}
entries.forEach((file) => {
  const fileSplit = file.split('/');
  const pageName = fileSplit[2];
  let pageHtml = `${fileSplit.slice(0, 3).join('/')}/index.html`;
  if (!fs.existsSync(pageHtml)) {
    pageHtml = `${fileSplit.slice(0, 2).join('/')}/_default.html`;
  }
  pages[pageName] = {
    entry: file,
    template: pageHtml,
    filename: `${pageName}/index.html`,
  };
});

module.exports = {
  pages,
  baseUrl: '/',
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  lintOnSave: true,
  productionSourceMap: true,
  chainWebpack: (config) => {
    config.externals({
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      moment: 'moment',
      '../moment': 'moment',
      $: 'jquery',
    });
  },
  pluginOptions: {},
  devServer: {
    open: false,
    disableHostCheck: true,
    host: '0.0.0.0',
    port: 7777,
    https: false,
    hotOnly: false,
    proxy: null,
    before: (app) => {
    },
  },
  configureWebpack: (config) => {
    const plugins = [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        jquery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      }),
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${
          ['js', 'css'].join('|')
        })$`),
        threshold: 10240,
        minRatio: 0.8,
      }),
    ];
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins];
    }
  },
};
