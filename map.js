window.onLoad  = function(){
        var map = new AMap.Map('container');
  }
  var url = 'https://webapi.amap.com/maps?v=1.4.8&key=您申请的key值&callback=onLoad';
  var jsapi = doc.createElement('script');
  jsapi.charset = 'utf-8';
  jsapi.src = url;
  document.head.appendChild(jsapi);