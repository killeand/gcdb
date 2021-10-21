const { HotModuleReplacementPlugin, webpack } = require('webpack');
const NodeExternals = require('webpack-node-externals');
const Path = require('path');

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
        server: [ "./node_modules/webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000", "./server/Main.js" ]
    },
    output: {
        path: Path.resolve("./build"),
        filename: 'main.[runtime].js',
        chunkFilename: '[name].[runtime].js',
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
                exclude: /(node_modules)|(build)|(client)/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin()
    ]
};