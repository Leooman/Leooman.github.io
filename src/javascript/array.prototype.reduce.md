

## Array.prototype.reduce

`reduce` 可以理解为「归一」，意为海纳百川，万剑归一，完整的结构是 `Array.prototype.reduce(callbackfn[, initialValue])`，这里第二个参数并不是 thisArg 了，而是初始值 `initialValue`，关于初始值之前有介绍过。

- 如果没有提供 `initialValue`，那么第一次调用 `callback` 函数时，`accumulator` 使用原数组中的第一个元素，`currentValue` 即是数组中的第二个元素。
- 如果提供了 `initialValue`，`accumulator` 将使用这个初始值，`currentValue` 使用原数组中的第一个元素。
- 在没有初始值的空数组上调用 `reduce` 将报错。

ECMA-262 规范文档实现如下。

<details style="box-sizing: border-box; display: block; margin-top: 0px; margin-bottom: 16px; color: rgb(36, 41, 46); font-family: -apple-system, system-ui, &quot;Segoe UI&quot;, Helvetica, Arial, sans-serif, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;; font-size: 14px; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255); text-decoration-style: initial; text-decoration-color: initial;"><summary style="box-sizing: border-box; display: list-item; cursor: pointer;">展开查看规范</summary></details>

用 JS 来模拟实现，核心逻辑如下：

这部分源码主要多了对于 `initialValue` 的处理，有初始值时比较简单，即 `accumulator = initialValue `，`kValue = O[0]`。

无初始值处理在 Step 8，循环判断当 O 及其原型链上存在属性 k 时，`accumulator = O[k] `并退出循环，因为 `k++`，所以 `kValue = O[k++]`。

更多的数组方法有 `find`、`findIndex`、`forEach` 等，其源码实现也是大同小异，无非就是在 `callbackfn.call` 这部分做些处理，有兴趣的可以看看 TC39 和 MDN 官网，参考部分链接直达。

## 注意

`forEach` 的源码和 `map` 很相同，在 map 的源码基础上做些改造就是啦。

```
Array.prototype.forEach = function(callbackfn, thisArg) {
  // 相同
  ...
  while(k < len) {
    if (k in O) {
      let kValue = O[k]
 
      // 这部分是 map
      // let mappedValue = callbackfn.call(T, kValue, k, O)
      // A[k] = mappedValue
      
      // 这部分是 forEach
      callbackfn.call(T, kValue, k, O)
    }
    k++
  }
  // 返回 undefined
  // return undefined
}
```

可以看到，不同之处在于不处理 `callbackfn` 执行的结果，也不返回。

特意指出来是因为在此之前看到过一种错误的说法，叫做「forEach 会跳过空，但是 map 不跳过」

为什么说 `map` 不跳过呢，因为原始数组有 empty 元素时，map 返回的结果也有 empty 元素，所以不跳过，但是这种说法并不正确。

```
let arr = [1, , 3, , 5]
console.log(arr) // [1, empty, 3, empty, 5]

let result = arr.map(ele => {
  console.log(ele) // 1, 3, 5
  return ele
})
console.log(result) // [1, empty, 3, empty, 5]
```

看 `ele` 输出就会明白 map 也是跳空的，原因就在于源码中的 `k in O`，这里是检查 O 及其原型链是否包含属性 k，所以有的实现中用 `hasOwnProperty` 也是不正确的。

另外 `callbackfn` 中不可以使用 break 跳出循环，是因为 break 只能跳出循环，而 `callbackfn` 并不是循环体。如果有类似的需求可以使用`for..of`、`for..in`、 `some`、`every` 等。

[![img](https://camo.githubusercontent.com/b2efaccf89b1d5f74623b91097455250c9dba72d/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303139303930383139343635352e706e67)](https://camo.githubusercontent.com/b2efaccf89b1d5f74623b91097455250c9dba72d/687474703a2f2f7265736f757263652e6d757969792e636e2f696d6167652f32303139303930383139343635352e706e67)