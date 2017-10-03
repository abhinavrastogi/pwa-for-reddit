const path = require('path');
const webpack = require('webpack');
const precache = require('sw-precache-webpack-plugin');
const MinifyPlugin = require("babel-minify-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const PROD = process.env.NODE_ENV==='production';

let config = {
	"entry": {
		app: "./app.js",
		vendor: [
			'react',
			'react-router',
			'react-router-dom',
			'react-dom',
			'glamorous',
			'glamor',
			'react-markdown',
			'redux',
			'react-redux',
			'redux-thunk'
		]
	},
	"output": {
		"filename": "[name].[chunkhash:6].js",
		"path": path.join(__dirname, "build"),
		"publicPath": "/"
	},
	"module": {
		"rules": [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader"
			}
		]
	},
	"plugins": [
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity,
			filename: 'vendor.[chunkhash:6].js'
		}),
		new webpack.optimize.CommonsChunkPlugin({
			names: ['manifest'],
			filename: 'manifest.[chunkhash:6].js'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new HtmlWebpackPlugin({
			title: 'Reddit Reader',
			template: 'index.ejs'
		}),
		new precache({
			minify: PROD,
			staticFileGlobsIgnorePatterns: [/\.html$/],
			runtimeCaching: [
				{
					urlPattern: /https:\/\/www\.reddit\.com\/.*/,
					handler: 'cacheFirst',
					options: {
						origin: 'https://www.reddit.com',
						cache: {
							name: 'json-cache',
							maxAgeSeconds: 300
						}
					}
				}
				// {
				// 	urlPattern: /^\/$/,
				// 	handler: 'fastest'
				// }
			]
		})
	]
}

if (PROD) {
	config.plugins.push(new MinifyPlugin())
}

module.exports = config;