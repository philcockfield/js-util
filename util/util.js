import _ from 'lodash';


/*
A safe way to test any value as to wheather is is "blank"
meaning it can be either:
  - null
  - undefined
  - empty-string.
  - empty-array
*/
export var isBlank = (value) => {
  if (value === null || value === undefined) return true;
  if (_.isArray(value) && _.compact(value).length === 0) return true;
  if (_.isString(value) && _.trim(value) === '') return true;
  return false
};


/*
Determines whether the given value is a number, or can be
parsed into a number.

NOTE: Examines string values to see if they are numeric.

@param value: The value to examine.
@returns true if the value is a number.
*/
export var isNumeric = (value) => {
  if (isBlank(value)) return false;
  var number = parseFloat(value);
  if (number === undefined) return false;
  if (number.toString().length !== value.toString().length) return false;
  return !_.isNaN(number);
};


/*
Converts a value to boolean (if it can).
@param value: The value to convert.
@returns the converted boolean, otherwise the original value.
*/
export var toBool = (value) => {
  if (!value) return value;
  if (_.isBoolean(value)) return value;
  let asString = _.trim(value.toString()).toLowerCase();
  if (asString === 'true') return true;
  if (asString === 'false') return false;
  return value;
};
