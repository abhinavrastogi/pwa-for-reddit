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
                        /node_modules/
                    ],
                    loader: 'babel-loader'
                }
            ]
        },
        resolve: {
            modules: ["node_modules", __dirname],
            extensions: ['.js', '.jsx', '*'],
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
