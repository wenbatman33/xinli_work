const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    vendor: [
      'axios',
      'fingerprintjs2',
      'socket.io-client',
      'vue-axios',
      'vue-router',
      'vuex',
      // 'swiper',
      // 'vue-awesome-swiper',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dll'),
    // 输出的文件名为 [name].js
    filename: '[name].dll.js',
    // 暴露到 window 的全局变量，这里是 [name]，与 filename 同名，方便在后面插入 html 使用
    library: '[name]',
  },
  plugins: [
    new webpack.DllPlugin({
      // 生成的 manifest.json 文件，这个文件在后面的 DllReferencePlugin 中需要使用到
      path: path.resolve(__dirname, './dll/[name]-manifest.json'),
      // 保持与上面的 library 配置相同
      name: '[name]',
    }),
  ],
};
