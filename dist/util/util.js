/* global setTimeout, clearTimeout */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
* A safe way to test any value as to wheather is is "blank"
* meaning it can be either:
*   - null
*   - undefined
*   - empty-string.
*   - empty-array
*/
var isBlank = function isBlank(value) {
  if (value === null || value === undefined) {
    return true;
  }
  if (_lodash2['default'].isArray(value) && _lodash2['default'].compact(value).length === 0) {
    return true;
  }
  if (_lodash2['default'].isString(value) && _lodash2['default'].trim(value) === '') {
    return true;
  }
  return false;
};

exports.isBlank = isBlank;
/**
* Determines whether the given value is a number, or can be
* parsed into a number.
*
* NOTE: Examines string values to see if they are numeric.
*
* @param value: The value to examine.
* @returns true if the value is a number.
*/
var isNumeric = function isNumeric(value) {
  if (isBlank(value)) {
    return false;
  }
  var number = parseFloat(value);
  if (number === undefined) {
    return false;
  }
  if (number.toString().length !== value.toString().length) {
    return false;
  }
  return !_lodash2['default'].isNaN(number);
};

exports.isNumeric = isNumeric;
/**
* Converts a value to boolean (if it can).
* @param value: The value to convert.
* @returns the converted boolean, otherwise the original value.
*/
var toBool = function toBool(value) {
  if (!value) {
    return value;
  }
  if (_lodash2['default'].isBoolean(value)) {
    return value;
  }
  var asString = _lodash2['default'].trim(value.toString()).toLowerCase();
  if (asString === 'true') {
    return true;
  }
  if (asString === 'false') {
    return false;
  }
  return value;
};

exports.toBool = toBool;
/**
* Provides a more convenient way of setting a timeout.
*
* @param msecs:  The milliseconds to delay.
* @param func:   The function to invoke.
*
* @returns  The timer handle.
*           Use the [stop] method to cancel the timer.
*/
var delay = function delay(msecs, func) {
  // Check parameters.
  if (_lodash2['default'].isFunction(msecs)) {
    func = msecs;
    msecs = 0; // Immediate "defer" when no milliseconds value specified.
  }
  if (!_lodash2['default'].isFunction) {
    return;
  }

  // Return an object with the running timer.
  return {
    msecs: msecs,
    id: setTimeout(func, msecs),
    stop: function stop() {
      clearTimeout(this.id);
    }
  };
};

exports.delay = delay;
/**
* Safely creates the given namespace on the root object.
*
* @param root:      The root object.
* @param namespace: The dot-delimited NS string (excluding the root object).
* @param options:
*           - delimiter: The namespace delimiter. Default "."
*
* @returns the child object of the namespace.
*/
var ns = function ns(root, namespace) {
  var options = arguments[2] === undefined ? {} : arguments[2];

  if (_lodash2['default'].isString(root) || _lodash2['default'].isArray(root)) {
    namespace = root;
    root = null;
  }
  if (isBlank(namespace)) {
    return;
  }
  var delimiter = options.delimiter || '.';

  var getOrCreate = function getOrCreate(parent, name) {
    parent[name] = parent[name] || {};
    return parent[name];
  };

  var add = function add(parent, parts) {
    var part = getOrCreate(parent, parts[0]);
    if (parts.length > 1) {
      parts.splice(0, 1);
      part = add(part, parts); // <= RECURSION.
    }
    return part;
  };

  // Build the namespace.
  if (!_lodash2['default'].isArray(namespace)) {
    namespace = namespace.split(delimiter);
  }
  return add(root, namespace);
};

exports.ns = ns;
/*
  Determines the parameter names of a function

    See: http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript

  @param func: The function to examine.
  @returns an array of strings.

*/
var functionParameters = function functionParameters(func) {
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  var ARGUMENT_NAMES = /([^\s,]+)/g;

  if (!_lodash2['default'].isFunction(func)) {
    return [];
  }
  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) {
    result = [];
  }
  return result;
};
exports.functionParameters = functionParameters;