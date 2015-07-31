import _ from "lodash";


// NB: `localStorage` will not be available when
//      running within environments like JSDom.
const store = {
  data: {},

  removeItem(key) {
    if (localStorage) {
      localStorage.removeItem(key);
    } else {
      delete this.data[key];
    }
  },

  setItem(key, value) {
    if (localStorage) {
      localStorage.setItem(key, value);
    } else {
      this.data[key] = value;
    }
  },

  getItem(key) {
    if (localStorage) {
      return localStorage.getItem(key);
    } else {
      return this.data[key];
    }
  }
};


class LocalStorage {
  /*
  Gets or sets the value for the given key.
  @param key:         The unique identifier of the value (this is prefixed with the namespace).
  @param value:       (optional). The value to set (pass null to remove).
  @param options:
            default:  (optional). The default value to return if the session does not contain the value (ie. undefined).
  */
  prop(key, value, options = {}) {

    if (_.isNull(value)) {
      // REMOVE.
      store.removeItem(key);

    } else if(!_.isUndefined(value)) {

      // WRITE.
      var type;
      if (_.isString(value)) {
        type = "string";
      } else if (_.isBoolean(value)) {
        type = "bool";
      } else if (_.isNumber(value)) {
        type = "number";
      } else if (_.isDate(value)) {
        type = "date";
      } else {
        type = "object";
      }

      var writeValue = { value: value, type: type };
      store.setItem(key, JSON.stringify(writeValue));

    } else {

      // READ ONLY.
      var json = store.getItem(key);
      if (json) {
        json = JSON.parse(json);
        switch (json.type) {
          case "null":
          case "bool":
          case "string":
            value = json.value;
            break;

          case "number":
            value = parseFloat(json.value);
            break;

          case "date":
            value = new Date(json.value);
            break;

          case "object":
            value = json.value;
            break;
        }

      } else {
        value = undefined;
      }

      if (_.isUndefined(value)) { value = options.default; }
    }

    // Finish up.
    return value;
  }
}



export default new LocalStorage();
