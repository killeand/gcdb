const HTMLPlugin = require('html-webpack-plugin');
const CSSPlugin = require('mini-css-extract-plugin');
const COPYPlugin = require('copy-webpack-plugin');
const Path = require('path');
 
module.exports = {
    mode: 'development',
    target: 'web',
    entry: {
        client: [ './client/Main.js' ]
    },
    output: {
        path: Path.resolve("./build"),
        filename: 'main.[runtime].js',
        chunkFilename: '[name].[runtime].js',
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)|(build)|(server)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)|(build)|(server)/,
                use: [CSSPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: './client/Main.html',
            filename: 'main.html'
        }),
        new CSSPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        new COPYPlugin({
            patterns: [
                { from: "./client/images", to: "images" }
            ]
        })
    ]
};