import R from 'ramda';


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
  if (!R.is(Number, value)) { return value; }
  if (value < -1) { value = -1; }
  if (value > 1) { value = 1; }

  if (value === 0) {
    return 'transparent';
  } else if (value < 0) {
    return `rgba(0, 0, 0, ${ Math.abs(value) })`;
  } else if (value > 0) {
    return `rgba(255, 255, 255, ${ value })`;
  }
  return undefined;
};
