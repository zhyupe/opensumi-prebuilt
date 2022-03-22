const MD5 = require('md5.js');

const exports = {};

exports.createHash = (algo) => {
  if (algo !== 'md5') throw new Error('Not Supported');

  return new MD5();
}

module.exports = exports;