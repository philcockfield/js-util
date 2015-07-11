import * as util from './util';
import * as color from './color';
import xhr from './xhr';
import Handlers from './Handlers';
import LocalStorage from './LocalStorage';


export default {
  isBlank: util.isBlank,
  isNumeric: util.isNumeric,
  toBool: util.toBool,
  delay: util.delay,
  ns: util.ns,
  functionParameters: util.functionParameters,

  color: color,
  xhr: xhr,

  Handlers: Handlers,
  LocalStorage: LocalStorage
};
