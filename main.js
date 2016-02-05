	/* lazyload.js (c) Lorenzo Giuliani
	 * MIT License (http://www.opensource.org/licenses/mit-license.html)
	 *
	 * expects a list of:  
	 * `<img src="blank.gif" data-src="my_image.png" width="600" height="400" class="lazy">`
	 */
function ScrollTA(selector) {
	this.loc = selector;
    this.$q = function(q, res) {
        if (document.querySelectorAll) {
            res = document.querySelectorAll(q);
        } else {
            var d = document,
                a = d.styleSheets[0] || d.createStyleSheet();
            a.addRule(q, 'f:b');
            for (var l = d.all, b = 0, c = [], f = l.length; b < f; b++)
                l[b].currentStyle.f && c.push(l[b]);

            a.removeRule(0);
            res = c;
        }
        return res;
    };
    this.addEventListener = function(evt, fn) {
        window.addEventListener ? this.addEventListener(evt, fn, false) : (window.attachEvent) ? this.attachEvent('on' + evt, fn) : this['on' + evt] = fn;
    };
    this._has = function(obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };

    this.loadImage = function(el, fn) {
	    var src = el.getAttribute('data-src');
    	if (false) {
	        var img = new Image();
	        img.onload = function() {
	            if (!!el.parent)
	                el.parent.replaceChild(img, el)
	            else
	                el.src = src;

	            fn ? fn() : null;
	        }
	        img.src = src;
    	} else {
    		el.src = src;
    	};
    }

    this.elementInViewport = function (el) {
        var rect = el.getBoundingClientRect()
        console.log(rect.top);

    	if (this.loc == "before") {
    		console.log('before');
        	return ( rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) )
    	} else if (this.loc == "after"){
    		console.log('after');
        	return ( rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) )
    	}else{
    		console.log('else');
        	return ( rect.top >= 0 && rect.left >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) )
    	};
    };

    //var images = new Array();
    //var query = this.$q('img.lazy');
    this.processScroll = function(images) {
        for (var i = 0; i < images.length; i++) {
            if (this.elementInViewport(images[i])) {
                this.loadImage(images[i], function() {
                    images.splice(i, i);
                });
            }
        };
    };
    this.createArray = function(selector) {
		var images = new Array();
		var query = testScrolEvent.$q(selector);
		for (var i = 0; i < query.length; i++) {
		    images.push(query[i]);
		};
		console.log(images);
		return images;
	}
    // Array.prototype.slice.call is not callable under our lovely IE8
    //for (var i = 0; i < query.length; i++) {
    //    images.push(query[i]);
    //};
    //addEventListener('scroll', last_img);
}

var testScrolEvent = new ScrollTA("after");
testScrolEvent.processScroll(testScrolEvent.createArray('.lazy'));

$.fn.scrollStopped = function(callback) {
  var that = this, $this = $(that);
  $this.scroll(function(ev) {
    clearTimeout($this.data('scrollTimeout'));
    $this.data('scrollTimeout', setTimeout(callback.bind(that), 1000, ev));
  });
};
$(window).scrollStopped(function(ev){
  	$('body').append('<img src="" class="lazy" data-src="http://www.wallpapereast.com/static/images/skull-wallpaper-3.jpg" width="240" height="152">');
  	testScrolEvent.processScroll(testScrolEvent.createArray('.lazy'));
});