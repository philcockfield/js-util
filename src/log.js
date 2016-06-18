/* eslint no-use-before-define:0 no-console:0 */
import R from 'ramda';
import chalk from 'chalk';

export const COLORS = [
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
  'gray',
];

export const METHODS = [
  'info',
  'warn',
  'error',
];


const log = (level, items) => {
  if (api.silent) { return; }

  // Convert objects to JSON.
  items = items.map(item => {
    if (item instanceof Error) {
      return item.stack;
    }
    if (R.is(Object, item)) {
      return JSON.stringify(item, null, 2);
    }
    return item;
  });

  // Convert to final string.
  let output = items.join(' ');

  // Perform level specific transformations.
  switch (level) {
    // Turn errors to red text.
    case 'error': output = chalk.red(output); break;
    default:
  }

  // Write to the console.
  console.log(output);
};



/**
 * Stub log shim.
 * Pipe these log items into a proper service log.
 */
const api = {
  silent: false,
  info(...items) { log('info', items); },
  warn(...items) { log('warn', items); },
  error(...items) { log('error', items); },
};


// Add color formatting methods.
COLORS.forEach(color => {
  api[color] = chalk[color];
});

// Add color options to each method.
METHODS.forEach(method => {
  COLORS.forEach(color => {
    api[method][color] = (...items) => {
      items = items.map(v => chalk[color](v));
      api[method].apply(null, items);
    };
  });
});



export default api;
