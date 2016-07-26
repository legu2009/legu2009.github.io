
require(["jQuery", "Vue", 'echarts3', "components/pager.vue"], function ($, Vue, echarts) {
    var todayFlow = echarts.init(document.getElementById('todayFlow'));
    var option = {
        title: {
            text: '今日流量来源',
            x:'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            bottom: 0,
            orient: 'horizontal',
            data:[]
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
                name:'UV',
                type:'pie',
                radius : [30, 110],
                center: ['50%', '55%'],
                roseType : 'angle',
				minAngle: 15,
				miHeight: 15,
                data:[]
            }
        ],
        color:['#feb5ab', '#ace9ff', '#aeaeff', '#faacff', '#abfdcb', '#ffc7ac', '#abe1fe', '#fee0ab', '#aaffaa']
    };

    var domainData = new Vue({
        el: '#domainData',
        data: {
            url: '',
            startTime: '',
            endTime: '',
            domainStatsticsList: [],
			hasTodayData: -1,
			pager: {}
        },
        watch: {
            startTime: function(){
                this.getDomainStatstics();
            },
            endTime: function(){
                this.getDomainStatstics();
            }
        },
        methods: {
			toTime: function (n) {
				n = (n*1) >>0;
				var t = ['秒', '分', '时'];
				var res = [];
				for (var i = 0; i < 3 && n > 0; i++) {
					res.push(n%60 + t [i]);
					n = (n/60) >>0
				}
				return res.reverse().join('')
			},
            getTodayFlow: function(){
				var self = this;
				self.hasTodayData = -1;
                $.get('/datacube/manager/statstics/domain/getTodayFlowFrom').done(function(data){
                    if(!+data.code){
                        $.each(data.extend, function(i, v){
                            option.legend.data.push({
                                icon: 'circle',
                                name: v.upStream
                            });
                            option.series[0].data.push({
                                value: v.uv,
                                name: v.upStream
                            })
                        });
                        todayFlow.setOption(option);
						self.hasTodayData = data.extend.length;
                    }
                });
            },
            getDomainStatstics: function(n){
                var me = this;
                $.get('/datacube/manager/statstics/domain/getDomainStatsticsList', {
                    url: me.url,
                    startTime: me.startTime,
                    endTime: me.endTime,
                    pageId: n || 1,
                    pageSize: 10
                }).done(function(data){
                    if(!+data.code){
                        me.domainStatsticsList = data.extend;
						me.pager = data.page;
                    }
                });
            },
            removeTime: function(name){
                this[name] = '';
            },
            adLocation: function (domain, entranceId) {
                location.href = "/pages/statistic/adLocation.html?domain=" + domain + '&entranceId=' + entranceId ;
            },
			gotoPage: function (n) {
				this.getDomainStatstics(n);
			}
        },
        ready: function(){
            var me = this;
            me.getTodayFlow();
            me.getDomainStatstics();
            $(window).on('resize', function () {
                todayFlow.resize();
            });
            CUBE.vm.$watch('isWideContent', function (val) {
                todayFlow.resize();
            })
			$('.vue-hide').removeClass('vue-hide');
        }
    });
});

