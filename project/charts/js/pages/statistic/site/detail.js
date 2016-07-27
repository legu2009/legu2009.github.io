require.config({
	baseUrl: "/project/charts/js/",
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
		echarts3: "lib/echarts/echarts.min",//3.0
		echartsMy: "charts/echarts/dist/echarts.min"
	},
	packages: [
        {
            main: 'echarts',
            location: '/project/charts/js/charts/echarts/src',
            name: 'echarts'
        },
        {
            main: 'zrender',
            location: '/project/charts/js/charts/zrender/src',
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

require(["jQuery", "Vue", "underscore"], function ($, Vue, _) {
	CUBE.vm.isWideContent = true;
	$('.breadcrumbs').hide();
	$('.panel-content').css('paddingTop', 0);
	
	require([
			'zrender/core/vector',
			'echartsMy'
		], function (vec2, echarts) {
			var chartElm = document.getElementById('main');
			var chart = echarts.init(chartElm, null, {renderer: 'canvas' });
			var chartW = chart.getWidth();
        var colorMap = {
            搜索引擎: '#f35f62',
            直接访问: '#af76f0',
            外部连接: '#a2cf37',
            内部连接: '#fdc006',
            广告连接: '#00a8ff',

            访问首页uv: '#ff8acc',
            snail: '#fee0ab',
            mall: '#ace9ff',
            mobile: '#feb5ab',
            其他: '#ace9ff'
        };var colorTab = ['#ebfd6e', '#6bffbf', '#c5cdff', '#ebfd6e', '#6bffbf', '#c5cdff','#ebfd6e', '#6bffbf', '#c5cdff', '#ebfd6e', '#6bffbf', '#c5cdff','#ebfd6e', '#6bffbf', '#c5cdff', '#ebfd6e', '#6bffbf', '#c5cdff', '#ebfd6e', '#6bffbf', '#c5cdff', '#ebfd6e', '#6bffbf', '#c5cdff']; //4
			var itemStyle = {
				normal: {
					color: function (a , b) {
						return colorMap[a.name]
					}
				}
			};

			var getItemStyleClolr = (function (site) {
				var colorMapT = [['#fee0ab'], ['#ace9ff', '#feb5ab'],  ['#ebfd6e', '#6bffbf', '#c5cdff']];
				var indexT = [];
				return function (site) {
					var deep = site.deep - 1;
					var t = colorMapT[deep];
					indexT[deep] = indexT[deep] || 0;
					var i = (indexT[deep]++) % (t.length);
					return t[i];
				}
			})();
			
			var lineSizes = [10, 40];
			var dealData = function (data) {
				var dType = data.dType = domain2Type(data.domain);
				var maxD2Len = 3;
				if (dType == 'woniu') {
					maxD2Len = 6;
					_.each(data.downStreamUV, function (item) {
						item.downStreamUV = item.downStreamUV || [];
						if (item.downStreamUV.length > 1) {
							item.downStreamUV.length = 1;
						}
					})
				}
				var downStreamUV = data.downStreamUV;
				var other = {
					domain: '其他',
					pageUV: 0,
					totalUV: 0,
					parentUV: 0,
					upstreamUV: {},
					downStreamUV: []
				};
				var otherTip = [];
				var _upstreamUV = other.upstreamUV;
				for (var i = maxD2Len - 1, len = downStreamUV.length; i < len; i++) {
					otherTip.push({domain: downStreamUV[i].domain , totalUV: downStreamUV[i].totalUV, parentUV: downStreamUV[i].parentUV});
					other.pageUV += downStreamUV[i].pageUV *1;
					other.totalUV += downStreamUV[i].totalUV *1;
					other.parentUV += downStreamUV[i].parentUV *1;
					_.each(downStreamUV[i].upstreamUV, function (item) {
						_upstreamUV[item.mediaType] = _upstreamUV[item.mediaType] || 0;
						_upstreamUV[item.mediaType] += item.uv * 1;
					})
				}
				var tmp = [];
				for (var key in _upstreamUV) {
					tmp.push({mediaType: key, uv: _upstreamUV[key]});
				}
				other.upstreamUV = tmp;
				data.downStreamUV.length = maxD2Len - 1;
				//data.downStreamUV = _.sortBy(data.downStreamUV, function(item){ return item.totalUV * -1; });
				data.downStreamUV[maxD2Len - 1] = other;
				otherTip = _.sortBy(otherTip, function(item){ return item.totalUV * -1; });
				if (otherTip.length > 6)
					otherTip.length = 6;
				other.otherTip =  _.reduce(otherTip, function(memo, item){ return memo + '<br>' + item.domain + ': ' + item.totalUV + '(' + item.parentUV + ')'; }, "");
				return data;
			};
			var _upstream = function (stream) {
				var res = [];
				var nameMap = {
					'内部': '内部连接',
					'外部': '外部连接',
					'直接': '直接访问',
					'内部': '内部连接',
					'广告': '广告连接'
				};
				_.each(stream, function (item) {
					res.push({
						name: nameMap[item.mediaType] || item.mediaType,
						value: item.uv
					})
				})
				return res;
			};
			var getCenterFns = {
				snail: function (obj, opt, tab) {
					if (opt.deep == 1) 
						return [chartW/2 + 100, 150]
					else if (opt.deep == 2) {
						return [[chartW/2 - 250, 280], [chartW/2 + 100, 450], [chartW/2 + 450, 350]][opt.index]
					} else if (opt.deep == 3) {
						var index = opt.index;
						if (opt.d3Len == 4) {
							if (index == 0 ) {
								return [chartW/2 - 500, 450]
							} else if (index == 1 ) {
								return [chartW/2 - 250, 550]
							} else if (index == 2) {
								return [chartW/2 - 100, 600]
							} else if (index == 3) {
								return [chartW/2 + 100, 680]
							}
						} else if (opt.d3Len == 3) {
							var count = opt.countMap[obj.domain];
							if (count == 1 && (index == 0 || index == 1)) {
								return [chartW/2 - 500, 450]
							} else if (count == 2 && (index == 0 || index == 1))  {
								return [chartW/2 - 250, 550]
							} else if (count == 1 && (index == 2 || index == 3)) {
								return [chartW/2 + 100, 680]
							}
						} else if (opt.d3Len == 2) {
							if (index == 0) {
								return [chartW/2 - 500, 450]
							} else if (index == 1)  {
								return [chartW/2 - 100, 680]
							}
						}
					}
					return false;
				},
				woniu: function (obj, opt, tab) {
					if (opt.deep == 1) 
						return [chartW/2 - 60, 130]
					else if (opt.deep == 2) {
						if (opt.index == tab.length - 1) {
							return [chartW/2 + (opt.index - 2) * 200 - 60, 220];
						} else {
							return [chartW/2 + (opt.index - 2) * 230 - 60, 400 - Math.abs(opt.index - 2) * 30];
						}							
					} else if (opt.deep == 3) {
						var index = opt.index;
						return [chartW/2 + (opt.index - 2) * 230 - 60 + (opt.index - 2) * 30, 630  - Math.abs(opt.index - 2) * 40];
					}
					return false;
				}
			};
			var getSizeFRange = function (sRange, range, num) {
				var size  = ((num - range[0])/(range[1] - range[0]) * (sRange[1] - sRange[0]) + sRange[0]) >>0
				if (size > sRange[1]) 
					size = sRange[1];
				return size;
			};
			var getSizeFns = {
				snail: function (obj, opt, tab) {
					if (opt.deep == 1) 
						return 120
					else if (opt.deep == 2 || opt.deep == 3) {
						var sRange = [90, 110];
						if (opt.deep == 3) {
							sRange = [50, 80];
						}
						return getSizeFRange(sRange, opt.range, obj.totalUV);
					}
				},
				woniu: function (obj, opt, tab) {
					if (opt.deep == 1) 
						return 100
					else if (opt.deep == 2 || opt.deep == 3) {
						var sRange = [75, 90];
						if (opt.deep == 3) {
							sRange = [50, 65];
						}
						return getSizeFRange(sRange, opt.range, obj.totalUV);
					}
				}
			};
			var domain2Name = function (domain) {
				if (domain == 'www.snail.com') {
					return 'snail';
				} else if (domain.indexOf('.snail.com') != -1) {
					return domain.replace('.snail.com', '');
				} else if (domain == 'www.woniu.com') {
					return 'woniu'
				} else if (domain.indexOf('.woniu.com') != -1) {
					return domain.replace('.woniu.com', '');
				}
				return domain;
			};
			var domain2Type = function (domain) {
				if (domain == 'www.snail.com') {
					return 'snail';
				} else {
					return 'woniu';
				}
			};
			var getRange = function (tab, opt, name) {
				name = name || 'totalUV';
				var last = tab.length;
				if (opt.deep == 2) last--;
				if (tab[0]) {					
					var res = [];
					for (var i = 0; i < last; i++) {
						if (tab[i]) {
							var totalUV = tab[i][name] * 1;
							if (i == 0) {
								res = [totalUV, totalUV];
							} else {
								if (totalUV > res[1]) {
									res[1] = totalUV;
								}
								if (totalUV < res[0]) {
									res[0] = totalUV;
								}
							}
						}
						
					}
				}
				return res;
			}
			var _convertData = function (res, obj, opt, tab) {
				var name = domain2Name(obj.domain);
				res[name] = {
					site : name,
					domain: obj.domain,
					center: getCenterFns[opt.dType](obj, opt, tab),
					size: getSizeFns[opt.dType](obj, opt, tab),
					datas: [
						_upstream(obj.upstreamUV),
						[
							{name:'访问首页uv', value: obj.pageUV},
							{name:'未访问首页uv', value: (obj.totalUV||obj.pageUV), display: false}
						]
					],
					deep: opt.deep,
					totalUV: obj.totalUV,
					otherTip: obj.otherTip || ""
				};
				
				if (opt.deep == 1) {
					var range = getRange(obj.downStreamUV, {deep: opt.deep + 1});
					_.each(obj.downStreamUV, function (item, index) {
						_convertData(res, item, {deep: opt.deep + 1, index: index, dType: obj.dType, range: range}, obj.downStreamUV)
					})	
				}
			};
			var convertData = function (res, obj, opt, tab) {
				var countMap = {};
				var countTab = {};
				var len = 0;
				var deep2Stream = obj.downStreamUV;
				_.each(deep2Stream, function (item1) {
					_.each(item1.downStreamUV, function (item) {
						var domain = item.domain;
						if (!countMap[domain]){
							countMap[domain] = countMap[domain] || 0;
							len++;
						}
						countTab[domain] = countTab[domain] || [];
						countTab[domain].push(item1);
						countMap[domain]++;
					})
				});
				_.each(deep2Stream, function (item) {
					_.each(item.downStreamUV, function (item) {
						item.count = countMap[item.domain];
					})
				});
				obj.d3Len = len;
				if (obj.dType == 'snail') {
					_convertData(res, obj, {deep: 1, index: 0, dType: obj.dType}, tab);
					var opt = {deep: 3, index: 0, d3Len: len, tabIndex: 0, countMap: countMap, dType: 'snail'};
					var tab = [];
					if (len == 4) {//大小小大
						tab.push.apply(tab, _.sortBy(deep2Stream[0].downStreamUV, function(item){ return item.totalUV * -1; }));
						tab.push.apply(tab, _.sortBy(deep2Stream[1].downStreamUV, function(item){ return item.totalUV; }));
					} else if (len == 3) {
						var stream = deep2Stream[0].downStreamUV;
						if (countMap[stream[0].domain] == 1) {
							tab[0] = stream[0];
							tab[1] = stream[1];
						} else {
							tab[0] = stream[1];
							tab[1] = stream[0];
						}
						var stream = deep2Stream[1].downStreamUV;
						if (countMap[stream[0].domain] == 1) {
							tab[2] = stream[0];
						} else {
							tab[2] = stream[1];
						}
					} else {
						tab.push.apply(tab, _.sortBy(deep2Stream[0].downStreamUV, function(item){ return item.totalUV * -1; }));
					}
					opt.range = getRange(tab, {deep: 3});
					_.each(tab, function (obj, index) {
						opt.index = index;
						var center = getCenterFns[opt.dType](obj, opt, tab);
						if (center) {
							var name = domain2Name(obj.domain);
							res[name] = {
								site : name,
								domain: obj.domain,
								center: center,
								size: getSizeFns[opt.dType](obj, opt, tab),
								datas: [
									_upstream(obj.upstreamUV),
									[
										{name:'访问首页uv', value: obj.pageUV},
										{name:'未访问首页uv', value: (obj.totalUV||obj.pageUV), display: false}
									]
								],
								deep: opt.deep,
								totalUV: obj.totalUV,
								otherTip: obj.otherTip || ""
							};
						}
					})
				} else {//根据第3级公用关系，公用的放在一起
					var opt = {deep: 3, index: 0, d3Len: len, tabIndex: 0, countMap: countMap, dType: 'woniu'};
					var tab = [];
					var hasMap = {};
					var _deep2Stream = [];
					_.each(deep2Stream, function (item, index) {
						var obj = item.downStreamUV[0];
						if (!obj || !obj.domain) 
							_deep2Stream.push(item);
						else if (countTab[obj.domain]) {
							_deep2Stream.push.apply(_deep2Stream, countTab[obj.domain]);
							countTab[obj.domain] = null;
						}
					});
					deep2Stream = obj.downStreamUV = _deep2Stream;
					_convertData(res, obj, {deep: 1, index: 0, dType: obj.dType}, tab);
					
					_.each(deep2Stream, function (item, index) {
						var obj = item.downStreamUV[0];
						if (!obj || !obj.domain) 
							tab.push(false);
						else if (!hasMap[obj.domain]) {
							hasMap[obj.domain] = 1;
							obj.d3Index = tab.length;
							tab.push(obj);
						} else {
							tab.push(false);
						}		
					});
					opt.range = getRange(tab, {deep: 3});
					_.each(tab, function (obj, index) {
						if (obj == false) return;
						opt.index = index;
						var center = getCenterFns[opt.dType](obj, opt, tab);
						if (center) {
							var name = domain2Name(obj.domain);
							res[name] = {
								site : name,
								domain: obj.domain,
								center: center,
								size: getSizeFns[opt.dType](obj, opt, tab),
								datas: [
									_upstream(obj.upstreamUV),
									[
										{name:'访问首页uv', value: obj.pageUV},
										{name:'未访问首页uv', value: (obj.totalUV||obj.pageUV), display: false}
									]
								],
								deep: opt.deep,
								totalUV: obj.totalUV,
								otherTip: obj.otherTip || ""
							};
						}
					});
					
				}
			};
			
			
			var getSerie = function (site) {
				var delay = (site.deep - 1) * 2000;
				var fontSizeMap = ['30','22','13'];
				site.siteColor = getItemStyleClolr(site);
				return [{
					type : 'pie',
					name: '域名|' + site.domain,
					z: 5,
					silentObj: {Sector: true, Polyline: true, Text: false},
					center : site.center,
					radius : [site.size*0.8, site.size],
					itemStyle: {
						normal: {
							color: function (a , b) {
								return site.siteColor
							}
						}
					},
					label : {
						normal : {
							show: true,
							position : 'center',
							textStyle: {
								color: "#666",
								fontSize: fontSizeMap[site.deep-1],
								fontWeight: site.deep == 1 ? 'bold' : 'normal'
							}
						}
					},
					data : [
						{name: site.site, value: [site.totalUV, site.otherTip]}
					],
					animationDelay: delay
				},
				{
					type : 'pie',
					name: '流量来源',
					z: 5,
					center : site.center,
					radius : [site.size*0.55, site.size*0.75],
					label : {
						normal : {
							show: false
						}
					},
					minAngle: 15,
					itemStyle: itemStyle,
					hoverAnimationDis: site.size*0.2 * 0.6,
					data : site.datas[0],
					animationDelay: delay
				},
				{
					type : 'pie',
					name: '访问首页',
					z: 5,
					center : site.center,
					radius : [site.size *0.4, site.size *0.5],
					itemStyle: itemStyle,
					hoverAnimationDis: site.size*0.05,
					minAngle: 15,
					label: {
						normal: {
							show: false
						}
					},
					data : site.datas[1],
					animationDelay: delay
				}]
			};
			var getMakeLine = function (siteA, siteB, opt) {
				var pA = siteA.center;
				var pB = siteB.center;
				var jd = Math.atan((pB[0] - pA[0]) / (pB[1] - pA[1]));
				var lineWidth = opt.lineWidth;
				var curvenessMap = {
					left: -0.1,
					right: 0.1
				}
				var pos = opt.pos;
				
				var p = [pB[0] - pA[0], pB[1] - pA[1]];
				var tangent = vec2.normalize(p, p);
				var n = [tangent[1], -tangent[0]];
				if (n[1] > 0) {
                    n[0] = -n[0];
                    n[1] = -n[1];
                }
                var distance = (siteA.size + siteB.size) * 0.1;
				return [
					{
						name: opt.name,
						value: siteA.site + '>>' + siteB.site + '<br>' + opt.name,
						x: pA[0] + (siteA.size - siteA.size * 0.1) * Math.sin(jd) + (pos == 'middle' ? 0 : n[0] * distance),
						y: pA[1] + (siteA.size - siteA.size * 0.1) * Math.cos(jd) + (pos == 'middle' ? 0 : n[1] * distance),
						symbol: 'none',
						lineStyle: {
							normal: {
								color: siteA.siteColor,
								width: lineWidth,
								offsetPos: siteA.size * 0.1,
								curveness: curvenessMap[pos] || 0
							},
							emphasis: {
								width: lineWidth
							}
						},
						label: {
							normal: {
								offsetPos: siteA.size * 0.1
							}
						}
					},
					{
						x: pB[0]  -  (siteB.size + lineWidth + 5) * Math.sin(jd) + (pos == 'middle' ? 0 : n[0] * distance),
						y: pB[1]  -  (siteB.size + lineWidth + 5) * Math.cos(jd) + (pos == 'middle' ? 0 : n[1] * distance),
						symbol: 'arrow2',
						symbolSize: [2 * lineWidth, lineWidth]
					}
				]
			};
			
			var getDataDone = function (data) {
					$('#loadingBox').hide();
					if (data.code == 0) {
						if (!data.extend.totalUV) {
							$('#nodataBox').show();
							return;
						}
						var _series = [];
						var _data = dealData(data.extend);
						var dType = _data.dType;
						var siteData = {};
						convertData(siteData, _data);
						for (var key in siteData) {
							_series.push.apply(_series, getSerie(siteData[key]));
						}
						
						var tab = [];
						var deep2Stream = _data.downStreamUV;
						tab.push.apply(tab, _.filter(deep2Stream, function (item , index) { return index != deep2Stream.length -1; } ));
						_.each(deep2Stream, function (item) {
							tab.push.apply(tab, item.downStreamUV);
						})
						var lineRange = getRange(tab, {deep: 3}, 'parentUV');
						var _makeLine = [];
						var parent = _data;
						_.each(parent.downStreamUV, function (item, index) {
							var pos = ['left', 'middle', 'right'][index];
							if (dType == 'woniu') {
								pos = ['left', 'left', 'middle'][index] || 'right';
							}					
							_makeLine.push(getMakeLine(siteData[domain2Name(parent.domain)], siteData[domain2Name(item.domain)], {
								name: item.parentUV,
								lineWidth: getSizeFRange(lineSizes, lineRange, item.parentUV),
								pos: pos
							}));
						})
						
						_series.push({
							name: '流量走向',
							type: 'line',
							data: [],
							markLine: {
								label: {
									normal: {
										position: 'middle'
									}
								},
								lineStyle: {
									normal: {
										width: 10,
										type: 'solid'
									},
									emphasis: {
										width: 10
									}
								},
								data: _makeLine,
								animationDelay: 1000
							}
						});
						
						var _makeLine = [];
						if (dType == 'snail') {
							var parent = _data.downStreamUV[0];
							var d3Len = _data.d3Len;
							_.each(parent.downStreamUV, function (item, index) {
								var pos = index == 0 ?'left': 'right';
								if (d3Len == 3) {
									if (item.count == 1) {
										pos = "left";
									} else {
										pos = "right";
									}
								}
								_makeLine.push(getMakeLine(siteData[domain2Name(parent.domain)], siteData[domain2Name(item.domain)], {
									name: item.parentUV,
									lineWidth: getSizeFRange(lineSizes, lineRange, item.parentUV),
									pos: pos
								}));
							});
							
							var parent = _data.downStreamUV[1];
							_.each(parent.downStreamUV, function (item, index) {
								var pos = "left";
								if (d3Len == 4) {
									if (index == parent.downStreamUV.length - 1) {
										pos = "middle";
									}
								} else if (d3Len == 3) {
									if (item.count == 1) {
										pos = "middle";
									}
								}
								_makeLine.push(getMakeLine(siteData[domain2Name(parent.domain)], siteData[domain2Name(item.domain)], {
									name: item.parentUV,
									lineWidth: getSizeFRange(lineSizes, lineRange, item.parentUV),
									pos: pos
								}));
							});
						} else {
							var deep2Stream = _data.downStreamUV;
							_.each(deep2Stream, function (parent, d2Index) {
								_.each(parent.downStreamUV, function (item, index) {
									var pos = 'right';
									if (d2Index == item.d3Index) {
										pos = pos = ['left', 'left', 'middle'][d2Index] || 'right';
									} else if (d2Index < item.d3Index) {
										pos = 'left';
									}
									_makeLine.push(getMakeLine(siteData[domain2Name(parent.domain)], siteData[domain2Name(item.domain)], {
										name: item.parentUV,
										lineWidth: getSizeFRange(lineSizes, lineRange, item.parentUV),
										pos: pos
									}));
								})
							})
						}
						
						_series.push({
							name: '流量走向2',
							type: 'line',
							data: [],
							markLine: {
								label: {
									normal: {
										position: 'middle'
									}
								},
								lineStyle: {
									normal: {
										width: 10,
										type: 'solid'
									},
									emphasis: {
										width: 10
									}
								},
								data: _makeLine,
								animationDelay: 3000
							}
						});

						chart.setOption({
							grid: [{
								x: 0,
								y: 0,
								show: false
							}],
							xAxis: {
								axisLine: {
									show: false
								},
								axisLabel: {
									show: false
								},
								axisTick: {
									show: false
								},
								splitLine: {
									show: false
								}
							},
							yAxis: {
								axisLine: {
									show: false
								},
								splitLine: {
									show: false
								}
							},
							toolbox: {
								show : true,
								feature : {
									saveAsImage : {show: true}
									/*,myMax: {
										show: true,
										title: '最大化',
										icon: 'image://http://echarts.baidu.com/images/favicon.png',
										onclick: function (){
											if (fullScreenApi.isFullScreen() == false) {
												fullScreenApi.requestFullScreen(chartElm)
											} else {
												fullScreenApi.cancelFullScreen(chartElm)
											}
											chart.resize();
										}
									}*/
								}
							},
							legend: {
								left: 'center',
								top: 'top',
								data:['直接访问', '搜索引擎', '外部连接', '内部连接', '广告连接', '访问首页uv']
							},
							title: {
								text: '',
								x: 'left'
							},
							tooltip: {
								formatter: function(params) {
									if (params.seriesName == '流量来源' || params.seriesName == '访问首页' ) {
										return params.name + '<br/>' +  params.value + ' (' + params.percent + '%)';
									}
									if (params.seriesName.indexOf('域名') == 0) {
										var value = params.value;
										return params.seriesName.split('|')[1] + '<br/>访问总uv: ' +  value[0] 
										+ (value[1] ? value[1] : '');
									}
									if (params.seriesName.indexOf('流量走向') == 0) {
										return params.value;
									}
									return params.seriesName + '<br/>' + params.name + '-' +  params.percent
								}
							},
							series: _series,
							backgroundColor: '#fff'
						});
					}	
				};
			
			var getData = function () {-
				chart.clear();
				$('#loadingBox').show();
				$('#nodataBox').hide();
				var params = {
					startTime: $('#startTimeIpt').val(), 
					endTime: $('#endTimeIpt').val()
				}
				if (CUBE._param.site == 'woniu') {
					$.get('woniu.json', params).done(getDataDone);
				} else {
					$.get('snail.json', params).done(getDataDone);
				}	 
			};
			getData();
			$('#startTimeIpt,#endTimeIpt').on('change', getData);
			$('.form_datetime_remove').on('click', function () {
				$(this).siblings('.form_datetime').val('');
				getData();
			})
	});
});


