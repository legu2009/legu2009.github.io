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
require(["jQuery", "Vue", 'echarts3'], function ($, Vue, echarts) {
    var adLocationDetailLine = echarts.init(document.getElementById('adLocationDetailLine'));
    var adLocationDetailPie0 = echarts.init(document.getElementById('adLocationDetailPie0'));
    var adLocationDetailPie1 = echarts.init(document.getElementById('adLocationDetailPie1'));
    var adLocationDetailPie2 = echarts.init(document.getElementById('adLocationDetailPie2'));
    var optionLine = {
        title : {
            //text: ''
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['显示','点击']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                data : []
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'显示',
                type:'bar',
                data:[],
                barWidth: 25,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'点击',
                type:'bar',
                data:[],
                barWidth: 25,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ],
        color:['#feb5ab', '#ace9ff', '#aeaeff']
    };


    var _param = CUBE._param;

    var adLocationDetailData = new Vue({
        el: '#adLocationDetailData',
        data: {
            days: 3,
            daysName: '最近三天',
            locationName: decodeURI(_param.locationName),
            currentIndex: 0
        },
        methods: {
            getAdLocationDetailDataLine: function(){
                var me = this,
                    prefix = '', hash = {};
                $.get('/datacube/manager/statstics/domain/getAdLocationDetailByDay',{
                    days: me.days,
                    domain: _param.domain,
                    locationNo: _param.locationNo
                }).done(function(data){
                    if(!+data.code){
                        var xAxisData_init = [],
                            xAxisData = [],
                            seriesData_display = [],
                            seriesData_click = [];
                        $.each(data.extend, function(i, v){
                            xAxisData_init.push(v.date);
                            if(v.type == '显示'){
                                seriesData_display.push(v.uv);
                            }else{
                                seriesData_click.push(v.uv);
                            }
                        });
                        for(var i=0; i<xAxisData_init.length; i++){
                            if(typeof xAxisData_init[i] == 'string' ) {
                                prefix = '_str';
                            } else {
                                prefix = '';
                            }
                            if(!hash[xAxisData_init[i]+prefix]){
                                hash[xAxisData_init[i]+prefix] = true;
                                xAxisData.push(xAxisData_init[i]);
                            }
                        }
                        optionLine.xAxis[0].data = xAxisData;
                        optionLine.series[0].data = seriesData_display;
                        optionLine.series[1].data = seriesData_click;
                        adLocationDetailLine.setOption(optionLine);
                    }
                });
            },
            getOptionPie: function(title, legendData, seriesData){
                var optionPie = {
                    title: {
                        text: title,
                        x:'left'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        top: 400,
                        orient: 'horizontal',
                        data: legendData
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly: false},
                            magicType : {
                                show: true,
                                type: ['pie', 'funnel']
                            },
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable: true,
                    series: [
                        {
                            name:'浏览量',
                            type:'pie',
                            radius : [30, 110],
                            center: ['50%', '40%'],
                            roseType : 'angle',
							minAngle: 15,
							miHeight: 15,
                            data: seriesData,
							minAngle: 10
                        }
                    ],
                    color:['#feb5ab', '#ace9ff', '#aeaeff', '#faacff', '#abfdcb', '#ffc7ac', '#abe1fe', '#fee0ab', '#aaffaa']
                };
                return optionPie;
            },
            getAdLocationDetailDataPie: function(){
                var me = this;
                $.get('/datacube/manager/statstics/domain/getAdLocationDetailByUpStream',{
                    days: me.days,
                    locationNo: _param.locationNo
                }).done(function(data){
                    if(!+data.code){
                        var legendData = [],
                            seriesData = [];
                        $.each(data.extend, function(i, v){
                            if(v.type == '显示'){
                                legendData.push({
                                    icon: 'circle',
                                    name: v.upStream
                                });
                                seriesData.push({
                                    value: v.pv,
                                    name: v.upStream
                                })
                            }
                        });
                        adLocationDetailPie0.setOption(me.getOptionPie('根据上游类型获取', legendData, seriesData));
                    }
                });
                $.get('/datacube/manager/statstics/domain/getAdLocationDetailByUserType',{
                    days: me.days,
                    locationNo: _param.locationNo
                }).done(function(data){
                    if(!+data.code){
                        var legendData = [],
                            seriesData = [];
                        $.each(data.extend, function(i, v){
                            if(v.type == '显示'){
                                legendData.push({
                                    icon: 'circle',
                                    name: v.userType
                                });
                                seriesData.push({
                                    value: v.uv,
                                    name: v.userType
                                })
                            }
                        });
                        adLocationDetailPie1.setOption(me.getOptionPie('根据用户类型获取', legendData, seriesData));
                    }
                });
                $.get('/datacube/manager/statstics/domain/getAdLocationDetailByCity',{
                    days: me.days,
                    locationNo: _param.locationNo
                }).done(function(data){
                    if(!+data.code){
                        var legendData = [],
                            seriesData = [];
                        $.each(data.extend, function(i, v){
                            if(v.type == '显示'){
                                legendData.push({
                                    icon: 'circle',
                                    name: v.cityName
                                });
                                seriesData.push({
                                    value: v.pv,
                                    name: v.cityName
                                })
                            }
                        });
                        adLocationDetailPie2.setOption(me.getOptionPie('根据城市获取', legendData, seriesData));
                    }
                });
            },
            changeDays: function(daysVal, index, days){
                var me = this;
                me.daysName = daysVal;
                me.currentIndex = index;
                me.days = days;
                me.getAdLocationDetailDataLine();
                me.getAdLocationDetailDataPie();
            }
        },
        ready: function(){
            var me = this;
            me.getAdLocationDetailDataLine();
            me.getAdLocationDetailDataPie();
            $(window).on('resize', function () {
                adLocationDetailLine.resize();
            });
            CUBE.vm.$watch('isWideContent', function (val) {
                adLocationDetailLine.resize();
            })
        }
    });
});

