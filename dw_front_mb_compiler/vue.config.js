/* eslint-disable global-require */
/* eslint-disable no-unused-vars */

// const webpack = require('webpack');
const path = require('path');
const webpack = require('webpack');
// // Gzip壓縮
// const CompressionPlugin = require('compression-webpack-plugin');
// // 可以並行運行UglifyJS插件，這可以有效減少構建時間
// const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// 在htmlwebpack后插入一个AddAssetHtmlPlugin插件，用于将vendor插入打包后的页面
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// // 啟動node的多線程進行構建
// const HappyPack = require('happypack');
// const os = require('os');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// const happyThreadPool = HappyPack.ThreadPool({
//   size: os.cpus().length,
// });

// function resolve(dir) {
//   return path.join(__dirname, '..', dir);
// }
const nodeExternals = require('webpack-node-externals');

const YYYY = new Date().getFullYear().toString();
const MM = ((new Date().getMonth() + 1) < 10 ? `0${new Date().getMonth() + 1}` : `${(new Date().getMonth() + 1)}`);
const DD = ((new Date().getDate()) < 10 ? `0${new Date().getDate()}` : `${(new Date().getDate())}`);
const HH = ((new Date().getHours()) < 10 ? `0${new Date().getHours()}` : `${(new Date().getHours())}`);
const mm = ((new Date().getMinutes()) < 10 ? `0${new Date().getMinutes()}` : `${(new Date().getMinutes())}`);
process.env.VUE_APP_BUILDTIME = `${YYYY}${MM}${DD}${HH}${mm}`;
process.env.VUE_APP_VERSION = process.env.VUE_APP_VER + process.env.VUE_APP_BUILDTIME;

module.exports = {
  publicPath: '/',
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  devServer: {
    host: '0.0.0.0',
    port: 8881,
    https: false,
    hotOnly: true,
    proxy: null,
  },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/scss/_customVariables.scss";',
      },
    },
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  configureWebpack: (config) => {
    // plugins: [
    //   new BundleAnalyzerPlugin({
    //     analyzerMode: 'disabled',
    //     analyzerPort: 8889,
    //   }),
    // ],
    config.plugins.push(new BundleAnalyzerPlugin({
      analyzerMode: 'disabled',
      analyzerPort: 8889,
    }));
  },
  // externals: [nodeExternals()],
};
