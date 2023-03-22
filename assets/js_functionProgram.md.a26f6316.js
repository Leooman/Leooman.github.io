import{_ as e,c as r,o as a,a as n}from"./app.36ba4f36.js";const _=JSON.parse('{"title":"函数式编程","description":"","frontmatter":{"title":"函数式编程","date":"2018-05-23T16:25:42.000Z","tags":"Ramda"},"headers":[{"level":2,"title":"面向对象编程","slug":"面向对象编程","link":"#面向对象编程","children":[]},{"level":2,"title":"函数式编程","slug":"函数式编程","link":"#函数式编程","children":[]},{"level":2,"title":"Why Ramda","slug":"why-ramda","link":"#why-ramda","children":[]},{"level":2,"title":"MORE","slug":"more","link":"#more","children":[]}],"relativePath":"js/functionProgram.md"}'),t={name:"js/functionProgram.md"},d=n(`<h2 id="面向对象编程" tabindex="-1">面向对象编程 <a class="header-anchor" href="#面向对象编程" aria-hidden="true">#</a></h2><p>在面向对象编程中，面向对象程序设计（英语：Object-oriented programming，缩写：OOP）是种具有对象概念的程序编程范型，同时也是一种程序开发的方法。它可能包含数据、属性、代码与方法。对象则指的是类的实例。</p><p>在面向对象程序编程里，计算机程序会被设计成彼此相关的对象 ，将对象作为程序的基本单元。面向对象程序设计中的每一个对象都应该能够接受数据、处理数据并将数据传达给其它对象。</p><p>目前面向对象程序设计推广了程序的灵活性和可维护性，并且在大型项目设计中广为应用。能够让人们更简单地设计并维护程序，使得程序更加便于分析、设计、理解。同时它也是易拓展的，由于继承、封装、多态的特性，自然设计出高内聚、低耦合的系统结构，使得系统更灵活、更容易扩展，而且成本较低。</p><p>在面向对象编程的基础上发展出来的23种设计模式广泛应用于现今的软件工程中，极大方便了代码的书写与维护。</p><p>创建型模式，共五种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。</p><p>结构型模式，共七种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。</p><p>行为型模式，共十一种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。</p><p>面向对象编程以数据为核心，所以在多线程并发编程中，多个线程同时操作数据的时候可能会导致数据修改的不确定性。</p><h2 id="函数式编程" tabindex="-1">函数式编程 <a class="header-anchor" href="#函数式编程" aria-hidden="true">#</a></h2><p>函数式编程（Functional programming）是与面向对象编程（Object-oriented programming）并列的编程范式。</p><p>函数式编程就是一种抽象程度很高的编程范式，纯粹的函数式编程语言编写的函数<a href="http://www.ruanyifeng.com/blog/2017/03/pointfree.html" target="_blank" rel="noreferrer">Pointfree编程风格</a>没有变量，因此，任意一个函数，只要输入是确定的，输出就是确定的，这种纯函数我们称之为没有副作用。而允许使用变量的程序设计语言，由于函数内部的变量状态不确定，同样的输入，可能得到不同的输出，因此，这种函数是有副作用的。</p><p>对象与对象之间的关系是面向对象编程首要考虑的问题，而在函数式编程中，所有的数据都是不可变的，不同的函数之间通过数据流来交换信息，<code>函数作为FP中的一等公民</code>，享有跟数据一样的地位，可以作为参数传递给下一个函数，同时也可以作为返回值。</p><p>在函数式编程中，由于数据全部都是不可变的，所以没有并发编程的问题，是多线程安全的。可以有效降低程序运行中所产生的副作用，对于快速迭代的项目来说，函数式编程可以实现函数与函数之间的热切换而不用担心数据的问题，因为它是以函数作为最小单位的，只要函数与函数之间的关系正确即可保证结果的正确性。</p><h2 id="why-ramda" tabindex="-1">Why Ramda <a class="header-anchor" href="#why-ramda" aria-hidden="true">#</a></h2><p>Ramda强调一种更纯粹的函数<code>Pure function</code>风格，不可变和无副作用是其设计的核心，当给予function相同的参数，永远返回相同的值，并且没有显著的副作用<code>side effect</code>。</p><pre><code>//side effect指一个function做了跟本身运算返回值没有关系的事，比如发送\`http request\`请求或修改某个全局变量或传入参数的值，甚至是执行\`console.log\`

//slice不管执行多少次，返回值都是相同的，并且除了返回value值外，没有做任何事
var arr = [1, 2, 3, 4, 5];
arr.slice(0, 3); // [1, 2, 3]
arr.slice(0, 3); // [1, 2, 3]
arr.slice(0, 3); // [1, 2, 3]

//splice没执行一次就影响arr的值，导致每次结果都不同，不符合pure function不可变的原则
var arr = [1, 2, 3, 4, 5];
arr.splice(0, 3); // [1, 2, 3]
arr.splice(0, 3); // [4, 5]
arr.slice(0, 3); // []
</code></pre><p>Ramda所有函数都是自动柯里化的。</p><pre><code>R.add(2, 3);       //=&gt;  5
R.add(7)(10);      //=&gt; 17
</code></pre><p>Ramda中数据都是作为最后一个参数传入的。</p><pre><code>var R = require(&#39;ramda&#39;);
R.map(square, [4, 8]) // [16, 64]
</code></pre><p>不同于underscore和lodash：</p><pre><code>var square = n =&gt; n * n;
_.map([4, 8], square) // [16, 64]
</code></pre><h2 id="more" tabindex="-1">MORE <a class="header-anchor" href="#more" aria-hidden="true">#</a></h2><p><a href="http://leooman.com/ramda/" target="_blank" rel="noreferrer">Ramda API文档</a></p>`,25),o=[d];function c(i,p,l,s,h,m){return a(),r("div",null,o)}const f=e(t,[["render",c]]);export{_ as __pageData,f as default};
