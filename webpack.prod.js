const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
   mode: 'production',
   // optimization: {
   //    minimize: true
      // disabled: breaks karma unit tests
      //     splitChunks: {
      //         chunks: "all"
      //     }
   // },
});