'use strict';
import { getEntries, root }           from '../scripts/helpers';

import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import ExtractTextPlugin  from 'extract-text-webpack-plugin';
import LoaderOptionsPlugin        from 'webpack/lib/NoErrorsPlugin';
import HotModuleReplacementPlugin from 'webpack/lib/HotModuleReplacementPlugin';
import HtmlWebpackPlugin    from 'html-webpack-plugin';
import ProvidePlugin        from 'webpack/lib/ProvidePlugin';

import data from '../data/index.data';

export const common = {
  context: root('..' ,'src/'),
  // js pages
  entry: {
    vendors: './vendors.js'
  },

  output: {
    filename: '[name].js'
  },

  resolve: {
    // make webpack understand imports
    extensions: [ '.js', '.css', '.scss' ],
    modules: [ 'node_modules' ]
  },

  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: 'file-loader?name=assets/imgs/[name].[hash].[ext]'
      },
      {
        test: /\.(woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=src/app/assets/imgs/[name].[ext]&publicPath=assets/imgs/&outputPath=dist/assets/imgs/'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [ 'es2015' ]
          }
        }
      },
      {
        test: /\.ejs$/,
        loader: 'ejs-compiled-loader'
      }
    ]
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(data),
    // jQuery, Tether
    new ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery',
        'Tether': 'tether',
        'window.Tether': 'tether'
    })
  ]

};
