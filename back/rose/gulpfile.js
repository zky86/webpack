/**
 * Gulp configuration
 * @Created by Rosie.Li
 * @Created at 10/10/2016
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var clean = require('gulp-clean');
var fs = require('fs');

var sassLint = require('gulp-scss-lint');
var compass = require('gulp-compass');
var uglifycss = require('gulp-uglifycss');

var webpack = require('webpack');
var webpackDevServer= require('webpack-dev-server');
var config = require('./webpack.config.js');

var path = require('path');
var _ = require('lodash');

/** you template path */
var templatePath = path.join(__dirname, 'src/html/');

/** Start webpack server */
/** no need to change localhost just webpack-dev-server --host 0.0.0.0 --hot */
gulp.task('server', function(cb) {
  var serverPort = config.devServer.prot;
  var hotServer = 'webpack/hot/only-dev-server';
  var newEntry = {};

  _.forEach(config.entry, function (entry, key) {
    if (_.isArray(entry)) {
      entry.push(hotServer);
      return newEntry[key] = entry;
    }
    newEntry[key] = [entry, hotServer];
  });
  config.entry = newEntry;
  config.entry.client = [
    'webpack-dev-server/client?http://localhost:' + config.devServer.port
  ];
  console.log(config.entry)

  new webpackDevServer(webpack(config), config.devServer)
    .listen(config.devServer.prot, 'localhost', function (err) {
       if (err) {
        cb(err);
       }

       gutil.log(
        '[webpack-dev-server]',
        'http://localhost:' + config.devServer.port + '/webpack-dev-server/');
       cb();
     });
});

/** Replace the static resource link in template */
gulp.task('rev', ['webpack-build'], function (cb) {
  var assets;
  var assetMap = ['js', 'css'];
  var baseFilePath = templatePath + 'index.html';

  try {
    assets = require('./webpack-assets.json');
  } catch (e) {
    cb(e);
  }

  fs.readFile(baseFilePath, function (err, content) {
    var newContent;
    if (err) {
      cb(err);
    }
    newContent = content.toString();

    _.forEach(assets, function (asset, assetName) {
      console.log(asset, assetName);

      _.forEach(assetMap, function (ext) {
        if (!asset[ext]) {
          return;
        }
        console.log(assetName + '.' + ext);
        newContent = newContent.replace(new RegExp(assetName + '(?!\\.dev).*?\\.' + ext, 'g'), asset[ext]);
      });
    });

    fs.writeFile(baseFilePath, newContent);
    cb();
  });

});

/** Compass css */
gulp.task('compass', function() {
  gulp.src('src/assets/scss/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      sass: 'src/assets/scss',
      css: 'dist/css',
    }))
    .pipe(gulp.dest(path.join(__dirname, 'dist/css')))
});

gulp.task('uglify-css', ['webpack-build'], function () {
  console.log(config.output.path + '*.css')
  return gulp.src(config.output.path + '*.css')
    .pipe(uglifycss())
    .pipe(gulp.dest(config.output.path));
});

// add hash to css
gulp.task('rev-css', function() {
  return gulp.src([
      'dist/css/*.css',
    ])
    .pipe(rev())
    .pipe(gulp.dest('static/build'));
});


/** Clean old output file */
gulp.task('clean', function () {
  return gulp.src(config.output.path)
    .pipe(clean({force: true}));
});

/** Use webpack compile resource */
gulp.task('webpack-build', ['clean'], function (cb) {
  console.log(config.entry);
  gutil.log('[webpack-build]', 'start webpack build');
  gutil.log('[webpack-build]', gutil.colors.magenta('--- (0.0) ---'));

  return webpack(config, function(err, stats) {
    if(err) {
      throw new gutil.PluginError("webpack", err);
    }

    gutil.log("[webpack]", stats.toString({
        // output options
    }));
    cb();
  });
});

gulp.task('build', [
    'clean',
    'webpack-build',
    'compass',
    'uglify-css',
    'rev'
  ]);

