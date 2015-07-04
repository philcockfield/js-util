'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _util = require('./util');

/*
Safely creates the given namespace on the root object.

@param root:      The root object.
@param namespace: The dot-delimited NS string (excluding the root object).

@returns the child object of the namespace.
*/
var namespace = function namespace(root, _namespace) {
  if (_lodash2['default'].isString(root) || _lodash2['default'].isArray(root)) {
    _namespace = root;
    root = null;
  }
  if ((0, _util.isBlank)(_namespace)) return;

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
  if (!_lodash2['default'].isArray(_namespace)) _namespace = _namespace.split('.');
  return add(root, _namespace);
};
exports.namespace = namespace;