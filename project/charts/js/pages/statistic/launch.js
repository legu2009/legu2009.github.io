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
require(["jQuery"], function ($) {
    var _param = CUBE._param;
	var labelAjax = $.get('/datacube/manager/statstics/ad/getRootContentLabel');
	var statsticsAjax = $.get('/datacube/manager/statstics/ad/getAdStatsticsList', {
        locationId: _param.locationId,
		adName: '',
		adType: '',
		startTime: '',
		endTime: '',
		pageId: 1,
		pageSize: 10,
		entranceNo: '',
		locationNo: '',
		rootContentCode: '',
		leafContentCode: '',
		status: ''
	});
	
	var enterAjax = $.get('/datacube/manager/statstics/ad/getEntranceList');
	//var enterAjax = $.get('/datacube/manager/statstics/ad/getLocationList', {});
	
	
	require(["Vue", 'echarts3', "components/pager.vue"], function (Vue, echarts) {
		var todayAdLocation = echarts.init(document.getElementById('todayAdLocation'));
		var option = {
			title: {
				text: '今日实时统计',
				x:'center'
			},
			tooltip: {
				trigger: 'axis',
				formatter: ''
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
				x : 'center',
				y : '30',
				//bottom: 0,
				orient: 'horizontal',
				data:['显示','点击','点击率']
			},
			xAxis: [
				{
					type: 'category',
					data: []
				}
			],
			yAxis: [
				{
					type: 'value',
					name: '数值',
					//min: 0,
					//max: 250,
					//interval: 50,
					axisLabel: {
						//formatter: '{value} ml'
					}
				},
				{
					type: 'value',
					name: '百分比',
					//min: 0,
					//max: 25,
					//interval: 5,
					axisLabel: {
						formatter: '{value} %'
					}
				}
			],
			series: [
				{
					name:'显示',
					type:'bar',
					barWidth: 25,
					data:[]
				},
				{
					name:'点击',
					type:'bar',
					barWidth: 25,
					data:[]
				},
				{
					name:'点击率',
					type:'line',
					yAxisIndex: 1,
					data:[]
				}
			],
			color:['#feb5ab', '#ace9ff', '#aeaeff']
		};
		var launchData = new Vue({
			el: '#launchData',
			data: {
                locationName: !!_param.locationName ? decodeURI(_param.locationName) + '投放数据' : '',
				adName: '',
				adType: '',
				status: '',
				startTime: '',
				endTime: '',
				locationId: _param.locationId,
				rootContentCode: '',
				leafContentCode: '',
				launchList: [],
				labelList: [],
				entranceNo: '',
				locationNo: '',
				leafContentList: [],
				enterList: [],
				locationList: [],
				pager: {}
			},
            watch: {
                startTime: function(){
                    this.getLaunch();
                },
                endTime: function(){
                    this.getLaunch();
                },
				adType: function(){
                    this.getLaunch();
                },
				status: function(){
                    this.getLaunch();
                },
				entranceNo: function(){
					this.locationList = [];
					this.locationNo = '';
					this.getLocationList();
                    this.getLaunch();
                },
				locationNo: function () {
					this.getLaunch();
				},
				rootContentCode: function(){
					this.leafContentList = [];
					this.leafContentCode = '';
					this.getLeafContent();
                    this.getLaunch();
                },
				leafContentCode: function () {
					this.getLaunch();
				}
            },
			methods: {
				/*getTodayAdLocation: function(){
					$.get('/datacube/manager/statstics/domain/getTodayAdLocationDetail').done(function(data){
						if(!+data.code){

						}
					});
				},*/
				getLocationList: function(){
					var me = this;
					$.post("/datacube/manager/statstics/ad/getLocationList", {
						entranceNo: this.entranceNo
					}).done(function(data){
						if (data.code == 0) {
							me.locationList = data.extend;
						}
					});
				},
				getLeafContent: function(){
					var me = this;
					$.post("/datacube/manager/statstics/ad/getLeafContentLabel", {
						rootContentCode: this.rootContentCode
					}).done(function(data){
						if (data.code == 0) {
							me.leafContentList = data.extend;
						}
					});
				},
				getLabelList: function(){
					var me = this;
					labelAjax.done(function(data){
						if (!+data.code) {
							me.labelList = data.extend;
						}
					});
				},
				getLaunch: function(n){
					var self = this;
					$.get('/datacube/manager/statstics/ad/getAdStatsticsList', {
                        locationId: this.locationId,
						adName: this.adName,
						adType: this.adType,
						startTime: this.startTime,
						endTime: this.endTime,
						entranceNo: this.entranceNo,
						locationNo: this.locationNo,
						rootContentCode: this.rootContentCode,
						leafContentCode:  this.leafContentCode,
						status:  this.status,
						pageId: n || 1,
						pageSize: 10
					}).done(function (data) {
						self._getLaunchDone(data);
					});
				},
				_getLaunchDone: function (data) {
					if(!+data.code){
						var xAxisData = [],
							displayData = [],
							clickData = [],
							clickRateData = [];
						$.each(data.extend, function(i, v){
							displayData.push(v.todayDisplayUV || 0);
							clickData.push(v.todayClickUV || 0);
							if (!!v.todayDisplayUV) {
								clickRateData.push((v.todayClickUV/v.todayDisplayUV).toFixed(4)*100);
							} else {
								clickRateData.push(0);
							}
							xAxisData.push(v.contentName);
						});
						option.xAxis[0].data = xAxisData;
						option.series[0].data = displayData;
						option.series[1].data = clickData;
						option.series[2].data = clickRateData;
						todayAdLocation.setOption(option);
						this.launchList = data.extend;
						this.pager = data.page;
					}
				},
                removeTime: function(name){
                    this[name] = '';
                },
				launchDetail: function (contentId, contentName) {
					location.href = "/pages/statistic/launch-detail.html?adId=" + contentId + "&contentName=" + contentName;
				},
				gotoPage: function (n) {
					this.getLaunch(n);
				}
			},
			ready: function(){
				var self = this;
				this.getLabelList();
				enterAjax.done(function(data){
					if (data.code == 0) {
						self.enterList = data.extend;
					}
				});
				statsticsAjax.done(function (data) {
					self._getLaunchDone(data);
				});
				$(window).on('resize', function () {
					todayAdLocation.resize();
				});
				CUBE.vm.$watch('isWideContent', function (val) {
					todayAdLocation.resize();
				});
			}
		});
		
	})
});
require(["jQuery", 'css!../css/bootstrap-datetimepicker.min.css', "datetimepicker"], function ($) {
	$.fn.datetimepicker.dates['en'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
		daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		today: "今天",
		suffix: [],
		meridiem: ["上午", "下午"]
	};
    $('.form_datetime').datetimepicker({
        format: 'yyyy-mm-dd',
        autoclose: true,
        autoclose: 1,
        minView: 2,
        forceParse: 0,
        fontAwesome: true
    });
});