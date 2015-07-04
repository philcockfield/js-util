import _ from 'lodash';
import { isBlank } from './util';


/*
Safely creates the given namespace on the root object.

@param root:      The root object.
@param namespace: The dot-delimited NS string (excluding the root object).

@returns the child object of the namespace.
*/
export var namespace = (root, namespace) => {
  if (_.isString(root) || _.isArray(root)) {
    namespace = root;
    root = null;
  }
  if (isBlank(namespace)) return;

  var getOrCreate = (parent, name) => {
          parent[name] = parent[name] || {};
          return parent[name];
        };

  var add = (parent, parts) => {
        let part = getOrCreate(parent, parts[0]);
        if (parts.length > 1) {
          parts.splice(0, 1);
          part = add(part, parts);  // <= RECURSION.
        }
        return part;
      };

  // Build the namespace.
  if (!_.isArray(namespace)) namespace = namespace.split('.');
  return add(root, namespace);
};
