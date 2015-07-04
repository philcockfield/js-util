import _ from 'lodash';


// NB: `localStorage` will not be available when
//      running within environments like JSDom.
var store = {
  _store: {},

  removeItem(key) {
    if (localStorage) {
      localStorage.removeItem(key);
    } else {
      delete this._store[key];
    }
  },

  setItem(key, value) {
    if (localStorage) {
      localStorage.setItem(key, value);
    } else {
      this._store[key] = value;
    }
  },

  getItem(key) {
    if (localStorage) {
      localStorage.getItem(key)
    } else {
      this._store[key]
    }
  }
};


/*
Gets or sets the value for the given key.
@param key:         The unique identifier of the value (this is prefixed with the namespace).
@param value:       (optional). The value to set (pass null to remove).
@param options:
          default:  (optional). The default value to return if the session does not contain the value (ie. undefined).
*/
export var prop = (key, value, options = {}) => {

  if (_.isNull(value)) {
    // REMOVE.
    store.removeItem(key);

  } else if(!_.isUndefined(value)) {

    // WRITE.
    if (_.isString(value)) {
      type = 'string';
    } else if (_.isBoolean(value)) {
      type = 'bool';
    } else if (_.isNumber(value)) {
      type = 'number';
    } else if (_.isDate(value)) {
      type = 'date';
    } else {
      type = 'object';
    }

    writeValue = { value:value, type:type }
    store.setItem(key, JSON.stringify(writeValue))

  } else {

    // READ ONLY.
    var json = store.getItem(key);
    if (json) {
      json = JSON.parse(json);
      switch (json.type) {
        case 'null':
        case 'bool':
        case 'string':
          value = json.value;
          break;

        case 'number':
          value = json.value.toNumber();
          break;

        case 'date':
          value = new Date(json.value);
          break;

        case 'object':
          value = json.value;
          break
      }

    } else {
      value = undefined;
    }

    if (_.isUndefined(value)) value = options.default;
  }

  // Finish up.
  return value
};