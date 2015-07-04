import _ from 'lodash';


/*
Provides a more convenient way of setting a timeout.

@param msecs:  The milliseconds to delay.
@param func:   The function to invoke.

@returns  The timer handle.
          Use the [stop] method to cancel the timer.
*/
export var delay = (msecs, func) => {
  // Check parameters.
  if (_.isFunction(msecs)) {
    func = msecs;
    msecs = 0; // Immediate "defer" when no milliseconds value specified.
  };
  if (!_.isFunction) return;

  // Return an object with the running timer.
  return {
    msecs: msecs,
    id: setTimeout(func, msecs),
    stop() { clearTimeout(this.id) }
  };
};
