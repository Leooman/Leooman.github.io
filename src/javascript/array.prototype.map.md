##  Array.prototype.map(callbackfn[, thisArg])

*callbackfn* should be a function that accepts three arguments. **map** calls *callbackfn* once for each element in the array, in ascending order, and constructs a new Array from the results. *callbackfn* is called only for elements of the array which actually exist; it is not called for missing elements of the array. 

If a *thisArg* parameter is provided, it will be used as the **this** value for each invocation of *callbackfn*. If it is not provided, **undefined** is used instead. 

*callbackfn* is called with three arguments: the value of the element, the index of the element, and the object being traversed. 

**map** does not directly mutate the object on which it is called but the object may be mutated by the calls to *callbackfn*. 

The range of elements processed by **map** is set before the first call to *callbackfn*. Elements which are appended to the array after the call to **map** begins will not be visited by *callbackfn*. If existing elements of the array are changed, their value as passed to *callbackfn* will be the value at the time **map** visits them; elements that are deleted after the call to **map** begins and before being visited are not visited.

```
When the map method is called with one or two arguments, the following steps are taken:
1. Let O be ? ToObject(this value).
2. Let len be ? ToLength(? Get(O, "length")).
3. If IsCallable(callbackfn) is false, throw a TypeError exception.
4. If thisArg is present, let T be thisArg; else let T be undefined. 
5. Let A be ? ArraySpeciesCreate(O, len).
6. Let k be 0.
7. Repeat, while k < len
	a. Let Pk be ! ToString(k).
	b. Let kPresent be ? HasProperty(O, Pk).
	c. If kPresent is true, then
		i. Let kValue be ? Get(O, Pk).
		ii. Let mappedValue be ? Call(callbackfn, T, « kValue, k, O »).
		iii. Perform ? CreateDataPropertyOrThrow(A, Pk, mappedValue).
	d. Increase k by 1.
8. Return A.
```

```js
Array.prototype.map = function(callbackfn, thisArg) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  let O = Object(this)
  let len = O.length >>> 0
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let T = thisArg
  let A = new Array(len)
  let k = 0
  while(k < len) {
    // 检查 O 及其原型链是否包含属性 k
    if (k in O) {
      let kValue = O[k]
      // 传入 this, 当前元素 element, 索引 index, 原数组对象 O
      let mappedValue = callbackfn.call(T, kValue, k, O)
      A[k] = mappedValue
    }
    k++
  }
  return A
}
```

 `callbackfn` 函数对于 empty 元素或者使用 `delete` 删除后的索引则**不会被调用**

```js
let arr = [1, , 3, , 5]
console.log(0 in arr) // true
delete arr[0]
console.log(0 in arr) // false
console.log(arr) // [empty × 2, 3, empty, 5]
arr.map(ele => {
  console.log(ele) // 3, 5
})
```

`map` 并不会修改原数组，不过也不是绝对的，如果在 `callbackfn` 中修改了原数组，那还是会改变，并且会影响到 `map` 自身的执行

- 原数组新增元素：因为 `map` 第一次执行时 length 已经确定了，所以不影响
- 原数组修改元素：传递给callbackfn的元素是 map 遍历到元素当时的值，所以可能受影响
  - 修改当前索引之前的元素，不受影响
  - 修改当前索引之后的元素，受影响
- 原数组删除元素：被删除的元素无法被访问到，所以可能受影响
  - 删除当前索引之前的元素，已经访问过了，所以不受影响
  - 删除当前索引之后的元素，受影响

```js
// 1、原数组新增元素，不受影响
let arr = [1, 2, 3]
let result = arr.map((ele, index, array) => {
  array.push(4);
  return ele * 2
})
console.log(result) 
// 2, 4, 6

// 2、原数组修改当前索引之前的元素，不受影响
let arr = [1, 2, 3]
let result = arr.map((ele, index, array) => {
  if (index === 1) {
    array[0] = 4
  }
  return ele * 2
})
console.log(result) 
// 2, 4, 6

// 3、原数组修改当前索引之后的元素，受影响
let arr = [1, 2, 3]
let result = arr.map((ele, index, array) => {
  if (index === 1) {
    array[2] = 4
  }
  return ele * 2
})
console.log(result) 
// 2, 4, 8
```

 `callbackfn.call(T, kValue, k, O)`，其中 `T` 就是 `thisArg` 值，如果没有设置，那就是 undefined。传入 undefined 时，非严格模式下指向 Window，严格模式下为 undefined。这时回调函数不能用箭头函数，因为箭头函数没有自己的 this 

```js
// 1、传入 thisArg 但使用箭头函数
let name = 'Muyiy'
let obj = {
    name: 'Hello',
    callback: (ele) => {
        return this.name + ele
    }
}
let arr = [1, 2, 3]
let result = arr.map(obj.callback, obj);
console.log(result) 
// ["1", "2", "3"]，此时 this 指向 window

// 2、传入 thisArg，使用普通函数
let name = 'Muyiy'
let obj = {
    name: 'Hello',
    callback: function (ele) {
        return this.name + ele
    }
}
let arr = [1, 2, 3]
let result = arr.map(obj.callback, obj);
console.log(result) 
// ["Hello1", "Hello2", "Hello3"]

// 3、不传入 thisArg，name 使用 let 声明
let name = 'Muyiy'
let obj = {
    name: 'Hello',
    callback: function (ele) {
        return this.name + ele
    }
}
let arr = [1, 2, 3]
let result = arr.map(obj.callback);
console.log(result)
// ["1", "2", "3"]
// let 和 const 声明的变量不会挂载到 window 上

// 4、不传入 thisArg，name 使用 var 声明
var name = 'Muyiy'
let obj = {
    name: 'Hello',
    callback: function (ele) {
        return this.name + ele
    }
}
let arr = [1, 2, 3]
let result = arr.map(obj.callback);
console.log(result)
// ["Muyiy1", "Muyiy2", "Muyiy3"]

// 5、严格模式
'use strict'
var name = 'Muyiy'
let obj = {
    name: 'Hello',
    callback: function (ele) {
        return this.name + ele
    }
}
let arr = [1, 2, 3]
let result = arr.map(obj.callback);
console.log(result)
// TypeError: Cannot read property 'name' of undefined
// 因为严格模式下 this 指向 undefined
```
