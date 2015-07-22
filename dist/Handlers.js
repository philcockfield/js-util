'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/*
Represents a collection of handler functions.
*/

var Handlers = (function () {
  /*
  Constructor.
  @param context: The [this] context within which to invoke the handlers.
  @param handlers: An array of functions to add.
  */

  function Handlers(context) {
    var _this = this;

    _classCallCheck(this, Handlers);

    this.context = context;
    this.items = [];

    for (var _len = arguments.length, handlers = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      handlers[_key - 1] = arguments[_key];
    }

    _lodash2['default'].flatten(handlers).forEach(function (func) {
      return _this.push(func);
    });
  }

  _createClass(Handlers, [{
    key: 'dispose',
    value: function dispose() {
      this.clear();
      this.isDisposed = true;
    }
  }, {
    key: 'count',

    /*
    Gets the number of registered handlers.
    */
    value: function count() {
      return this.items.length;
    }
  }, {
    key: 'contains',

    /*
    Gets whether the collection contains the given handler function.
    */
    value: function contains(func) {
      return !_lodash2['default'].isUndefined(this.handle(func));
    }
  }, {
    key: 'handle',

    /*
    Gets the handle with the corresponding function.
    */
    value: function handle(func) {
      return _lodash2['default'].find(this.items, function (item) {
        return item.func === func;
      });
    }
  }, {
    key: 'add',

    /*
    Adds a function to the collection.
    @param func: The handler function.
    @returns A handle object.  Use "stop()" to clear remove it.
    */
    value: function add(func) {
      if (_lodash2['default'].isFunction(func)) {
        var handle = createHandle(this, func);
        this.items.push(handle);
        return handle;
      }
    }
  }, {
    key: 'push',

    // Alias to 'add'.
    value: function push(func) {
      return this.add(func);
    }
  }, {
    key: 'remove',

    /*
    Adds a function from the collection.
    @param func: The handler function to remove.
    @returns true if the function was removed, or false if it was not found.
    */
    value: function remove(func) {
      var handle = _lodash2['default'].find(this.items, function (item) {
        return item.func === func;
      });
      if (handle) {
        _lodash2['default'].remove(this.items, handle);
      }
      return !_lodash2['default'].isUndefined(handle);
    }
  }, {
    key: 'clear',

    /*
    Removes all functions from the collection.
    */
    value: function clear() {
      this.items = [];
    }
  }, {
    key: 'invoke',

    /*
    Invokes all handlers within the collection.
    @param args: Optional. The arguments to pass.
    @returns false if any handler returned false (ie. cancelled the operation in question).
    */
    value: function invoke() {
      var items = _lodash2['default'].clone(this.items);
      for (var i in items) {
        var item = items[i];

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        var result = item.func.apply(this.context, args);
        if (result === false) {
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'firstResult',

    /*
    Invokes handlers returning the first non-[null/undefined] returned by a handler.
    @param args: Optional. The arguments to pass.
    @returns the first handler result, or undefined.
    */
    value: function firstResult() {
      var items = _lodash2['default'].clone(this.items);
      for (var i in items) {
        var item = items[i];

        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        var result = item.func.apply(this.context, args);
        if (result) {
          return result;
        }
      }
    }
  }, {
    key: 'results',

    /*
    Invokes all handlers returning an array of all results.
    @param args: Optional. The arguments to pass.
    @returns the resulting array of results (including undefined/null values).
    */
    value: function results() {
      var results = [];
      var items = _lodash2['default'].clone(this.items);
      for (var i in items) {
        var item = items[i];

        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        var result = item.func.apply(this.context, args);
        results.push(result);
      }
      return results;
    }
  }, {
    key: 'invokeAsync',

    /*
    Invokes all handlers asynchronously.
    @param args: Optional. The arguments to pass.
    @param callback(result): Invoked upon completion.
                             - result: false if any handler returned false (ie. cancelled the operation in question).
    */
    value: function invokeAsync() {
      var _this2 = this;

      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      var callback = _lodash2['default'].last(args);
      args.pop();
      if (this.items.length === 0) {
        callback(true);
        return;
      }

      var isCancelled = false;
      var count = 0;
      var done = function done(result) {
        count += 1;
        if (!isCancelled) {
          if (result === false) {
            isCancelled = true;
          }
          if (isCancelled) {
            callback(false);
          } else if (count === _this2.items.length) {
            callback(true);
          }
        }
      };

      args.push(done);
      this.items.forEach(function (item) {
        return item.func.apply(_this2.context, args);
      });
    }
  }]);

  return Handlers;
})();

exports['default'] = Handlers;

// --------------------------------------------------------------------------

var createHandle = function createHandle(handlers, func) {
  var handle = {
    handlers: handlers,
    func: func,
    isStopped: false,

    stop: function stop() {
      if (handle.isStopped === true) {
        return;
      }
      handle.isStopped = true;
      _lodash2['default'].remove(handlers.items, handle);
    },

    dispose: function dispose() {
      this.stop();
    }
  };
  return handle;
};
module.exports = exports['default'];