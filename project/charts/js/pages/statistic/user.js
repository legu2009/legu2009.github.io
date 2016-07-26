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
require(["jQuery", "Vue"], function ($, Vue) {
	require(['jquery.smooth-scroll'], function () {
		var $body = $('body');
		$('.heading-profile a').on('click', function () {
			var target = $(this).attr('data-target');
			$.smoothScroll({
			  scrollElement: $body,
			  scrollTarget: target + 'ChartsTit',
			  offset: -150,
			  afterScroll: function() {
				  location.hash = target;
			  }
			});
		});

        $('.floatingMenu a').on('click', function () {
            var target = $(this).attr('data-target');
            $.smoothScroll({
                scrollElement: $body,
                scrollTarget: target + 'ChartsTit',
                offset: -150,
                afterScroll: function() {
                    location.hash = target;
                }
            });
        });
		
		//if (location.hash) {
			$.smoothScroll({
			  scrollElement: $body,
			  offset: -150,
			  scrollTarget: (location.hash||'#behavior') + 'ChartsTit'
			});
		//}
		window.onhashchange = function () {
			$.smoothScroll({
			  scrollElement: $body,
			  offset: -150,
			  scrollTarget: (location.hash||'#behavior') + 'ChartsTit'
			});
		};
		$(window).on('scroll', function () {
			if (document.body.scrollTop > 150) {
			    $('.user-top').addClass('fixed')
			} else {
				$('.user-top').removeClass('fixed')
			}
		})
	});
	
    require([
            'echarts',
            'echarts/chart/map',
            'echarts/component/title',
            'echarts/component/legend',
            'echarts/component/visualMap',
            'echarts/component/geo',
            'echarts/chart/pie',
            'echarts/component/grid',
            'echarts/component/tooltip',
            'echarts/component/toolbox',
            'lib/echarts/map/js/china'
        ], function (echarts) {

        $.get('/dist/js/charts/echarts/map/json/china.json', function (chinaJson) {
            echarts.registerMap('china', chinaJson);

            var regionData = echarts.init(document.getElementById('regionData')),
                gameData = echarts.init(document.getElementById('gameData'));
            var regionOption = {
                title: {
                    text: '用户所属省的统计数据',
                    //subtext: 'Data from www.census.gov',
                    //sublink: 'http://www.census.gov/popest/data/datasets.html',
                    left: 'center'
                },
                legend: {
                    bottom: 0,
                    orient: 'horizontal',
                    data:[]
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
						if (isNaN(params.value)) {
							console.log(params);
							return params.seriesName + '<br/>' + (params.name||'南海诸岛') + ': 0';
						}
                        var value = (params.value + '').split('.');
                        value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
                        return params.seriesName + '<br/>' + (params.name||'南海诸岛') + ': ' + value;
                    }
                },
                visualMap: {
                    type: 'continuous',
                    left: 'left',
                    bottom: 50,
                    min: 0,
                    max: 1000,
                    color: ['#fe432a', '#ff8170', '#ffbab1'],
                    text:['High','Low'],           // 文本，默认为数值文本
                    calculable: true,
                    seriesIndex: 1
                },
                toolbox: {
                    show: true,
                    //orient: 'vertical',
                    //left: 'left',
                    top: 'top',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name:'地域分布(省)',
                        type:'pie',
                        radius : [30, 110],
                        center : ['75%', 200],
						minAngle: 10,
                        data:[]
                    },
                    {
                        name: '地域分布',
                        type: 'map',
                        map: 'china',
                        left: '100',
                        itemStyle:{
                            emphasis:{
                                label:{show:true},
                                areaColor: '#fddd31'
                            }
                        },
                        legendHoverLink: true,
                        // 文本位置修正
                        textFixed: {
                            Alaska: [20, -20]
                        },
                        data:[]
                    }
                ],
                color:['#feb5ab', '#ace9ff', '#aeaeff', '#faacff', '#abfdcb', '#ffc7ac', '#abe1fe', '#fee0ab', '#aaffaa', '#ff9ca5']
            };

            var gameDisData = [],//游戏分布统计数据
                gameUserData = [];//玩家类型数据
            var gameNumData_low = [], gameNumData_mid = [], gameNumData_high = [];
            var gameOption = {
                title: {
                    text: '游戏分布统计',
                    //subtext: 'Data from www.census.gov',
                    //sublink: 'http://www.census.gov/popest/data/datasets.html',
                    left: 'center'
                },
                legend: {
                    bottom: 0,
                    orient: 'horizontal',
                    data:[]
                },
                tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2
                },
                toolbox: {
                    show: true,
                    //orient: 'vertical',
                    //left: 'left',
                    top: 'top',
                    feature: {
                        dataView: {readOnly: false},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                series: [
                    {
                        name:'游戏分布统计',
                        type:'pie',
                        radius : [30, 110],
                        center : ['25%', '50%'],
						minAngle: 10,
                        data:[]
                    },
                    {
                        name:'游戏用户消费记录（玩家类型）',
                        type:'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
						minAngle: 10,
                        center : ['75%', '50%'],
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:[]
                    },
                    {
                        name:'游戏用户消费记录（人数）',
                        type:'pie',
                        radius: ['40%', '55%'],
                        center : ['75%', '50%'],
						minAngle: 10,
                        data:[]
                    }
                ],
                color:['#feb5ab', '#ace9ff', '#aeaeff', '#faacff', '#abfdcb', '#ffc7ac', '#abe1fe', '#fee0ab', '#aaffaa', '#ff6c7a']
            };

            gameData.on('click', function(params){
                if(params.seriesName == '游戏分布统计' && !!params.data.id){
                    userData.getGameUserData(params.data.id);
                }
                if(params.seriesName == '游戏用户消费记录（玩家类型）'){
                    if(params.data.name == '菜鸟玩家'){
                        gameData.setOption({
                            series: [
                                {
                                    data: gameDisData
                                },
                                {
                                    data: gameUserData
                                },
                                {
                                    data: gameNumData_low
                                }
                            ]
                        });
                    }else if(params.data.name == '进阶玩家'){
                        gameData.setOption({
                            series: [
                                {
                                    data: gameDisData
                                },
                                {
                                    data: gameUserData
                                },
                                {
                                    data: gameNumData_mid
                                }
                            ]
                        });
                    }else{
                        gameData.setOption({
                            series: [
                                {
                                    data: gameDisData
                                },
                                {
                                    data: gameUserData
                                },
                                {
                                    data: gameNumData_high
                                }
                            ]
                        });
                    }
                }
            });

            var userData = new Vue({
                el: '#userData',
                data: {
                    currentIndex: 0,
                    days: 0,
                    prodId: 10,
                    date: '',
                    productList: [],
                    //behavior_currentIndex: 0,
                    //behavior_days: 0,
                    //behavior_prodId: 10,
                    //behavior_date: '',
                    behavior_list: [],
					isBehaviorLoading: true,
                    behavior_visitUV: '',
					hasBegionData: -1,
					isBegionLoading: true,
					isGameLoading: true
                    //region_currentIndex: 0,
                    //region_days: 0,
                    //region_prodId: 10,
                    //region_date: ''
                },
                watch: {
                    /*behavior_prodId: function(){
                        this.getBehaviorData();
                    },
                    behavior_date: function(){
                        this.getBehaviorData();
                    },
                    region_prodId: function(){
                        this.getRegionData();
                    },
                    region_date: function(){
                        this.getRegionData();
                    }*/
                    prodId: function(){
                        this.getBehaviorData();
                        this.getRegionData();
                        this.getGameData();
                    },
                    date: function(){
                        this.getBehaviorData();
                        this.getRegionData();
                        this.getGameData();
                    }
                },
                methods: {
                    getGameData: function(){
                        var me = this,
                            legendData = [];
                        $.get('/datacube/manager/statstics/user/gameStatstics', {
                            prodId: me.prodId,
                            days: me.date == '' ? me.days : '',
                            date: me.date == '' ? '' : me.date
                        }).done(function(data){
                            if(!+data.code && !!data.extend.length){
                                $.each(data.extend, function(i, v){
                                    legendData.push(v.gameName);
                                    gameDisData.push({name: v.gameName, value: v.userCount, id: v.proId});
                                });
                                gameOption.legend.data = legendData;
                                gameOption.series[0].data = gameDisData;
                                me.getGameUserData();
                            }
							
                        });
                    },
                    getGameUserData: function(prodId){
                        //var prefix = '', hash = {};
                            //gameUserInitData = [],
                            //gameUserData = [],
                            //gameNumData = [];
						var me = this;
                        $.get('/datacube/manager/statstics/user/gameUserStatstics', {prodId: prodId || 10}).done(function(data){
                            if(!+data.code && !!data.extend.length){
                                /*$.each(data.extend, function(i, v){
                                    gameUserData.push(v.userType);
                                });
                                for(var i=0; i<gameUserInitData.length; i++){
                                    if(typeof gameUserInitData[i] == 'string' ) {
                                        prefix = '_str';
                                    } else {
                                        prefix = '';
                                    }
                                    if(!hash[gameUserInitData[i]+prefix]){
                                        hash[gameUserInitData[i]+prefix] = true;
                                        gameUserData.push(gameUserInitData[i]);
                                    }
                                }*/
                                gameNumData_low = [];
                                gameNumData_mid = [];
                                gameNumData_high = [];
                                gameUserData[0] = {value:0, name:'菜鸟玩家'};
                                gameUserData[1] = {value:0, name:'进阶玩家'};
                                gameUserData[2] = {value:0, name:'资深玩家'};
                                $.each(data.extend, function(i, v){
                                    if(v.userType == '菜鸟玩家'){
                                        gameUserData[0].value += v.count;
                                        gameNumData_low.push({value:v.count, name: v.range});
                                    }else if(v.userType == '进阶玩家'){
                                        gameUserData[1].value += v.count;
                                        gameNumData_mid.push({value:v.count, name: v.range});
                                    }else if(v.userType == '资深玩家'){
                                        gameUserData[2].value += v.count;
                                        gameNumData_high.push({value:v.count, name: v.range});
                                    }
                                });
                                !!gameUserData[0].value ? gameUserData[0].selected = true : !!gameUserData[1].value ? gameUserData[1].selected = true : !!gameUserData[2].value ? gameUserData[2].selected = true : gameUserData[0].selected = true;

                                gameOption.series[1].data = gameUserData;
                                gameOption.series[2].data = gameNumData_low;
                                !!prodId ? gameData.setOption({
                                    series: [
                                        {
                                            data: gameDisData
                                        },
                                        {
                                            data: gameUserData
                                        },
                                        {
                                            data: gameNumData_low
                                        }
                                    ]
                                }) : gameData.setOption(gameOption);
                            }
							me.isGameLoading = false;
                        });
                    },
                    getRegionData: function(){
                        var me = this,
                            mapData = [],
                            pieInitData = [],
                            pieDataSin = [],
                            pieData = [],
                            legendData = [],
                            visualMapMax = 0;
						me.hasBegionData = -1;
						me.isBegionLoading = false;
						
                        $.get('/datacube/manager/statstics/user/provinceStatstics',{
                            prodId: me.prodId,
                            days: me.date == '' ? me.days : '',
                            date: me.date == '' ? '' : me.date
                        }).done(function(data){
                            if(!+data.code && !!data.extend.length) {
								
                                $.each(data.extend, function (i, v) {
                                    mapData.push({name: v.province, value: v.users});
                                    pieInitData.push(v.users);
                                });
								
                                pieInitData.sort(function (a, b) {
                                    return b - a;
                                });

                                pieDataSin = pieInitData.slice(0, 9);
                                pieDataSin.push(0);
                                visualMapMax = Number(pieDataSin[0].toString().split('')[0])+1;
                                visualMapMax = visualMapMax*Math.pow(10, pieDataSin[0].toString().length-1);
                                $.each(pieInitData.slice(9), function (i, v) {
                                    pieDataSin[9] += v;
                                });
                                $.each(pieDataSin, function (i, v) {
                                    $.each(data.extend, function (m, n) {
                                        if (v == n.users) legendData.push(n.province);
                                    });
                                });
                                legendData.push('其他');
                                $.each(pieDataSin, function (i, v) {
                                    pieData.push({name: legendData[i], value: v});
                                });
                                regionOption.visualMap.max = visualMapMax;
                                regionOption.series[1].data = mapData;
                                regionOption.series[0].data = pieData;
                                regionOption.legend.data = legendData;
                                regionData.setOption(regionOption);
                            }
							me.hasBegionData = data.extend.length;
							me.isBegionLoading = false;
                        });
                    },
                    getBehaviorData: function(){
                        var me = this;
						me.behavior_list = [];
						me.isBehaviorLoading = true;
                        $.get('/datacube/manager/statstics/user/userStatstics',{
                            prodId: me.prodId,
                            days: me.date == '' ? me.days : '',
                            date: me.date == '' ? '' : me.date
                        }).done(function(data){
							
                            if(!+data.code && !!data.extend.length) {
                                $.each(data.extend, function (i, v) {
                                    if (v.userType == '访问用户') {
                                        me.behavior_visitUV = v.UV;
                                        return false;
                                    }
                                });
                                me.behavior_list = data.extend;	
                            }
							
							me.isBehaviorLoading = false;
                        });
                    },
                    getProductIdList: function(){
                        var me = this;
                        $.get('/datacube/manager/statstics/ad/getProductIdList').done(function(data){
                            if(!+data.code){
                                me.productList = data.extend;
                            }
                        });
                    },
                    changeDays: function(type, index, days){
                        var me = this;
                        switch(type){
                            case 'behavior' :
                                me.behavior_currentIndex = index;
                                me.behavior_days = days;
                                me.behavior_date = '';
                                me.getBehaviorData();
                                break;
                            case 'region' :
                                me.region_currentIndex = index;
                                me.region_days = days;
                                me.region_date = '';
								me.getRegionData();
                                break;
                            case '' :
                                me.currentIndex = index;
                                me.days = days;
                                me.date = '';
                                me.getBehaviorData();
                                me.getRegionData();
                                me.getGameData();
                                break;
                        }
                    }
                },
                ready: function(){
                    var me = this;
                    me.getBehaviorData();
                    me.getRegionData();
                    me.getGameData();
                    me.getProductIdList();
					$('.vue-hide').removeClass('vue-hide');
                    $(window).on('resize', function () {
                        regionData.resize();
                        gameData.resize();
                    });
                    CUBE.vm.$watch('isWideContent', function (val) {
                        regionData.resize();
                        gameData.resize();
                    });
                }
            });

            Vue.filter('secformat', function(val){
                var time, hour, min, sec, day;
                val = parseInt(val);
                if(val > -1){
                    hour = Math.floor(val/3600);
                    min = Math.floor(val/60) % 60;
                    sec = val % 60;
                    day = parseInt(hour / 24);
                    if (day > 0) {
                        hour = hour - 24 * day;
                        time = day + "day " + hour + ":";
                    }
                    else time = hour + ":";
                    if(min < 10){time += "0";}
                    time += min + ":";
                    if(sec < 10){time += "0";}
                    time += sec;
                }
                return time;
            });
            Vue.filter('proportion', function(val){
                if(val > 0 && val < 1){
                    return (val*100).toFixed(2);
                }else{
                    return (val/userData.behavior_visitUV*100).toFixed(2);
                }
            });
        });
    });
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