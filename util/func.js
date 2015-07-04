import _ from 'lodash';
const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
const ARGUMENT_NAMES = /([^\s,]+)/g;


/*
  Determines the parameter names of a function

    See: http://stackoverflow.com/questions/1007981/how-to-get-function-parameter-names-values-dynamically-from-javascript

  @param func: The function to examine.
  @returns an array of strings.

*/
export var functionParameters = (func) => {
  if (!_.isFunction(func)) return [];
  let fnStr = func.toString().replace(STRIP_COMMENTS, '');
  let result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
  if (result === null) result = [];
  return result;
};
