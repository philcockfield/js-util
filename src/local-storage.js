import R from 'ramda';


const store = {
  data: {}, // Used to fake when store not available (ie. on server or JSDOM).

  removeItem(key) {
    if (global.localStorage) {
      global.localStorage.removeItem(key);
    } else {
      delete this.data[key];
    }
  },

  setItem(key, value) {
    if (global.localStorage) {
      global.localStorage.setItem(key, value);
    } else {
      this.data[key] = value;
    }
  },

  getItem(key) {
    if (global.localStorage) {
      return global.localStorage.getItem(key);
    }
    return this.data[key];
  },
};


class LocalStorage {
  /**
   * Retrieves the set of keys within local-storage.
   */
  keys() {
    const storage = global.localStorage ? global.localStorage : store.data;
    return Object.keys(storage);
  }


  /*
  * Gets or sets the value for the given key.
  *
  * @param key:         The unique identifier of the value (this is prefixed with the namespace).
  * @param value:       (optional). The value to set (pass null to remove).
  * @param options:
  *           default:  (optional). The default value to return if the session
  *                     does not contain the value (ie. undefined).
  *
  * @return the read value.
  */
  prop(key, value, options = {}) {
    let type;
    if (value === null) {
      // REMOVE.
      store.removeItem(key);
    } else if (value !== undefined) {
      // WRITE.
      if (R.is(String, value)) {
        type = 'string';
      } else if (R.is(Boolean, value)) {
        type = 'bool';
      } else if (R.is(Number, value)) {
        type = 'number';
      } else if (R.is(Date, value)) {
        type = 'date';
      } else {
        type = 'object';
      }

      const writeValue = { value, type };
      store.setItem(key, JSON.stringify(writeValue));
    } else {
      // READ ONLY.
      let json = store.getItem(key);
      if (json) {
        json = JSON.parse(json);
        switch (json.type) {
          case 'null':
          case 'bool':
          case 'string':
            value = json.value;
            break;

          case 'number':
            value = parseFloat(json.value);
            break;

          case 'date':
            value = new Date(json.value);
            break;

          case 'object':
            value = json.value;
            break;

          default: // Ignore.
        }
      } else {
        value = undefined;
      }
      if (value === undefined) { value = options.default; }
    }

    // Finish up.
    return value;
  }
}



export default new LocalStorage();
