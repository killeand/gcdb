const Path = require('path');
const NodeExternals = require('webpack-node-externals');
 
module.exports = {
    mode: 'development',
    target: "node",
    externals: [NodeExternals()],
    entry: './server/Main.js',
    output: {
        path: Path.resolve("./build"),
        filename: '[name].server.js',
        chunkFilename: '[name].server.js'
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
            }
        ]
    },
    plugins: []
};