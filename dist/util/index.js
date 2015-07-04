'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

var _util = require('./util');

var util = _interopRequireWildcard(_util);

var _color = require('./color');

var color = _interopRequireWildcard(_color);

var _timer = require('./timer');

var timer = _interopRequireWildcard(_timer);

var _func = require('./func');

var func = _interopRequireWildcard(_func);

var _ns = require('./ns');

var ns = _interopRequireWildcard(_ns);

var _Handlers = require('./Handlers');

var _Handlers2 = _interopRequireDefault(_Handlers);

var _LocalStorage = require('./LocalStorage');

var _LocalStorage2 = _interopRequireDefault(_LocalStorage);

util.color = color;
util.delay = timer.delay;
util.interval = timer.interval;
util.functionParameters = func.functionParameters;
util.ns = ns.namespace;
util.Handlers = _Handlers2['default'];
util.LocalStorage = _LocalStorage2['default'];

exports['default'] = util;
module.exports = exports['default'];