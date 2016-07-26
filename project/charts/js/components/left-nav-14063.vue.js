define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-left-nav-14063">\
	<ul>\
		<li class="menu-item-has-children" v-for="m1 in menus1" :class="{\'active\':activeMenu1==m1.key}"  @click="clickMenu(m1)">\
			<a href="javascript:;"><i class="fa {{m1.icon}}"></i><span> {{m1.name}}</span></a>\
			<ul v-show="activeMenu1==m1.key" transition="slide">\
				<li v-for="m2 in menus2[m1.key]">\
					<a href="{{activePath == m2.key?\'javascript:;\':m2.href}}" :class="{\'Se\':activeMenu2 == m2.key}" ><i class="fa {{m2.icon}}"></i><span>{{m2.name}}</span></a>\
					<ul v-if="activeMenu2 == \'statistic-site\' && m2.key == \'statistic-site\' && showFlag == true" transition="slide">\
						<li v-for="m3 in menus3[m2.key.split(\'-\')[1]]">\
							<a href="{{activePath == m3.key?\'javascript:;\':m3.href}}" :class="{\'Se\':activeMenu3 == m3.key}" ><i class="fa {{m3.icon}}"></i><span>{{m3.name}}</span></a>\
						</li>\
					</ul>\
				</li>\
			</ul>\
		</li>\
	</ul>\
</template>');

exports = {
	props: ['menus1', 'menus2', 'menus3', 'activeMenu1', 'activeMenu2', 'activeMenu3', 'activePath'],
	data: function(){
		return {showFlag: false};
	},
	methods: {
		clickMenu: function (m) {
			this.activeMenu1 = m.key;
		}
	},
	ready: function(){
		this.showFlag = true;
	}
}
;
	exports.template = '#vue-tpl-left-nav-14063';
	exports = Vue.extend(exports);
	Vue.component('left-nav-14063', exports);
	return exports;
});