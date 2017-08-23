const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolve = relativePath => path.resolve(appDirectory, relativePath);

const getPublicUrl = appPackage =>
  require(appPackage).homepage || '/';

module.exports = {
  appDirectory: appDirectory,
  appHtml: resolve('public/index.html'),
  appIndex: resolve('src/index.jsx'),
  appBuild: resolve('build'),
  appPublic: resolve('public'),
  appSrc: resolve('src'),
  appPackage: resolve('package.json'),
  appNodeModules: resolve('node_modules'),
  publicUrl: getPublicUrl(resolve('package.json'))
};
