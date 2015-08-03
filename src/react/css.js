import _ from "lodash";
import { isBlank, toNumber } from "../util";


/**
 * Takes an image path and breaks it into it's components pieces
 * providing 1x/2x versions of the image.
 *
 * @param {string} path: the raw file path to evaluate.
 * @return {object}
 */
export const expandImagePath = (path) => {
    if (_.isEmpty(path)) { throw new Error(`Image path not specified.`); }

    // Extract paths and file-name.
    let index = _.lastIndexOf(path, '/');
    const basePath = path.substr(0, index + 1);
    let fileName = path.substr(index + 1, path.length);
    let parts = fileName.split(".");
    if (parts.length < 2) { throw new Error(`An image must have a file extension. [path: ${ path }]`); }
    fileName = parts[0];
    const extension = parts[1];

    // Finish up.
    return {
      basePath,
      fileName,
      extension,
      '1x': `${ basePath }${ fileName }.${ extension }`,
      '2x': `${ basePath }${ fileName }@2x.${ extension }`
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
export const image = (image1x, image2x, { width=10, height=10 } = {}) => {
    // Prepare image based on current screen density.
    let image = global.devicePixelRatio > 1 ? image2x : image1x;
    if (!image) { image = image1x; }
    if (!image) { throw new Error("Must have at least a 1x image."); }

    // Finish up.
    return {
      backgroundImage: `url(${ image })`,
      width,
      height,
      backgroundSize: `${ width }px ${ height }px`,
      backgroundRepeat: "no-repeat"
    }
  };
const formatImage = (key, value, target) => {
    // Wrangle parameters.
    let [ image1x, image2x, width, height ] = value;
    if (_.isNumber(image2x)) {
      height = width;
      width = image2x;
      image2x = undefined;
    }
    const style = image(image1x, image2x, { width: width, height: height});
    mergeAndReplace(key, style, target);
  };


const mergeAndReplace = (key, value, target) => {
    _.merge(target, value);
    delete target[key];
    return target;
  };


// ----------------------------------------------------------------------------


export const toPositionEdges = (key, value) => {
    if (isBlank(value)) { return undefined; }
    if (!_.isArray(value)) {
      value = value.toString().split(" ");
    }
    const edges = value.map(item => toNumber(item));
    let top, right, bottom, left;

    const getEdge = (index) => {
        let edge = edges[index];
        if (_.isNull(edge) || edge === "null" || edge === "") { return undefined; }
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

    return {
      position: key.toLowerCase(),
      top, right, bottom, left
    };
  };
const formatPositionEdges = (key, target) => {
    const styles = toPositionEdges(key, target[key]);
    mergeAndReplace(key, styles, target);
  };



// ----------------------------------------------------------------------------


/**
 * Helpers for constructing a CSS object.
 * @param {object} styles: The style object to manipulate.
 * @return the resulting style object.
 */
const css = (styles = {}) => {
    _.keys(styles).forEach(key => {
        const value = styles[key];
        if (_.isUndefined(value) || _.isNull(value)) {
          delete styles[key];

        } else if (_.isPlainObject(value)) {
          styles[key] = css(value); // <== RECURSION.

        } else {
          switch (key) {
            case 'Image': formatImage(key, value, styles); break;
            case 'Absolute': formatPositionEdges(key, styles); break;
            case 'Fixed': formatPositionEdges(key, styles); break;
        }
      }
    });

    // Finish up.
    return styles
  };


// ----------------------------------------------------------------------------
css.image = image;
export default css;
