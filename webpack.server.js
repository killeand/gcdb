const NodeExternals = require('webpack-node-externals');
const Path = require('path');

module.exports = {
    mode: 'development',
    target: "node",
    externals: [NodeExternals()],
    entry: {
        server: [ "./server/Main.js" ]
    },
    output: {
        path: Path.resolve("./build"),
        filename: 'main.[runtime].js',
        chunkFilename: '[name].[runtime].js'
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
    plugins: []
};