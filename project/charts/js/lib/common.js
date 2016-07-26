define(['Vue'], function (Vue) {
	/*var reg = /\/([^\/]+)\.vue$/
	require.reWriteExports = function (id, exports) {
		console.log(id);
		var match = id.match(reg);
		if (match) {
			exports = Vue.extend(exports);
			console.log(match[1]);
			Vue.component(match[1], exports);
		}
		return exports;
	};*/
	Vue.appendHTML = function (text) {
		document.body.insertAdjacentHTML('beforeEnd', text);
	};
	var style;
	var doc = document;
	Vue.appendCSS = function (text) {
		text = text + " ";
		if (!style) {
			var head = doc.getElementsByTagName("head")[0]; 
			var elms = head.getElementsByTagName("style"); 
			if (elms.length == 0) {
				if (doc.createStyleSheet) {
					doc.createStyleSheet(); 
				} else { 
					var tmp = doc.createElement('style');
					tmp.setAttribute("type", "text/css"); 
					head.appendChild(tmp); 
				}
				elms[0].setAttribute("media", "screen"); 
			} 
			style = elms[0];
		}
		if (style.styleSheet) {
			style.styleSheet.cssText += text; 
		} else if(doc.getBoxObjectFor) { 
			style.innerHTML += text;
		} else { 
			style.appendChild(doc.createTextNode(text)) 
		} 
	};
	Vue.transition('slide', {
		css: false,
		enter: function (el, done) {
			$(el).hide().slideDown(400, done)
		},
		enterCancelled: function (el) {
			$(el).stop()
		},
		leave: function (el, done) {
			$(el).slideUp(400, done)
		},
		leaveCancelled: function (el) {
			$(el).stop()
		}
	});
	

	Vue.directive('slide-box', {
		twoWay: true,
		params: ['boxWidth'],
		paramWatchers: {
			'boxWidth': function (w) {
				if (w > 0) {
					$(this.el).css('width', w)
							.find('.swiper-all')
								.css({
									'width': 3*w,
									transform: 'translate3d(-' + w + 'px, 0px, 0px)'
								})
								.find('.swiper-item').css('width', w);

					this.vm.slideBox = 'min';
				}	
			}
		},
		update: function (val, old) {
			var w = this.params['boxWidth'];
			if (w == 0) return;

			var map = {right: 2, min: 1, left: 0};
			var self = this;
			if (val == 'min') {
				$('.swiper-all', this.el).css({
					transform: 'translate3d(-' + map[val]*w + 'px, 0px, 0px)',
					'transition-duration': '0s'
				});
				self.vm.onView(val, 'show', old);
			} else {
				if (old != 'min') {
					this.set('min');
					return;
				}
				$('.swiper-all', this.el).css({
					transform: 'translate3d(-' + map[val]*w + 'px, 0px, 0px)',
					'transition-duration': '400ms'
				});	  
				setTimeout(function () {
					self.vm.onView(val, 'show');
				}, 400);
			}
		}
	});
});