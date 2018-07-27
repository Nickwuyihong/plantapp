window.onLoad = function(){
    	var map = new AMap.Map('container',{
    	center:[116.397428, 39.90923],//中心点坐标
    	viewMode:'3D'//使用3D视图
    	resizeEnable:true,
    	layers:[//使用多个图层
    		new AMap.TileLayer.Satellite(),
    		new AMap.TileLayer.RoadNet()
    	]
    	zooms:[4,18],//设置地图级别范围
    	zoom:13,//级别
	});
    var trafficLayer = new AMap.TileLayer.Traffic({
    	zIndex: 10
    });
    map.add(trafficLayer);//添加到图层

    var marker = new AMap.Marker({
    	position:[116.39, 39.9]//位置
    })
    map.add(marker);//添加到地图
    //map.remove(marker)//移除marker

    var lineArr = [
    	[116.368904, 39.913423],
        [116.382122, 39.901176],
        [116.387271, 39.912501],
        [116.398258, 39.904600]
    ];

    var polyline = new AMap.Polyline({
    	path: lineArr,//设置覆盖物路径
    	strokeColor: "#3366ff",//线颜色
    	strokeWeight: 5,//线宽
    	strokeStyle: "solid",//线样式
    });
    map.add(polyline);
}
  


  var url = 'https://webapi.amap.com/maps?v=1.4.8&key=771cfc92b931ffb84a466275a9b80880&callback=onLoad';
  var jsapi = document.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = url;
  document.head.appendChild(jsapi);