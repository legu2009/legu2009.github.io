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
require(["jQuery", "Vue", "underscore", 'vue-modal2', "components/btn-group.vue", "components/tree-box.vue"], function ($, Vue, _, vueModal) {
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
                var self = this;
                this.sRuleName = $.trim(this.sRuleName);
                this.sRuleDesc = $.trim(this.sRuleDesc);
                if (this.sRuleName == '') {
                    Vue.dialog.alert('请填写画像规则名称');
                }
				var postData = pageContent.getPostData();
                var data = {
                    sRuleName: this.sRuleName,
                    sRuleDesc: this.sRuleDesc,
                    nPeoples: pageContent.peoples,
					nProductId: pageContent.nProductId,
                    sLabels: postData.sLabels,
					sLabelsName: postData.sLabelsName
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
	
	/*
	code : {
		id: obj.nId,
		code: code,
		name: name,
		select: map[code] || false,
		pinyin: pinyin.getFullChars(name).toLowerCase(),
		pCode: 'root'
	}*/
			
	
	var pageContent;
	var classTab = ['pink-skin-light', 'sky2-skin-light', 'purple-skin-light', 'green2-skin-light'];
	//"Property",'Content',"Time"
	
	(function () {
		if (_param.id) {//修改
			return $.post('/datacube/manager/label/getRuleLabel', {
				nId: _param.id
			})
		} else {
			var dtd = $.Deferred();
			dtd.resolve({extend : {}});
			return dtd;
		}
	})().done(function (data) {
		var extend = data.extend;
		saveModal.sRuleName = extend.sRuleName || '';
		saveModal.sRuleDesc = extend.sRuleDesc || '';
		var treeMap = {
			Property: {
				id: 0,
				code: 'Property',
				name: '属性纬度',
				pCode: null,
				select: 'none',
				childs: []
			},
			Content: {
				id: 0,
				code: 'Content',
				name: '内容纬度',
				pCode: null,
				select: 'none',
				childs: []
			},
			Time: {
				id: 0,
				code: 'Time',
				name: '时间纬度',
				pCode: null,
				select: 'none',
				childs: []
			}
		};
		if (extend.sLabelsName) {
			treeMap = JSON.parse(extend.sLabelsName);
		}
		
		pageContent = new Vue({
			el: '#pageContent',
			data: {
				treeMap: treeMap,
				peoples: extend.nPeoples || 0,
				type: 'Property'
			},
			events: {
				'node-select': function (node, type) {
					if (type == 'Content' && node.select == 'all') {//内容只能选一个叶子，先清空
						this.treeMap.Content.select = 'none';
						this.setChildren(this.treeMap.Content);
						node.select = 'all';
						this.setParent(node);
					} else {
						this.setParent(node);
						this.setChildren(node);
					}
					this.getPeople();
					this.$broadcast('box-change', type, this.getBoxTreeCode(node));
				}
			},
			methods: {
				getBoxTreeCode: function (node) {
					while(node.pCode) {
						var pCode = node.pCode;
						if (pCode == 'Property' || pCode == 'Content' || pCode == 'Time') {
							return node.code;
						}
						node = this.treeMap[pCode];
					}
				},
				changType: function (t) {
					this.type = t;
				},
				getPeople: function () {
					var res = [];
					var treeMap = this.treeMap;
					this._gPostData(treeMap.Property, res, true);
					this._gPostData(treeMap.Time, res, true);
					//this._gContentData(treeMap.Content, res);
					var self = this;
					$.post('/datacube/manager/label/getPeoples', {
						sLabels: res.join(',')
					}, 'json').done(function (data) {
						if (data.code == 0) {
							self.peoples = data.extend;
						} else {
							//Vue.dialog.alert(data.message);
						}
					})
				},
				openSave: function () {
					var treeMap = this.treeMap;
					if (treeMap.Property.select == 'none' && treeMap.Time.select == 'none') {
						Vue.dialog.alert('请添加属性或时间纬度');
						return;
					}
					if (treeMap.Content.select == 'none') {
						Vue.dialog.alert('请添加内容纬度');
						return;
					}
					if (!_param.id) {
						saveModal.sRuleName = '';
						saveModal.sRuleDesc = '';
					}
					saveModal.open();
				},
				_gPostData: function (node, res, flag) {
					flag = flag || false;
					if (node.select == 'all' && node.code != 'Property' && node.code != 'Time') {
						return res.push(node.code + (flag ? "" : (node.childs !== null ? '-' : '')));
					}
					if (node.select != 'none') {
						_.each(node.childs, function (code) {
							this._gPostData(this.treeMap[code], res, flag);
						}, this);
					}
				},
				_gContentData: function (node, res) {
					if (node.select == 'all' && node.childs === null) {
						return res.push(node.code)
					}
					if (node.select != 'none') {
						_.each(node.childs, function (code) {
							this._gContentData(this.treeMap[code], res);
						}, this);
					}
				},
				getPostData: function () {
					//遍历树，第一个all的节点，childs !== null, 则'-'
					var res = [];
					var treeMap = this.treeMap;
					this._gPostData(treeMap.Property, res);
					this._gPostData(treeMap.Time, res);
					
					var content = [];
					this._gContentData(treeMap.Content, content);
					
					return {
						sLabelsName: JSON.stringify(treeMap),
						sLabels: res.join(',') + ';' + content[0]
					}
				},
				cancel: function () {
					var treeMap = this.treeMap;
					treeMap.Property.select = 'none';
					treeMap.Content.select = 'none';
					treeMap.Time.select = 'none';
					this.setChildren(treeMap.Property);		
					this.setChildren(treeMap.Content);		
					this.setChildren(treeMap.Time);		
				},
				setParent: function (node) {
					var treeMap= this.treeMap;
					var pNode = treeMap[node.pCode];
					if (pNode) {
						var _old = pNode.select;
						var select = 'none';
						var res = 0;
						_.each(pNode.childs, function (code) {
							var node = treeMap[code];
							if (node.select == 'all') {
								res |= 4;
							} else if (node.select == 'some') {
								res |= 2;
							} else {
								res |= 1;
							}
						}, this);
						if (res == 1) {
							select = 'none';
						} else if (res == 4) {
							select = 'all';
						} else {
							select = 'some';
						}
						if (select != _old) {
							pNode.select = select;
							this.setParent(pNode);
						}
					}
				},
				setChildren: function (node) {
					var childs = node.childs;			
					if (childs) {
						var select = node.select;
						_.each(childs, function (code) {
							var node = this.treeMap[code];
							node.select = select;
							this.setChildren(node, select);
						}, this)
					}
				}
			},
			ready: function () {
				var self = this;
				$('.vue-hide').removeClass('vue-hide');
				$('.vue-default').remove();
				$('.vue-hide2').removeClass('vue-hide2');
			}
		});
		
	})
	
	
    
});
