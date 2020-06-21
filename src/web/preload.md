---
title: 图片预加载
date: 2017-10-31 20:35:04
tags: web
---
>**预加载**

图片预先加载到浏览器中，访问者便可顺利地在你的网站上冲浪，并享受到极快的加载速度。这对图片画廊及图片占据很大比例的网站来说十分有利，它保证了图片快速、无缝地发布，也可帮助用户在浏览你网站内容时获得更好的用户体验。

>**用CSS和JavaScript实现预加载**

- 单纯使用CSS，可容易、高效地预加载图片


	#preload-01 { background: url(http://domain.tld/image-01.png) no-repeat -9999px -9999px; }  
	#preload-02 { background: url(http://domain.tld/image-02.png) no-repeat -9999px -9999px; }  
	#preload-03 { background: url(http://domain.tld/image-03.png) no-repeat -9999px -9999px; }


通过CSS的background属性将图片预加载到屏幕外的背景上。只要这些图片的路径保持不变，当它们在Web页面的其他地方被调用时，浏览器就会在渲染过程中使用预加载（缓存）的图片。简单、高效，不需要任何JavaScript。

使用该法加载的图片会同页面的其他内容一起加载，增加了页面的整体加载时间。

- 增加了一些JavaScript代码，来推迟预加载的时间，直到页面加载完毕


	function preloader() {  
	    if (document.getElementById) {  
	        document.getElementById("preload-01").style.background = "url(http://domain.tld/image-01.png) no-repeat -9999px -9999px";  
	        document.getElementById("preload-02").style.background = "url(http://domain.tld/image-02.png) no-repeat -9999px -9999px";  
	        document.getElementById("preload-03").style.background = "url(http://domain.tld/image-03.png) no-repeat -9999px -9999px";  
	    }  
	}  
	function addLoadEvent(func) {  
	    var oldonload = window.onload;  
	    if (typeof window.onload != 'function') {  
	        window.onload = func;  
	    } else {  
	        window.onload = function() {  
	            if (oldonload) {  
	                oldonload();  
	            }  
	            func();  
	        }  
	    }  
	}  
	addLoadEvent(preloader);


addLoadEvent()函数来延迟preloader()函数的加载时间，直到页面加载完毕。

>**仅使用JavaScript实现预加载**

上述方法有时确实很高效，但我们逐渐发现它在实际实现过程中会耗费太多时间。

- 方法一

只需简单编辑、加载所需要图片的路径与名称即可，该方法尤其适用预加载大量的图片(比如图片画廊)。

	<div class="hidden">  
    <script type="text/javascript"> 
        var images = new Array()  
        function preload() {  
            for (i = 0; i < preload.arguments.length; i++) {  
                images[i] = new Image()  
                images[i].src = preload.arguments[i]  
            }  
        }  
        preload(  
            "http://domain.tld/gallery/image-001.jpg",  
            "http://domain.tld/gallery/image-002.jpg",  
            "http://domain.tld/gallery/image-003.jpg"  
        ) 
    </script>  
	</div>

- 方法二

	<div class="hidden">  
    <script type="text/javascript"> 
        if (document.images) {  
            img1 = new Image();  
            img2 = new Image();  
            img3 = new Image();  
            img1.src = "http://domain.tld/path/to/image-001.gif";  
            img2.src = "http://domain.tld/path/to/image-002.gif";  
            img3.src = "http://domain.tld/path/to/image-003.gif";  
        } 
    </script>  
	</div>

每加载一个图片都需要创建一个变量(有点烦)

	function preloader() {  
    	if (document.images) {  
	        var img1 = new Image();  
	        var img2 = new Image();  
	        var img3 = new Image();  
	        img1.src = "http://domain.tld/path/to/image-001.gif";  
	        img2.src = "http://domain.tld/path/to/image-002.gif";  
	        img3.src = "http://domain.tld/path/to/image-003.gif";  
	    }  
	}  
	function addLoadEvent(func) {  
	    var oldonload = window.onload;  
	    if (typeof window.onload != 'function') {  
	        window.onload = func;  
	    } else {  
	        window.onload = function() {  
	            if (oldonload) {  
	                oldonload();  
	            }  
	            func();  
	        }  
	    }  
	}  
	addLoadEvent(preloader);

>**使用Ajax实现预加载**

利用DOM，不仅仅预加载图片，还会预加载CSS、JavaScript等相关的东西。使用Ajax，比直接使用JavaScript，优越之处在于JavaScript和CSS的加载不会影响到当前页面。该方法简洁、高效

	window.onload = function() {  
	    setTimeout(function() {  
	        // XHR to request a JS and a CSS  
	        var xhr = new XMLHttpRequest();  
	        xhr.open('GET', 'http://domain.tld/preload.js');  
	        xhr.send('');  
	        xhr = new XMLHttpRequest();  
	        xhr.open('GET', 'http://domain.tld/preload.css');  
	        xhr.send('');  
	        // preload image  
	        new Image().src = "http://domain.tld/preload.png";  
	    }, 1000);  
	};
	//1000毫秒的超时是为了防止脚本挂起，而导致正常页面出现功能问题。

对比JavaScript来实现该加载过程：

通过DOM创建三个元素来实现三个文件的预加载。正如上面提到的那样，使用Ajax，加载文件不会应用到加载页面上

	window.onload = function() {  
  
	    setTimeout(function() {  
	  
	        // reference to <head>  
	        var head = document.getElementsByTagName('head')[0];  
	  
	        // a new CSS  
	        var css = document.createElement('link');  
	        css.type = "text/css";  
	        css.rel  = "stylesheet";  
	        css.href = "http://domain.tld/preload.css";  
	  
	        // a new JS  
	        var js  = document.createElement("script");  
	        js.type = "text/javascript";  
	        js.src  = "http://domain.tld/preload.js";  
	  
	        // preload JS and CSS  
	        head.appendChild(css);  
	        head.appendChild(js);  
	  
	        // preload image  
	        new Image().src = "http://domain.tld/preload.png";  
	  
	    }, 1000);  
	  
	};