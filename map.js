window.onLoad = function(){
    	var map = new AMap.Map('container',{
    	center: [116.397428, 39.90923],//中心点坐标
    	viewMode: '3D',//使用3D视图
    	resizeEnable: true,
    	layers: [//使用多个图层
    		new AMap.TileLayer.Satellite(),
    		new AMap.TileLayer.RoadNet()
    	],
    	zooms:[4,18],//设置地图级别范围
    	zoom:13//级别
	});

    AMap.plugin(['AMap.ToolBar','AMap.Driving','AMap.Geolocation'],function(){//异步同时加载多个插件
    	var toolbar = new AMap.ToolBar();
    	map.addControl(toolbar);
    	
    	var driving = new AMap.Driving();//驾车路线规划
    	driving.search(/*参数*/);
    	
    	var geolocation = new AMap.Geolocation();
    	map.addControl(geolocation);
    	
    	var walking = new AMap.Walking();//步行路线规划
    	walking.search(/*参数*/);
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
    	strokeStyle: "solid"//线样式
    });

    map.add(polyline);

    var infoWindow = new AMap.InfoWindow({
    	isCustom: true,//使用自定义窗体
    	content: '<div>信息窗体</div>',//信息窗体的内容可以是任意html片段
    	offset: new AMap.Pixel(16, -45)
    });

    var onMarkerClick = function(e){
    	infoWindow.open(map, e.target.getPosition());//打开信息窗体
    	//e.target就是被点击的Marker
    }

    var marker2 = new AMap.Marker({
    	position: [116.481181, 39.989792]
    })
    map.add(marker2);
    marker2.on('click',onMarkerClick);//绑定click事件
}
  


  var url = 'https://webapi.amap.com/maps?v=1.4.8&key=771cfc92b931ffb84a466275a9b80880&callback=onLoad';
  var jsapi = document.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = url;
  document.head.appendChild(jsapi);