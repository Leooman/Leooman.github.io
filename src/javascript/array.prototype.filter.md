## Array.prototype.filter(callbackfn[, thisArg])

*callbackfn* should be a function that accepts three arguments and returns a value that is coercible to the Boolean value **true** or **false**. **filter** calls *callbackfn* once for each element in the array, in ascending order, and constructs a new array of all the values for which *callbackfn* returns **true**. *callbackfn* is called only for elements of the array which actually exist; it is not called for missing elements of the array. 

If a *thisArg* parameter is provided, it will be used as the **this** value for each invocation of *callbackfn*. If it is not provided, **undefined** is used instead. 

*callbackfn* is called with three arguments: the value of the element, the index of the element, and the object being traversed. 

**filter** does not directly mutate the object on which it is called but the object may be mutated by the calls to *callbackfn*. 

The range of elements processed by **filter** is set before the first call to *callbackfn*. Elements which are appended to the array after the call to **filter** begins will not be visited by *callbackfn*. If existing elements of the array are changed their value as passed to *callbackfn* will be the value at the time **filter** visits them; elements that are deleted after the call to **filter** begins and before being visited are not visited. 

```
When the filter method is called with one or two arguments, the following steps are taken:
1. Let O be ? ToObject(this value).
2. Let len be ? ToLength(? Get(O, "length")).
3. If IsCallable(callbackfn) is false, throw a TypeError exception.
4. If thisArg is present, let T be thisArg; else let T be undefined. 
5. Let A be ? ArraySpeciesCreate(O, 0).
6. Let k be 0.
7. Let to be 0.
8. Repeat, while k < len
	a. Let Pk be ! ToString(k).
	b. Let kPresent be ? HasProperty(O, Pk).
	c. If kPresent is true, then
		i. Let kValue be ? Get(O, Pk).
		ii. Let selected be ToBoolean(? Call(callbackfn, T, « kValue, k, O »)).
		iii. If selected is true, then
			1. Perform ? CreateDataPropertyOrThrow(A, ! ToString(to), kValue).
			2. Increase to by 1.
	d. Increase k by 1.
9. Return A.
```

```js
Array.prototype.filter = function(callbackfn, thisArg) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }

  let O = Object(this), len = O.length >>> 0,
      T = thisArg, A = new Array(len), k = 0
  // 新增，返回数组的索引
  let to = 0
  
  while(k < len) {
    if (k in O) {
      let kValue = O[k]
      // 新增
      if (callbackfn.call(T, kValue, k, O)) {
        A[to++] = kValue;
      }
    }
    k++
  }
  
  // 新增，修改 length，初始值为 len
  A.length = to;
  return A
}
```