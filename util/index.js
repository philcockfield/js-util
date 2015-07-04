import * as util from './util';
import * as color from './color';
import * as timer from './timer';
import * as func from './func';
import * as ns from './ns';
import Handlers from './Handlers';
import LocalStorage from './LocalStorage';


util.color = color;
util.delay = timer.delay;
util.interval = timer.interval;
util.functionParameters = func.functionParameters;
util.ns = ns.namespace;
util.Handlers = Handlers;
util.LocalStorage = LocalStorage;


export default util;
