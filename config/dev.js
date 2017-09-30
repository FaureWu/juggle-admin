const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('./paths');

const proxy = require(paths.appPackage).proxy;

const HOST = process.env.HOST || 'localhost';
const PORT = parseInt(process.env.PORT, 10) || 9999;
const PROTOCOL = process.env.PROTOCOL || 'http';

const publicPath = '/';

module.exports = env => ({
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch'
  ],
  output: {
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: publicPath
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]-[hash:base64:8]'
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]-[hash:base64:8]'
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader',
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    // Silence WebpackDevServer's own logs since they're generally not useful.
    // It will still show compile warnings and errors with this setting.
    clientLogLevel: 'error',
    // Enable gzip compression of generated files.
    compress: true,
    // By default WebpackDevServer serves physical files from current directory
    // in addition to all the virtual build products that it serves from memory.
    // This is confusing because those files won’t automatically be available in
    // production build folder unless we copy them. However, copying the whole
    // project directory is dangerous because we may expose sensitive files.
    // Instead, we establish a convention that only files in `public` directory
    // get served. Our build script will copy `public` into the `build` folder.
    // In `index.html`, you can get URL of `public` folder with %PUBLIC_URL%:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In JavaScript code, you can access it with `process.env.PUBLIC_URL`.
    // Note that we only recommend to use `public` folder as an escape hatch
    // for files like `favicon.ico`, `manifest.json`, and libraries that are
    // for some reason broken when imported through Webpack. If you just want to
    // use an image, put it in `src` and `import` it from JavaScript instead.
    contentBase: paths.appPublic,
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      // See https://github.com/facebookincubator/create-react-app/issues/387.
      disableDotRule: true,
    },
    // Enable hot reloading server. It will provide /sockjs-node/ endpoint
    // for the WebpackDevServer client so it can learn when the files were
    // updated. The WebpackDevServer client is included as an entry point
    // in the Webpack development configuration. Note that only changes
    // to CSS are currently hot reloaded. JS changes will refresh the browser.
    host: HOST,
    port: PORT,
    hot: true,
    hotOnly: true,
    // Enable HTTPS if the HTTPS environment variable is set to 'true'
    https: PROTOCOL === 'https',
    // When use the hot mode, suggest use the inline mode
    inline: true,
    lazy: false,
    noInfo: false,
    open: true,
    publicPath: publicPath,
    quiet: false,
    stats: 'errors-only',
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    proxy: {
      '/api': {
        target: `http://${proxy.host}:${proxy.port}`,
      }
    },
    overlay: true
  },
  // Turn off performance hints during development because we don't do any
  // splitting or minification in interest of speed. These warnings become
  // cumbersome.
  performance: {
    hints: false
  }
});
