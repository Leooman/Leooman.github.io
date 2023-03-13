import{_ as t,o as e,c as a,d as n}from"./app.14d12b95.js";const h=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"doc/pattern.md"}'),p={name:"doc/pattern.md"},o=n(`<blockquote><p>预查（零宽断言）</p></blockquote><table><thead><tr><th>正则表达式</th><th>代表含义</th></tr></thead><tbody><tr><td>(?=pattern)</td><td>正向先行预查 代表字符串中的一个位置，紧接该位置之<em>后</em>的字符序列能够匹配pattern</td></tr><tr><td>(?&lt;=pattern)</td><td>正向后行预查 代表字符串中的一个位置，紧接该位置之<em>前</em>的字符序列能够匹配pattern</td></tr><tr><td>(?!pattern)</td><td>反向先行预查 代表字符串中的一个位置，紧接该位置之<em>后</em>的字符序列不能匹配pattern</td></tr><tr><td>(?&lt;!pattern)</td><td>反向后行预查 代表字符串中的一个位置，紧接该位置之<em>前</em>的字符序列不能匹配pattern</td></tr></tbody></table><p>先行预查和后行预查如同&#39;^&#39;表示开头，&#39;$&#39;表示结尾，&#39;\\b&#39;表示单词边界一样，只匹配位置，在匹配过程中不占用字符。位置是指字符串中(每行)第一个字符的左边、最后一个字符的右边以及相邻字符的中间（假设文字方向是头左尾右）</p><ul><li>正向(positive)和反向(negative)</li></ul><p>反向和正向的区别，就在于该位置之后的字符能否匹配括号中的表达式，正向就表示匹配括号中的表达式，反向表示不匹配</p><ul><li>先行(lookahead)和后行(lookbehind)</li></ul><p>正则表达式引擎在执行字符串和表达式匹配时，会从头到尾（从前到后）连续扫描字符串中的字符，设想有一个扫描指针指向字符边界处并随匹配过程移动。</p><p>先行断言，是当扫描指针位于某处时，引擎会尝试匹配指针还未扫过的字符，先于指针到达该字符，故称为先行。</p><p>后行断言，引擎会尝试匹配指针已扫过的字符，后于指针到达该字符，故称为后行</p><blockquote><p>(?:pattern)和(?=pattern)</p></blockquote><ul><li>共同点</li></ul><p><code>(?:pattern)</code> 与 <code>(?=pattern)</code>都匹配pattern，但不会把pattern结果放到Matches的集合中。</p><ul><li>区别</li></ul><p>(?:pattern)<code> 匹配得到的结果包含pattern，</code>(?=pattern)\` 则不包含。如：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#A6ACCD;">对字符串：&quot;industry abc&quot;的匹配结果：</span></span>
<span class="line"><span style="color:#A6ACCD;">industr(?:y|ies) ---&gt; &quot;industry&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">industr(?=y|ies) ---&gt; &quot;industr&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span></code></pre></div><ul><li><p>是否消耗字符 <code>(?:pattern)</code> 消耗字符，下一字符匹配会从已匹配后的位置开始。 <code>(?=pattern)</code> 不消耗字符，下一字符匹配会从预查之前的位置开始。 即后者只预查，不移动匹配指针</p><p><img src="https://img-blog.csdn.net/20180420160417363?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3NoYXNoYWdjc2Ru/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" alt="正则表达式非获取匹配"></p></li></ul>`,16),s=[o];function l(r,d,c,i,u,_){return e(),a("div",null,s)}const b=t(p,[["render",l]]);export{h as __pageData,b as default};
