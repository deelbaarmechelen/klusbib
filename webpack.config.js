//var webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: __dirname + '/app/app.module.js',
        www: __dirname + '/app/www.module.js'
    },
    output: {
        filename: '[name].bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])
    ],
    mode: 'production'
}