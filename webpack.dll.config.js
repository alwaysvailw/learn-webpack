const path = require('path')
const webpack = require('webpack')

module.exports = {
	// mode: "development || "production",
	resolve: {
		extensions: [".js", ".jsx"]
	},
	entry: {
		lodash: ['lodash'],
		moment: ['moment']
	},
	output: {
		path: path.join(__dirname, "public", "static", "js", "dll"),
		filename: "Dll.[name].js",
		library: '[name]_dll_[hash]'
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.join(__dirname, "public", "static", "js", "dll", "[name]-manifest.json"),
			name: '[name]_dll_[hash]'
		})
	]
};