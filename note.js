function search_wiki(){
 var x = $("#plantname").val();
  console.log(x);
  $.ajax({
      url:'http://43.226.165.24:8000/api/search/wiki/' + x,
      data: "[]",
      type: "GET",
      dataType: "text",
      crossDomain: true,
      timeout: 5000,
      jsonp: "jsapicallback", //服务端用于接收callback调用的function名的参数
      jsonpCallback: "success_jsonpCallback",
      // beforeSend: function(xhr){
      //   console.log('头');
      //     xhr.setRequestHeader("Accept" , "application/json");
      // },
      success: function(json){
        console.log("成功");
      console.log("JSON DATA:" + json);
      
      var row = JSON.parse(json);
      var str="";
      for(var i = 0; i < row.length; i++){
            console.log(i);
            console.log(row[i].id + row[i].cover + row[i].title + row[i].keValue);
        str = str + '<a href="wiki.html?id=' + row[i].id + '">'
        +'<div class="content">'
        +'<li>'
        +'<img src="' + row[i].cover + '">'
        +'<p class="title">' + row[i].title + '</p>'
        +'<p class="source">' + row[i].keValue + " " + row[i].shuValue + " " + row[i].zhongValue + '</p>'
        +'<p class="date">' + row[i].areaValue + '</p>'
        +'</li>'
        +'</div>'
        +'</a>'
        }
        $("#list").append(str)

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

function load_all_wiki(){
  $.ajax({
      url:'http://43.226.165.24:8000/api/wiki',
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
for(var i = 0; i < row.length; i++){
            console.log(i);
            console.log(row[i].id + row[i].cover + row[i].title + row[i].keValue);
        str = str + '<a href="wiki.html?id=' + row[i].id + '">'
        +'<div class="content">'
        +'<li>'
        +'<img src="' + row[i].cover + '">'
        +'<p class="title">' + row[i].title + '</p>'
        +'<p class="source">' + row[i].keValue + " " + row[i].shuValue + " " + row[i].zhongValue + '</p>'
        +'<p class="date">' + row[i].areaValue + '</p>'
        +'</li>'
        +'</div>'
        +'</a>'
        }
        $("#list").append(str)
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


