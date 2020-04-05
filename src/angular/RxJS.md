# About RxJS

## 处理异步数据场景

* Ajax
* User Events
* Animation
* Sockets
* Workers

## 回调函数
![回调地狱](http://qiniu.leooman.com/angular/rxjs/rxjs_001.jpg)

## Promise

[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 解决了回调地狱问题，但其本身有局限性
![Promise](http://qiniu.leooman.com/angular/rxjs/rxjs_002.jpg)

## RxJS
![RxJS](http://qiniu.leooman.com/angular/rxjs/rxjs_003.jpg)

[RxJS](http://reactivex.io/rxjs/)(<span style="color: #f00">R</span>eactive e<span style="color: #f00">x</span>tensions for <span style="color: #f00">J</span>ava<span style="color: #f00">S</span>cript)

将异步抽象为数据流并提供对数据流进行各种操作的接口.

## RxJS 5个核心概念

* Observable
	将异步数据转化为数据流，或者生成自定义数据流
* Operator
	数据流的中间处理过程
* Observer
	接收数据流中的数据，作为数据的消费者处理数据
![数据处理流程](http://qiniu.leooman.com/angular/rxjs/rxjs_004.jpg)

### Example

	Observable.of(2,13,6,11)
		.filter(v => v < 10)
		.map(v => v*2)
		.subscribe(v => {
			console.log(v);
		})
		// 输出：
		> 4
		> 12

* Subject
	同时继承Observable和Observer，既能包装异步数据为数据流，也能作为消费者处理数据
![Subject](http://qiniu.leooman.com/angular/rxjs/rxjs_005.jpg)
* Scheduler
	调度器，在单线程JS语言里并没有太多用武之地，但在多线程语言里，Scheduler可以把耗时的数据流放到单独的线程里，显著提升整体性能

### RxJS 优势

* 解决了Promise的痛点
![相对Promise的优势](http://qiniu.leooman.com/angular/rxjs/rxjs_006.jpg)
* 支持流组合处理数据
![支持流组合](http://qiniu.leooman.com/angular/rxjs/rxjs_007.jpg)

## RxJS与Angular的结合

Angular原生集成RxJS，在Angular应用里，表单模块和网络模块是如何跟RxJS集成的

* 表单模块

![Angular表单](http://qiniu.leooman.com/angular/rxjs/rxjs_008.jpg)

* 网络模块

![Angular网络模块](http://qiniu.leooman.com/angular/rxjs/rxjs_009.jpg)