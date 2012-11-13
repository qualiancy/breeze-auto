module.exports = process.env.auto_COV
  ? require('./lib-cov/auto')
  : require('./lib/auto');
