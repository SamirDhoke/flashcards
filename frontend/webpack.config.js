const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 3001;
const env = process.env.NODE_ENV || 'development';

const config = {
	mode: env,
	entry: './src/index.js',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		port: PORT,
		historyApiFallback: true
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './public/index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
				exclude: /node_modules/
			},
			{
				test: /\.js$/i,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	optimization: {
		nodeEnv: env
	}
}

if (env === 'development') {
	config.devtool = 'inline-source-map';
}

module.exports = config;