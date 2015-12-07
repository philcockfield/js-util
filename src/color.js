import _ from "lodash";
import colorUtil from "color";


/*
  Converts an alpha value into an `argb` color.
  @param value: The alpha value

                -1..0: Alpha percentage of black.
                 0..1: Apha percentage of white.

                If a string is passed, the string value is returned
                assuming it to be an explicit color value (no-op).

  @returns an `argb` style string.
*/
export const fromAlpha = (value) => {
  if (!_.isNumber(value)) { return value; }
  if (value < -1) { value = -1; }
  if (value > 1) { value = 1; }

  if (value === 0) {
    return "transparent";

  } else if (value < 0) {
    return `rgba(0, 0, 0, ${ Math.abs(value) })`;

  } else if (value > 0) {
    return `rgba(255, 255, 255, ${ value })`;
  }
};


const clampPercent = (value) => {
  if (!_.isNumber(value)) { return 0; }
  if (value < 0) { value = 0; }
  if (value > 1) { value = 1; }
  return value;
};


export class NamedColor {
  constructor(name) { this.name = name; }
  toString() { return colorUtil(this.name).hexString(); }
  darken(percent) { return colorUtil(this.name).darken(clampPercent(percent)).hexString(); }
  lighten(percent) { return colorUtil(this.name).lighten(clampPercent(percent)).hexString(); }
}


export const color = (name) => { return new NamedColor(name); };
export const white = color("white");
export const black = color("black");
