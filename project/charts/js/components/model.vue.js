define(function (require) {
	require('VueCommon'); 
	var Vue = require('Vue');
	var exports;
	Vue.appendHTML(
'<template id="vue-tpl-model">\
	<div class="modal" v-show="isShow" transition="expand">\
		<div class="modal-dialog">\
            <div class="modal-content">\
                <div class="modal-header">\
                    <h4 class="modal-title"><slot name="title"></slot></h4>\
                </div>\
                <div class="modal-body"><slot name="body"></slot></div>\
                <div class="modal-footer" v-if="btns && btns.length>0">\
                    <button class="btn" v-for="item in btns" class="btn {{item.class}}" v-on:click="clickBtn(item)" type="button">{{item.name}}</button>\
                </div>\
            </div>\
        </div>\
    </div>\
</template>');

var noop = function() {
    this.$parent
};
var bindFn = function (key) {
    var self = this;
    return function () {
        if (self.$parent[key]) {
            return self.$parent[key].apply(self.$parent, arguments);
        }
    }
}
exports = {
    props: ['btns'],
    data: function () {
        return {
            isShow: false
        }
    },
	methods: {
        beforeClose: bindFn('beforeClose'),
        beforeOpen: bindFn('beforeOpen'),
        onClose: bindFn('onClose'),
        onOpen: bindFn('onOpen'),
        close: function(act) {
            if (this.isShow) {
                if (this.beforeClose(act) === 'false') return;
                this.isShow = false;
                this.onClose(act);
            }
        },
        open: function() {
            if (this.beforeOpen() === 'false') return;
            this.isShow = true;
            this.onOpen();
        },
        clickBtn: function(item) {
            var click = this[item.click] || item.click;
            if ($.isFunction(click)) {
                click.call(this);
                return;
            }
        }
	}
}
;
	exports.template = '#vue-tpl-model';
	exports = Vue.extend(exports);
	Vue.component('model', exports);
	return exports;
});