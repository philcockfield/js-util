// Note: Register [babel] only if another module hasn't already done so.
if (!global._babelPolyfill) { require('babel/register'); }
module.exports = require('./src/index');
