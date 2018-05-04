var fs = require('fs');
var nodeModules = {};
var CopyWebpackPlugin = require('copy-webpack-plugin');
var UglifyWebpackJSPlugin = require('uglifyjs-webpack-plugin');
fs.readdirSync('node_modules')
    .filter(function(x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
    entry: './server/server.ts',
   // mode: "development",
    output: {
        path: __dirname + '/build',
        filename: 'server.js',
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
        ],
    },
    target: 'node',
    //externals: nodeModules,
    plugins: [
        new UglifyWebpackJSPlugin({
            cache: true,
            extractComments: true,
            sourceMap: false,
            uglifyOptions: {
                mangle: false,
                minimize: true
            }
        }),
        new CopyWebpackPlugin([
            {
                from: 'server/**/*.json',
                to: '[name].[ext]'
            }
        ])
    ]
};
