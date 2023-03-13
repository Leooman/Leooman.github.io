import{_ as s,c as n,o as a,a as o}from"./app.04bd075c.js";const i=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"designPattern/factory.md"}'),l={name:"designPattern/factory.md"},p=o(`<div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#676E95;font-style:italic;">// //工厂模式</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// //虽然解决了创建多个相似对象的问题，但却没有解决对象识别的问题（即怎样知道一个对象的类型）</span></span>
<span class="line"><span style="color:#C792EA;">function</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createPerson</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;font-style:italic;">name</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;font-style:italic;">age</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;font-style:italic;">job</span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">o</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">new</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">Object</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">o</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">name</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">o</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">age</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">age</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">o</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">job</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">job</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#A6ACCD;">o</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">sayName</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">        </span><span style="color:#82AAFF;">alert</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">name</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">o</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> person1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createPerson</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Nicholas</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">29</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Software Engineer</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> person2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">createPerson</span><span style="color:#A6ACCD;">(</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Greg</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#F78C6C;">27</span><span style="color:#89DDFF;">,</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Doctor</span><span style="color:#89DDFF;">&quot;</span><span style="color:#A6ACCD;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(person1</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Object)</span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#A6ACCD;">(person2</span><span style="color:#89DDFF;">.</span><span style="color:#A6ACCD;">constructor </span><span style="color:#89DDFF;">===</span><span style="color:#A6ACCD;"> Object)</span><span style="color:#676E95;font-style:italic;">//true</span></span>
<span class="line"></span></code></pre></div>`,1),e=[p];function t(c,r,y,D,F,A){return a(),n("div",null,e)}const _=s(l,[["render",t]]);export{i as __pageData,_ as default};