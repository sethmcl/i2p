var fsq   = require('./util/fsq');
var q     = require('q');
var path  = require('path');
var Hogan = require('hogan.js');

module.exports = {
  Puzzle: Puzzle,

  cache: {},

  /**
   * @method load
   * @param {number} id
   */
   get: function (id) {
     var cache, puzzle, def;

     cache = this.cache;

     if (cache[id]) {
       return q(cache[id]);
     }

     puzzle = new Puzzle(id);
     def    = q.defer();

     puzzle.load().then(function () {
       cache[id] = puzzle;
       def.resolve(puzzle);
     }, function (err) {
        def.reject(err);
     });

     return def.promise;
   }
};

/**
 * @class Puzzle
 * @constructor
 * @param {number} id
 */
function Puzzle(id) {
  this.id = id;
  this.submitUrl = '/puzzle/' + id + '/submit';
}

/**
 * @method load
 */
Puzzle.prototype.load = function () {
  var basePath   = path.resolve(__dirname, '..', 'puzzles', this.id);
  var srcPath    = path.resolve(basePath, 'src.js');
  var runnerPath = path.resolve(basePath, 'runner.hjs');

  return q.all([fsq.readFile(srcPath), fsq.readFile(runnerPath)])
          .then(function (data) {

    this.src       = data[0];
    this.runnerTl  = Hogan.compile(data[1]);
  }.bind(this));
};

/**
 * @method submit
 * @param {string} code
 */
Puzzle.prototype.submit = function (code) {
  debugger;
  var fn = this.buildRunnerFn(code);

  try {
    return fn();
  } catch (e) {
    return {
      correct: false,
      message: e.message
    }
  }
};

/**
 * @method buildRunnerFn
 * @param {string} code
 */
Puzzle.prototype.buildRunnerFn = function (code) {
  var fullSrc = this.runnerTl.render({userCode: code});
  return new Function(fullSrc);
};

/**
 * @method testEnv
 */
Puzzle.prototype.testEnv = function () {
};

