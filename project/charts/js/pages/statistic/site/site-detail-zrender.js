
require(["jQuery", "Vue" ], function ($, Vue) {
		require(
    [
        'zrender',
        'zrender/tool/color',
        'zrender/shape/Sector',
		'zrender/shape/Text',
		'zrender/shape/Icon'
    ],
    function ( zrender, zrColor, SectorShape, TextShape, IconShape) {
        var zr = zrender.init(document.getElementById('main'));
        zr.clear();
        
        var data = [10,13,23,8,35,18];
        var total = 0;
        for (var i = 0, l = data.length; i < l; i++) {
            total += data[i];
        }
        var percent;
        var startAngle = 0;
        var endAngle;
        var x = Math.round(zr.getWidth() / 2);
        var y = 50;
        var r0 = 40;
        var r = 50;
		var quadrant;
		var centerAngle;
	
		var colorTab = ['#9E0041', "#C32F4B", "#E1514B", "#F47245", "#FB9F59", "#FEC574"]
        for (var i = 0, l = data.length; i < l; i++){

            percent = data[i] / total;
            endAngle = (percent * 360 + startAngle).toFixed(2) - 0;
            percent = (percent * 100).toFixed(2) + '%';
			centerAngle = (endAngle - startAngle)/2 + startAngle;
			console.log(centerAngle, percent);
			
			var sector = new SectorShape({
                style : {
                    x : x,          // 圆心横坐标
                    y : y,          // 圆心纵坐标
                    r0 : r0,        // 圆环内半径
                    r : r,          // 圆环外半径
                    startAngle : startAngle,
                    endAngle : endAngle,
                    brushType : 'both',
                    color : colorTab[i],
                    strokeColor : '#fff',
					text : percent,
					textPosition : centerAngle > 90 &&  centerAngle < 270 ? 'left':'right',
					
                    textBaseline: 'middle',
                    textColor : 'blue',
                    textFont : 'bold 10px verdana',
					shadowBlur: 0
                },
                clickable : true,
                onclick : function(params) {
                    alert(params.target.style.text);
                }
            });
			console.log(sector.drawText);
            zr.addShape(sector)
            startAngle = endAngle;
        }
		
		zr.addShape(new TextShape({
			style : {
				x : x,
				y : y - 8,
				brushType : 'fill',
				color : "red",
				shadowColor : 'yellow',
				shadowBlur : 10,
				lineWidth : 3,
				text : 'snail',
				textFont : 'normal 16px verdana',
				textAlign : 'center',
				textBaseline : 'top'
			},
			draggable : true
		}));
		
		
		zr.addShape(new IconShape({
			style : {
				iconType: "arrow",
				x: 100,
				y: 100,
				width: 50,
				height: 30
			},
			draggable : true
		}));
		
		
        zr.render();
    }
);


    
});

