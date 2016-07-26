define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-btn-select">\
	<div class="btn-group btn-group-select" v-bind:class="skinSelect">\
		<button type="button"  @click="toggle" class="dropdown-toggle btn btn-white select-btn right" v-bind:class="skin">{{selectName}}<b class="fa fa-caret-down"></b><span class="arrow"></span></button>\
		<span class="select2-container select2-container--default select2-container--open" style="position: absolute; top: 34px; left: 10px; right: 10px;" v-show="isShow">\
			<span class="select2-dropdown select2-dropdown--below" v-bind:style="{\'min-width\': minWidth + \'px\'}">\
				<span class="select2-search select2-search--dropdown">\
					   <input class="select2-search__field" v-model="filter"  @keydown="filterKeyDown" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" >\
				 </span>\
				<span class="select2-results">\
					<ul class="select2-results__options">\
						<li class="select2-results__option" role="group" >\
							<!--strong class="select2-results__group">Pacific Time Zone</strong-->\
							<ul class="select2-results__options select2-results__options--nested">\
								<li class="select2-results__option" aria-selected="true" \
									v-bind:class="{\'select2-results__option--highlighted\': $index == highlightIndex, \'select2-results__option--selected\': item.select == \'all\', \'select2-results__option--some\': item.select == \'some\'}" \
									v-for="item in results" \
									@click="expand(item, true, $event)" \
								><span class="lbl" @click="selectAll(item, true)" v-if="isMultiple||isLeaf"></span>{{item.name}}</li>\
							</ul>\
						</li>\
					</ul>\
				</span>\
			</span>\
		</span>\
	</div>\
</template>');

var $ = require('jQuery');
var _ = require('underscore');
var pinyin = require('pinyin');
var undefined;
var KEY = {
	UP: 38,
	DOWN: 40,
	DEL: 46,
	TAB: 9,
	RETURN: 13,
	ESC: 27,
	COMMA: 188,
	PAGEUP: 33,
	PAGEDOWN: 34,
	BACKSPACE: 8
};
    
var $selectTmp = $('<span class="select2-container select2-container--default select2-container--open" style="display: none;left: -3000px;position: absolute;">\
	<ul class="select2-results__options">\
		<li class="select2-results__option" role="group">\
			<ul class="select2-results__options select2-results__options--nested">\
			<li class="select2-results__option" aria-selected="true">\
				<span class="lbl"></span><span class="select-tmp-text" ></span>\
			</li>\
			</ul>\
		</li>\
	</ul>\
</span>').appendTo('body');
var $text = $selectTmp.find('.select-tmp-text');


exports = {
	props: {
		type: String,
		pCode: String,
		treeMap: Object,
		selectCode: String,
		isLeaf: {
			default: false
		},
		index: {
			default: 0
		},
		selectName: {
			default: '请选择'
		}
	},
	data: function () {
		var map = ['orange2-skin', 'pink-skin', 'sky2-skin', 'purple-skin', 'green2-skin'];
		var skin = map[this.index%map.length] + (this.index?' btn-middle': ' btn-begin');
		return {
			isShow: false,
			filter: '',
			highlightIndex: -1,
			results: [],
			ajaxResult: [],
			skin: skin,
			minWidth: 100,
			isMultiple: this.type != 'Content',
			skinSelect: map[this.index%map.length]+'-select'
		}
	},
	watch: {
		isShow: function (v) {
			if (v) {
				this.$nextTick(function () {
					this.$el.querySelector('.select2-search__field').focus();
					this.getHasScroll();
				})
			}
		},
		filter: function (val) {
			if (!val) {
				this.results = this.ajaxResult
			} else {
				this.results = _.filter(this.ajaxResult, function(item){
					return item.name.indexOf(val) != -1 || item.pinyin.indexOf(val) != -1; 
				});
			}
			this.highlightIndex = -1;
			this.$el.querySelector('.select2-results__options').scrollTop = 0;
			this.hasScroll = undefined;
			this.$nextTick(function () {
				this.getHasScroll();				
			})
		}
	},
	methods: {
		toggle: function () {
			this.isShow = !this.isShow;
		},
		expand: function (node, isClick, event) {
			if (!event || event.target.tagName == 'LI') {
				if (this.isLeaf) {
					this.selectAll(node, isClick, event)
				} else {
					if (this.isLeaf) {
						this.skin = this.skin.replace('btn-middle', 'btn-end');
					} else {
						this.skin = this.skin.replace('btn-end', 'btn-middle');
					}
					this.selectCode = node.code;
					this.selectName = node.name;
					if (isClick)
						this.isShow = false;
					this.$dispatch('item-select', this, 'expand', node);
				}
				this.$el.querySelector('.select-btn').focus();
			}
		},
		selectAll: function (node, isClick) {			
			node.select = node.select == 'all'? 'none' : 'all';
			
			/*if (!this.isMultiple) {
				if (node.select == 'all') {
					var treeMap = this.treeMap;
					_.each(treeMap[node.pCode].childs, function (code) {
						if (code != node.code) {
							treeMap[code].select = 'none';
						}
					});
				}			
			}*/
			if (node.select == 'all') {
				this.selectCode = node.code;
				this.selectName = node.name + (this.isLeaf ? '' : '(all)');
				this.skin = this.skin.replace('btn-middle', '') + ' btn-end';
			} else {
				this.selectCode = "";
				this.selectName = '请选择';
				if (this.isLeaf) {
					this.skin = this.skin.replace('btn-middle', 'btn-end');
				} else {
					this.skin = this.skin.replace('btn-end', 'btn-middle');
				}
			}
			if (isClick)
				this.isShow = false;
				
			this.$dispatch('node-select', node , this.type);
			this.$dispatch('item-select', this, 'selectAll');
			
			/*
			if (this.isMultiple) {
				results[index].select = !results[index].select;
				var ids = [], names = [];
				var models = [];
				_.each(this.ajaxResult, function (m) {
					if (m.select) {
						names.push(m.name);
						models.push(m);
					}
				})	
				this.selectName = names.join(' , ') || "请选择";
				this.selectModels = models;
			} else {
				this.selectModels[0] = results[index];
				var id  = results[index].id;
				this.selectName = results[index].name;
				_.each(this.ajaxResult, function (item, i) {
					item.select = item.id == id;
				})
				if (isClick) {
					this.isShow = false;
				}
				this.$el.querySelector('.select-btn').focus();
			}*/
			//this.$dispatch('item-select', this);
		},
		filterKeyDown: function (event) {
			var keyCode = event.keyCode || event.which || event.charCode;
			
			var highlightIndex = this.highlightIndex;
			var length = this.results.length;
			switch(keyCode) {
				case KEY.UP:
					highlightIndex = highlightIndex -2;
				case KEY.DOWN:
					highlightIndex++;
					this.highlightIndex =  (highlightIndex + length) % length;
					if (this.hasScroll) {
						var list = this.$el.querySelector('.select2-results__options');
						list.scrollTop = list.querySelectorAll('.select2-results__option')[this.highlightIndex].offsetTop;	
					}
					break;
				case KEY.RETURN:
					this.expand(this.results[this.highlightIndex]);
					break;
				case KEY.ESC:
					this.isShow = false;
					this.$el.querySelector('.select-btn').focus();
					break;	
			}
		},
		getHasScroll: function () {
			if (this.hasScroll === undefined && this.isShow) {
				var listHeight = this.$el.querySelector('.select2-results__options').offsetHeight;
				var h = 0;
				_.each(this.$el.querySelectorAll('.select2-results__option'), function (el) {
					h += el.offsetHeight;
				});
				this.hasScroll = listHeight < h;
			}
		},
		getList: function () {
			var self = this;
			var pCode = this.pCode;
			var treeMap = this.treeMap;
			var pNode = treeMap[pCode];
			//var childs = pNode.childs;
			//if (childs && childs.length == 0) {
				$.post('/datacube/manager/label/get' + this.type + 'LabelList', {
					nParentId: pNode.id,
					pageId: 0,
					pageSize: 99999
				}, 'json').done(function (data) {
					if (data.code == 0) {
						var tab = [];
						var isLeaf = false;
						var max = 0, maxName = "";
						var names = [];
						var pSelect = self.treeMap[pCode].select;
						var childs = [];
						_.each(data.extend, function (obj) {
							var code = obj['s' + self.type + 'Code'];
							var name = obj['s' + self.type + 'Name'];
							isLeaf = obj.nIsLeaf;
							childs.push(code);
							var selectSelf;
							if (!treeMap[code]) {
								treeMap[code] = {
									id: obj.nId,
									code: code,
									name: name,
									select: pSelect == 'all'?'all': 'none',
									pCode: pCode,
									pinyin: pinyin.getFullChars(name).toLowerCase(),
									childs: isLeaf ? null : []
								};
							} else {
								treeMap[code].name = name;
								treeMap[code].id = obj.nId;
								treeMap[code].pinyin = pinyin.getFullChars(name).toLowerCase();
							}
							tab.push(treeMap[code]);
							if (name.length > max) {
								max = name.length;
								maxName = name;
							}
						});
						$text.html(maxName);
						self.minWidth = $selectTmp.width() + 20;
						self.isLeaf = !!isLeaf;
						if (isLeaf) {
							self.skin = self.skin.replace('btn-middle', 'btn-end');
						}
						pNode.childs = childs;
						//Vue.set(pNode, 'childs', childs);
						self.results = self.ajaxResult = tab;
						this.hasScroll = undefined;
						self.$nextTick(function () {
							this.getHasScroll();
						})
					} else {
						//alert(data.message);
					}
				})
			/*} else if (childs && childs.length > 0) {
				var isLeaf = false;
				var max = 0, maxName = "";
				var tab = [];
				_.each(childs, function (code) {
					var node = treeMap[code];
					var name = node.name;
					isLeaf = node.childs === null;
					if (name.length > max) {
						max = name.length;
						maxName = name;
					}
					tab.push(node);
				});
				$text.html(maxName);
				self.minWidth = $selectTmp.width() + 20;
				self.isLeaf = isLeaf;
				if (isLeaf) {
					self.skin = self.skin.replace('btn-middle', 'btn-end');
				}
				self.results = self.ajaxResult = tab;
				this.hasScroll = undefined;
				self.$nextTick(function () {
					this.getHasScroll();
				})
			}*/
		}
	},
	ready: function () {
		var self = this;
		this.getList();
		$(document).on('click', function (event) {
			if ($(self.$el).find(event.target).length == 0) {
				self.isShow = false;
			}
		})
	}
};

/**/
;
	exports.template = '#vue-tpl-btn-select';
	exports = Vue.extend(exports);
	Vue.component('btn-select', exports);
	return exports;
});