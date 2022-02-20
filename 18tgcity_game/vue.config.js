const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  // APIHOST: process.env.APIHOST,
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  devServer: {
    host: '0.0.0.0',
    port: 7777,
    https: false,
    hotOnly: true,
    proxy: null, // string | Object
  },
  pages: {
    loading: {
      entry: 'src/loading.js',
      template: 'public/loading.html',
      filename: 'loading.html',
    },
    pt: {
      entry: 'src/pt.js',
      template: 'public/pt.html',
      filename: 'pt.html',
    },
    pth5: {
      entry: 'src/pth5.js',
      template: 'public/pth5.html',
      filename: 'pth5.html',
    },
    pg: {
      entry: 'src/pg.js',
      template: 'public/pg.html',
      filename: 'pg.html',
    },
    pp: {
      entry: 'src/pp.js',
      template: 'public/pp.html',
      filename: 'pp.html',
    },
    im: {
      entry: 'src/im.js',
      template: 'public/im.html',
      filename: 'im.html',
    },
  },
  chainWebpack: (config) => {
    config.externals({
      vue: 'Vue',
      'element-ui': 'ELEMENT',
      moment: 'moment',
      '../moment': 'moment',
    });
  },
  configureWebpack: (config) => {
    const plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
          },
        },
        sourceMap: true,
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
