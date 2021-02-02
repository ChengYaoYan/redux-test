Array.prototype._map = function(fun) {
  if (typeof fun !== 'function') {
    return null;
  }
  const arr = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    arr[i] = fun(this[i]);
  }
  return arr;
}

let a = [];
for (let i = 0; i < 10000000; i++) {
  a.push(i);
}
console.log(a._map(v => v));