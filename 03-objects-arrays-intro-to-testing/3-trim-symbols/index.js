/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  let result = size === undefined ? string : '';

  if (size > 0) {
    let currentSymbol;
    let symbolCounter = 1;

    for (let i = 0; i < string.length; i++) {
      symbolCounter++;
      if (currentSymbol !== string[i]) {
        currentSymbol = string[i];
        symbolCounter = 1;
      }
      if (symbolCounter > size) {
        continue;
      }
      result += string[i];
    }
  }

  return result;
}
