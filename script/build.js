process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const filesize = require('filesize');
const fs = require('fs-extra');
const paths = require('../config/paths');
const config = require('../webpack.config');

const printErrors = (summary, errors) => {
  console.error(summary);
  console.log();
  errors.forEach((err) => {
    console.error(err.message || err);
    console.log();
  });
};

const printFilesInfo = stats =>
  stats.toJson().assets
    .map(asset => console.log(`${asset.name}    ${filesize(asset.size)}`));

const copyPublicFolder = () =>
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml,
  });

const build = () => {
  console.log('Creating an optimized production build...');
  webpack(config).run((err, stats) => {
    if (err) {
      printErrors('Failed to compile.', [err]);
      process.exit(1);
    }

    if (stats.compilation.errors.length) {
      printErrors('Failed to compile.', stats.compilation.errors);
      process.exit(1);
    }

    console.log();
    printFilesInfo(stats);
    console.log();

    console.log('Compiled successfully.');
    console.log();

    const outputPath = config.output.path;

    console.log('You may also serve it locally with a static server:');
    console.log('  npm install -g http-server');
    console.log(`  http-server ${outputPath}`);
  });
};

build();
copyPublicFolder();
