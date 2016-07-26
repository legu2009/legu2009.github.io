define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-btn-group">\
	<div class="btn-group-kk">\
		<btn-select :type="type" :tree-map="treeMap"  v-for="code in pCodes" :p-code="code" :index="$index" @item-select="itemSelect"></btn-select>\
	</div>\
</template>');

var $ = require('jQuery');
var _ = require('underscore');
require("components/btn-select.vue");
var undefined;
exports = {
	props: ['treeMap', 'type'],
	data: function () {
		return {
			pCodes: [this.treeMap[this.type].code]
		}
	},
	watch: {
		type: function () {
			this.pCodes = [this.treeMap[this.type].code];
		}
	},
	methods: {
		itemSelect: function (vm, action) {
			var code = vm.selectCode;
			var pCodes = this.pCodes;
			var len = pCodes.length;
			if (code == '') {//取消全选
				pCodes.splice(vm.index + 1, len);
			} else {
				if (action == 'expand') {
					pCodes.splice(vm.index + 1, len, code);
				} else {
					pCodes.splice(vm.index + 1, len);
				}
			}
		}
	}
};
;
	exports.template = '#vue-tpl-btn-group';
	exports = Vue.extend(exports);
	Vue.component('btn-group', exports);
	return exports;
});