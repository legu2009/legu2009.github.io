define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-quick-links">\
	<div>\
		<ul v-for="m1 in menus1" v-on:click="clickMenu(m1)">\
			<li>\
				<a title="{{m1.name}}" class="{{m1.skin}}"><i class="fa {{m1.icon}}"></i></a>\
				<div class="dialouge notification" v-show="activeMenu1==m1.key" transition="slide">\
					<a v-for="m2 in menus2[m1.key]" href="{{m2.href}}"  ><i class="fa fa-cogs"></i>{{m2.name}}</a>\
				</div>\
			</li>\
		</ul>\
		<ul v-on:click="clickMenu(\'\')" >\
			<li>\
				<a class="red-skin"><i class="fa fa-user"></i></a>\
			</li>\
		</ul>\
		<ul v-on:click="clickMenu(\'\')">\
			<li>\
				<a class="green-skin"><i class="fa fa-sign-out"></i></a>\
			</li>\
		</ul>\
	</div>\
</template>');

var $ = require('jQuery');
exports = {
	props: ['menus1', 'menus2'],
	data: function () {
		return {
			activeMenu1: ''
		}
	},
	methods: {
		clickMenu: function (m) {
			if (!m) {
				this.activeMenu1 = "";
				return;
			}
			if (this.activeMenu1 == m.key) {
				this.activeMenu1 = "";
			} else {
				this.activeMenu1 = m.key;
			}
		}
	},
	events: {
		'document-click' : function (event) {
			if ($(this.$el).find(event.target).length == 0) {
				this.activeMenu1 = "";			
			}
		}
	}
};
;
	exports.template = '#vue-tpl-quick-links';
	exports = Vue.extend(exports);
	Vue.component('quick-links', exports);
	return exports;
});