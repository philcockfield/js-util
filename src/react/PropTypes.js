import _ from "lodash";
import React from "react";

/**
 * Store the parameter values on the returned
 * validator functions so that external tools
 * (such the UIHarness) can display the values.
 */
const PropTypes = _.clone(React.PropTypes);


PropTypes.oneOf = (enumValues) => {
  const result = React.PropTypes.oneOf(enumValues);
  result.oneOf = enumValues;
  result.isRequired.oneOf = enumValues;
  return result;
};


PropTypes.shape = (shape) => {
  const result = React.PropTypes.shape(shape);
  result.shape = shape;
  result.isRequired.shape = shape;
  return result;
};


export default PropTypes;