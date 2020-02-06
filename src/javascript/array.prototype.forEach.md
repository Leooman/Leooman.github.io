## Array.prototype.forEach (callbackfn[ ,thisArg] )

*callbackfn* should be a function that accepts three arguments. **forEach** calls *callbackfn* once for each element present in the array, in ascending order. *callbackfn* is called only for elements of the array which actually exist; it is not called for missing elements of the array. 

If a *thisArg* parameter is provided, it will be used as the **this** value for each invocation of *callbackfn*. If it is not provided, **undefined** is used instead. 

*callbackfn* is called with three arguments: the value of the element, the index of the element, and the object being traversed. 

**forEach** does not directly mutate the object on which it is called but the object may be mutated by the calls to *callbackfn*.

```
When the forEach method is called with one or two arguments, the following steps are taken:
1. Let O be ? ToObject(this value).
2. Let len be ? ToLength(? Get(O, "length")).
3. If IsCallable(callbackfn) is false, throw a TypeError exception.
4. If thisArg is present, let T be thisArg; else let T be undefined. 
5. Let k be 0.
6. Repeat, while k < len
	a. Let Pk be ! ToString(k).
	b. Let kPresent be ? HasProperty(O, Pk).
	c. If kPresent is true, then
		i. Let kValue be ? Get(O, Pk).
		ii. Perform ? Call(callbackfn, T, « kValue, k, O »).
	d. Increase k by 1.
7. Return undefined.
```

```js
Array.prototype.forEach = function(callbackfn, thisArg) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'forEach' of null or undefined");
  }
  let O = Object(this)
  let len = O.length >>> 0
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let T = thisArg
  let k = 0
  while(k < len) {
    // 检查 O 及其原型链是否包含属性 k
    if (k in O) {
      let kValue = O[k]
      callbackfn.call(T, kValue, k, O)
    }
    k++
  }
}
```

