/* global XMLHttpRequest */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _errors = require('./errors');

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
    reject(new _errors.HttpError(xhr.status, xhr.responseText, xhr.statusText));
  } else {

    // Success.
    var response = xhr.responseText;
    if (isJson(response)) {
      try {
        response = JSON.parse(response);
      } catch (err) {
        reject(new _errors.HttpParseError(xhr.responseText, err));
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
  HttpError: _errors.HttpError,
  HttpParseError: _errors.HttpParseError,

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
module.exports = exports['default'];