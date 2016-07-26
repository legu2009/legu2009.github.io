define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-left-nav">\
	<li :class="{\'active\': deep == 1 && activeMenus[deep-1] == model.key, \'menu-item-has-children\': deep == 1}" @click="clickMenu()">\
		<a :href="model.href||\'javascript:;\'" \
			:class="{\'Se\': select || activeMenus[deep-1] == model.key && deep != 1}"\
		><i class="fa {{model.icon}}"></i><span> {{model.name}}</span></a>\
		<ul v-if="model.children && model.children.length>0" v-show="activeMenus[deep-1] == model.key" transition="slide">\
			<left-nav v-for="key in model.children" \
				:model="menuMap[key]"\
				:active-menus="activeMenus"\
				:menu-map="menuMap" :deep="deep+1"></left-nav>\
		</ul>\
    </li>\
</template>');

exports = {
	props: ['model', 'menuMap', 'deep', 'activeMenus'],
	data: function() {
		var select = false;
		if (this.model.children == 0 && this.activeMenus[this.deep-1] == this.model.key) {
			select = true;
		}
		return {
			select: select
		}
	},
	methods: {
		clickMenu: function () {
			this.activeMenus.$set(this.deep - 1, this.model.key);
		}
	},
	ready: function() {
		
	}
}

;
	exports.template = '#vue-tpl-left-nav';
	exports = Vue.extend(exports);
	Vue.component('left-nav', exports);
	return exports;
});