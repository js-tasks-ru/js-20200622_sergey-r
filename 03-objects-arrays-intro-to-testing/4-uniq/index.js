/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  const res = [];

  if(arr) {
    arr.forEach((val) => {
      if (!res.includes(val)) {
        res.push(val);
      }
    });
  }

  return res;
}
