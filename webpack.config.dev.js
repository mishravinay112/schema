import path from 'path';
import webpack from 'webpack';
import postcssInlineComment from 'postcss-inline-comment';
import postcssNested from 'postcss-nested';
import postcssVars from 'postcss-simple-vars';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssMqPacker from 'css-mqpacker';
import autoprefixer from 'autoprefixer';
import csswring from 'csswring';
import CleanWebpackPlugin from 'clean-webpack-plugin';

export default {
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src')
  ],
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['public/*']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src'),
        query: {
          presets: [ 'react-hmre' ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css!postcss',
        include: path.resolve(__dirname, '/')
      },
      {
        test: /\.(eot|png|svg|ttf|woff|woff2|otf)$/,
        loader: 'url-loader',
        include: path.resolve(__dirname, '/')
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        loader: 'file-loader?publicPath=/&name=fonts/[name].[ext]'
      }
    ]
  },
  postcss: function() {
    return [
      postcssImport,
      postcssVars,
      postcssNested,
      postcssInlineComment,
      postcssMixins,
      postcssMqPacker,
      autoprefixer,
      csswring
    ];
  }
};
