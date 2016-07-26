define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-tree-box">\
	<div class="tree-box" v-bind:style="{\'width\': boxWidth}">\
		<div class="tree-box-row clearfix" v-bind:class="classTab[$index]" v-for="item in list" >\
			<div class="tree-box-item" v-for="m in item" v-bind:style="{width: m.w}" title="{{m.text}}" >\
				<span @click="remove(m)">{{m.text}}</span>\
			</div>\
		</div>\
	</div>\
</template>');

var $ = require('jQuery');
var _ = require('underscore');
require("components/btn-select.vue");
var undefined;
var gcd = function (a,b){
	var min = Math.min(a, b), max = Math.max(a, b), i = min, res = 0;
	if (a == 0 || b == 0 || a == 1 || b == 1){
		return max;
	}
	for(; i <= max; i++) {
		res = min * i;
		if (res % max === 0) {
			return res;
		}
	}
};
var lcm = function (a, b) {
	var min = Math.min(a, b), max = Math.max(a, b), tmp;
	if (a == 1 || b == 1){
		return 1;
	}
	while (min != 0) {
		tmp =  max % min;
		if (tmp == 0) return min;
		max = min;
		min = tmp;
	}
}
var gcds = function (tab) {
	var tmp = 0, res = 0;
	for(var i = 0, len = tab.length; i < len; i++) {
		tmp = tab[i] * 1;
		res = gcd(res, tmp);
	}
	return res;
}
var lcms = function (tab){
	var tmp = 0, res = tab[0] * 1;
	for(var i = 1, len = tab.length; i < len; i++) {
		tmp = tab[i] * 1;
		res = lcm(res, tmp);
	}
	return res ;
}

var $itemTmp = $('<div class="tree-box-row " style="display: none;left: 100px;position: absolute;" ><div class="tree-box-item" style="padding: 0 10px;"></div></div>').appendTo('body');
var $text = $itemTmp.find('.tree-box-item');
var getWidth = (function () {
	$text.text('全');
	var w1Width = $itemTmp.width();
	$text.text('全部');
	var w2Width = $itemTmp.width();
	var wordWith = w2Width - w1Width;
	var marginWidth = w1Width - wordWith + 2;
	var reg = /^[\u4E00-\u9FA5]+$/;
	return function (text) {
		if (reg.test(text)) {
			return marginWidth + text.length * wordWith;
		} else {
			$text.text(text);
			return $itemTmp.width();
		}
	}
})();


exports = {
	props: ['treeMap', 'type', 'code'],
	data: function () {
		var name = this.treeMap[this.code].name;
		return {
			boxWidth: '100%',
			widthList: [getWidth(name)],
			list: [
				[{flex: 1, text: name, code: this.code, w: '100%'}]
			],
			classTab: ['orange2-skin-light', 'pink-skin-light', 'sky2-skin-light', 'purple-skin-light', 'green2-skin-light']
		}
	},
	methods: {
		remove: function (item) {
			var code = item.code == 'all' ? item._code : item.code;
			var node = this.treeMap[code];
			node.select = 'none';
			this.$dispatch('node-select', node , this.type);
		},
		resize: function () {
			var w = Math.floor(_.max(this.widthList));
			var maxWidth = $(this.$el).parent().parent().width();
			this.boxWidth = (w > maxWidth ? maxWidth: w) + 'px';
		},
		refresh: function (deep) {
			deep = deep || 1;//当前处理层数
			var treeMap = this.treeMap;
			var nums = [];
			var copies = [];
			var res = [];
			var wList = [];
			var hasSome = false;
			var list = this.list;
			if (deep == 1) {
				list[0][0].text = treeMap[this.code].name;
			}
			_.each(list[deep-1], function (item, group) {
				var pFlex = item.flex;
				var node = treeMap[item.code];
				if (item.code == 'all' || node.select == 'all' ) {
					//if (item.code != 'all') hasSome = true;
					nums.push(pFlex);
					copies.push(pFlex);
					res.push({text: '全部', code: 'all', flex: group, _code: node?node.code:item._code})
					wList[group] = getWidth('全部');
					return;
				}
				var childs = node.childs;
				
				var num = 0;
				_.each(childs, function (code) {
					var node = treeMap[code];
					if (node.select != 'none') {
						if (node.childs !== null) {
							hasSome = true;
						}	
						num++;
						res.push({text: node.name, code: node.code, flex: group})
						var w = getWidth(node.name);
						wList[group] = wList[group] || 0;
						if (w > wList[group]) {
							wList[group] = w;
						}
					}
				});
				copies.push(num);
				nums.push(pFlex/num);
			});
			var gxgys = gcds(copies);//最小公约数
			_.each(nums, function (n, index) {
				nums[index] = gxgys * nums[index];
			});
			var gdgbs = lcms(nums);//最大公倍数
			
			var totle = 0;
			var perWidth = 0;
			_.each(res, function (item) {
				var group = item.flex;
				var flex = nums[group]/gdgbs;
				var perw = wList[group]/flex
				item.flex = flex;
				totle += flex;
				if (perw > perWidth) {
					perWidth = perw;
				}
			});
			_.each(res, function (item) {
				item.w = (item.flex/totle*100) + '%';
			});
			var widthList = this.widthList;
			widthList[deep] = perWidth * totle;
			Vue.set(list, deep, res);
			
			if (hasSome) {
				this.refresh(deep + 1);
			} else {
				list.splice(deep + 1, 100);
				widthList.splice(deep + 1, 100);
				var w = Math.floor(_.max(widthList));
				var maxWidth = $(this.$el).parent().parent().width();
				this.boxWidth = (w > maxWidth ? maxWidth: w) + 'px';
			}
		}
	},
	events: {
		'box-change': function (type, code) {
			if (this.code == code)
				this.refresh();
		}
	},
	ready: function () {
		var self = this;
		this.refresh();
		var timer;
		$(window).on('resize', function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				self.resize();
			}, 200);
		});
		CUBE.vm.$watch('isWideContent', function (val) {
			clearTimeout(timer);
			timer = setTimeout(function () {
				self.resize();
			}, 600);
		})
	}
};
;
	exports.template = '#vue-tpl-tree-box';
	exports = Vue.extend(exports);
	Vue.component('tree-box', exports);
	return exports;
});