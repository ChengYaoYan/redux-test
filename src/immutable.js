// const fillArr = [
//   // key
//   ['habit', 'tall', 'language'],
//   // value
//   ['reading', '180', 'english'],
//   ['reading', '190', 'english'],
//   ['fishing', '170', 'japanese'],
//   ['reading', '160', 'english'],
// ]
// TRANDITIONAL WAY
// const fArr = new Array(fillArr.length - 1);
// const rowSize = fillArr[0].length;
// const keys = new Array(rowSize);
// for (let i = 0; i < rowSize; i++) {
//   keys[i] = fillArr[0][i];
// }
// for (let i = 1; i < fillArr.length; i++) {
//   const obj = {};
//   for (let j = 0; j < rowSize; j++) {
//     obj[keys[j]] = fillArr[i][j];
//   }
//   fArr[i - 1] = obj;
// }
// console.log(fArr);

// FUNCTIONAL WAY
// const l = Immutable.List(fillArr);
// const _k = Immutable.List(fillArr[0]);
// const tFinal = l.map((val, index) => {
//   if (!index) {
//     return;
//   }
//   return Immutable.Map(_k.zip(val));
// })
// const final = tFinal.shift();


// mutable interface
// Array.prototype._map = function(fun) {
//  if (typeof fun !== 'function') {
//     return null;
//   }
//   const arr = new Array(this.length);
//   for (let i = 0; i < this.length; i++) {
//     arr[i] = fun(this[i]);
//   }
//   return arr;
// }
// 
// let a = [];
// for (let i = 0; i < 10000000; i++) {
//   a.push(i);
// }
// console.log(a._map(v => v));

// immutable interface
// Array.prototype._reduce = function(fun, initial=null) {
//   if (typeof fun !== 'function') {
//     return null;
//   }
//   let val = initial ? initial : this[0];
//   const startIndex = initial ? 0 : 1;
//   for (let i = startIndex; i < this.length; i++) {
//     val = fun(val, this[i], i, this);
//   }
//   return val;
// }
// 
// let a = [1, 2, 3, 4, 5];
// let sum = a._reduce((acc, cur) => {
//   return acc += cur
// })
// console.log(sum);

// -------------------------
const _state = {},
  checkPrimitives = function(item) {
    return item === null || typeof item === 'boolean' || typeof item === 'string'
            || typeof item === 'number' || typeof item === 'undefined';
  },
  cloneFunction = function(fun, scope=null) {
    return fun.bind(scope);
  },
  cloneObject = function(obj) {
    const newObj = {};
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const item = obj[key];
      newObj[key] = runUpdate(item);
    }
    return newObj;
  },
  cloneArray = function(arr) {
    const newArr = new Array(arr.length);
    for (let i = 0; i < arr.length; i++) {
      newArr[i] = runUpdate(arr[i]);
    }
    return newArr;
  },
  runUpdate = function(item) {
    return checkPrimitives(item) ?
      item:
      typeof item === 'function' ?
      cloneFunction(item):
      Array.isArray(item) ?
      cloneArray(item) :
      cloneObject(item);
  };

  scope.update = function(obj) {
    const x = Object.keys(obj);
    for (let i = 0; i < x.length; i++) {
      _state[x[i]] = runUpdate(obj[x[i]]);
    }
  };