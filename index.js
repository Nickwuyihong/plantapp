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





 function search_article(){
  console.log('fuxk you!');
  var x = $("#plantname").val();
  console.log(x);
  $.ajax({
      url:'http://43.226.165.24:8000/api/search/article/{' + x + '}' ,
      //data: "[]",
      type: "GET",
      dataType: "jsonp",
      crossDomain: true,
      timeout: 5000,
      beforeSend: function(xhr){
        console.log('头');
          xhr.setRequestHeader("Accept" , "application/json");
      },
      success: function(json){
        console.log("成功");
      console.log("JSON DATA:" + json);
      },
      error: function(error,data){
        console.log(data);
        console.log('出错啦');
        console.log(error);
      }
  });
}