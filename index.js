var weixin = {
    config: {
        url:'https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri='+encodeURIComponent("http://43.226.165.24:8000/api/weChatLogin/")+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect',
        userInfo:JSON.parse(localStorage.getItem('MY_USER_INFO'))
    },
    isweixin: function() {
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            return true;
        } else {
            return false;
        }
    },
    getQueryString: function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
        var r = window.location.search.substr(1).match(reg);
        if (r!=null) return unescape(r[2]); return null;
    },
    getUser : function(code) {
        $.ajax({
            type: 'get',
            url: "https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=APP_SECRET&code="+code+"&grant_type=authorization_code",
            cache:false,
            async: false,
            dataType: 'jsonp',
            jsonp: 'jsonpcallback',
            success: function(json){
                localStorage.setItem('MY_USER_INFO',JSON.stringify(json));
                // document.write("<div>"+JSON.stringify(json)+"</div>");
                $("#test").html(json[0].openid);
            },
            error: function(err) {
                // console.log(err);
                $("#error").html(JSON.stringify(err));
            }
        })
    },
    getUserInfo:function(){
        if(weixin.config.userInfo != null){
            return JSON.parse(localStorage.getItem('MY_USER_INFO'));
        }else{
            if(weixin.getQueryString('code') != null){ 
                weixin.getUser(weixin.getQueryString('code'));
                return JSON.parse(localStorage.getItem('MY_USER_INFO'));
            }else{
                window.location.href = weixin.config.url;
            }
        }
    }
}





function load_all_article(){
  $.ajax({
      url:'http://43.226.165.24:8000/api/article',
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
            // var newli = document.createElement("li");
            // newli.setAttribute("id",row[i].id)
            // var newa = document.createElement("a");
            // newa.setAttribute("href","www.baidu.com");

            // var para1 = document.createElement("img");
            // para1.setAttribute("src",row[i].cover);
            // console.log("cover is:" + row[i].cover);

            // var para2 = document.createElement("h3");
            // var node2 = document.createTextNode(row[i].title);
            // para2.setAttribute("class","texttitle");
            // para2.appendChild(node2);
            // console.log("title is:" + row[i].title);

            // var para3 = document.createElement("p");
            // var node3 = document.createTextNode(row[i].source + " " + row.author);
            // para3.setAttribute("class","resource");
            // para3.appendChild(node3);
            // console.log("source is " + row[i].source + row[i].author);

            // var para4 = document.createElement("p");
            // var node4 = document.createTextNode(row[i].type);
            // para4.setAttribute("class","good");
            // para4.appendChild(node4);
            // console.log("nice is " + row[i].type);

            // newa.appendChild(para1);
            // newa.appendChild(para2);
            // newa.appendChild(para3);
            // newa.appendChild(para4);
            // newli.appendChild(newa);
            // document.getElementById("list").appendChild(newli);
            
        str = str + '<a href="article.html?id=' + row[i].id + '">'
        +'<li>'
        +'<img src="' + row[i].cover + '">'
        +'<h3 class="texttitle">' + row[i].title + '</h3>'
        +'<p class="resource">' + row[i].source + " " + row[i].author + '</p>'
        +'<p class="good">' + row[i].type + '</p>'
        +'</li>'
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





 function search_article(){
  var x = $("#plantname").val();
  console.log(x);
  $.ajax({
      url:'http://43.226.165.24:8000/api/search/article/' + x,
      data: "[]",
      type: "GET",
      dataType: "text",
      crossDomain: true,
      timeout: 5000,
      jsonp: "jsapicallback", //服务端用于接收callback调用的function名的参数
      jsonpCallback: "success_jsonpCallback",
      success: function(json){
        console.log("成功");
      console.log("JSON DATA:" + json);
      

      var row = JSON.parse(json);
      var str="";
      for(var i = 0; i < row.length; i++){
            console.log(i);
        str = str + '<a href="article.html?id=' + row[i].id + '">'
        +'<li>'
        +'<img src="' + row[i].cover + '">'
        +'<h3 class="texttitle">' + row[i].title + '</h3>'
        +'<p class="resource">' + row[i].source + " " + row[i].author + '</p>'
        +'<p class="good">' + row[i].type + '</p>'
        +'</li>'
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