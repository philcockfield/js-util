import _ from "lodash";


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
 * @param {string} image1x: The normal image resolution (base64 encoded)
 * @param {string} image2x: The retina image resolution (base64 encoded)
 * @param {integer} width: Optional. The width of the image.
 * @param {integer} height: Optional. The height of the image.
 */
export const image = (image1x, image2x, { width=10, height=10 } = {}) => {
    const image = global.devicePixelRatio > 1 ? image2x : image1x;
    return {
      backgroundImage: `url(${ image })`,
      width,
      height,
      backgroundSize: `${ width }px ${ height }px`,
      backgroundRepeat: "no-repeat"
    }
};



const formatImage = (key, value, target) => {
    const style = image(value[0], value[1], { width: value[2], height: value[3]});
    _.merge(target, style);
    delete target[key];
};



/**
 * Helpers for constructing a CSS object.
 * @param {object} styles: The style object to manipulate.
 * @return the resulting style object.
 */
const css = (styles = {}) => {
  _.keys(styles).forEach(key => {
      const value = styles[key];
      switch (key) {
        case 'Image':
          formatImage(key, value, styles);
          break;
    }
  });

  // Finish up.
  return styles
};


// ----------------------------------------------------------------------------
css.image = image;
export default css;
