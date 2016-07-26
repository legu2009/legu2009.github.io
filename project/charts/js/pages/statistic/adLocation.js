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
require(['jQuery', 'Vue', 'echarts3', 'underscore', 'components/pager.vue'], function ($, Vue, echarts, _) {
    var todayAdLocation = echarts.init(document.getElementById('todayAdLocation'))
	var option = {
		title: {
			text: '今日广告位实时数据',
			x: 'center'
		},
		tooltip: {
			trigger: 'axis',
			formatter: function (a, b, c, d) {
				var dataIndex = a[0].dataIndex;
				var res  = [a[0].name + (dataIndex%2 == 1?'今日' : '昨日')];
				for (var i = 0; i < 2; i++) {
					res.push('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + a[i].color + '"></span>' + a[i].seriesName + ": " + a[i].value);
				}
				i = ((dataIndex/2) >> 0 ) + 2;
				console.log(i);
				res.push('<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:' + a[i].color + '"></span>' + a[i].seriesName + ": " + a[i].value);
				
				return res.join('<br>');
			}
		},
		toolbox: {
			feature: {
				dataView: {show: true, readOnly: false},
				magicType: {show: true, type: ['line', 'bar']},
				restore: {show: true},
				saveAsImage: {show: true}
			}
		},
		legend: {
			x: 'center',
			y: '30',
			// bottom: 0,
			orient: 'horizontal',
			data: ['显示', '点击', '点击率']
		},
		xAxis: [{
			type: 'category',
			data: []
		}],
		yAxis: [{
			type: 'value',
			name: '数值',
			// min: 0,
			// max: 250,
			// interval: 50,
			axisLabel: {
				// formatter: '{value} ml'
				}
		}, {
			type: 'value',
			name: '百分比',
			min: 0,
			// max: 25,
			// interval: 5,
			axisLabel: {
				formatter: '{value} %'
			}
		}],
		series: [{
			name: '显示',
			type: 'bar',
			barWidth: 25,
			barMinHeight: 10,
			data: []
		},{
			name: '点击',
			type: 'bar',
			barWidth: 25,
			barMinHeight: 10,
			data: []
		}],
		color: ['#feb5ab', '#ace9ff', '#aeaeff']
	};

	var _param = CUBE._param
	var adLocationData = new Vue({
		el: '#adLocationData',
		data: {
			url: '',
			startTime: '',
			endTime: '',
			adLocationList: [],
			pager: {}
		},
		watch: {
			startTime: function () {
				this.getAdLocation()
			},
			endTime: function () {
				this.getAdLocation()
			}
		},
		methods: {
			getAdLocation: function (n) {
				var me = this;
				$.get('/datacube/manager/statstics/domain/getAdLocationList', {
					url: this.url,
					startTime: this.startTime,
					endTime: this.endTime,
					pageId: n || 1,
					pageSize: 10,
					domain: _param.domain || '',
					entranceId: _param.entranceId || ''
				}).done(function (data) {
					if (data.code == 0) {
						
						var xAxisData = [],
							displayData = [],
							clickData = [],
							displayDatay = [],
							clickDatay = [],
							clickRateData = [];
						var locationId = '', num = 0
						var len = data.extend.length;
						$.each(data.extend, function (i, v) {
							xAxisData.push(v.name + '_' + v.locationId);
							xAxisData.push(v.name + '_' + v.locationId);
							displayData.push(v.yesterdayDisplayUV || 0);
							displayData.push(v.todayDisplayUV || 0);
							
							clickData.push(v.yesterdayClickUV || 0);
							clickData.push(v.todayClickUV || 0);
							
							var data = [];
							data[i*2] = v.yesterdayClickRate || 0;
							data[i*2 + 1] = v.todayClickRate || 0;
							clickRateData.push(v.yesterdayClickRate, v.todayClickRate);
							option.series.push({
								name: '点击率',
								type: 'line',
								yAxisIndex: 1,
								showAllSymbol: true,
								data: data,
								lineStyle: {
									normal: {
										color: '#aeaeff'
									}
								},
								itemStyle: {
									normal: {
										color: '#aeaeff'
									}
								}
							});

							/*
							num += 1;
							if (locationId != v.locationId && locationId != '') { // 没有点击数据时
								num = 0;
								clickData.push(0);
								locationId = v.locationId;
							} else if (locationId == '') { // 一个广告位数据结束时
								locationId = v.locationId;
							} else if (num == 2) { // 有点击数据时，一个广告位数据结束
								num = 0;
								locationId = '';
							}
							if (v.type == '显示') {
								!!v.clickRate ? clickRateData.push(v.clickRate) : clickRateData.push(0);
								
								!!v.displayUV ? displayData.push(v.displayUV) : displayData.push(0);
							}
							if (v.type == '点击') {
								!!v.clickUV ? clickData.push(v.clickUV) : clickData.push(0);
							}*/
						})
						option.xAxis[0].data = xAxisData;
						
						option.series[0].data = displayData;
						option.series[1].data = clickData;
						
						
						//option.series[2].data = displayDatay;
						//option.series[3].data = clickDatay;
						
						
						option.yAxis[1].max = Math.ceil(_.max(clickRateData) / 10) * 10;

						todayAdLocation.setOption(option);
						
						me.adLocationList = data.extend;
						me.pager = data.page;
					}
				})
			},
			removeTime: function (name) {
				this[name] = ''
			},
			gotoLaunch: function (locationId, name) {
				location.href = '/pages/statistic/launch.html?locationId=' + locationId + '&locationName=' + name
			},
			adLocationDetail: function (locationId, name) {
				location.href = '/pages/statistic/adLocation-detail.html?locationNo=' + locationId + '&locationName=' + name + '&domain=' + _param.domain
			},
			gotoPage: function (n) {
				this.getAdLocation(n)
			}
		},
		ready: function () {
			var me = this;
			me.getAdLocation();
			$(window).on('resize', function () {
				todayAdLocation.resize()
			})
			CUBE.vm.$watch('isWideContent', function (val) {
				todayAdLocation.resize()
			})
		}
	})
})
// <!-- inject: ../../../include/datetimepicker.js-->
