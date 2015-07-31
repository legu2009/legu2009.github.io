(function ($) {
	var slice = Array.prototype.slice;
	//showNum >= step
	var defaults = {
		index: 0,
		autoScroll: false,
		interval: 3000,
		step: 1,
		type: 1,
		speed: 1000,
		easing: 'linear',
		showNum: 1,
		marquee: false,
		state: 'scroll',
		scrollState: 'stop',
		direction: 'scrollLeft',
		firstInterval: 0,
		init: function () {},
		onScroll: function(){},
		onScrolled: function(){}
	}
	function PhotoScroll($wrapper, options) {
		this.$wrapper = $wrapper;
		var opt = this.options = options;
		
		var type = opt.type;
		var showNum = opt.showNum;
		
		var step = opt.step;
		var $items = $wrapper.find(opt.items);
		var itemLen = this.itemLen = $items.length;
		
		if (opt.direction == 'scrollLeft') {
			opt.stepLength = $items.outerWidth(true);
		} else {
			opt.stepLength = $items.outerHeight(true);
		}
		
		var stepLen = Math.ceil(itemLen/step);
		opt.totleIndex = stepLen * step ;
		
		
		//if (totleIndex + (showNum - step) - itemLen < step) {
			//options.totleIndex += showNum - step;
		//}
		//options.maxIndex = (Math.ceil(itemLen/showNum) - 1) * showNum;
		if (options.marquee && itemLen > showNum) {
			var $marquee = this.$wrapper.find(options.marquee);
			$marquee.children().clone().appendTo($marquee);
			options.totleIndex = itemLen * 2;
			type = opt.type = 2;
		} else {
			options.marquee = false;
		}
		
		var stepIndexs = [];
		for (var i = 0; i < stepLen; i++) {
			if (type == 2) {
				stepIndexs.push(i*step);
			} else {
				var f = itemLen - i * step - showNum;
				if (f > 0) {
					stepIndexs.push(i*step);
				} else if (f == 0) {
					stepIndexs.push(i*step);
					break;
				} else {
					stepIndexs.push(itemLen-showNum);
					break;
				}
			}
		}
		options.stepIndexs = stepIndexs;
		this.timeId = 0;
		this.init();
	}
	PhotoScroll.prototype = {
		init: function () {
			var opt = this.options;
			var self = this;
			opt.init.call(this);
			if (opt.autoScroll) {
				self.timeId = setTimeout(function () {
					self.next();
				}, opt.firstInterval||opt.interval);
			}
			opt.onScroll.call(this, opt.index);
		},
		off: function (index) {
			var opt = this.options;
			clearTimeout(self.timeId);
			if (typeof index != "undefined") {
				this.scroll(index, true);
			}
			opt.state = 'stop';
		},
		on: function () {
			var opt = this.options;
			var self = this;
			opt.state = 'scroll';
			if (opt.autoScroll) {
				clearTimeout(self.timeId);
				self.timeId = setTimeout(function () {
					self.next();
				}, opt.interval);
			}
		},
		scroll: function (num, isStop) {		
			isStop =  isStop || false;
			var opt = this.options;
			if ((opt.scrollState == 'scroll' && isStop == false) || opt.state == 'stop') return;
			
			var self = this;
			clearTimeout(self.timeId);
			opt.scrollState = 'scroll';
			var totleIndex = opt.totleIndex;
			var type = opt.type;
			var step = opt.step;

			var index = opt.index = (num + totleIndex)% totleIndex;
			var itemLen = this.itemLen;
			var showNum = opt.showNum;
			if (type == 1 && !opt.marquee) {
				var f1 = index + showNum - step - itemLen;
				var f = index + showNum - itemLen;
				if (f > 0) {
					if (f1 >= 0) {
						index = opt.index = 0;
					} else {
						index = opt.index = itemLen - showNum;
					}
				}
			}

			var parms = {};
			parms[opt.direction] = (index * opt.stepLength + 'px');

			var flag = false;
			if (opt.marquee && index >= totleIndex/2) {
				index = opt.index = index - totleIndex/2;
				flag = true;
			}
			opt.onScroll.call(self, index);
			this.$wrapper.animate(parms, opt.speed, opt.easing, function () {
				opt.scrollState = 'stop';
				if (flag) {
					self.$wrapper[0][opt.direction] = index * opt.stepLength;
				}
				if (opt.autoScroll && (isStop == false || opt.state == 'scroll')) {
					clearTimeout(self.timeId);
					self.timeId = setTimeout(function () {
						self.next();
					}, opt.interval);
				}
				opt.onScrolled.call(self, index);
			})
		},
		next: function () {
			this.scroll(this.options.index + this.options.step);
		},
		prev: function () {
			this.scroll(this.options.index - this.options.step);
		},
		options: function (opt) {
			if (typeof opt == "object" ) {
				$.extend(this.options, opt);
			} else {
				return this.options[opt];
			}
		}
	}
	$.fn.photoScroll = function (options) {
		var args = slice.call(arguments, 1);
		var res;
		var flag = false;
		this.each(function () {
			var $elm = $(this);
			var photoScroll = $elm.data('photoScroll');
			if (typeof options == "string" ) {
				if (photoScroll && photoScroll[options]) {
					var opt = photoScroll[options];
					if ($.isFunction(opt)) {
						res = opt.apply(photoScroll, args);
						if (res !== undefined) {
							flag = true;
							return true;
						}
					} else {
						if (args.length == 0) {
							res = opt;
							flag = true;
							return true;
						} else if (args.length == 1) {
							photoScroll[options] = args[0];
						}
					}
				}
			} else {
				$elm.data('photoScroll', new PhotoScroll($elm, $.extend({}, defaults, options)));
			}
		})
		if (flag) {
			return res;
		} else {
			return this;
		}	
	}
})(jQuery);