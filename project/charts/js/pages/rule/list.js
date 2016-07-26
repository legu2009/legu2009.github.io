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
require(["jQuery", "Vue", "underscore", 'vue-modal2', "VueCommon"], function ($, Vue, _, vueModal) {
	Vue.use(vueModal);

	var pageContent = new Vue({
		el: '#pageContent',
		data: {
			productList: [],
			nProductId: '',
			search: "",
			list: [],
			suggest: [],
			suggestLoading: false,
			pageSize: 0,
			slideBox: '',
			boxWidth: 0,
			page: {
				currentPage: 1,
				totalPage: 1
			},
			sRuleName: '',
			people: 0
		},
		watch: {
			nProductId: function () {
				this.getList();
			}
		},
		methods: {
			pageLeft: function () {
				if (this.slideBox == 'min')
					this.slideBox = 'left';
			},
			pageRight: function () {
				if (this.slideBox == 'min')
					this.slideBox = 'right';
			},
			showMore: function (item) {
				item.isShowMore = !item.isShowMore;
			},
			getList: function () {
				this.sRuleName = this.search;
				this.reload();
			},
			go2Add: function () {
				location.href = "/pages/rule/add.html";
			},
			reload: function () {
				this.onView('min', 'show', 'min');
			},
			onView: function (dir, action, old) {
				if (action == 'show') {
					var self = this;
					var currentPage = this.page.currentPage;
					if (dir == 'right') {
						currentPage++;
					} else if (dir == 'left') {
						currentPage--;
					}
					if (dir == 'min' && (old == 'left' || old == 'right')) {//只是变换位子，不用查询数据
						self.$refs[old + 'Box'].list = [];
						return;
					}
					$.post('/datacube/manager/label/getRuleLabelList', {
						sRuleName: this.sRuleName,
						pageId: currentPage,
						pageSize: this.pageSize,
						nProductId: this.nProductId
					}).done(function (data) {
						self.search = self.sRuleName;
						var tab = [];
						if (data.code == 0) {
							tab = data.extend;
							self.page = data.page;	
						}
						var res = [];
						var map = {};
						_.each(tab, function (obj) {
							var t = obj.sLabels.replace(/-/g, '').split(';');
							obj.sLabels2 = t.join(',').split(',');
							res.push.apply(res, obj.sLabels2);
						});
						$.post('/datacube/manager/label/getLabelListUnderRule', {
							sLabels: _.uniq(res).join(',')
						}).done(function (data) {
							if (data.code == 0) {
								_.each(data.extend, function (obj) {
									map[obj.labelCode] = obj.labelName;
								});
							}
						}).always(function () {
							var people = 0;
							tab = _.map(tab, function (obj) {
								people += obj.nPeoples;
								return {
									id: obj.nId,
									name: obj.sRuleName,
									desc: obj.sRuleDesc || '',
									people: obj.nPeoples,
									product: obj.nProductId,
									tags: _.map(obj.sLabels2, function(code){ return map[code]||code; }),
									isShowMore: false
								}
							});
							self.people = people;
							self.$refs.minBox.list = tab;
							if (dir != 'min') {
								self.$refs[dir + 'Box'].list = tab;
								setTimeout(function () {
									self.slideBox = 'min';
									self = null;
								}, 200 * tab.length)
							}
						})
					})
				}
			}
		},
		components: {
			'popover-box': Vue.extend({
				data: function () {
					return {
						list: []
					}
				},
				template: document.getElementById('vue-tpl-popover-box').innerHTML,
				methods: {
					del: function (item) {
						var self = this;
						Vue.dialog.confirm("删除确定", '确定删除规则: <a href="javascritp:;">' + item.name + '</a> 吗?', [
							{
								'class': 'btn-danger',
								click: function () {
									this.close();
									$.post('/datacube/manager/label/deleteRuleLabel', {
										nId: item.id
									}).done(function (data) {
										if (data.code == 0) {
											self.$parent.reload();
										} else {
											Vue.dialog.alert(data.message);
										}
									})
								},
								name: '删除'
							},
							{ 'class': 'btn-default', click: 'close', name: '关闭' }
						]);
					},
					modify: function (item) {
						location.href = "/pages/rule/modify.html?id=" + item.id ;
					}
				}
			})
		},
		ready: function () {
			$('.vue-hide').removeClass('vue-hide');
			var self = this;
			var $content = $('.main-content');
			var $widget = $('.widget');
			var setWidth = function () {
				var width = $content.width();
				if (width < 900) {
					width = 900;
				}
				var n = 3;
				if (width >= 1593) {
					n = 5;
				} else if (width >= 1308) {
					n = 4;
				}
				$widget.removeClass('widget-num3 widget-num4 widget-num5').addClass('widget-num' + n);
				
				self.pageSize = n * 2;
				self.boxWidth = width;
			};
			setWidth();
			//$('.main-content').width() - 80

			this.$watch("pageSize", function (val, old) {
				if (old != 0) {
					var page = this.page;
					var begin = 0;
					if (page.totalCount) {
						page = {
							currentPage: Math.ceil(((page.currentPage - 1) * page.pageSize + 1)/ val)
						}
					} else {
						page = {
							currentPage: 1
						}
					}
					this.reload();
				}
			});		
			$(window).on('resize', setWidth);
			CUBE.vm.$watch('isWideContent', function (val) {
				clearTimeout(timer);
				timer = setTimeout(setWidth , 600);
			})
		}
	});
});
