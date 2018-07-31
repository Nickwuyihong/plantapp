function getdetial(){

  var a=GetRequest();
  console.log("id:"+a['id']) //打印出传过来的id

  $.ajax({
      url:'http://43.226.165.24:8000/api/article/' + a['id'],
      data: "[]",
      type: "GET",
      dataType: "text",
      crossDomain: true,
      timeout: 5000,
      jsonp: "jsapicallback", //服务端用于接收callback调用的function名的参数
      jsonpCallback: "success_jsonpCallback",
      success: function(data){
      console.log("成功");
      console.log("JSON DATA:" + data);
      
      var row = JSON.parse(data);
      
      var str="";
        console.log("正在浏览文章");
        str = str +'<img src="' + row.cover + '">'
        +'<h1 class="texttitle">' + row.title + '</h1>'
        +'<p class="content">' + row.content + " " + row.updated_at + '</p>'
        +'<p class="date">' + row.created_at + '</p>'
        +'<br>'
        +'<p class="resource">' + row.source + " " + row.author + '</p>'
        +'<p class="good">' + row.type + '</p>'
        $("#text").html(str)
      },
      complete:function(XMLHttpRequest,textStatus){
        console.log("完成");
        console.log(this.XMLHttpRequest);
        console.log(this.textStatus);
      },
      error: function(error,data){
        console.log(data);
        console.log('出错啦');
        console.log(error);
      }
      }).done(function(data,status,xhr){
        console.log("成功");
        console.log(data);
        console.log(status);
    }).fail(function(data,status,xhr){
      console.log("错误");
      console.log(data);
      console.log(status);
  });
}

function GetRequest() {
var url = location.search; //获取url中"?"符后的字串
var theRequest = new Object();
 if (url.indexOf("?") != -1) {
       var str = url.substr(1);
       strs = str.split("&");
       for (var i = 0; i < strs.length; i++) {
           theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
       }
   }
   return theRequest;
}

function goback(){
  window.history.back();
}