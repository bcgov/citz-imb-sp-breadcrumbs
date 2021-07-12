const path = require('path')

module.exports = {
	output: {
		path: path.join(__dirname, '/dist/SharePointBreadcrumb_Breadcrumb feature/Style Library/Breadcrumb/js'),
		filename: 'breadcrumb.js',
	},
	devServer: {
		port: 8080,
		watchContentBase: true
	},
	resolve: {
		extensions: ["", ".webpack.js", ".web.js", ".js", ".json", ".jsx", ".ts", ".tsx"]
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	}
}
