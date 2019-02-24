$(document).ready(function($) {
    "use strict";

    $(window).scroll(function () {
        if ($(document).scrollTop() > 10) {
            $(".lightnav .navbar-inner").addClass("lightnav-alt");
            $(".darknav .navbar-inner").addClass("darknav-alt");
        } else {
            $(".lightnav .navbar-inner").removeClass("lightnav-alt");
            $(".darknav .navbar-inner").removeClass("darknav-alt");
        }
    });

    console.log($("#footer_container").outerHeight())
    console.log($(window).height())
    if($("#footer_container").offset().top < ($(window).height() - $("#footer_container").outerHeight())){
    	$("#footer_container").css({
    		position:'fixed',
    		bottom:0,
    		width:"100%"
    	})
    }

	$(document).ready(function($) {

		// Slidebars off-canvas menu
		$.slidebars();

		// Popovers [Hover]
		$("[data-toggle=popover]")
			.popover({
				html:true
			}
		);

		$("html").niceScroll({
			smoothscroll: true, // scroll with ease movement
			autohidemode: false,
			zindex: "100", // change z-index for scrollbar div
        	scrollspeed: 60, // scrolling speed
        	mousescrollstep: 40,
        	gesturezoom: false,
        	horizrailenabled: false,
        	cursorcolor: "#151515",
	        boxzoom: false,
	        cursorborder: "0 solid #202020",
	        cursorborderradius: "5px",
	        cursorwidth: 9,
	        enablemousewheel: true,
	        background: "rgba(255,255,255,0.7)",
		});

		// Page transitions
		$(".animsition").animsition({

			inClass               :   'fade-in',
			outClass              :   'fade-out-down-sm',
			inDuration            :    900,
			outDuration           :    800,
			linkElement           :   '.animsition-link',
			//e.g. linkElement   :   'a:not([target="_blank"]):not([href^=#])'
			loading               :    true,
			loadingParentElement  :   'body', //animsition wrapper element
			loadingClass          :   'animsition-loading',
			unSupportCss          : [ 'animation-duration',
			                          '-webkit-animation-duration',
			                          '-o-animation-duration'
			                        ],
			//"unSupportCss" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
			//The default setting is to disable the "animsition" in a browser that does not support "animation-duration".

			overlay               :   false,

			overlayClass          :   'animsition-overlay-slide',
			overlayParentElement  :   'body'
		});

		// WOW plugin settings
        var wow = new WOW(
          { animateClass: 'animated', // set our global css classT (default is animated)
            offset: 250, // set distance to content until it triggers (default is 0)
            mobile: false, // remove animations for mobiles/tablets (default is true)
            live: true }); // act on asynchronously loaded content (default is true)
        new WOW().init();

		// Functionailty constraints for mobile
		if (!Modernizr.touch) {
		    jQuery(function ($) {
		        // Hero & page-header fade-in effect
		        var divs = $('.herofade');
		        $(window).on('scroll', function () {
		            var st = $(this).scrollTop();
		            divs.css({
		                'margin-top': -(st / 0) + "px",
                    'opacity': 0
		                // 'opacity': 0.9 - st / 1600
		            });
		        });
		    });

		    jQuery(function ($) {
		        // Hero & page-header fade-in effect
		        var divs = $('.videofade');
		        $(window).on('scroll', function () {
		            var st = $(this).scrollTop();
		            divs.css({
		                'margin-top': -(st / 0) + "px",
		                'opacity': 0.8 - st / 1600
		            });
		        });
		    });

		    jQuery(function ($) {
		        // Hero & page-header fade-in effect
		        var divs = $('.headerfade');
		        $(window).on('scroll', function () {
		            var st = $(this).scrollTop();
		            divs.css({
		                'margin-top': -(st / 0) + "px",
		                'opacity': 0.9 - st / 300
		            });
		        });
		    });
		}

		// autohide navbar on scroll
		$("div.navbar-fixed-top").autoHidingNavbar({
			animationDuration: 400,
			hideOffset: 0,
		});

		// faq's floating sidebar (left)
	    $('#sidebar').affix({
	    	offset: {
	    		top: 500
	    	}
		});

	    // Scrollspy for scrollto links in floating faq sidebar
		var $body   = $(document.body);
		var navHeight = $('.navbar').outerHeight(true) + 80;

		$body.scrollspy({
			target: '#leftcol',
			offset: navHeight
		});

		// fade out map cover (contact.html)
	    $(".map-cover").click(function () {
	        $(".map-cover").fadeOut("slow");
	    });

		// Collapsible panels for faq's and careers
	    $('.collapse').on('show.bs.collapse', function() {
	        var id = $(this).attr('id');
	        $('a[href="#' + id + '"]').closest('.panel-heading').addClass('active-panel');
	        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-chevron-up"></i>');
	    });
	    $('.collapse').on('hide.bs.collapse', function() {
	        var id = $(this).attr('id');
	        $('a[href="#' + id + '"]').closest('.panel-heading').removeClass('active-panel');
	        $('a[href="#' + id + '"] .panel-title span').html('<i class="glyphicon glyphicon-chevron-down"></i>');
	    });

	    /*!
	     * IE10 viewport hack for Surface/desktop Windows 8 bug
	     * Copyright 2014 Twitter, Inc.
	     * Licensed under the Creative Commons Attribution 3.0 Unported License. For
	     * details, see http://creativecommons.org/licenses/by/3.0/.
	     */
	    // See the Getting Started docs for more information:
	    // http://getbootstrap.com/getting-started/#support-ie10-width
	    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
	        var msViewportStyle = document.createElement('style');
	        msViewportStyle.appendChild(
	            document.createTextNode(
	                '@-ms-viewport{width:auto!important}'
	            )
	        );
	        document.querySelector('head').appendChild(msViewportStyle);
	    }

	}); // Document Ready

}(jQuery)); // End "use strict"

// Enable dropdown sub-menus in off-canvas navigation
$(document).ready(function($) {
	$('.sb-toggle-submenu').off('click') // Stop submenu toggle from closing Slidebars.
		.on('click', function() {
			$submenu = $(this).parent().children('.sb-submenu');
			$(this).add($submenu).toggleClass('sb-submenu-active'); // Toggle active class.

			if ($submenu.hasClass('sb-submenu-active')) {
			$submenu.slideDown(200);
			} else {
			$submenu.slideUp(200);
		}
	});
		
});

// 搜索函数 
		var searchFunc = function (path, search_id, content_id) {
		  var BTN = "<i id='local-search-close'>x</i>";
		  $.ajax({
		    url: path,
		    dataType: "xml",
		    success: function (xmlResponse) {
		      // get the contents from search data
		      var datas = $("entry", xmlResponse).map(function () {
		        return {
		          title: $("title", this).text(),
		          content: $("content", this).text(),
		          url: $("url", this).text()
		        };
		      }).get();

		      var $input = document.getElementById(search_id);
		      var $resultContent = document.getElementById(content_id);

		      $input.addEventListener('input', function () {
		        var str = '<ul class=\"search-result-list\">';
		        var keywords = this.value.trim().toLowerCase().split(/[\s\-]+/);
		        $resultContent.innerHTML = "";
		        if (this.value.trim().length <= 0) {
		          return;
		        }
		        // perform local searching
		        datas.forEach(function (data) {
		          var isMatch = true;
		          var content_index = [];
		          if (!data.title || data.title.trim() === '') {
		            data.title = "Untitled";
		          }
		          var data_title = data.title.trim().toLowerCase();
		          var data_content = data.content.trim().replace(/<[^>]+>/g, "").toLowerCase();
		          var data_url = decodeURIComponent(data.url);
		          var index_title = -1;
		          var index_content = -1;
		          var first_occur = -1;
		          // only match artiles with not empty contents
		          if (data_content !== '') {
		            keywords.forEach(function (keyword, i) {
		              index_title = data_title.indexOf(keyword);
		              index_content = data_content.indexOf(keyword);

		              if (index_title < 0 && index_content < 0) {
		                isMatch = false;
		              } else {
		                if (index_content < 0) {
		                  index_content = 0;
		                }
		                if (i == 0) {
		                  first_occur = index_content;
		                }
		                // content_index.push({index_content:index_content, keyword_len:keyword_len});
		              }
		            });
		          } else {
		            isMatch = false;
		          }
		          // show search results
		          if (isMatch) {
		            str += "<li><a href='" + data_url + "' class='search-result-title' style='text-transform:uppercase;'>" + data_title + "</a>";
		            var content = data.content.trim().replace(/<[^>]+>/g, "");
		            if (first_occur >= 0) {
		              // cut out 100 characters
		              var start = first_occur - 20;
		              var end = first_occur + 80;

		              if (start < 0) {
		                start = 0;
		              }

		              if (start == 0) {
		                end = 100;
		              }

		              if (end > content.length) {
		                end = content.length;
		              }

		              var match_content = content.substr(start, end);

		              // highlight all keywords
		              keywords.forEach(function (keyword) {
		                var regS = new RegExp(keyword, "gi");
		                match_content = match_content.replace(regS, "<em class=\"search-keyword\" style=\"font-weight:bold;\">" + keyword + "</em>");
		              });

		              str += "<p class=\"search-result\" style=\"font-size:12px;line-height:20px;color:#baa;\">" + match_content + "...</p>"
		            }
		            str += "</li>";
		          }
		        });
		        str += "</ul>";
		        if (str.indexOf('<li>') === -1) {
		          return $resultContent.innerHTML = BTN + "<ul><span class='local-search-empty'>No search to content~<span></ul>";
		        }
		        $resultContent.innerHTML = BTN + str;
			    
		      });
		      
		    }
		  });
		  $('#local-search-result').on('click','#local-search-close',function(){
				    $('#local-search-input').val('');
				    $('#local-search-result').html('');
				})
		}
// 判断设备
var isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
  }
};

if ($('.local-search').size() && !isMobile.any()) {
    searchFunc("/search.xml", 'local-search-input', 'local-search-result');
}
