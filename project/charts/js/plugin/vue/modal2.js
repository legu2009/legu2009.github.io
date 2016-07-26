(function (undefine) {
    function install(Vue) {
        var noop = function () { };
        var bindFn = function (key) {
            return function () {
                if (this.$parent[key]) {
                    return this.$parent[key].apply(this.$parent, arguments);
                }
            }
        };

        Vue.component('modal2', Vue.extend({
            props: {
                'btns': {
                    default: []
                },
                'type': {
                    default: ''
                },
                maskClose: {
                    default: false
                }
            },
            data: function () {
                return {
                    isShow: false
                }
            },
            template:
            '<div class="modal {{type}}" v-show="isShow" transition="expand" v-on:click="clickMask">\
    <div class="modal-dialog">\
        <div class="modal-content">\
            <div class="modal-header">\
                <button type="button" class="close" v-if="maskClose" v-on:click="close">\
                    <span aria-hidden="true">×</span>\
                 </button>\
                <h4 class="modal-title"><slot name="title"></slot></h4>\
            </div>\
            <div class="modal-body"><slot name="body"></slot></div>\
            <div class="modal-footer">\
                <button  v-for="item in btns" class="btn pd25 {{item.class}}" v-on:click="clickBtn(item)" type="button">{{item.name}}</button>\
            </div>\
        </div>\
    </div>\
</div>',
            methods: {
                beforeClose: bindFn('beforeClose'),
                beforeOpen: bindFn('beforeOpen'),
                onClose: bindFn('onClose'),
                onOpen: bindFn('onOpen'),
                clickMask: function (event) {
                    if (event.target == this.$el) {
                        if (this.maskClose == true)
                            this.close();
                    }
                },
                close: function (act) {
                    if (this.isShow) {
                        if (this.beforeClose(act) === 'false') return;
                        this.isShow = false;
                        this.onClose(act);
                    }
                },
                open: function () {
                    if (this.beforeOpen() === 'false') return;
                    this.isShow = true;
                    this.onOpen();
                },
                clickBtn: function (item) {
                    var click = this[item.click];
                    if ($.isFunction(click)) {
                        click.call(this);
                        return;
                    }
                    click = this.$parent[item.click] || item.click;
                    if ($.isFunction(click)) {
                        click.call(this.$parent);
                        return;
                    }
                }
            }
        }));

        var extend = function (target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }
            return target;
        };
        var template = '<modal2 v-bind:btns="btns" v-bind:type="type"  v-bind:mask-close="maskClose" ><div slot="title">{{{title}}}</div><div slot="body">{{{body}}}</div></modal2>';
        Vue.modal2 = function (options) {
            options = options || {};
            var config = {
                template: options.template || template
            };
            config.data = extend({
                isShow: false,
                title: 'title',
                body: "",
                type: '',
                maskClose: true,
                btns: [{ 'class': 'btn-default', click: 'close', name: '关闭' }]
            }, options.data);

            config.methods = extend({
                close: function (act) {
                    this.$children[0].close();
                },
                open: function () {
                    this.$children[0].open();
                }
            }, options.methods);
            var vm = new Vue(config);
            vm.$mount().$appendTo(options.target || 'body');
            return vm;
        }

        var toString = Object.prototype.toString;
        var isNumber = function (obj) {
            return toString.call(obj) === '[object Number]';
        };
        var isArray = function (obj) {
            return toString.call(obj) === '[object Array]';
        };

        var dialog = Vue.modal2();
        var timer;
        Vue.dialog = {
            alert: function (title, body, time) {
                if (isNumber(body) || (body === undefine && time === undefine)) {
                    time = body;
                    body = title;
                    title = '提示';
                }
                if (time === undefine) {
                    time = 3000;
                }
                extend(dialog, {
                    body: body,
                    title: title,
                    btns: [],
                    type: 'ms-alert',
                    maskClose: true
                })
                dialog.open();
                if (time > 0) {
                    clearTimeout(timer);
                    timer = setTimeout(function () {
                        dialog.close();
                    }, time);
                }
            },
            confirm: function (title, body, btns) {
                if (isArray(body)) {
                    btns = body;
                    body = title;
                    title = "提示";
                }
                extend(dialog, {
                    body: body,
                    title: title,
                    btns: btns,
                    type: 'ms-alert',
                    maskClose: false
                })
                dialog.open();
            },
            close: function () {
                dialog.close();
            }
        };
    }
    if (typeof exports == "object") {
        module.exports = install
    } else if (typeof define == "function" && define.amd) {
        define([], function () {
            return install
        })
    } else if (window.Vue) {
        Vue.use(install)
    }

})();

/*
var saveModal = window.saveModal = Vue.modal2({
    template: '<modal2 v-bind:btns="btns" >\
    <div slot="title">{{{title}}}</div>\
    <div slot="body">\
        <input type="text" placeholder="画像规则名称" v-model="sRuleName">\
        <br/>\
        <input type="text" placeholder="画像规则描述" v-model="sRuleDesc">\
    </div>\
</modal2>',
    data: {
        title: '保存',
        sRuleName: '',
        sRuleDesc: '',
        btns: [
            { 'class': '', click: 'saveRule', name: '保存' },
            { 'class': '', click: 'close', name: '关闭' }
        ]
    },
    methods: {
        saveRule: function () {
            var addList = pageContent.addList;
            if (addList.length == 0) {
                alert('请选择画像属性');
                return;
            }
            var self = this;
            $.post('/datacube/manager/label/addOrModifyRuleLabelList', {
                sRuleName: this.sRuleName,
                sRuleDesc: this.sRuleDesc,
                nPeoples: pageContent.peoples,
                sLabels: _.map(addList, function (obj) { return obj.code; }).join(',')
            }, 'json').done(function (data) {
                console.log(data);
                if (data.code == 0) {

                } else {
                    //alert(data.message);
                }
            })
        }
    }
});
*/