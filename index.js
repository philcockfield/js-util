import * as util from './util/util';
import * as color from './util/color';
import * as timer from './util/timer';
import * as func from './util/func';
import * as ns from './util/ns';
import Handlers from './util/Handlers';
import LocalStorage from './util/LocalStorage';


util.color = color;
util.delay = timer.delay;
util.interval = timer.interval;
util.functionParameters = func.functionParameters;
util.ns = ns.namespace;
util.Handlers = Handlers;
util.LocalStorage = LocalStorage;


export default util;
