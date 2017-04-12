const path = require('path');

module.exports = {
    entry: {
        app: './app.js',
        sw: './sw.js'
    },
    output: {
        path: path.resolve(__dirname, 'static'),
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
    }
};
