const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./config/base');
const devWebpackConfig = require('./config/dev');
const prodWebpackConfig = require('./config/prod');
const env = require('./config/env');

const getEnvWebpackConfig = () =>
  env.NODE_ENV === 'development' ? devWebpackConfig(env) : prodWebpackConfig(env);

module.exports = webpackMerge(
  getEnvWebpackConfig(),
  baseWebpackConfig(env)
);
