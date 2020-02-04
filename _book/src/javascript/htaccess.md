---
title: .htaccess文件详解
date: 2018-01-06 21:32:40
tags: 服务器
---
>**.htaccess的基本作用**

.htaccess是一个纯文本文件，它里面存放着Apache服务器配置相关的指令。

.htaccess主要的作用有：<strong>URL重写、自定义错误页面、MIME类型配置以及访问权限控制等</strong>。

主要体现在伪静态的应用、图片防盗链、自定义404错误页面、阻止/允许特定IP/IP段、目录浏览与主页、禁止访问指定文件类型、文件密码保护等。
       
.htaccess的用途范围主要针对当前目录。

>**如何启用.htaccess的配置**

启用.htaccess，需要修改httpd.conf文件，启用AllowOverride，并可以用AllowOverride限制特定命令的使用。

	<Directory />
	Options FollowSymLinks
	AllowOverride None
	</Directory>

改为：

	<Directory />
	Options FollowSymLinks
	AllowOverride All
	</Directory>

如果需要使用.htaccess以外的其他文件名，可以用AccessFileName指令来改变。例如，需要使用.config ，则可以在服务器配置文件中按以下方法配置：

	AccessFileName .config

>**.htaccess访问控制**

限制用户访问一些关键目录

	<Files  ~ "^.*\.([Ll][Oo][Gg])|([eE][xX][eE])">
	 Order allow,deny
	 Deny from all
	</Files>

- Files后的波浪线表示启用“正则表达式”
- Order命令：通过Allow,Deny参数，Apache首先找到并应用Allow命令，然后应用Deny命令，以阻止所有访问，也可以使用Deny,Allow

>**URL重写**

	# 将 RewriteEngine 模式打开 
	RewriteEngine On 
	# Rewrite 系统规则请勿修改 
	RewriteRule ^p/([0-9]+)\.html$ index.php?post_id=$1
	RewriteRule ^u-(username|uid)-(.+)\.html$ space.php?$1=$2

>**配置错误页面**

	# custom error documents
	ErrorDocument 401 /err/401.php
	ErrorDocument 403 /err/403.php
	ErrorDocument 404 /err/404.php
	ErrorDocument 500 /err/500.php

>**常用命令及配置**

- 禁止显示目录列表

有些时候，由于某种原因，你的目录里没有index文件，这意味着当有人在浏览器地址栏键入了该目录的路径，该目录下所有的文件都会显示出来，这会给你的网站留下安全隐患。

为避免这种情况（而不必创建一堆的新index文件），你可以在你的.htaccess文档中键入以下命令，用以阻止
目录列表的显示：

	Options -Indexes

- 阻止/允许特定的IP地址

某些情况下，你可能只想允许某些特定IP的用户可以访问你的网站，或者想封禁某些特定的IP地址（例如：将低级用户隔离于你的信息版面外）。当然，这只在你知道你想拦截的IP地址时才有用，然而现在网上的大多数用户都使用动态IP地址，所以这并不是限制使用的常用方法。

使用以下命令封禁一个IP地址(只指明了其中的几个，则可以封禁整个网段的地址)：

	deny from 000.000.000.000

使用以下命令允许一个IP地址访问网站(只指明了其中的几个，则可以允许整个网段的地址)：

	allow from 000.000.000.000

阻止所有人访问该目录，则可以使用(并不影响脚本程序使用这个目录下的文档)：

	deny from all

- 替换index文件

也许你不想一直使用index.htm或index.html作为目录的索引文件。如果你的站点使用PHP文件，你可能会想使用 index.php来作为该目录的索引文档。当然也不必局限于“index”文档，如果你愿意，使用.htaccess你甚至能够设置 foofoo.balh来作为你的索引文档！

这些互为替换的索引文件可以排成一个列表，服务器会从左至右进行寻找，检查哪个文档在真实的目录中存在。如果一个也找不到，它将会把目录列表显示出来（除非你已经关闭了显示目录文件列表）。

	DirectoryIndex index.php index.php3 messagebrd.pl index.html index.htm

- 重定向(rewrite)

.htaccess 最有用的功能之一就是将请求重定向到同站内或站外的不同文档。这在你改变了一个文件名称，但仍然想让用户用旧地址访问到它时，变的极为有用。另一个应用是重定向到一个长URL。以下是一个重定向文件的例子：

	Redirect /location/from/root/file.ext http:///new/file/location.xyz

你也可以使用.htaccess重定向整个网站的目录。假如你的网站上有一个名为olddirectory的目录，并且你已经在一个新网站http: ///newdirectory/上建立了与上相同的文档，你可以将旧目录下所有的文件做一次重定向而不必一一声明：

	Redirect /olddirectory http:　///newdirectory

>**安全配置**

- .htaccess链接盗用保护


	RewriteBase /  
	RewriteCond %{HTTP_REFERER} !^$  
	RewriteCond %{HTTP_REFERER} !^http://(www.)?aqee.net/.*$ [NC]  
	RewriteRule .(gif|jpg|swf|flv|png)$ /feed/ [R=302,L] 


- 防黑客


	RewriteEngine On  

	#proc/self/environ
	RewriteCond %{QUERY_STRING} proc/self/environ [OR]  

	#阻止脚本企图通过URL修改mosConfig值  
	RewriteCond %{QUERY_STRING} mosConfig_[a-zA-Z_]{1,21}(=|%3D) [OR]  

	#阻止脚本通过URL传递的base64_encode垃圾信息  
	RewriteCond %{QUERY_STRING} base64_encode.*(.*) [OR]  

	#阻止在URL含有<script>标记的脚本  
	RewriteCond %{QUERY_STRING} (<|%3C).*script.*(>|%3E) [NC,OR]  

	#阻止企图通过URL设置PHP的GLOBALS变量的脚本  
	RewriteCond %{QUERY_STRING} GLOBALS(=|[|%[0-9A-Z]{0,2}) [OR]  

	#阻止企图通过URL设置PHP的_REQUEST变量的脚本  
	RewriteCond %{QUERY_STRING} _REQUEST(=|[|%[0-9A-Z]{0,2})  

	#把所有被阻止的请求转向到403禁止提示页面！  
	RewriteRule ^(.*)$ index.php [F,L] 


- 阻止访问你的 .htaccess 文件或者指定类型的文件


	# 保护你的 htaccess 文件  
	<Files .htaccess>  
	order allow,deny  
	deny from all  
	</Files>  

	# 阻止查看指定的文件  
	<Files secretfile.jpg>  
	order allow,deny  
	deny from all  
	</Files>  

	# 多种文件类型  
	<FilesMatch “.(htaccess|htpasswd|ini|phps|fla|psd|log|sh)$”>  
	 Order Allow,Deny  
	Deny from all  
	</FilesMatch>


- 禁止脚本执行


	# 禁止某些目录里的脚本执行权限  
	AddHandler cgi-script .php .pl .py .jsp .asp .htm .shtml .sh .cgi  
	Options -ExecCGI


>**其他常用配置**

- 屏蔽下载对话框


	AddType application/octet-stream .pdf  
	AddType application/octet-stream .zip  
	AddType application/octet-stream .mov 


- 省去www前缀


	RewriteEngine On  
	RewriteBase /  
	RewriteCond %{HTTP_HOST} ^www.aqee.net [NC]  
	RewriteRule ^(.*)$ http://aqee.net/$1 [L,R=301]


- 压缩文件


	# 压缩 text, html, javascript, css, xml:  
	AddOutputFilterByType DEFLATE text/plain  
	AddOutputFilterByType DEFLATE text/html  
	AddOutputFilterByType DEFLATE text/xml  
	AddOutputFilterByType DEFLATE text/css  
	AddOutputFilterByType DEFLATE application/xml  
	AddOutputFilterByType DEFLATE application/xhtml+xml  
	AddOutputFilterByType DEFLATE application/rss+xml  
	AddOutputFilterByType DEFLATE application/javascript  
	AddOutputFilterByType DEFLATE application/x-javascript 


- 缓存文件


	<FilesMatch “.(flv|gif|jpg|jpeg|png|ico|swf|js|css|pdf)$”>  
	Header set Cache-Control “max-age=2592000″  
	</FilesMatch> 


- 对某些文件类型禁止使用缓存


	# 显式的规定对脚本和其它动态文件禁止使用缓存  
	<FilesMatch “.(pl|php|cgi|spl|scgi|fcgi)$”>  
	Header unset Cache-Control  
	</FilesMatch> 