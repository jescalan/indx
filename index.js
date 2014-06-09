var fs = require('fs'),
    path = require('path');

var validExtensions = ['js', 'coffee'];

module.exports = function(dir){
  dir = path.resolve(dir);
  var res = {};
  var objs = fs
    .readdirSync(dir)
    // ignore index file
    .filter(function(f){ return f.match(/^index\./) ? false : true; })
    // ignore non-js files that aren't folders
    .filter(function(f){
      return isDir(dir,f) || f.match(extensionsRegex()) ? true : false;
    })
    // ignore folders without an index file
    .filter(function(f){
      return (isDir(dir,f) && !containsIndex(dir, f)) ? false : true;
    })
    // remove extensions
    .map(function(f){ return f.replace(extensionsRegex(), ''); });

  objs.forEach(function(obj){
    res[obj] = require(path.join(dir, obj));
  });

  return res;
};

/**
 * @param {String} dir
 * @param {String} f
 * @return {Boolean}
 * @private
 */
function isDir(dir, f){ return fs.statSync(path.join(dir,f)).isDirectory(); }

/**
 * @private
 */
function extensionsRegex(){
  var str = '';
  validExtensions.forEach(function(ext){ str += '\\.' + ext + '$' + '|'; });
  return new RegExp(str.slice(0, -1));
}

/**
 * @param {String} dir
 * @param {String} f
 * @return {Boolean}
 * @private
 */
function containsIndex(dir, f){
  var res = false;
  validExtensions.forEach(function(ext){
    if (fs.existsSync(path.join(dir, f, 'index.' + ext))) { res = true; }
  });
  return res;
}
