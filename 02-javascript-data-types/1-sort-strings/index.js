/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  let sortedArray = arr.slice();
  let compareRes = {'asc': -1, 'desc': 1}
  for (let i = 0; i < sortedArray.length; i++) {
    for (let j = 0; j < sortedArray.length; j++) {
      if (sortedArray[i].localeCompare(sortedArray[j], [], {'caseFirst':  'upper'}) === compareRes[param])
      {
        let max = sortedArray[i];
        sortedArray[i] = sortedArray[j];
        sortedArray[j] = max;
      }
    }
  };

  return sortedArray;
}
