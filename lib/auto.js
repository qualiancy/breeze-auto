/*!
 * breeze-auto
 * Copyright(c) 2012 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Module dependancies
 */

var dag = require('breeze-dag');

/*!
 * Helpers
 */

var noop = function () {};

/**
 * ### auto (tasks[, concurreny], callback)
 *
 * Determines a best-fit concurrency path of execution
 * for a set of interdependant named tasks.
 *
 * ```js
 * var auto = require('breeze-auto');
 *
 * auto({
 *     one: function (next) {
 *       setTimeout(next, 10);
 *     }
 *   , two: function (next) {
 *       setTimeout(next, 15);
 *     }
 *   , three: [ 'one', 'two', function (next) {
 *       setTimeout(next, 20);
 *     }
 * }, 2, function (err) {
 *   should.not.exist(err);
 * });
 * ```
 *
 * @param {Object} tasks
 * @param {Number} concurrency
 * @param {Function} callback
 * @name auto
 * @api public
 */

module.exports = function (tasks, cc, cb) {
  if ('function' == typeof cc) cb = cc, cc = 10;
  cb = cb || noop;

  var parsed = autoParseTasks(tasks)
    , edges = parsed.edges
    , fns = parsed.fns;

  function iterator (edge, next) {
    var fn = fns[edge];
    fn(next);
  }

  dag(edges, cc, iterator, cb);
};

/*!
 * autoParseTasks (tasks)
 *
 * Parse the object passed as `tasks` to auto
 * or autoSeries. Returns an object indicating
 * the graph and functions to call by name.
 *
 * @param {Object} tasks
 * @api private
 */

function autoParseTasks (tasks) {
  var edges = []
    , fns = {};

  for (var key in tasks) {
    var task = tasks[key];
    if (Array.isArray(task)) {
      for (var i = 0; i < task.length; i++) {
        var name = task[i];
        if ('string' === typeof name) edges.push([ name, key ]);
        else if ('function' == typeof name) fns[key] = name;
      }
    } else {
      fns[key] = task;
      edges.push([ null, key ]);
    }
  }

  return { edges: edges, fns: fns };
}
