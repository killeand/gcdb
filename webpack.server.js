const Path = require('path');
const { HotModuleReplacementPlugin, webpack } = require('webpack');
const NodeExternals = require('webpack-node-externals');
const HTMLPlugin = require('html-webpack-plugin');
const CSSPlugin = require('mini-css-extract-plugin');
const COPYPlugin = require('copy-webpack-plugin');
 
module.exports = {
    mode: 'development',
    target: "node",
    externals: [NodeExternals()],
    devServer: {
        contentBase: "./build",
        hot: true,
        stats: { colors: true }
    },
    entry: {
        client: "./client/Main.js",
        server: [ "./node_modules/webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", "./server/Main.js" ]
    },
    output: {
        path: Path.resolve("./build"),
        filename: (proc) => {
            return `main.${proc.runtime}.js`;
        },
        chunkFilename: (proc) => {
            return `[name].${proc.runtime}.js`;
        },
        publicPath: "/",
        hotUpdateChunkFilename: ".hot/[id].[fullhash].js",
        hotUpdateMainFilename: ".hot/[runtime].[fullhash].json"
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)|(build)/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)|(build)/,
                use: [CSSPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: './client/Main.html',
            filename: 'main.html',
            excludeChunks: [ "server" ]
        }),
        new CSSPlugin({
            filename: "[name].css",
            chunkFilename: "[name].css"
        }),
        new COPYPlugin({
            patterns: [
                { from: "./client/images", to: "images" }
            ]
        }),
        new HotModuleReplacementPlugin()
    ]
};