'use strict';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');
module.exports =  {
  entry: {
		bundle: "./fadeBackground.js"
	},
	plugins: [new ExtractTextPlugin("index.css"),new OptimizeCssAssetsPlugin(), new UglifyJSPlugin() ],
  module:{
  loaders: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader'
    },
		{ test: /\.css$/, loader:ExtractTextPlugin.extract("css-loader!minimize") }
  ]
  },
  externals: {
    'react': 'commonjs react', 
    'react-dom': 'commonjs react-dom', 
		'lodash':'commonjs lodash'

  },
	output:{
    libraryTarget: 'umd',
  	filename: 'index.js',	
		path: path.resolve(__dirname, 'dist')
	},
  resolve: {
    extensions: ['.js', '.jsx']
  },
}
