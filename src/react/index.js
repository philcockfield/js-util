import PropTypes from "./PropTypes";
import css from "./css";
import Validator from "./Validator";


export default {
  PropTypes,
  css,

  validate(propTypes, props, componentName) {
    return Validator(propTypes).validate(props, componentName)
  }
};
