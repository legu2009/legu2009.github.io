require.config({
	baseUrl: "/dist/js/",
	paths: {
		jQuery: "lib/jquery/jquery-1.12.3",
		jquery: "lib/jquery/jquery-1.12.3",
		Vue: "lib/vue/vue",
		underscore: "lib/underscore/underscore",
		VueCommon: "lib/common",
		text: "plugin/retuirejs/text",
		css: "plugin/retuirejs/css.min",
		Swiper: "lib/swiper/swiper-3.3.1.jquery.min",
		"vue-modal": "plugin/vue/modal",
		"vue-modal2": "plugin/vue/modal2",
		pinyin: "lib/pinyin/pinyin",
		datetimepicker: "lib/datetimepicker/bootstrap-datetimepicker",
		'jquery.smooth-scroll' : 'lib/jquery-smooth-scroll-master/jquery.smooth-scroll',
		echarts3: "lib/echarts/echarts.min"//3.0
	},
	packages: [
        {
            main: 'echarts',
            location: '/dist/js/charts/echarts/src',
            name: 'echarts'
        },
        {
            main: 'zrender',
            location: '/dist/js/charts/zrender/src',
            name: 'zrender'
        }
    ],
	/*
        packages: [
            {
                name: 'zrender',
                location: 'lib/zrender-2.1.0/src',
                main: 'zrender'
            }
        ],
	*/
	shim: {
		jQuery: {
			exports: "jQuery"
		},
		pinyin: {
			exports: "pinyin"
		}, 
		Swiper: {
			deps: ['css!../css/swiper-3.3.1.min.css','jQuery'],
			exports: "Swiper"
		}, 
		Swiper: {
			deps: ['css!../css/swiper-3.3.1.min.css','jQuery'],
			exports: "Swiper"
		},
		'jquery.smooth-scroll': ['jQuery'],
	}
});
var CUBE = (function (){
	var getParam = function (search) {
		search = search.replace(/#.+$/,'');
		var re = {};
		if (search == "" || typeof search == "undefined") {
			return {};
		} else {
			search = search.substr(1).split('&');
			for (var i = 0, len = search.length; i < len; i++) {
				var tmp = search[i].split('=');
				if(i == 0 && tmp.length == 1) {//?132141
					return {
						'__search__' : tmp[0]
					};
				}
				re[tmp.shift()] = tmp.join('=');
			}
			return re;
		}
	};
	var path = location.pathname.replace("/pages/", '').replace(/\.html.*$/, '').split('/');
	var pathMap = {
		'rule-modify': 'rule-add',
		'statistic-launch-detail': 'statistic-launch',
		'statistic-adLocation': 'statistic-site'
	};
	var activeMenus = [], tmp = [];
	for (var i = 0, len = path.length; i < len; i++) {
		tmp.push(path[i]);
		activeMenus.push(pathMap[tmp.join('-')] || tmp.join('-'));
	}
	
	var pathJoin = path.join('-');
	return {
		_param: getParam(window.location.search),
		config: {
			menus1: [
				{key: 'rule', name: '画像规则库', icon: 'fa-cubes', skin: "orange-skin"},
				{key: 'statistic', name: '统计分析', icon: 'fa-pie-chart', skin: "sky-skin"}
			],
			menus2: {
				rule: [
					{key: 'rule-list', name: '规则管理', icon: 'fa-cogs', href: '/pages/rule/list.html'}, 
					{key: 'rule-add', name: '新增规则', icon: 'fa-plus', href: '/pages/rule/add.html'}
				],
				statistic: [
					{key: 'statistic-user', name: '用户数据统计', icon: 'fa-users', href: '/pages/statistic/user.html'}, 
					{key: 'statistic-site', name: '站点数据统计', icon: 'fa-link', href: '/pages/statistic/site/index.html'},
					{key: 'statistic-launch', name: '投放数据统计', icon: 'fa-database', href: '/pages/statistic/launch.html'}
				]
			},
			menus3: {
				site: [
					{key: 'statistic-site-snail', name: 'snail站点详情', icon: 'fa-pie-chart', href: '/pages/statistic/site-detail.html'}, 
					{key: 'statistic-site-woniu', name: 'woniu站点详情', icon: 'fa-pie-chart', href: '/pages/statistic/site-detail.html?site=woniu'}
				]
			},
			activeMenu1: path[0] || "",
			activeMenu2: pathMap[pathJoin] || pathJoin,
			activeMenu3: pathMap[pathJoin] || pathJoin,
			pathJoin: pathJoin,
			activeMenus: activeMenus,				
			menuMap: {
				root: {
					key: 'root',
					children: ['rule', 'statistic']
				},
				rule: {
					key: 'rule',
					icon: 'fa-cubes',
					name: '画像规则库', 
					children: ['rule-list', 'rule-add']
				},
				'rule-list': {
					key: 'rule-list',
					icon: 'fa-cogs',
					name: '规则管理', 
					href: '/pages/rule/list.html'
				},
				'rule-add': {
					key: 'rule-add',
					icon: 'fa-plus',
					name: '新增规则', 
					href: '/pages/rule/add.html'
				},
				statistic: {
					key: 'statistic',
					icon: 'fa-pie-chart',
					name: '统计分析', 
					children: ['statistic-user', 'statistic-site', 'statistic-launch']
				},
				'statistic-user': {
					key: 'statistic-user',
					icon: 'fa-users',
					name: '用户数据统计', 
					href: '/pages/statistic/user.html'
				},
				'statistic-site': {
					key: 'statistic-site',
					icon: 'fa-link',
					name: '站点数据统计', 
					children: ['statistic-site-index', 'statistic-site-snail', 'statistic-site-woniu']
				},
				'statistic-site-index': {
					key: 'statistic-site-index',
					icon: 'fa-pie-chart',
					name: '统计详情',
					href: '/pages/statistic/site/index.html'
				},
				'statistic-site-snail': {
					key: 'statistic-site-snail',
					icon: 'fa-pie-chart',
					name: 'snail站点详情',
					href: '/pages/statistic/site/snail.html'
				},
				'statistic-site-woniu': {
					key: 'statistic-site-woniu',
					icon: 'fa-pie-chart',
					name: 'woniu站点详情',
					 href: '/pages/statistic/site/woniu.html?site=woniu'
				},
				'statistic-launch': {
					key: 'statistic-launch',
					icon: 'fa-database',
					name: '投放数据统计', 
					href: '/pages/statistic/launch.html'
				}
			}
		}
	}
})();
require(["jQuery", "Vue"], function($, Vue) {
	var vm = CUBE.vm = new Vue({
		data: {
			isWideContent: false
		} 
	});
	var config = CUBE.config;
	require(["components/left-nav.vue"], function () {
		new Vue({
			el: '#leftNav',
			data: {
				menuMap: config.menuMap,
				activeMenus: config.activeMenus,
				key: 'root'
			}
		});
	});
	require(["components/quick-links.vue"], function () {
		new Vue({
			el: '#quickLinks',
			data: {
				menus1: config.menus1,
				menus2: config.menus2
			},
			ready: function () {
				var self = this;
				$(document).on('click', function (event) {
					self.$broadcast('document-click', event);
				})
			}
		});	
	});
	vm.$watch('isWideContent', function (val) {
		var action = (val ? 'add':'remove') + 'Class';
		$(".menu-options")[action]("active");
		$(".side-header")[action]("slide-menu");
		$(".main-content")[action]("wide-content");
	})

	$(".menu-options").on('click', function () {
		vm.isWideContent = !vm.isWideContent;
	})
});
require(["echarts3"], function() {});
require(["jQuery", "Vue", "underscore", 'vue-modal2', "components/tag-select.vue"], function ($, Vue, _, vueModal) {
    var _param = CUBE._param;

    Vue.use(vueModal);
    var saveModal = Vue.modal2({
        template:
        '<modal2 v-bind:btns="btns" mask-close="true">\
	<div slot="title">{{{title}}}</div>\
	<div slot="body">\
		<form class="form-horizontal">\
			<div class="box-body">\
				<div class="form-group">\
					<label class="span-label">\
						<span class="col-xs-3 control-label">画像规则名称:</span>\
						<div class="col-xs-8 input-group">\
							<input type="text" class="form-control" v-model="sRuleName">\
						</div>\
					</label>\
				</div>\
				<div class="form-group">\
					<label class="span-label">\
						<span class="col-xs-3 control-label">画像规则描述:</span>\
						<div class="col-xs-8 input-group">\
							<input type="text" class="form-control" v-model="sRuleDesc">\
						</div>\
					</label>\
				</div>\
			</div>\
		</form>\
	</div>\
</modal2>',
        data: {
            title: '保存画像规则',
            sRuleName: '',
            sRuleDesc: '',
            btns: [
                { 'class': 'btn-success', click: 'saveRule', name: '保存' },
                { 'class': 'btn-default', click: 'close', name: '关闭' }
            ]
        },
        methods: {
            saveRule: function () {
                var addList = pageContent.addList;
                var addCList = pageContent.addCList;
                if (addList.length == 0) {
                    Vue.dialog.alert('请选择画像属性');
                    return;
                }
                if (addCList.length == 0) {
                    Vue.dialog.alert('请选择内容属性');
                    return;
                }
                var self = this;
                this.sRuleName = $.trim(this.sRuleName);
                this.sRuleDesc = $.trim(this.sRuleDesc);
                if (this.sRuleName == '') {
                    Vue.dialog.alert('请填写画像规则名称');
                }
                var data = {
                    sRuleName: this.sRuleName,
                    sRuleDesc: this.sRuleDesc,
                    nPeoples: pageContent.peoples,
					nProductId: pageContent.nProductId,
                    sLabels: _.map(addList, function (obj) { return obj.code; }).join(',') + ',' + _.map(addCList, function (obj) { return obj.code; }).join(',')
                };
                if (_param.id) {
                    data.nId = _param.id;
                }
                $.post('/datacube/manager/label/addOrModifyRuleLabelList', data, 'json').done(function (data) {
                    if (data.code == 0) {
                        self.close();
                        Vue.dialog.alert(data.message);
                    } else {
                        Vue.dialog.alert(data.message);
                    }
                })
            }
        }
    });
	
	
	
    var pageContent;
	$.post('/datacube/manager/label/getProductList').done(function (data) {
		if (data.code != 0) return Vue.dialog.alert('获取产品列表失败');
		pageContent = new Vue({
			el: '#pageContent',
			data: {
				search: "",
				nProductId: _param.product || '10',
				suggest: [],
				suggestShow: false,
				peoples: 0,
				addList: [],
				addCList: [],
				productList: data.extend
			},
			watch: {
				nProductId: function (a) {
					this.cancel();
					this.suggest = [];
					this.search = '';
					this.$broadcast('product-change');
				}
			},
			methods: {
				suggestSelect: function (item) {
					this.itemSelect(item);
					this.suggestShow = false;
				},
				itemSelect: function (item) {
					var list = this.addList;
					if (item.type == 'Content') {
						list = this.addCList;
					}
					var has = _.find(list, function (n) { return n.code == item.code; });
					if (has) {
						list.$remove(has);
						this.$broadcast('item-change', item, false);
						this.suggestChange(item, false);
					} else {
						list.push(item);
						this.$broadcast('item-change', item, true);
						this.suggestChange(item, true);
					}
				},
				suggestChange: function (item, isSelect) {
					var item = _.find(this.suggest, function (n) { return n.code == item.code; });
					if (item)
						item.select = isSelect;
				},
				suggestClear: function () {
					_.each(this.suggest, function (item) {
						item.select = false;
					});
				},
				itemRemove: function (item) {
					var list = this.addList;
					if (item.type == 'Content') {
						list = this.addCList;
					}
					list.$remove(item);
					this.$broadcast('item-change', item, false);
					this.suggestChange(item, false);
				},
				tagOrder: function (a, b) {
					var m = { Property: 1, Time: 2, Content: "3" };
					var res = m[a.type] - m[b.type];
					if (res == 0) {
						if (a.pIndex - b.pIndex == 0) {
							return a.index - b.index;
						} else {
							return a.pIndex - b.pIndex
						}
					} else {
						return res;
					}
				},
				openSave: function () {
					if (this.addList.length == 0) {
						Vue.dialog.alert('请先选择画像属性');
						return;
					}
					if (this.addCList.length == 0) {
						Vue.dialog.alert('请先选择内容属性');
						return;
					}
					if (!_param.id) {
						saveModal.sRuleName = '';
						saveModal.sRuleDesc = '';
					}
					saveModal.open();
				},
				cancel: function () {
					this.addList = [];
					this.addCList = [];
					this.$broadcast('clear-select');
					this.suggestClear();
				}
			},
			ready: function () {
				var self = this;
				$('.vue-hide').removeClass('vue-hide');
				$(document).on('click', function (event) {
					if ($('.add-search-sec form').find(event.target).length == 0) {
						self.suggestShow = false;
					}
				})
				this.$watch("search", function (val) {
					$.post("/datacube/manager/label/searchLabel", {
						nProductId: self.nProductId,
						labelName: val,
						pageSize: 12
					}).done(function (data) {
						if (data.code == 0) {
							self.suggestShow = true;
							var suggest = [];
							if (data.extend.length > 0) {
								_.each(data.extend, function (obj) {
									var code = obj.labelCode, type = "Property";
									var has = _.find(self.addList, function (n) { return n.code == code; });
									if (obj.labelCode.indexOf('CN_') != -1) {
										type = 'Content';
										has = _.find(self.addCList, function (n) { return n.code == code; });
									} else if (obj.labelCode.indexOf('TM_') != -1) {
										type = "Time";
									}
									suggest.push({
										code: obj.labelCode,
										name: obj.labelName,
										type: type,
										select: has ? true : false
									});
								});
							}
							self.suggest = suggest;
						}
					})

				});
				this.$watch("addList", function () {
					var addList = this.addList;
					if (addList.length == 0) {
						this.peoples = 0;
						return;
					}
					var self = this;
					$.post('/datacube/manager/label/getPeoples', {
						sLabels: _.map(addList, function (obj) { return obj.code; }).join(',')
					}, 'json').done(function (data) {
						if (data.code == 0) {
							self.peoples = data.extend;
						} else {
							//Vue.dialog.alert(data.message);
						}
					})
				});

				if (_param.id) {//修改
					$.post('/datacube/manager/label/getRuleLabel', {
						nId: _param.id
					}).done(function (data) {
						saveModal.sRuleName = data.extend.sRuleName;
						saveModal.sRuleDesc = data.extend.sRuleDesc;
						$.post('/datacube/manager/label/getLabelListUnderRule', {
							sLabels: data.extend.sLabels
						}).done(function (data) {
							if (data.code == 0) {
								var addList = [];
								var addCList = [];
								_.each(data.extend, function (obj) {
									var type = "Property";
									if (obj.labelCode.indexOf('CN_') != -1) {
										addCList.push({
											code: obj.labelCode,
											name: obj.labelName,
											type: 'Content',
											select: true
										});
										return;
									} else if (obj.labelCode.indexOf('TM_') != -1) {
										type = "Time";
									}
									addList.push({
										code: obj.labelCode,
										name: obj.labelName,
										type: type,
										select: true
									});
								});
								self.addList = addList;
								self.addCList = addCList;
							}
						})
					})
				}
			}
		});
	})
	
});
