define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-tag-select.1">\
	<div class="effects-ej"  v-show="pId == 0"  >\
		<div class="wobble-kk vue-hide1" v-show="pagep.currentPage != 1">\
			<a href="javascript:;" title="上一页1" class="hvr-icon-wobble-horizontal hvr-icon-back-wobble" v-on:click="getList(pId, pagep.currentPage - 1)"></a>\
		</div>\
		<div class="wobble-kk-r vue-hide1" v-show="pagep.totalPage != pagep.currentPage && pagep.totalPage != 0">\
			<a href="javascript:;" title="下一页1" class="hvr-icon-wobble-horizontal hvr-icon-back-wobble" v-on:click="getList(pId, pagep.currentPage + 1)" ></a>\
		</div>\
		<div class="effects clearfix"  >\
			<a href="javascript:;" v-for="item in listp" v-on:click="itemClick(item, $index)"  class="hvr-wobble-horizontal" title="{{item.name}}">{{item.name}}</a>\
		</div>\
	</div>\
	<div class="effects-ej" v-show="pId != 0" >\
		<div class="wobble-kk" v-show="page.currentPage != 1">\
			<a href="javascript:;" title="上一页2" class="hvr-icon-wobble-horizontal hvr-icon-back-wobble" v-on:click="getList(pId, page.currentPage - 1)"></a>\
		</div>\
		<div class="wobble-kk-r" v-show="page.totalPage != page.currentPage && page.totalPage != 0">\
			<a href="javascript:;" title="下一页2" class="hvr-icon-wobble-horizontal hvr-icon-back-wobble" v-on:click="getList(pId, page.currentPage + 1)" ></a>\
		</div>\
		<div class="effects clearfix"  >\
			<a href="javascript:;" v-for="item in list" transition="fade" v-bind:class="[\'tag\' + item.type, {\'Se\':item.select}]" title="{{item.name}}" v-on:click="itemSelect(item, $index)">{{item.name}}</a>\
		</div>\
		<div class="wobble-kk-b" >\
			<a href="javascript:;" title="返回上一层" class="hvr-icon-wobble-horizontal hvr-icon-back-wobble" v-on:click="pId = 0"></a>\
		</div>\
	</div>\
</template>');

var $ = require('jQuery');
var _ = require('underscore');
exports = {
	props: ['type', "addList", 'addListc'],
	data: function () {
		return {
			listp: [],
			pagep: {},
			list: [],
			page: {totalPage: 1, currentPage: 1},
			pId: 0
		}
	},
	methods: {
		itemClick: function (item, index) {
			item.index = index;
			this.getList(item.id, 0);
		},
		itemSelect: function (item, index) {
			item.index = index;
			this.$dispatch('item-select', item);
		},
		go2back: function () {
			this.pId = 0;
		},
		getList: function (pId, pageId) {
			pageId = pageId || 0;
			pId = pId || 0;
			var self = this;
			$.post('/datacube/manager/label/get' + this.type + 'LabelList', {
				nParentId: pId,
				pageId: pageId,
				pageSize: 6,
				nProductId: this.$parent.nProductId
			}, 'json').done(function (data) {
				if (data.code == 0) {
					var ary = [];
					var pItem;
					if (pId == 0) {
						self.pagep = data.page;
						_.each(data.extend, function (obj) {
							var code = obj['s' + self.type + 'Code'];
							ary.push({
								id: obj.nId,
								code: code,
								name: obj['s' + self.type + 'Name'], 
								select: false,
								type: self.type
							});			
						})
						self.listp = ary;
					} else {
						pItem = _.find(self.listp, function(n){ return n.id == pId; });
						_.each(data.extend, function (obj) {
							var code = obj['s' + self.type + 'Code'];
							var item = _.find(self.addList, function(n){ return n.code == code; });
							if (!item)
								item = _.find(self.addListc, function(n){ return n.code == code; });
							ary.push({
								id: obj.nId,
								code: code,
								name: obj['s' + self.type + 'Name'], 
								select: !!item?true:false,
								type: self.type,
								pIndex: pItem? pItem.index : 0,
								pName: pItem? pItem.name : ''
							});			
						})
						self.list = ary;
						self.page = data.page;
					}
					self.pId = pId;
				} else {
					//alert(data.message);
				}
			})
		}
	},
	events: {
		'item-change': function (item, isSelect) {
			var item = _.find(this.list, function(n){ return n.code == item.code; });
			if (item)
				item.select = isSelect;
		},
		'clear-select': function (item) {
			_.each(this.list, function (item) {
				item.select = false;
			});
		},
		'product-change': function () {
			this.pagep.totalPage = this.pagep.currentPage = 1;
			this.getList();
		}
	},
	ready: function () {
		this.getList();
	}
};
;
	exports.template = '#' + id;
	exports = Vue.extend(exports);
	Vue.component('tag-select.1', exports);
	return exports;
});