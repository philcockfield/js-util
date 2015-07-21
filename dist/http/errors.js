'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * Describes an error that occured during an XMLHttpRequest operation.
 */

var HttpError = (function (_Error) {
  function HttpError(status, message, statusText) {
    _classCallCheck(this, HttpError);

    _get(Object.getPrototypeOf(HttpError.prototype), 'constructor', this).call(this);
    if (_lodash2['default'].isEmpty(message)) {
      message = 'Failed while making Http request to server.';
    }
    this.message = message;
    this.status = status;
    this.statusText = statusText;
  }

  _inherits(HttpError, _Error);

  return HttpError;
})(Error);

exports.HttpError = HttpError;

/**
 * Describes an error resulting from parsing response
 * data from an HTTP request.
 */

var HttpParseError = (function (_Error2) {
  function HttpParseError(responseText, parseError) {
    _classCallCheck(this, HttpParseError);

    _get(Object.getPrototypeOf(HttpParseError.prototype), 'constructor', this).call(this);
    this.message = 'Failed to parse: \'' + responseText + '\'';
    this.responseText = responseText;
    this.parseError = parseError;
  }

  _inherits(HttpParseError, _Error2);

  return HttpParseError;
})(Error);

exports.HttpParseError = HttpParseError;