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
	console.log(path);
	var pathMap = {
		'rule-modify': 'rule-add',
		'statistic-launch-detail': 'statistic-launch',
		'statistic-adLocation': 'statistic-site',
		'statistic-site-detail?site=woniu': 'statistic-site-woniu'
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
					{key: 'statistic-site', name: '站点数据统计', icon: 'fa-link', href: '/pages/statistic/site.html'},
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
					children: ['statistic-site-index', 'statistic-site-detail', 'statistic-site-woniu']
				},
				'statistic-site-index': {
					key: 'statistic-site-index',
					icon: 'fa-pie-chart',
					name: '统计详情',
					href: '/pages/statistic/site/index.html'
				},
				'statistic-site-detail': {
					key: 'statistic-site-detail',
					icon: 'fa-pie-chart',
					name: 'snail站点详情',
					href: '/pages/statistic/site/detail.html'
				},
				'statistic-site-woniu': {
					key: 'statistic-site-woniu',
					icon: 'fa-pie-chart',
					name: 'woniu站点详情',
					 href: '/pages/statistic/site/detail.html?site=woniu'
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
		console.log(JSON.stringify(config.activeMenus));
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
require(["jQuery", "Vue", "underscore"], function ($, Vue, _) {
	CUBE.vm.isWideContent = true;
	$('.menu-options,.breadcrumbs').hide();
	$('.panel-content').css('paddingTop', 0);

	var getData = $.post('/datacube/manager/statstics/domain/getSnailStatsticsDetail');
	require([
			'echarts',
			'echarts/chart/pie',
			'echarts/component/title',
			'echarts/component/legend',
			'echarts/component/grid',
			'echarts/component/markLine',
			'echarts/component/tooltip',
			'echarts/chart/line',
			'echarts/component/toolbox'
		], function (echarts) {
			var chartElm = document.getElementById('main');
			var chart = echarts.init(chartElm, null, {renderer: 'canvas' });
			var chartW = chart.getWidth();
			var colorMap = {
				搜索引擎: '#ace9ff',
				直接访问: '#abfdcb',
				外部连接: '#aeaeff',
				内部连接: '#faacff',
				广告连接: '#faacff',
				
				访问首页uv: '#faacff',
				snail: '#fee0ab',
				mall: '#ffc7ac',
				mobile: '#ac1432',
				其他: '#ba1499'
			};
			var colorTab = ['#D23934', '#69AEB6', '#E18A6B', '#4185D5', '#41a5D5']
			var itemStyle = {
				normal: {
					color: function (a , b) {
						colorMap[a.name] = colorMap[a.name] || colorTab.shift();
						return colorMap[a.name]
					}
				}
			};
			var dealData = function (data) {
				if (data.domain == 'www.snail.com') {
					var downStreamUV = data.downStreamUV;
					var other = {
						domain: '其他',
						pageUV: 0,
						totalUV: 0,
						parentUV: 0,
						upstreamUV: {}
					};
					var otherTip = [];
					var _upstreamUV = other.upstreamUV;
					for (var i = 2, len = downStreamUV.length; i < len; i++) {
						otherTip.push({domain: downStreamUV[i].domain , totalUV: downStreamUV[i].totalUV});
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
					data.downStreamUV.length = 2;
					data.downStreamUV = _.sortBy(data.downStreamUV, function(item){ return item.totalUV * -1; });
					data.downStreamUV[2] = other;
					otherTip = _.sortBy(otherTip, function(item){ return item.totalUV * -1; });
					
					other.otherTip =  _.reduce(otherTip, function(memo, item){ return memo + '<br>' + item.domain + ': ' + item.totalUV; }, "");
				}
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
			var getCenter = function (obj, opt, tab) {
				if (opt.deep == 1) 
					return [chartW/2 + 100, 150]
				else if (opt.deep == 2) {
					if (opt.index == 2) return [chartW/2 + 450, 350];
					var other = tab[1 - opt.index];
					if (obj.totalUV > other.totalUV) {
						return [chartW/2 - 250, 280]
					} else {
						return [chartW/2 + 100, 450]
					}
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
					return false;
				}
			};
			var getSize = function (obj, opt, tab) {
				if (opt.deep == 1) 
					return 120
				else if (opt.deep == 2) {//90~110
					if (opt.index == 0) 
						return 90
					else if (opt.index == 2) 
						return 110
					else {
						return ((obj.totalUV - tab[0].totalUV)/(tab[2].totalUV - tab[0].totalUV) *20 + 90) >>0
					}
				} else if (opt.deep == 3) {//50~80
					var sizeTab = opt.sizeTab;
					var minTotal = opt.minTotal;
					var index = _.find(sizeTab, function(item){ return item.domain == obj.domain; })
					if (index == 0) {
						return 50;
					} else if (index == sizeTab.length - 1) {
						return 80;
					} else {
						return ((obj.totalUV - opt.minTotal)/(opt.maxTotal - opt.minTotal) *30 + 50) >>0
					}		
				}
			};
			var domain2Name = function (domain) {
				if (domain == 'www.snail.com') {
					return 'snail';
				} else if (domain.indexOf('.snail.com')) {
					return domain.replace('.snail.com', '');
				}
				return domain;
			};	
			var _convertData = function (res, obj, opt, tab) {
				opt = opt || {deep: 1, index: 0};
				var name = domain2Name(obj.domain);
				res[name] = {
					site : name,
					domain: obj.domain,
					center: getCenter(obj, opt, tab),
					size: getSize(obj, opt, tab),
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
					_.each(obj.downStreamUV, function (item, index) {
						_convertData(res, item, {deep: opt.deep + 1, index: index}, obj.downStreamUV)
					})	
				}
			};
			var convertData = function (res, obj, opt, tab) {
				_convertData(res, obj, opt, tab);
				var countMap = {};
				var len = 0;
				console.log(obj);
				var deep2Stream = obj.downStreamUV;				
				_.each(deep2Stream[0].downStreamUV, function (item) {
					if (!countMap[item.domain]){
						countMap[item.domain] = countMap[item.domain] || 0;
						len++;
					}
					countMap[item.domain]++;
				})
				_.each(deep2Stream[1].downStreamUV, function (item) {
					if (!countMap[item.domain]){
						countMap[item.domain] = countMap[item.domain] || 0;
						len++;
					}
					countMap[item.domain]++;
				})
				
				_.each(deep2Stream[0].downStreamUV, function (item) {
					item.count = countMap[item.domain];
				})
				_.each(deep2Stream[1].downStreamUV, function (item) {
					item.count = countMap[item.domain];
				})
				
				
				var opt = {deep: 3, index: 0, d3Len: len, tabIndex: 0, countMap: countMap};
				var tab = [];
				if (len == 4) {
					tab.push.apply(tab, _.sortBy(deep2Stream[0].downStreamUV, function(item){ return item.totalUV * -1; }));
				    tab.push.apply(tab, _.sortBy(deep2Stream[1].downStreamUV, function(item){ return item.totalUV * -1; }));
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
				opt.sizeTab = _.sortBy(tab, function(item){ return item.totalUV * -1; });
				opt.minTotal = opt.sizeTab[0].totalUV;
				opt.maxTotal = opt.sizeTab[opt.sizeTab.length - 1].totalUV;
				_.each(tab, function (obj, index) {
					opt.index = index;
					var center = getCenter(obj, opt, tab);
					if (center) {
						var name = domain2Name(obj.domain);
						res[name] = {
							site : name,
							domain: obj.domain,
							center: center,
							size: getSize(obj, opt, tab),
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
			}
			
			var _series = [];
			var getSerie = function (site) {
				var delay = (site.deep - 1) * 2000;
				var fontSizeMap = ['30','22','13']
				return [{
					type : 'pie',
					name: '域名|' + site.domain,
					z: 5,
					silentObj: {Sector: true, Polyline: true, Text: false},
					center : site.center,
					radius : [site.size*0.8, site.size],
					itemStyle: itemStyle,
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
				return [
					{
						name: opt.name,
						value: siteA.site + '>>' + siteB.site,
						x: pA[0] + (siteA.size - siteA.size * 0.1) * Math.sin(jd),
						y: pA[1] + (siteA.size - siteA.size * 0.1) * Math.cos(jd),
						symbol: 'none',
						lineStyle: {
							normal: {
								color: colorMap[siteA.site] || colorTab.shift(),
								width: lineWidth,
								offsetPos: siteA.size * 0.1,
								/*shadowColor: 'rgba(0, 0, 0, 0.5)',
								shadowBlur: 10,*/
								curveness: curvenessMap[opt.pos] || 0
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
						x: pB[0]  -  (siteB.size + lineWidth + 5) * Math.sin(jd),
						y: pB[1]  -  (siteB.size + lineWidth + 5) * Math.cos(jd),
						symbol: 'arrow2',
						symbolSize: [2 * lineWidth, lineWidth]
					}
				]
			}
			getData.done(function (data) {
				if (data.code == 0) {
					var _data = dealData(data.extend);
					var siteData = {};
					convertData(siteData, _data);
					for (var key in siteData) {
						_series.push.apply(_series, getSerie(siteData[key]));
					}
					var tab = [];
					tab.push.apply(tab, _data.downStreamUV);
					tab.push.apply(tab, _data.downStreamUV[0].downStreamUV);
					tab.push.apply(tab, _data.downStreamUV[1].downStreamUV);
					tab = _.sortBy(tab, function(item){ return item.parentUV * -1; });
					var maxUV =  tab[0].parentUV, minUV = tab[tab.length - 1].parentUV;
					var _makeLine = [];
					var parent = _data;
					_.each(parent.downStreamUV, function (item, index) {
						_makeLine.push(getMakeLine(siteData[domain2Name(parent.domain)], siteData[domain2Name(item.domain)], {
							name: item.parentUV,
							lineWidth: ((item.parentUV - minUV)/(maxUV - minUV) *40 + 10) >>0,
							pos: ['left', 'middle', 'right'][index]
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
					var parent = _data.downStreamUV[0];
					_.each(parent.downStreamUV, function (item, index) {
						_makeLine.push(getMakeLine(siteData[domain2Name(parent.domain)], siteData[domain2Name(item.domain)], {
							name: item.parentUV,
							lineWidth: ((item.parentUV - minUV)/(maxUV - minUV) *40 + 10) >>0,
							pos: index == 0 ?'right': 'left'
						}));
					})
					
					var parent = _data.downStreamUV[1];
					var d3Len = 4;
					_.each(parent.downStreamUV, function (item, index) {
						if (item.count == 2) {
							d3Len--;
						}
					});
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
							lineWidth: ((item.parentUV - minUV)/(maxUV - minUV) *40 + 10) >>0,
							pos: pos
						}));
					});
					
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
							text: '站点数据详情',
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
			});
			
			
		})
});

