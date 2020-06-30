/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {
  const compareRes = {'asc': 1, 'desc': -1};

  return [...arr].sort( (string1, string2) =>
    compareRes[param] * string1.localeCompare(string2, [], {'caseFirst':  'upper'})
  );
}
