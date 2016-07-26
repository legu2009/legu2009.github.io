define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-slide-pager">\
	<a v-show="currentPage > 1" href="javascript:;" class="flip_btn back_btn" title="上一页"><i class="fa fa-chevron-left"></i></a>\
	<a v-show="currentPage != totalPage" href="javascript:;" class="flip_btn next_btn" title="下一页"><i class="fa fa-chevron-right"></i></a>\
	<slot></slot>\
</template>');

exports = {
	props: ['pageSize'],
	data: function () {
		return {
			currentPage: 0,
			totalCount: 0,
			totalPage: 0,
		}
	},
	methods: {
		
	},
	events: {
		rushData: function (d) {
			this.currentPage = d.currentPage;
			this.totalCount = d.totalCount;
			this.totalPage = d.totalPage;
		}
	}
	
};
;
	exports.template = '#vue-tpl-slide-pager';
	exports = Vue.extend(exports);
	Vue.component('slide-pager', exports);
	return exports;
});