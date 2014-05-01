var q  = require('q');
var fs = require('fs');

module.exports = {
  readFile: function (filename, options) {
    var def = q.defer();

    options = options || { encoding: 'utf-8' };
    fs.readFile(filename, options, function (err, data) {
      if (err) {
        def.reject(err);
      } else {
        def.resolve(data);
      }
    });

    return def.promise;
  }
};
