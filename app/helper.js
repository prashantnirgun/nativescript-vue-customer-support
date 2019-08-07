exports.getByKeys = function(arr, value) {
  return arr[value];
};

exports.getByValues = function(arr, value) {
  let index = Object.values(arr).indexOf(value);
  return Object.keys(arr)[index];
};
