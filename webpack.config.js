module.exports = {
	entry: {
		app: "./index.js"
	},
	output: {
		path: './public/js/bundle',
		filename: "[name].js"
	},
	module: {
		loaders: [{
			test: /\.js?$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}]
	}
};
