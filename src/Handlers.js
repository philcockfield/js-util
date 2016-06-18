/* eslint no-restricted-syntax:0 */

import R from 'ramda';


const createHandle = (handlers, func) => {
  const handle = {
    handlers,
    func,
    isStopped: false,

    stop() {
      if (handle.isStopped === true) { return; }
      handle.isStopped = true;
      handlers.items = R.remove(R.indexOf(handle, handlers.items), 1, handlers.items);
    },

    dispose() { this.stop(); },
  };
  return handle;
};




/*
Represents a collection of handler functions.
*/
export default class Handlers {
  /*
  Constructor.
  @param context: The [this] context within which to invoke the handlers.
  @param handlers: An array of functions to add.
  */
  constructor(context, ...handlers) {
    this.context = context;
    this.items = [];
    R.flatten(handlers).forEach((func) => this.push(func));
  }

  dispose() {
    this.clear();
    this.isDisposed = true;
  }

  /*
  Gets the number of registered handlers.
  */
  count() { return this.items.length; }


  /*
  Gets whether the collection contains the given handler function.
  */
  contains(func) { return this.handle(func) !== undefined; }


  /*
  Gets the handle with the corresponding function.
  */
  handle(func) { return this.items.find(item => item.func === func); }


  /*
  Adds a function to the collection.
  @param func: The handler function.
  @returns A handle object.  Use 'stop()' to clear remove it.
  */
  add(func) {
    let handle;
    if (R.is(Function, func)) {
      handle = createHandle(this, func);
      this.items.push(handle);
    }
    return handle;
  }

  // Alias to 'add'.
  push(func) { return this.add(func); }


  /*
  Adds a function from the collection.
  @param func: The handler function to remove.
  @returns true if the function was removed, or false if it was not found.
  */
  remove(func) {
    const handle = this.items.find(item => item.func === func);
    if (handle) {
      this.items = R.remove(R.indexOf(handle, this.items), 1, this.items);
    }
    return handle !== undefined;
  }


  /*
  Removes all functions from the collection.
  */
  clear() { this.items = []; }



  /*
  Invokes all handlers within the collection.
  @param args: Optional. The arguments to pass.
  @returns false if any handler returned false (ie. cancelled the operation in question).
  */
  invoke(...args) {
    const items = R.clone(this.items);
    for (const i in items) {
      if ({}.hasOwnProperty.call(items, i)) {
        const item = items[i];
        const result = item.func.apply(this.context, args);
        if (result === false) { return false; }
      }
    }
    return true;
  }


  /*
  Invokes handlers returning the first non-[null/undefined] returned by a handler.
  @param args: Optional. The arguments to pass.
  @returns the first handler result, or undefined.
  */
  firstResult(...args) {
    const items = R.clone(this.items);
    for (const i in items) {
      if ({}.hasOwnProperty.call(items, i)) {
        const item = items[i];
        const result = item.func.apply(this.context, args);
        if (result) {
          return result;
        }
      }
    }
    return undefined;
  }


  /*
  Invokes all handlers returning an array of all results.
  @param args: Optional. The arguments to pass.
  @returns the resulting array of results (including undefined/null values).
  */
  results(...args) {
    const results = [];
    const items = R.clone(this.items);
    for (const i in items) {
      if ({}.hasOwnProperty.call(items, i)) {
        const item = items[i];
        const result = item.func.apply(this.context, args);
        results.push(result);
      }
    }
    return results;
  }


  /*
  Invokes all handlers asynchronously.
  @param args: Optional. The arguments to pass.
  @param callback(result): Invoked upon completion.
                           - result: false if any handler returned false
                             (ie. cancelled the operation in question).
  */
  invokeAsync(...args) {
    const callback = R.last(args);
    args.pop();
    if (this.items.length === 0) {
      callback(true);
      return;
    }

    let isCancelled = false;
    let count = 0;
    const done = (result) => {
      count += 1;
      if (!isCancelled) {
        if (result === false) { isCancelled = true; }
        if (isCancelled) {
          callback(false);
        } else if (count === this.items.length) {
          callback(true);
        }
      }
    };
    args.push(done);
    this.items.forEach((item) => item.func.apply(this.context, args));
  }
}
