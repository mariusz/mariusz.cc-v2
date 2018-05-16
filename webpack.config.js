const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, 'assets'),
  entry: {
    site: ['./javascripts/site.js', './stylesheets/site.css']
  },
  output: {
    filename: 'assets/javascripts/[name].js',
    path: path.resolve(__dirname, '.tmp/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader', 
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    require('autoprefixer'),
                    require('postcss-import'),
                    require('postcss-flexbugs-fixes'),
                    require('postcss-nested')
                  ]
                }
              }
            }
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'assets/stylesheets/[name].css'
    })
  ]
};