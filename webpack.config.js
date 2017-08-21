const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: './client.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/bundle.js'
  },
  module: {
    rules: [
		{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
	new webpack.DefinePlugin({
		'process.env': {
		  NODE_ENV: JSON.stringify('production')
		}
	  }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

module.exports = config;