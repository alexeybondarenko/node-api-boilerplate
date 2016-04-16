

export function filterNull (obj) {
  var res = {};
  Object.keys(obj).forEach(function (key) {
    if (obj[key]) res[key] = obj[key];
  });
  return res;
}
