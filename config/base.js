const webpack = require('webpack');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const path = require('path');
const paths = require('./paths');
const alias = require('./alias');

module.exports = env => ({
  entry: [
    require.resolve('normalize.css'),
    // We ship a few polyfills by default:
    require.resolve('./polyfills'),
    // Finally, this is your app's code:
    paths.appIndex
  ],
  output: {
    path: paths.appBuild,
  },
  resolve: {
    modules: [
      paths.appNodeModules,
      paths.appSrc
    ],
    extensions: ['.js', '.jsx'],
    alias: alias,
  },
  context: paths.appDirectory,
  target: 'web',
  module: {
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      {
        test: /\.jsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },
      {
        exclude: [
          /\.html$/,
          /\.jsx?$/,
          /\.json$/,
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/,
          /\.css$/,
          /\.less$/,
          /\.scss$/
        ],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // "url" loader works like "file" loader except that it embeds assets
      // smaller than specified limit in bytes as data URLs to avoid requests.
      // A missing `test` is equivalent to a match.
      {
        test: [
          /\.bmp$/,
          /\.gif$/,
          /\.jpe?g$/,
          /\.png$/
        ],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      },
      // Process JS with Babel.
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'dev') { ... }. See `./env.js`.
    new webpack.EnvironmentPlugin(env),
    new StyleLintPlugin({
      configFile: path.resolve(paths.appDirectory, 'stylelint.config.js'),
      context: paths.appSrc,
      syntax: "scss"
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new LodashWebpackPlugin()
  ],
});
