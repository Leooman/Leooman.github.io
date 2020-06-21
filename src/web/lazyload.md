---
title: 图片懒加载
date: 2017-10-18 19:32:23
tags: web
---
>**场景**

在实际的项目开发中，我们通常会遇见这样的场景：一个页面有很多图片，而首屏出现的图片大概就一两张，那么我们还要一次性把所有图片都加载出来吗？显然这是愚蠢的，不仅影响页面渲染速度，还浪费带宽。这也就是们通常所说的首屏加载，技术上现实其中要用的技术就是图片懒加载--到可视区域再加载

>**优势**

减少请求数，防止页面一次性向服务器响应大量请求导致服务器响应慢，页面卡顿或崩溃等问题

页面加载速度快、可以减轻服务器的压力、节约了流量、用户体验好

>**实现原理**

页面中的img元素，如果没有src属性，浏览器就不会发出请求去下载图片，只有通过javascript设置了图片路径，浏览器才会发送请求。

1)先在页面中把所有的图片统一使用一张占位图进行占位，不要将图片地址放到src属性中，而是放到其它属性(data-original)中。

	<img data-url="1.jpg" src="blank.png" alt="测试懒加载图片"/>

2)页面加载完成后，根据scrollTop判断图片是否在用户的视野内，如果在，则将data-original属性中的值取出存放到src属性中。
3)在滚动事件中重复判断图片是否进入视野，如果进入，则将data-original属性中的值取出存放到src属性中。

>**屏幕可视窗口大小**

	**原生方法**：
        window.innerHeight 标准浏览器及IE9+ ||
        document.documentElement.clientHeight 标准浏览器及低版本IE标准模式 ||
        document.body.clientHeight  低版本混杂模式
    **jQuery方法**： 
        $(window).height();

>**滚动条滚动的距离**

	**原生方法**：
          window.pagYoffset 标准浏览器及IE9+ ||
          document.documentElement.scrollTop 兼容ie低版本的标准模式 ||
          document.body.scrollTop 兼容混杂模式；
    **jQuery方法**：
          $(document).scrollTop();

>**获取元素的尺寸**

	$(o).width() = o.style.width;
	$(o).innerWidth() = o.style.width+o.style.padding;
	$(o).outerWidth() = o.offsetWidth = o.style.width+o.style.padding+o.style.border;
	$(o).outerWidth(true) = o.style.width+o.style.padding+o.style.border+o.style.margin;

- 注意

要使用原生的style.xxx方法获取属性，这个元素必须已经有内嵌的样式，如`<div style="...."></div>`；

如果原先是通过外部或内部样式表定义css样式，必须使用`o.currentStyle[xxx] || document.defaultView.getComputedStyle(0)[xxx]`来获取样式值。

>**获取元素的位置信息**

- jQuery：

	$(o).offset().top元素距离文档顶的距离

	$(o).offset().left元素距离文档左边缘的距离

- 原生：

	getoffsetTop();