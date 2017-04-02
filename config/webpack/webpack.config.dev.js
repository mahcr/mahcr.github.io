'use strict';

import { common }      from './';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin';
import { root }           from '../scripts/helpers';
import webpackMerge      from 'webpack-merge';

export const dev = webpackMerge(common, {

  entry: {
    dev: './dev.js'
  },

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
    new HotModuleReplacementPlugin(),
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
