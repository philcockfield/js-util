'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/*
Provides a more convenient way of setting a timeout.

@param msecs:  The milliseconds to delay.
@param func:   The function to invoke.

@returns  The timer handle.
          Use the [stop] method to cancel the timer.
*/
var delay = function delay(msecs, func) {
  // Check parameters.
  if (_lodash2['default'].isFunction(msecs)) {
    func = msecs;
    msecs = 0; // Immediate "defer" when no milliseconds value specified.
  };
  if (!_lodash2['default'].isFunction) return;

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