import{_ as s,o as a,c as n,d as p}from"./app.acadfc2d.js";const l="/js/event-loop.png",o="/js/node-event-loop.png",d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[{"level":2,"title":"浏览器内核","slug":"浏览器内核","link":"#浏览器内核","children":[]},{"level":2,"title":"JavaScript是单线程","slug":"javascript是单线程","link":"#javascript是单线程","children":[]},{"level":2,"title":"任务队列","slug":"任务队列","link":"#任务队列","children":[]},{"level":2,"title":"事件和回调函数","slug":"事件和回调函数","link":"#事件和回调函数","children":[]},{"level":2,"title":"Event Loop","slug":"event-loop","link":"#event-loop","children":[]},{"level":2,"title":"定时器","slug":"定时器","link":"#定时器","children":[]},{"level":2,"title":"Node.js的Event Loop","slug":"node-js的event-loop","link":"#node-js的event-loop","children":[]}],"relativePath":"js/index.md"}'),e={name:"js/index.md"},t=p(`<h2 id="浏览器内核" tabindex="-1">浏览器内核 <a class="header-anchor" href="#浏览器内核" aria-hidden="true">#</a></h2><p>浏览器是多进程的,有主进程, GPU加速进程,渲染进程(内核)等, 一般新开一个tab页面就是新启动一个进程, CPU就会给它分配资源; 但其中有一个核心进程：渲染进程(浏览器内核),它包括了多个线程：</p><ul><li><p>GUI渲染线程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">负责渲染浏览器界面，解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制等。</span></span>
<span class="line"><span style="color:#A6ACCD;">当界面需要重绘（Repaint）或由于某种操作引发回流(reflow)时，该线程就会执行</span></span>
<span class="line"><span style="color:#A6ACCD;">注意，GUI渲染线程与JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起（相当于被冻结了），GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>JS引擎线程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">也称为JS内核，负责处理Javascript脚本程序.(例如V8引擎)JS引擎线程负责解析Javascript脚本，运行代码。</span></span>
<span class="line"><span style="color:#A6ACCD;">JS引擎一直等待着任务队列中任务的到来，然后加以处理，一个Tab页（renderer进程）中无论什么时候都只有一个JS线程在运行JS程序</span></span>
<span class="line"><span style="color:#A6ACCD;">同样注意，GUI渲染线程与JS引擎线程是互斥的，所以如果JS执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">不过H5中新增了Web Worker, 实现了多线程: js会新开线程来处理一些其他任务,但不会影响DOM结构</span></span>
<span class="line"><span style="color:#A6ACCD;">创建Worker时，JS引擎向浏览器申请开一个子线程（子线程是浏览器开的，完全受主线程控制，而且不能操作DOM）JS引擎线程与worker线程间通过特定的方式通信(postMessage API，需要通过序列化对象来与线程交互特定的数据）</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>事件触发线程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">这个线程是归属于浏览器而不是JS引擎，用来控制事件循环（可以理解，JS引擎自己都忙不过来，需要浏览器另开线程协助）</span></span>
<span class="line"><span style="color:#A6ACCD;">当JS引擎执行代码块如setTimeOut时（也可来自浏览器内核的其他线程,如鼠标点击、AJAX异步请求,页面滚动等），会将对应任务添加到事件线程中</span></span>
<span class="line"><span style="color:#A6ACCD;">当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理</span></span>
<span class="line"><span style="color:#A6ACCD;">注意，由于JS的单线程关系，所以这些待处理队列中的事件都得排队等待JS引擎处理（当JS引擎空闲时才会去执行）</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>定时触发器线程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">即setInterval与setTimeout所在线程</span></span>
<span class="line"><span style="color:#A6ACCD;">浏览器定时计数器并不是由JavaScript引擎计数的,（因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确); </span></span>
<span class="line"><span style="color:#A6ACCD;">因此通过单独线程来计时并触发定时（计时完毕后，添加到事件队列中，等待JS引擎空闲后执行）</span></span>
<span class="line"><span style="color:#A6ACCD;">当然setTimeout中的延时参数也不一定准确</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li><li><p>异步HTTP请求线程</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">在XMLHttpRequest在连接后是通过浏览器新开一个网络线程去请求</span></span>
<span class="line"><span style="color:#A6ACCD;">将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列中。再由JavaScript引擎执行。</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div></li></ul><h2 id="javascript是单线程" tabindex="-1">JavaScript是单线程 <a class="header-anchor" href="#javascript是单线程" aria-hidden="true">#</a></h2><p>JavaScript引擎是单线程的工作模式, 即同一时间只能执行一段代码,还要按顺序自上而下执行</p><p>作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？</p><p>所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。</p><p>为了利用多核CPU的计算能力，HTML5提出<em>Web Worker</em>标准，允许JavaScript脚本创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。所以，这个新标准并没有改变JavaScript单线程的本质</p><h2 id="任务队列" tabindex="-1">任务队列 <a class="header-anchor" href="#任务队列" aria-hidden="true">#</a></h2><p>单线程就意味着，所有任务需要排队，前一个任务结束，才会执行后一个任务。如果前一个任务耗时很长，后一个任务就不得不一直等着。</p><p>如果排队是因为计算量大，CPU忙不过来，倒也算了，但是很多时候CPU是闲着的，因为IO设备（输入输出设备）很慢（比如Ajax操作从网络读取数据），不得不等着结果出来，再往下执行。</p><p>JavaScript语言的设计者意识到，这时主线程完全可以不管IO设备，挂起处于等待中的任务，先运行排在后面的任务。等到IO设备返回了结果，再回过头，把挂起的任务继续执行下去。</p><p>于是，所有任务可以分成两种，一种是同步任务（synchronous），另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；异步任务指的是，不进入主线程、而进入&quot;任务队列&quot;（task queue）的任务，只有&quot;任务队列&quot;通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。</p><p>具体来说，异步执行的运行机制如下。（同步执行也是如此，因为它可以被视为没有异步任务的异步执行。）</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">（2）主线程之外，还存在一个&quot;任务队列&quot;（task queue）。只要异步任务有了运行结果，就在&quot;任务队列&quot;之中放置一个事件</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">（3）一旦&quot;执行栈&quot;中的所有同步任务执行完毕，系统就会读取&quot;任务队列&quot;。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">（4）主线程不断重复上面的第三步</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><h2 id="事件和回调函数" tabindex="-1">事件和回调函数 <a class="header-anchor" href="#事件和回调函数" aria-hidden="true">#</a></h2><p>&quot;任务队列&quot;是一个事件的队列（也可以理解成消息的队列），IO设备完成一项任务，就在&quot;任务队列&quot;中添加一个事件，表示相关的异步任务可以进入&quot;执行栈&quot;了。主线程读取&quot;任务队列&quot;，就是读取里面有哪些事件。</p><p>&quot;任务队列&quot;中的事件，除了IO设备的事件以外，还包括一些用户产生的事件（比如鼠标点击、页面滚动等等）。只要指定过回调函数，这些事件发生时就会进入&quot;任务队列&quot;，等待主线程读取。</p><p>所谓&quot;回调函数&quot;（callback），就是那些会被主线程挂起来的代码。异步任务必须指定回调函数，当主线程开始执行异步任务，就是执行对应的回调函数。</p><p>&quot;任务队列&quot;是一个先进先出的数据结构，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，&quot;任务队列&quot;上第一位的事件就自动进入主线程。但是，由于存在&quot;定时器&quot;功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。</p><h2 id="event-loop" tabindex="-1">Event Loop <a class="header-anchor" href="#event-loop" aria-hidden="true">#</a></h2><p>主线程从&quot;任务队列&quot;中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。</p><p><img src="`+l+'" alt="Event Loop"></p><p>上图中，主线程运行的时候，产生堆（heap）和栈（stack），栈中的代码调用各种外部API，它们在&quot;任务队列&quot;中加入各种事件（click，load，done）。只要栈中的代码执行完毕，主线程就会去读取&quot;任务队列&quot;，依次执行那些事件所对应的回调函数。</p><p>执行栈中的代码（同步任务），总是在读取&quot;任务队列&quot;（异步任务）之前执行。</p><h2 id="定时器" tabindex="-1">定时器 <a class="header-anchor" href="#定时器" aria-hidden="true">#</a></h2><p>除了放置异步任务的事件，&quot;任务队列&quot;还可以放置定时事件，即指定某些代码在多少时间之后执行。这叫做&quot;定时器&quot;（timer）功能，也就是定时执行的代码。</p><p>定时器功能主要由setTimeout()和setInterval()这两个函数来完成，它们的内部运行机制完全一样，区别在于前者指定的代码是一次性执行，后者则为反复执行。</p><p>setTimeout()接受两个参数，第一个是回调函数，第二个是推迟执行的毫秒数。</p><p>如果将setTimeout()的第二个参数设为0，就表示当前代码执行完（执行栈清空）以后，立即执行（0毫秒间隔）指定的回调函数。</p><p>总之，setTimeout(fn,0)的含义是，指定某个任务在主线程最早可得的空闲时间执行。它在&quot;任务队列&quot;的尾部添加一个事件，因此要等到同步任务和&quot;任务队列&quot;现有的事件都处理完，才会得到执行。</p><p>HTML5标准规定了setTimeout()的第二个参数的最小值（最短间隔），不得低于4毫秒，如果低于这个值，就会自动增加。在此之前，老版本的浏览器都将最短间隔设为10毫秒。另外，对于那些DOM的变动（尤其是涉及页面重新渲染的部分），通常不会立即执行，而是每16毫秒执行一次。这时使用requestAnimationFrame()的效果要好于setTimeout()。</p><p>需要注意的是，setTimeout()只是将事件插入了&quot;任务队列&quot;，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在setTimeout()指定的时间执行。</p><h2 id="node-js的event-loop" tabindex="-1">Node.js的Event Loop <a class="header-anchor" href="#node-js的event-loop" aria-hidden="true">#</a></h2><p>Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境。</p><p><img src="'+o+`" alt="Node.js"></p><blockquote><p>（1）V8引擎解析JavaScript脚本。</p><p>（2）解析后的代码，调用Node API。</p><p>（3）<a href="https://github.com/joyent/libuv" target="_blank" rel="noreferrer">libuv库</a>负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎。</p><p>（4）V8引擎再将结果返回给用户。</p></blockquote><p>除了setTimeout和setInterval这两个方法，Node.js还提供了另外两个与&quot;任务队列&quot;有关的方法：<a href="http://nodejs.org/docs/latest/api/process.html#process_process_nexttick_callback" target="_blank" rel="noreferrer">process.nextTick</a>和<a href="http://nodejs.org/docs/latest/api/timers.html#timers_setimmediate_callback_arg" target="_blank" rel="noreferrer">setImmediate</a></p><p>process.nextTick方法可以在当前&quot;执行栈&quot;的尾部----下一次Event Loop（主线程读取&quot;任务队列&quot;）之前----触发回调函数。也就是说，它指定的任务总是发生在所有异步任务之前。setImmediate方法则是在当前&quot;任务队列&quot;的尾部添加事件，也就是说，它指定的任务总是在下一次Event Loop时执行，这与setTimeout(fn, 0)很像</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">nextTick</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">A</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">nextTick</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">B</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">timeout</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">TIMEOUT FIRED</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// TIMEOUT FIRED</span></span>
<span class="line"></span></code></pre></div><p>上面代码中，由于process.nextTick方法指定的回调函数，总是在当前&quot;执行栈&quot;的尾部触发，所以不仅函数A比setTimeout指定的回调函数timeout先执行，而且函数B也比timeout先执行。这说明，如果有多个process.nextTick语句（不管它们是否嵌套），将全部在当前&quot;执行栈&quot;执行。</p><p>现在，再看setImmediate。</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">setImmediate</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">A</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#82AAFF;">setImmediate</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">B</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">setTimeout</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">timeout</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">TIMEOUT FIRED</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">},</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">0</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>上面代码中，setImmediate与setTimeout(fn,0)各自添加了一个回调函数A和timeout，都是在下一次Event Loop触发。那么，哪个回调函数先执行呢？答案是不确定。运行结果可能是1--TIMEOUT FIRED--2，也可能是TIMEOUT FIRED--1--2。</p><p>令人困惑的是，Node.js文档中称，setImmediate指定的回调函数，总是排在setTimeout前面。实际上，这种情况只发生在递归调用的时候。</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#82AAFF;">setImmediate</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">setImmediate</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">A</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">1</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#82AAFF;">setImmediate</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">B</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">     </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">2</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">setTimeout</span><span style="color:#F07178;">(</span><span style="color:#C792EA;">function</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">timeout</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">   </span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">TIMEOUT FIRED</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">},</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// TIMEOUT FIRED</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 2</span></span>
<span class="line"></span></code></pre></div><p>上面代码中，setImmediate和setTimeout被封装在一个setImmediate里面，它的运行结果总是1--TIMEOUT FIRED--2，这时函数A一定在timeout前面触发。至于2排在TIMEOUT FIRED的后面（即函数B在timeout后面触发），是因为setImmediate总是将事件注册到下一轮Event Loop，所以函数A和timeout是在同一轮Loop执行，而函数B在下一轮Loop执行。</p><p>我们由此得到了process.nextTick和setImmediate的一个重要区别：多个process.nextTick语句总是在当前&quot;执行栈&quot;一次执行完，多个setImmediate可能则需要多次loop才能执行完。事实上，这正是Node.js 10.0版添加setImmediate方法的原因，否则像下面这样的递归调用process.nextTick，将会没完没了，主线程根本不会去读取&quot;事件队列&quot;！</p><div class="language-javascript"><button title="Copy Code" class="copy"></button><span class="lang">javascript</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">nextTick</span><span style="color:#A6ACCD;">(</span><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">foo</span><span style="color:#89DDFF;">()</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#A6ACCD;">process</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">nextTick</span><span style="color:#F07178;">(</span><span style="color:#A6ACCD;">foo</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"></span></code></pre></div><p>事实上，写出递归的process.nextTick，Node.js会抛出一个警告，要求你改成setImmediate。</p><p>另外，由于process.nextTick指定的回调函数是在本次&quot;事件循环&quot;触发，而setImmediate指定的是在下次&quot;事件循环&quot;触发，所以很显然，前者总是比后者发生得早，而且执行效率也高（因为不用检查&quot;任务队列&quot;）</p>`,51),c=[t];function r(i,y,F,A,D,C){return a(),n("div",null,c)}const m=s(e,[["render",r]]);export{d as __pageData,m as default};
