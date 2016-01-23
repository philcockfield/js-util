/* eslint max-len:0 */
import R from 'ramda';
export const LOREM = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
const LOREM_WORDS = LOREM.split(' ');


/**
 * Generates a 'lorem ipsum' strings.
 * @param totalWords: Optional. The total number of words to include.
 */

export default (totalWords) => {
  let result = LOREM_WORDS;
  if (R.is(Number, totalWords)) {
    // A specific number of words required.
    if (totalWords < 1) { totalWords = 1; }
    result = [];
    let index = 0;
    for (let i = 1; i <= totalWords; i++) {
      if (index > LOREM_WORDS.length - 1) { index = 0; }
      result.push(LOREM_WORDS[index]);
      index += 1;
    }
  }

  // Format result.
  const length = result.length;
  result = result
            .join(' ')
            .trim()
            .replace(/,$/, '')
            .replace(/\.$/, '');
  if (length > 5) { result += '.'; }
  return result;
};
