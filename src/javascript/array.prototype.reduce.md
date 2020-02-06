

## Array.prototype.reduce(callbackfn[, initialValue])

*callbackfn* should be a function that takes four arguments. **reduce** calls the callback, as a function, once for each element after the first element present in the array, in ascending order. 

*callbackfn* is called with four arguments: the *previousValue* (value from the previous call to *callbackfn*), the *currentValue* (value of the current element), the *currentIndex*, and the object being traversed. The first time that callback is called, the *previousValue* and *currentValue* can be one of two values. If an *initialValue* was supplied in the call to **reduce**, then *previousValue* will be equal to *initialValue* and *currentValue* will be equal to the first value in the array. If no *initialValue* was supplied, then *previousValue* will be equal to the first value in the array and *currentValue* will be equal to the second. It is a **TypeError** if the array contains no elements and *initialValue* is not provided. 

**reduce** does not directly mutate the object on which it is called but the object may be mutated by the calls to *callbackfn*. 

The range of elements processed by **reduce** is set before the first call to *callbackfn*. Elements that are appended to the array after the call to **reduce** begins will not be visited by *callbackfn*. If existing elements of the array are changed, their value as passed to *callbackfn* will be the value at the time **reduce** visits them; elements that are deleted after the call to **reduce** begins and before being visited are not visited. 

```
When the reduce method is called with one or two arguments, the following steps are taken:
1. Let O be ? ToObject(this value).
2. Let len be ? ToLength(? Get(O, "length")).
3. If IsCallable(callbackfn) is false, throw a TypeError exception.
4. If len is 0 and initialValue is not present, throw a TypeError exception.
5. Let k be 0.
6. Let accumulator be undefined. 
7. If initialValue is present, then
	a. Set accumulator to initialValue. 
8. Else initialValue is not present,
	a. Let kPresent be false. 
	b. Repeat, while kPresent is false and k < len
		i. Let Pk be ! ToString(k).
		ii. Set kPresent to ? HasProperty(O, Pk).
		iii. If kPresent is true, then
			1. Set accumulator to ? Get(O, Pk).
		iv. Increase k by 1.
	c. If kPresent is false, throw a TypeError exception.
9. Repeat, while k < len
	a. Let Pk be ! ToString(k).
	b. Let kPresent be ? HasProperty(O, Pk).
	c. If kPresent is true, then
		i. Let kValue be ? Get(O, Pk).
		ii. Set accumulator to ? Call(callbackfn, undefined, « accumulator, kValue, k, O »).
	d. Increase k by 1.
10. Return accumulator.
```

```js
Array.prototype.reduce = function(callbackfn, initialValue) {
  // 异常处理
  if (this == null) {
  	throw new TypeError("Cannot read property 'map' of null or undefined");
  }
  if (typeof callbackfn !== 'function') {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this)
  let len = O.length >>> 0
  let k = 0, accumulator
  
  if (initialValue) {
    accumulator = initialValue
  } else {
    if (len === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
    let kPresent = false
    while(!kPresent && (k < len)) {
      kPresent = k in O
      if (kPresent) {
        accumulator = O[k] 
      }
      k++
    }
  }
  
  while(k < len) {
    if (k in O) {
      let kValue = O[k]
      accumulator = callbackfn.call(undefined, accumulator, kValue, k, O)
    }
    k++
  }
  return accumulator
}
```