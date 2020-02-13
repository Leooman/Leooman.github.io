call 和 apply 的功能相同，都是改变 this 的执行，并立即执行函数。区别在于传参方式不同。

- func.call(thisArg, arg1, arg2, …)：第一个参数是 this 指向的对象，其它参数依次传入
- func.apply(thisArg, [argsArray])：第一个参数是 this 指向的对象，第二个参数是数组或类数组

> 模拟实现 call 

```js
Function.prototype.call = function() {
    let [thisArg, ...args] = [...arguments];
    if (!thisArg) {
        //context 为 null 或者是 undefined
        thisArg = typeof window === 'undefined' ? global : window;
    }
    //this 的指向的是当前函数 func (func.call)
    thisArg.func = this;
    // 执行函数
    let result = thisArg.func(...args);
    delete thisArg.func; //thisArg 上并没有 func 属性，因此需要移除
    return result;
}
```

> 模拟实现apply

```js
Function.prototype.apply = function(thisArg, rest) {
    let result; // 函数返回结果
    if (!thisArg) {
        //context 为 null 或者是 undefined
        thisArg = typeof window === 'undefined' ? global : window;
    }
    //this 的指向的是当前函数 func (func.call)
    thisArg.func = this;
    if(!rest) {
        // 第二个参数为 null / undefined 
        result = thisArg.func();
    }else {
        result = thisArg.func(...rest);
    }
    delete thisArg.func; //thisArg 上并没有 func 属性，因此需要移除
    return result;
}
```

> 模拟实现bind

```js
Function.prototype.bind = function( context ){
	var self = this; // 保存原函数
	return function(){ // 返回一个新的函数
		return self.apply( context, arguments ); // 执行新的函数的时候，会把之前传入的context
		// 当作新函数体内的this
	}
};
var obj = {
	name: 'sven'
};
var func = function(){
	alert ( this.name ); // 输出：sven
}.bind( obj);
func();
```

```js
Function.prototype.bind = function(){
	var self = this, // 保存原函数
	context = [].shift.call( arguments ), // 需要绑定的this上下文
	args = [].slice.call( arguments ); // 剩余的参数转成数组
	return function(){ // 返回一个新的函数
		return self.apply( context, [].concat.call( args, [].slice.call( arguments ) ) );
		// 执行新的函数的时候，会把之前传入的context当作新函数体内的this
		// 并且组合两次分别传入的参数，作为新函数的参数
	}
};
var obj = {
	name: 'sven'
};
var func = function( a, b, c, d ){
	alert ( this.name ); // 输出：sven
	alert ( [ a, b, c, d ] ) // 输出：[ 1, 2, 3, 4 ]
}.bind( obj, 1, 2 );
func( 3, 4 );
```

```js
Function.prototype.bind = function (context) {

    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}
```

