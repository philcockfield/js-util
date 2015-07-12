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

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _Handlers = require('./Handlers');

var _Handlers2 = _interopRequireDefault(_Handlers);

var _LocalStorage = require('./LocalStorage');

var _LocalStorage2 = _interopRequireDefault(_LocalStorage);

exports['default'] = {
  isBlank: util.isBlank,
  isNumeric: util.isNumeric,
  toBool: util.toBool,
  delay: util.delay,
  ns: util.ns,
  functionParameters: util.functionParameters,

  color: color,
  xhr: _xhr2['default'],

  Handlers: _Handlers2['default'],
  LocalStorage: _LocalStorage2['default']
};
module.exports = exports['default'];