'use strict';

import { common }              from './';
import { root }                from '../scripts/helpers';

import DefinePlugin            from 'webpack/lib/DefinePlugin';
import ExtractTextPlugin       from 'extract-text-webpack-plugin';
import LoaderOptionsPlugin     from 'webpack/lib/NoErrorsPlugin';
import NoEmitOnErrorsPlugin    from 'webpack/lib/NoEmitOnErrorsPlugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from  'webpack/lib/optimize/UglifyJsPlugin';
import webpackMerge   from 'webpack-merge';
import WebpackMd5Hash from 'webpack-md5-hash';

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

export const prod = webpackMerge(common, {
  /**
   * Where assets will be placed
   */
  output: {
    path: root('../','dist'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  module: {
    rules: [

      /**
       * extract general styles to create a chuck
       */
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: 'css-loader!postcss-loader!sass-loader'
          }),
        exclude: [ root('..', 'src', 'app') ]
      }
    ]
  },

  plugins: [
    /**
     * create css chuck with the general styles
     */
    new ExtractTextPlugin('assets/stylesheets/[name].[hash].css'),
    /**
     * minify CSS code
     */
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } }
    }),
    /**
     * remove webpack erros
     */
    new NoEmitOnErrorsPlugin(),
    /**
     * uglifyJS
     */
    new UglifyJsPlugin({
      beautify: false,
      output: {
        comments: false
      },
      mangle: {
        screw_ie8: true
      },
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false
      }
    }),
    /**
     * pass options to uglifyJS
     */
    new LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new WebpackMd5Hash(),
    /**
     * define process.env variable in scripts
     */
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    })
  ]
});
