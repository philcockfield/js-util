import R from 'ramda';
import { isBlank, toNumber, isPlainObject } from './index';


/**
 * Takes an image path and breaks it into it's components pieces
 * providing 1x/2x versions of the image.
 *
 * @param {string} path: the raw file path to evaluate.
 * @return {object}
 */
export const expandImagePath = (path) => {
  if (isBlank(path)) { throw new Error('Image path not specified.'); }

  // Extract paths and file-name.
  const index = R.lastIndexOf('/', path);
  const basePath = path.substr(0, index + 1);
  let fileName = path.substr(index + 1, path.length);
  const parts = fileName.split('.');
  if (parts.length < 2) {
    throw new Error(`An image must have a file extension. [path: ${ path }]`);
  }
  fileName = parts[0];
  const extension = parts[1];

  // Finish up.
  return {
    basePath,
    fileName,
    extension,
    '1x': `${ basePath }${ fileName }.${ extension }`,
    '2x': `${ basePath }${ fileName }@2x.${ extension }`,
  };
};



/**
 * Constructs a style object for an image.
 *
 *    For turning image files (PNG/JPG/SVG) into data-uri's see:
 *    https://github.com/webpack/url-loader
 *
 * @param {string} image1x: The normal image resolution (base64 encoded)
 * @param {string} image2x: The retina image resolution (base64 encoded)
 * @param {integer} width: Optional. The width of the image.
 * @param {integer} height: Optional. The height of the image.
 */
export const image = (image1x, image2x, { width = 10, height = 10 } = {}) => {
  // Prepare image based on current screen density.
  let img = global.devicePixelRatio > 1 ? image2x : image1x;
  if (!img) { img = image1x; }
  if (!img) { throw new Error('Must have at least a 1x image.'); }

  // Finish up.
  return {
    backgroundImage: `url(${ img })`,
    width,
    height,
    backgroundSize: `${ width }px ${ height }px`,
    backgroundRepeat: 'no-repeat',
  };
};



const mergeAndReplace = (key, value, target) => {
  Object.assign(target, value);
  delete target[key];
  return target;
};



const formatImage = (key, value, target) => {
  // Wrangle parameters.
  let [image1x, image2x, width, height] = value; // eslint-disable-line

  if (R.is(Number, image2x)) {
    height = width;
    width = image2x;
    image2x = undefined;
  }
  const style = image(image1x, image2x, { width, height });
  mergeAndReplace(key, style, target);
};




// ----------------------------------------------------------------------------



export const toPositionEdges = (key, value) => {
  if (value === undefined || value === null) { return undefined; }
  if (R.is(String, value) && isBlank(value)) { return undefined; }
  if (R.is(Array, value) && value.length === 0) { return undefined; }
  if (!R.is(Array, value)) {
    value = value.toString().split(' ');
  }
  const edges = value.map(item => toNumber(item));
  let top;
  let right;
  let bottom;
  let left;

  const getEdge = (index) => {
    const edge = edges[index];
    if (edge === null || edge === 'null' || edge === '') { return undefined; }
    return edge;
  };

  switch (edges.length) {
    case 1:
      top = getEdge(0);
      bottom = getEdge(0);
      left = getEdge(0);
      right = getEdge(0);
      break;

    case 2:
      top = getEdge(0);
      bottom = getEdge(0);
      left = getEdge(1);
      right = getEdge(1);
      break;

    case 3:
      top = getEdge(0);
      left = getEdge(1);
      right = getEdge(1);
      bottom = getEdge(2);
      break;

    default:
      top = getEdge(0);
      right = getEdge(1);
      bottom = getEdge(2);
      left = getEdge(3);
  }

  if (top === undefined && right === undefined && bottom === undefined && left === undefined) {
    return undefined;
  }
  return {
    position: key.toLowerCase(),
    top, right, bottom, left,
  };
};


const formatPositionEdges = (key, target) => {
  const styles = toPositionEdges(key, target[key]);
  mergeAndReplace(key, styles, target);
};


/**
 * AbsoluteCenter
 *      - x
 *      - y
 *      - xy
 */
const formatAbsoluteCenter = (key, value, target) => {
  if (value === true) { value = 'xy'; }
  if (value === false || value === undefined || value === null) { return; }
  const styles = { position: 'absolute' };
  value = value.trim().toLowerCase();
  if (value.includes('x')) { styles.left = '50%'; }
  if (value.includes('y')) { styles.top = '50%'; }
  let transform;
  switch (value) {
    case 'yx':
    case 'xy': transform = 'translate(-50%, -50%)'; break;
    case 'x': transform = 'translateX(-50%)'; break;
    case 'y': transform = 'translateY(-50%)'; break;
    default: throw new Error(`AbsoluteCenter value '${ value }' not supported.`);
  }
  styles.transform = `${ target.transform || '' } ${ transform }`.trim();
  mergeAndReplace(key, styles, target);
};


// ----------------------------------------------------------------------------


/**
 * Helpers for constructing a CSS object.
 * @param {object} styles: The style object to manipulate.
 * @return the resulting style object.
 */
const css = (styles = {}) => {
  Object.keys(styles).forEach(key => {
    const value = styles[key];
    if (R.isNil(value)) {
      delete styles[key];
    } else if (isPlainObject(value)) {
      styles[key] = css(value); // <== RECURSION.
    } else {
      switch (key) {
        case 'Image': formatImage(key, value, styles); break;
        case 'Absolute': formatPositionEdges(key, styles); break;
        case 'Fixed': formatPositionEdges(key, styles); break;
        case 'AbsoluteCenter': formatAbsoluteCenter(key, value, styles); break;
        default:
          // Ignore.
      }
    }
  });

  // Finish up.
  return styles;
};


// ----------------------------------------------------------------------------
css.image = image;
export default css;
