import{_ as s,o as n,c as a,d as l}from"./app.acadfc2d.js";const i=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"designPattern/composite.md"}'),p={name:"designPattern/composite.md"},o=l(`<p>(参照命令模式单个组合对象)组合模式最大的优点在于可以一致地对待组合对象和基本对象</p><p>组合模式可以让我们使用树形方式创建对象的结构。我们可以把相同的操作应用在组合对象和单个对象上</p><p>组合模式并不是完美的，它可能会产生一个这样的系统：系统中的每个对象看起来都与其他对象差不多。它们的区别只有在运行的时候会才会显现出来，这会使代码难以理解。此外，如果通过组合模式创建了太多的对象，那么这些对象可能会让系统负担不起</p><ul><li>何时使用组合模式 组合模式如果运用得当，可以大大简化客户的代码。一般来说，组合模式适用于以下这 两种情况。 <ul><li>表示对象的部分-整体层次结构。组合模式可以方便地构造一棵树来表示对象的部 分-整体结构。特别是我们在开发期间不确定这棵树到底存在多少层次的时候。在 树的构造最终完成之后，只需要通过请求树的最顶层对象，便能对整棵树做统一 的操作。在组合模式中增加和删除树的节点非常方便，并且符合开放-封闭原则。</li><li>客户希望统一对待树中的所有对象。组合模式使客户可以忽略组合对象和叶对象 的区别，客户在面对这棵树的时候，不用关心当前正在处理的对象是组合对象还 是叶对象，也就不用写一堆if、else语句来分别处理它们。组合对象和叶对象会 各自做自己正确的事情，这是组合模式最重要的能力。</li></ul></li></ul><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">id</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">按我</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">body</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> MacroCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">			commandsList</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> []</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#82AAFF;">add</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;font-style:italic;">command</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">				</span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">commandsList</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">push</span><span style="color:#F07178;">( </span><span style="color:#A6ACCD;">command</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#82AAFF;">execute</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">				</span><span style="color:#89DDFF;font-style:italic;">for</span><span style="color:#F07178;"> ( </span><span style="color:#C792EA;">var</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">i</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#F78C6C;">0</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">command</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> </span><span style="color:#A6ACCD;">command</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">this.</span><span style="color:#A6ACCD;">commandsList</span><span style="color:#F07178;">[ </span><span style="color:#A6ACCD;">i</span><span style="color:#89DDFF;">++</span><span style="color:#F07178;"> ]</span><span style="color:#89DDFF;">;</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">					</span><span style="color:#A6ACCD;">command</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">execute</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">				</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> openAcCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#82AAFF;">execute</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">( </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">打开空调</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">/**********家里的电视和音响是连接在一起的，所以可以用一个宏命令来组合打开电视和打开音响的命令*********/</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> openTvCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#82AAFF;">execute</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">( </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">打开电视</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> openSoundCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#82AAFF;">execute</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">( </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">打开音响</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> macroCommand1 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MacroCommand</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	macroCommand1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">( openTvCommand )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	macroCommand1</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">( openSoundCommand )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">/*********关门、打开电脑和打登录QQ的命令****************/</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> closeDoorCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#82AAFF;">execute</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">( </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">关门</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> openPcCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#82AAFF;">execute</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">( </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">开电脑</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> openQQCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">		</span><span style="color:#82AAFF;">execute</span><span style="color:#89DDFF;">:</span><span style="color:#A6ACCD;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">console</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">log</span><span style="color:#F07178;">( </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">登录QQ</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#89DDFF;">};</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> macroCommand2 </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MacroCommand</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	macroCommand2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">( closeDoorCommand )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	macroCommand2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">( openPcCommand )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	macroCommand2</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">( openQQCommand )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">/*********现在把所有的命令组合成一个“超级命令”**********/</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> macroCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> </span><span style="color:#82AAFF;">MacroCommand</span><span style="color:#A6ACCD;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	macroCommand</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">( openAcCommand )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	macroCommand</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">( macroCommand1 )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	macroCommand</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">add</span><span style="color:#A6ACCD;">( macroCommand2 )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#676E95;font-style:italic;">/*********最后给遥控器绑定“超级命令”**********/</span></span>
<span class="line"><span style="color:#A6ACCD;">	</span><span style="color:#C792EA;">var</span><span style="color:#A6ACCD;"> setCommand </span><span style="color:#89DDFF;">=</span><span style="color:#A6ACCD;"> (</span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(</span><span style="color:#A6ACCD;"> </span><span style="color:#A6ACCD;font-style:italic;">command</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">){</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#A6ACCD;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">getElementById</span><span style="color:#F07178;">( </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> )</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">onclick</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">function</span><span style="color:#89DDFF;">(){</span></span>
<span class="line"><span style="color:#F07178;">			</span><span style="color:#A6ACCD;">command</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">execute</span><span style="color:#F07178;">()</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#F07178;">		</span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">	</span><span style="color:#89DDFF;">}</span><span style="color:#A6ACCD;">)( macroCommand )</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">html</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,5),t=[o];function e(c,r,F,D,y,A){return n(),a("div",null,t)}const m=s(p,[["render",e]]);export{i as __pageData,m as default};
