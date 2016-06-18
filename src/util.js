/* global setTimeout, clearTimeout */
import R from 'ramda';




/**
 * Returns a copy of the array with falsey values removed.
 * Removes:
 *   - null
 *   - undefined
 *   - empty-string ('')
 *
 * @param {Array} value: The value to examine.
 * @return {Array}.
 */
export const compact = (value) => R.pipe(
                                    R.reject(R.isNil),
                                    R.reject(R.isEmpty)
                                  )(value);



/**
 * Determines whether the value is a simple object (ie. not a class instance).
 * @param value: The value to examine.
 * @return {Boolean}.
 */
export const isPlainObject = (value) => {
  if (R.is(Object, value) === false) return false;

  // Not plain if it has a modified constructor.
  const ctr = value.constructor;
  if (typeof ctr !== 'function') { return false; }

  // If has modified prototype.
  const prot = ctr.prototype;
  if (R.is(Object, prot) === false) { return false; }

  // If the constructor does not have an object-specific method.
  if (prot.hasOwnProperty('isPrototypeOf') === false) { return false; }

  // Finish up.
  return true;
};



/**
* A safe way to test any value as to wheather is is 'blank'
* meaning it can be either:
*   - null
*   - undefined
*   - empty-string ('')
*   - empty-array ([]).
*/
export const isBlank = (value) => {
  if (value === null || value === undefined) { return true; }
  if (R.is(Array, value) && compact(value).length === 0) { return true; }
  if (R.is(String, value) && value.trim() === '') { return true; }
  return false;
};


/**
* Determines whether the given value is a number, or can be
* parsed into a number.
*
* NOTE: Examines string values to see if they are numeric.
*
* @param value: The value to examine.
* @returns true if the value is a number.
*/
export const isNumeric = (value) => {
  if (isBlank(value)) { return false; }
  const number = parseFloat(value);
  if (number === undefined) { return false; }
  if (number.toString().length !== value.toString().length) { return false; }
  return !Number.isNaN(number);
};


/**
 * Converts a value to a number if possible.
 * @param value: The value to convert.
* @returns the converted number, otherwise the original value.
 */
export const toNumber = (value) => {
  if (isBlank(value)) { return value; }
  const number = parseFloat(value);
  if (number === undefined) { return value; }
  if (number.toString().length !== value.toString().length) { return value; }
  return Number.isNaN(number) ? value : number;
};


/**
* Converts a value to boolean (if it can).
* @param value: The value to convert.
* @param defaultValue: The value to return if the given value is null/undefined.
* @returns the converted boolean, otherwise the original value.
*/
export const toBool = (value, defaultValue) => {
  if (R.isNil(value)) { return defaultValue; }
  if (R.is(Boolean, value)) { return value; }
  const asString = value.toString().trim().toLowerCase();
  if (asString === 'true') { return true; }
  if (asString === 'false') { return false; }
  return defaultValue;
};


/**
 * Converts a string it's actual type if it can be derived.
 * @param {string} string: The string to convert.
 * @return the original or converted value.
 */
export const toType = (value) => {
  if (!R.is(String, value)) { return value; }
  const lowerCase = value.toLowerCase().trim();

  // Boolean.
  if (lowerCase === 'true') { return true; }
  if (lowerCase === 'false') { return false; }

  // Number.
  const number = toNumber(lowerCase);
  if (R.is(Number, number)) { return number; }

  // Originanl type.
  return value;
};




/**
* Provides a more convenient way of setting a timeout.
*
* @param msecs:  The milliseconds to delay.
* @param func:   The function to invoke.
*
* @returns  The timer handle.
*           Use the [stop] method to cancel the timer.
*/
export const delay = (msecs, func) => {
  // Check parameters.
  if (R.is(Function, msecs)) {
    func = msecs;
    msecs = 0; // Immediate 'defer' when no milliseconds value specified.
  }
  if (R.is(Function, func)) {
    // Return an object with the running timer.
    return {
      msecs,
      id: setTimeout(func, msecs),
      stop() { clearTimeout(this.id); },
    };
  }
  return undefined;
};


/**
* Safely creates the given namespace on the root object.
*
* @param root:      The root object.
* @param namespace: The dot-delimited NS string (excluding the root object).
* @param options:
*           - delimiter: The namespace delimiter. Default '.'
*
* @returns the child object of the namespace.
*/
export const ns = (root, namespace, options = {}) => {
  if (R.is(String, root) || R.is(Array, root)) {
    namespace = root;
    root = null;
  }
  if (isBlank(namespace)) { return undefined; }

  const getOrCreate = (parent, name) => {
    parent[name] = parent[name] || {};
    return parent[name];
  };

  const add = (parent, parts) => {
    let part = getOrCreate(parent, parts[0]);
    if (parts.length > 1) {
      parts.splice(0, 1);
      part = add(part, parts);  // <= RECURSION.
    }
    return part;
  };

  // Build the namespace.
  const delimiter = options.delimiter || '.';
  if (!R.is(Array, namespace)) { namespace = namespace.split(delimiter); }
  return add(root, namespace);
};



/*
  Determines the parameter names of a function

    See: http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript

  @param func: The function to examine.
  @returns an array of strings.

*/
export const functionParameters = (func) => {
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
  const ARGUMENT_NAMES = /([^\s,]+)/g;
  if (!R.is(Function, func)) { return []; }
  const fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) { result = []; }
  return result;
};
