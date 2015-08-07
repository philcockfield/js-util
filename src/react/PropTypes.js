import _ from "lodash";
import React from "react";
import Validator from "./Validator";
const PropTypes = _.clone(React.PropTypes);



/**
 * Common combinations of types.
 */
PropTypes.numberOrString = PropTypes.oneOfType([
  React.PropTypes.number,
  React.PropTypes.string
]);

PropTypes.boolOrString = PropTypes.oneOfType([
  React.PropTypes.bool,
  React.PropTypes.string
]);


// Convenience methods ----------------------------------------------------------------------------


PropTypes.validate = (propTypes, props, componentName) => {
  return Validator(propTypes).validate(props, componentName)
}


// ----------------------------------------------------------------------------


/**
 * Store the parameter values on the returned
 * validator functions so that external tools
 * (such the UIHarness) can display the values.
 */
PropTypes.oneOf = (enumValues) => {
  const result = React.PropTypes.oneOf(enumValues);
  const decorate = (obj) => {
        obj.oneOf = enumValues;
        obj.toString = () => {
            return `oneOf(${ enumValues.join(", ") })`;
          };
      };
  decorate(result);
  decorate(result.isRequired);
  return result;
};


PropTypes.oneOfType = (types) => {
  const result = React.PropTypes.oneOfType(types);
  const decorate = (obj) => {
        obj.oneOfType = types;
        obj.toString = () => {
            const typeNames = _.map(types, type => type.toString()).join(", ");
            return `oneOfType(${ typeNames })`;
          };
      };
  decorate(result);
  decorate(result.isRequired);
  return result;
};


const shapeToObject = (obj) => {
  let result = {};
  _.keys(obj).forEach(key => {
        let value = obj[key];
        if (_.isFunction(value)) {
          result[key] = `<${ value.type || "unknown" }>`;
        }
        if (_.isPlainObject(value)) {
          result[key] = shapeToObject(value); // <== RECURSION.
        }
      });
  return result;
};


PropTypes.shape = (shape) => {
  const result = React.PropTypes.shape(shape);
  const decorate = (obj) => {
        obj.shape = shape;
        obj.toString = () => {
            let output = shapeToObject(shape);
            output = JSON.stringify(output).replace(/\"/g, "");
            return `shape(${ output })`;
          };
      };
  decorate(result);
  decorate(result.isRequired);
  return result;
};


// ----------------------------------------------------------------------------


// Store type names.
_.keys(PropTypes).forEach(key => {
      const prop = PropTypes[key];
      prop.type = key;
      prop.toString = () => {
          const overrides = ["oneOf", "oneOfType", "shape"];
          return _.has(overrides, key)
              ? prop.toString()
              : key;
        };
    });


// ----------------------------------------------------------------------------
export default PropTypes;
