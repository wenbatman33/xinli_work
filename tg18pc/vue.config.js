/* eslint-disable global-require */
const path = require('path');
const webpack = require('webpack');
// Gzip壓縮
const CompressionPlugin = require('compression-webpack-plugin');
// 可以並行運行UglifyJS插件，這可以有效減少構建時間
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
// 在htmlwebpack后插入一个AddAssetHtmlPlugin插件，用于将vendor插入打包后的页面
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
// 啟動node的多線程進行構建
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length,
});

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  devServer: {
    host: '0.0.0.0',
    port: 8888,
    https: false,
    hotOnly: true,
    proxy: null,
  },
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
    fastregister: {
      entry: 'src/fastregister.js',
      template: 'public/fastregister.html',
      filename: 'fastregister.html',
    },
    loading: {
      entry: 'src/loading.js',
      template: 'public/loading.html',
      filename: 'loading.html',
    },
  },
  chainWebpack: (config) => {
    config.externals({
      vue: 'Vue',
      'element-ui': 'ELEMENT',
    });
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
  },
  configureWebpack: (config) => {
    config.plugins.push();
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(`\\.(${ 
          ['js', 'css'].join('|') 
        })$`),
        threshold: 10240,
        minRatio: 0.8,
      }));
      config.plugins.push(new webpack.DllReferencePlugin({
        manifest: require('./dll/vendor-manifest.json'),
      }));
      config.plugins.push(new AddAssetHtmlPlugin([{
        filepath: path.resolve(__dirname, './dll/vendor.dll.js'), // 同webpack.dll.config.js output
        includeSourcemap: false,
        hash: true,
        outputPath: '/vendor/',
        publicPath: '/vendor/',
      }]));
      config.plugins.push(new WebpackParallelUglifyPlugin({
        uglifyJS: {
          output: {
            beautify: false, // 不需要格式化
            comments: false, // 不保留注释
          },
          compress: {
            warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
            drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
          },
        },
        sourceMap: true,
        parallel: true,
      }));
      config.plugins.push(new HappyPack({
        id: 'babel-loader',
        loaders: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        }],
        threadPool: happyThreadPool,
        verbose: true,
      }));
      config.module.rules.push({
        test: /\.js$/,
        include: [resolve('src')],
        exclude: '/node_modules',
        loader: 'happypack/loader?id=babel-loader',
      });
      config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin());
    }
  },
};
