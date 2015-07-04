'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/*
A safe way to test any value as to wheather is is "blank"
meaning it can be either:
  - null
  - undefined
  - empty-string.
  - empty-array
*/
var isBlank = function isBlank(value) {
  if (value === null || value === undefined) return true;
  if (_lodash2['default'].isArray(value) && _lodash2['default'].compact(value).length === 0) return true;
  if (_lodash2['default'].isString(value) && _lodash2['default'].trim(value) === '') return true;
  return false;
};

exports.isBlank = isBlank;
/*
Determines whether the given value is a number, or can be
parsed into a number.

NOTE: Examines string values to see if they are numeric.

@param value: The value to examine.
@returns true if the value is a number.
*/
var isNumeric = function isNumeric(value) {
  if (isBlank(value)) return false;
  var number = parseFloat(value);
  if (number === undefined) return false;
  if (number.toString().length !== value.toString().length) return false;
  return !_lodash2['default'].isNaN(number);
};

exports.isNumeric = isNumeric;
/*
Converts a value to boolean (if it can).
@param value: The value to convert.
@returns the converted boolean, otherwise the original value.
*/
var toBool = function toBool(value) {
  if (!value) return value;
  if (_lodash2['default'].isBoolean(value)) return value;
  var asString = _lodash2['default'].trim(value.toString()).toLowerCase();
  if (asString === 'true') return true;
  if (asString === 'false') return false;
  return value;
};
exports.toBool = toBool;