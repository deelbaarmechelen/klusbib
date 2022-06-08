var webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        app: __dirname + '/app/app.module.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].bundle.js',
        chunkFilename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                type: 'asset/resource'
                // use: [
                //     'file-loader'
                // ]
            },
            {
                test: /\.html$/,
                type: 'asset/source',
                // exclude: __dirname + 'public/index.html'
            }
            // {
            //     // HTML LOADER
            //     // Reference: https://github.com/webpack/raw-loader
            //     // Allow loading html through js
            //     test: /\.html$/,
            //     loader: 'raw-loader',
            //     type: 'javascript/auto'
            //     // loader: 'html-loader'
            // }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Klusbib',
            filename: path.resolve(__dirname, 'dist/index.html'),
            template: 'public/index.ejs'
        }),
        // Copy assets from the public folder
        // Reference: https://github.com/kevlened/copy-webpack-plugin
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: __dirname + '/public',
                    globOptions: {
                        ignore: ["**/public/index.ejs"],
                    },
                }
            ]
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /(nl|be)(?!-)/)
    ],
    mode: 'production'
}
