/* global XMLHttpRequest */
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

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

/**
* Describes an error that occured during an XMLHttpRequest operation.
*/

var XhrError = (function (_Error) {
  function XhrError(xhr, message) {
    _classCallCheck(this, XhrError);

    _get(Object.getPrototypeOf(XhrError.prototype), 'constructor', this).call(this);
    if (_lodash2['default'].isEmpty(message)) {
      message = 'Failed while making Http request to server.';
    }
    this.message = message;
    this.status = xhr.status;
    this.statusText = xhr.statusText;
  }

  _inherits(XhrError, _Error);

  return XhrError;
})(Error);

exports.XhrError = XhrError;

var XhrParseError = (function (_Error2) {
  function XhrParseError(xhr, err) {
    _classCallCheck(this, XhrParseError);

    _get(Object.getPrototypeOf(XhrParseError.prototype), 'constructor', this).call(this);
    this.message = 'Failed to parse: \'' + xhr.responseText + '\'';
    this.responseText = xhr.responseText;
    this.parseError = err;
  }

  _inherits(XhrParseError, _Error2);

  return XhrParseError;
})(Error);

exports.XhrParseError = XhrParseError;

var isJson = function isJson(text) {
  if (_lodash2['default'].isEmpty(text)) {
    return false;
  }
  if (text.startsWith('{') && text.endsWith('}')) {
    return true;
  }
  if (text.startsWith('[') && text.endsWith(']')) {
    return true;
  }
  return false;
};

var handleComplete = function handleComplete(xhr, resolve, reject) {
  if (xhr.status !== 200) {
    // Failed.
    reject(new XhrError(xhr, xhr.responseText));
  } else {

    // Success.
    var response = xhr.responseText;
    if (isJson(response)) {
      try {
        response = JSON.parse(response);
      } catch (err) {
        reject(new XhrParseError(xhr, err));
        return;
      }
    }
    resolve(response);
  }
};

var send = function send(verb, url, data) {
  return new _bluebird2['default'](function (resolve, reject) {
    var xhr = api.createXhr();
    xhr.open(verb, url);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        handleComplete(xhr, resolve, reject);
      }
    };
    if (_lodash2['default'].isObject(data)) {
      data = JSON.stringify(data);
    }
    xhr.send(data);
  });
};

var api = {
  XhrError: XhrError,
  XhrParseError: XhrParseError,

  /**
  * Factory for the XHR object.
  * Swap this method out to a fake object for testing.
  */
  createXhr: function createXhr() {
    // NB: Only available when in the browser.
    return new XMLHttpRequest();
  },

  /**
  * Perform a GET operation against the given URL.
  * @param url: URL of the resource.
  * @return promise.
  */
  get: function get(url, data) {
    return send('GET', url, data);
  },

  /**
  * Performs a POST operation against the given URL.
  *
  *   In REST/Resource-Oriented systems the POST verb
  *   means "create a new resource".
  *
  * @param url:   URL of the resource.
  * @param data:  The data to send (a primitive value or an object,
  *               will be transformed and sent as JSON).
  * @return promise.
  */
  post: function post(url, data) {
    return send('POST', url, data);
  },

  /**
  * Performs a PUT operation against the given URL.
  *
  *   In REST/Resource-Oriented systems the PUT verb
  *   means "update a resource".
  *
  * @param url:   URL of the resource.
  * @param data:  The data to send (a primitive value or an object,
  *               will be transformed and sent as JSON).
  * @return promise.
  */
  put: function put(url, data) {
    return send('PUT', url, data);
  },

  /**
  * Performs a DELETE operation against the given URL.
  *
  *   In REST/Resource-Oriented systems the DELETE verb
  *   means "remove the resource".
  *
  * @param url:   URL of the resource.
  * @return promise.
  */
  'delete': function _delete(url) {
    return send('DELETE', url);
  }

};

exports['default'] = api;