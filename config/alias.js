const path = require('path');
const paths = require('./paths');

const resolve = relativePath => path.resolve(paths.appSrc, relativePath);

module.exports = {
  assets: resolve('assets'),
  components: resolve('components'),
  configs: resolve('configs'),
  libs: resolve('libs'),
  modules: resolve('modules'),
  routes: resolve('routes'),
  stores: resolve('stores'),
  selectors: resolve('selectors'),
  styles: resolve('styles'),
  translates: resolve('translates'),
  defines: resolve('DEFINES.js'),
};
