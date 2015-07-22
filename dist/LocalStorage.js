/* global localStorage */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

// NB: `localStorage` will not be available when
//      running within environments like JSDom.
var store = {
  data: {},

  removeItem: function removeItem(key) {
    if (localStorage) {
      localStorage.removeItem(key);
    } else {
      delete this.data[key];
    }
  },

  setItem: function setItem(key, value) {
    if (localStorage) {
      localStorage.setItem(key, value);
    } else {
      this.data[key] = value;
    }
  },

  getItem: function getItem(key) {
    if (localStorage) {
      return localStorage.getItem(key);
    } else {
      return this.data[key];
    }
  }
};

/*
Gets or sets the value for the given key.
@param key:         The unique identifier of the value (this is prefixed with the namespace).
@param value:       (optional). The value to set (pass null to remove).
@param options:
          default:  (optional). The default value to return if the session does not contain the value (ie. undefined).
*/
var prop = function prop(key, value) {
  var options = arguments[2] === undefined ? {} : arguments[2];

  if (_lodash2['default'].isNull(value)) {
    // REMOVE.
    store.removeItem(key);
  } else if (!_lodash2['default'].isUndefined(value)) {

    // WRITE.
    var type;
    if (_lodash2['default'].isString(value)) {
      type = 'string';
    } else if (_lodash2['default'].isBoolean(value)) {
      type = 'bool';
    } else if (_lodash2['default'].isNumber(value)) {
      type = 'number';
    } else if (_lodash2['default'].isDate(value)) {
      type = 'date';
    } else {
      type = 'object';
    }

    var writeValue = { value: value, type: type };
    store.setItem(key, JSON.stringify(writeValue));
  } else {

    // READ ONLY.
    var json = store.getItem(key);
    if (json) {
      json = JSON.parse(json);
      switch (json.type) {
        case 'null':
        case 'bool':
        case 'string':
          value = json.value;
          break;

        case 'number':
          value = json.value.toNumber();
          break;

        case 'date':
          value = new Date(json.value);
          break;

        case 'object':
          value = json.value;
          break;
      }
    } else {
      value = undefined;
    }

    if (_lodash2['default'].isUndefined(value)) {
      value = options['default'];
    }
  }

  // Finish up.
  return value;
};
exports.prop = prop;