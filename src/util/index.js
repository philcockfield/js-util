import * as util from './util';
import * as color from './color';
import httpBrowser from './http-browser';
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
  http: httpBrowser,

  Handlers: Handlers,
  LocalStorage: LocalStorage
};
