const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
   mode: 'production',
   optimization: {
      minimizer: [
         new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true // set to true if you want JS source maps
         }),
         new OptimizeCSSAssetsPlugin({})
      ]
   },
   // optimization: {
   //    minimize: true
      // disabled: breaks karma unit tests
      //     splitChunks: {
      //         chunks: "all"
      //     }
   // },
   plugins: [
      new MiniCssExtractPlugin({
         filename: "[name].css",
         chunkFilename: "[id].css"
      })
   ],
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [
               MiniCssExtractPlugin.loader,
               "css-loader"
            ]
         }
      ]
   }

});