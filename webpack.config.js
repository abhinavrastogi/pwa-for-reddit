const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require("babili-webpack-plugin");

module.exports = function(env) {
    return {
        entry: {
            app: './app.js',
            sw: './sw.js'
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].js'
        },
        module: {
            rules: [
                {
                    test: /.js$/,
                    exclude: [
                        path.resolve(__dirname, "node_modules")
                    ],
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            modules: [
                "node_modules",
                path.resolve(__dirname),
            ],
            alias: {
                'react': 'preact-compat',
                'react-dom': 'preact-compat'
            }
        },
        plugins: env && env.production ? [
            new BabiliPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': '"production"',
            })
        ] : []
    }
};
