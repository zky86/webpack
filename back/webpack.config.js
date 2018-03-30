/**
 * Webpack configuration
 * @Created by Rosie.Li
 * @Created at 10/10/2016
 */
var webpack = require('webpack');
var path = require('path');
var args = require('minimist')(process.argv.slice(2));

/** List of allowed environments */
var allowedEnvs = ['dev', 'build'];

/** Set the correct environment */
var env;
if (args._.length > 0 && args._.indexOf('start') === -1) {
  env = args._[0];
} else if (args.env) {
  env = args.env;
} else {
  env = 'dev';
}

/** Get available configurations */
var configs = {
  base: require(path.join(__dirname, 'config/webpack.base')),
  dev: require(path.join(__dirname, 'config/webpack.dev')),
  build: require(path.join(__dirname, 'config/webpack.build')),
};

/**
 * Get an allowed environment
 * @param  {String}  env
 * @return {String}
 */
function getValidEnv(env) {
  var isValid = env && env.length > 0 && allowedEnvs.indexOf(env) !== -1;
  return isValid ? env : 'dev';
}

/**
 * Build the webpack configuration
 * @param  {String} env Environment to use
 * @return {Object} Webpack config
 */
function buildConfig() {
  var usedEnv = getValidEnv(env);
  console.log('Current environment--------', usedEnv);
  return configs[usedEnv];
}

module.exports = buildConfig(env);