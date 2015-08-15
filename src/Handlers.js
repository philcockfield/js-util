import _ from "lodash";



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
    _.flatten(handlers).forEach((func) => this.push(func));
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
  contains(func) { return !_.isUndefined(this.handle(func)); }


  /*
  Gets the handle with the corresponding function.
  */
  handle(func) { return _.find(this.items, (item) => item.func === func); }


  /*
  Adds a function to the collection.
  @param func: The handler function.
  @returns A handle object.  Use "stop()" to clear remove it.
  */
  add(func) {
    if (_.isFunction(func)) {
      var handle = createHandle(this, func);
      this.items.push(handle);
      return handle;
    }
  }

  // Alias to "add".
  push(func) { return this.add(func); }


  /*
  Adds a function from the collection.
  @param func: The handler function to remove.
  @returns true if the function was removed, or false if it was not found.
  */
  remove(func) {
    var handle = _.find(this.items, (item) => item.func === func);
    if (handle) { _.remove(this.items, handle); }
    return !_.isUndefined(handle);
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
    let items = _.clone(this.items);
    for (let i in items) {
      let item = items[i];
      let result = item.func.apply(this.context, args);
      if (result === false) { return false; }
    }
    return true;
  }


  /*
  Invokes handlers returning the first non-[null/undefined] returned by a handler.
  @param args: Optional. The arguments to pass.
  @returns the first handler result, or undefined.
  */
  firstResult(...args) {
    var items = _.clone(this.items);
    for (let i in items) {
      let item = items[i];
      let result = item.func.apply(this.context, args);
      if (result) {
        return result;
      }
    }
  }


  /*
  Invokes all handlers returning an array of all results.
  @param args: Optional. The arguments to pass.
  @returns the resulting array of results (including undefined/null values).
  */
  results(...args) {
    var results = [];
    var items = _.clone(this.items);
    for (let i in items) {
      let item = items[i];
      let result = item.func.apply(this.context, args);
      results.push(result);
    }
    return results;
  }


  /*
  Invokes all handlers asynchronously.
  @param args: Optional. The arguments to pass.
  @param callback(result): Invoked upon completion.
                           - result: false if any handler returned false (ie. cancelled the operation in question).
  */
  invokeAsync(...args) {
    var callback = _.last(args);
    args.pop();
    if (this.items.length === 0) {
      callback(true);
      return;
    }

    var isCancelled = false;
    var count = 0;
    var done = (result) => {
        count += 1;
        if (!isCancelled) {
          if(result === false) { isCancelled = true; }
          if (isCancelled) {
            callback(false);
          } else if(count === this.items.length) {
            callback(true);
          }
        }
      };

    args.push(done);
    this.items.forEach((item) => item.func.apply(this.context, args));

  }
}

// --------------------------------------------------------------------------


var createHandle = (handlers, func) => {
  let handle = {
    handlers: handlers,
    func: func,
    isStopped: false,

    stop() {
      if (handle.isStopped === true) { return; }
      handle.isStopped = true;
      _.remove(handlers.items, handle);
    },

    dispose() { this.stop(); }
  };
  return handle;
};
