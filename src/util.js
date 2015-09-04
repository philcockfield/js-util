/* global setTimeout, clearTimeout */
import _ from "lodash";


/**
* A safe way to test any value as to wheather is is "blank"
* meaning it can be either:
*   - null
*   - undefined
*   - empty-string.
*   - empty-array
*/
export const isBlank = (value) => {
  if (value === null || value === undefined) { return true; }
  if (_.isArray(value) && _.compact(value).length === 0) { return true; }
  if (_.isString(value) && _.trim(value) === "") { return true; }
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
  return !_.isNaN(number);
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
  return _.isNaN(number) ? value : number;
};


/**
* Converts a value to boolean (if it can).
* @param value: The value to convert.
* @returns the converted boolean, otherwise the original value.
*/
export const toBool = (value) => {
  if (!value) { return value; }
  if (_.isBoolean(value)) { return value; }
  let asString = _.trim(value.toString()).toLowerCase();
  if (asString === "true") { return true; }
  if (asString === "false") { return false; }
  return value;
};


/**
 * Converts a string it's actual type if it can be derived.
 * @param {string} string: The string to convert.
 * @return the original or converted value.
 */
export const toType = (value) => {
  if (!_.isString(value)) { return value; }
  const lowerCase = _.trim(value.toLowerCase());

  // Boolean.
  if (lowerCase === "true") { return true; }
  if (lowerCase === "false") { return false; }

  // Number.
  const number = toNumber(lowerCase);
  if (_.isNumber(number)) { return number; }

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
  if (_.isFunction(msecs)) {
    func = msecs;
    msecs = 0; // Immediate "defer" when no milliseconds value specified.
  }
  if (_.isFunction(func)) {
    // Return an object with the running timer.
    return {
      msecs: msecs,
      id: setTimeout(func, msecs),
      stop() { clearTimeout(this.id); }
    };
  }
};


/**
* Safely creates the given namespace on the root object.
*
* @param root:      The root object.
* @param namespace: The dot-delimited NS string (excluding the root object).
* @param options:
*           - delimiter: The namespace delimiter. Default "."
*
* @returns the child object of the namespace.
*/
export const ns = (root, namespace, options = {}) => {
  if (_.isString(root) || _.isArray(root)) {
    namespace = root;
    root = null;
  }
  if (isBlank(namespace)) { return undefined; }

  let getOrCreate = (parent, name) => {
          parent[name] = parent[name] || {};
          return parent[name];
        };

  let add = (parent, parts) => {
        let part = getOrCreate(parent, parts[0]);
        if (parts.length > 1) {
          parts.splice(0, 1);
          part = add(part, parts);  // <= RECURSION.
        }
        return part;
      };

  // Build the namespace.
  let delimiter = options.delimiter || ".";
  if (!_.isArray(namespace)) { namespace = namespace.split(delimiter); }
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
  if (!_.isFunction(func)) { return []; }
  let fnStr = func.toString().replace(STRIP_COMMENTS, "");
  let result = fnStr.slice(fnStr.indexOf("(") + 1, fnStr.indexOf(")")).match(ARGUMENT_NAMES);
  if (result === null) { result = []; }
  return result;
};
