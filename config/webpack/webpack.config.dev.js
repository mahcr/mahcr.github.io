'use strict';

import { common }      from './';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { root }           from '../scripts/helpers';
import webpackMerge      from 'webpack-merge';

export const dev = webpackMerge(common, {

  devtool: 'cheap-module-eval-source-map',

  output: {
    path: root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      /**
       * load general theme styles
       */
      {
        test: /\.scss$/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ],
        include: [ root('..','src', 'theme') ]
      },
    ]
  },

  plugins: [
    /**
     * create file
     */
    new ExtractTextPlugin('assets/stylesheets/[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    hot: true,
    stats: 'minimal'
  }

});
