(function() {
    function install(Vue) {
        var extend = function(target, source) {
            for (var p in source) {
                if (source.hasOwnProperty(p)) {
                    target[p] = source[p];
                }
            }
            return target;
        };
        var noop = function() {};
        var temple = '<div class="modal" v-show="isShow" transition="expand">\
            <div class="modal-dialog">\
                <div class="modal-content">\
                    <div class="modal-header">\
                        <button class="close" type="button" v-on:click="close" v-if="hasClose"><span>×</span></button>\
                        <h4 class="modal-title">{{title}}</h4>\
                    </div>\
                    <div class="modal-body"><partial name="my-body"></partial></div>\
                    <div class="modal-footer" v-if="btns.length>0">\
                        <button v-for="item in btns" class="btn {{item.class}}" v-on:click="clickBtn(item)" type="button">{{item.name}}</button>\
                    </div>\
                </div>\
            </div>\
        </div>';
        Vue.modal = function(options) {
            var config = {
                template: options.temple || temple
            };
            config.data = extend({
                isShow: false,
                hasClose: true,
                title: 'title',
                body: "",
                btns: [{
                    'class': '',
                    click: 'close',
                    name: '关闭'
                }]
            }, options.data);

            if (config.data.body) {
                config.partials = {
                    "my-body": config.data.body
                };
                delete config.data.body;
            }
            config.methods = extend({
                beforeClose: noop,
                beforeOpen: noop,
                onClose: noop,
                onOpen: noop,
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
            }, options.methods);
            var vm = new Vue(config);
            vm.$mount().$appendTo(options.target || 'body');
            return vm;
        }
    }

    if (typeof exports == "object") {
        module.exports = install
    } else if (typeof define == "function" && define.amd) {
        define([], function() {
            return install
        })
    } else if (window.Vue) {
        Vue.use(install)
    }
})();
/*
var saveModal = Vue.modal({
    data: {
        title: '保存',
        sRuleName: '',
        sRuleDesc: '',
        body: '<input type="text" placeholder="画像规则名称" v-model="sRuleName">\
            <br/>\
            <input type="text" placeholder="画像规则描述" v-model="sRuleDesc">',
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