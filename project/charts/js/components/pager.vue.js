define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-pager">\
    <div class="dataTables_paginate paging_simple_numbers" v-if="p.totalPage>1" >\
        <div v-show="p.totalPage>=10" class="input-group pull-right" >\
            <input type="number" class="form-control form_datetime" min="1" max="{{p.totalPage}}" v-model="pageIpt" v-on:keyup.enter="gotoPage2"><span class="input-group-addon" @click="gotoPage2">go</span>\
        </div>\
        <ul class="pagination pagination-sm no-margin">\
            <li class="paginate_button" v-for="key in pageList" track-by="$index" @click="gotoPage(key, $event)"\
                :class="{disabled: (p.currentPage == 1 && key ==\'previous\') || (key == \'...\') || (key == \'next\' && p.currentPage == p.totalPage), active: p.currentPage == key }">\
                <a href="javascript:;" >{{{textMap[key] || key}}}</a>\
            </li>\
        </ul>\
    </div>\
    <div class="dataTables_info pull-right"  style="margin-right: 8px;padding-top: 6px;">共{{p.totalPage}}页，共{{p.totalCount}}条记录 </div>\
</template>');

var noop = function() {};
exports = {
    props: {
		textMap: {
			default: function () {
				return {
					previous: '<span>«</span>',
					next: '<span>»</span>'
				}
			}
		},
		p: {
			default: function () {
				return {
					currentPage: 0,
					pageSize: 0,
					totalCount: 0,
					totalPage: 0
				}
			}
		}
	},
    data: function () {
        return {
			pageIpt: 1,
			pageList: []
        }
    },
	watch: {
		p: function () {
			this._getList();
		}
	},
	methods: {
        _getList: function () {
			var p = this.p;
			var current = p.currentPage;
			var total = p.totalPage;
			var flag = true;
			var range = 1;
			var list = [];
			list.push('previous');
			for (var i = 1, len = total; i <= len; i++) {
				if (i == current) {
					flag = true;
					list.push(i);
				} else if (i == 1 || i == len) {
					flag = true;
					list.push(i);
				} else if (Math.abs(i - current) <= range) {
					flag = true;
					list.push(i);
				} else {
					if (flag == true) {
						flag = false;
						list.push('...');
					}
				}
			}
			list.push('next');
			this.pageList = list;
			this.pageIpt = p.currentPage;
		},
		gotoPage: function (key, event) {
			if (event && event.target) {
				var $elm = $(event.target);
				if ($elm.hasClass('disabled') || $elm.hasClass('active')) return;
			}	
			if (key == this.p.currentPage) return;
			if (key == 'previous') {
				key = this.p.currentPage - 1;
			} else if (key == 'next') {
				key = this.p.currentPage + 1;
			}
			this.$parent.gotoPage(key);
		},
		gotoPage2: function () {
			this.gotoPage(this.pageIpt);
		},
		reload: function () {
			this.gotoPage2();
		}
	},
	ready: function () {
		this._getList();
	}
}
;
	exports.template = '#vue-tpl-pager';
	exports = Vue.extend(exports);
	Vue.component('pager', exports);
	return exports;
});