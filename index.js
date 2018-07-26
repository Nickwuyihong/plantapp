//app.js
App({
  onLaunch: function () {
    this.Promise = this.getArticles()
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          console.log(res.code)
          wx.request({
            url: 'http://43.226.165.24:8000/api/weChatLogin/' + res.code,
            data: {},
            method: 'GET',
            header: {
              'content-type': 'application/json'
            },
            success: function (res) {
              console.log(res)
              // wx.setStorage({
              //   key: "3rd_session",
              //   data: res.data.session_key + res.data.openid
              // })
              // wx.getStorage({
              //   key: '3rd_session',
              //   success: function (res) {
              //     console.log(res.data)
              //   }
              // })
            },
            fail: function(res){
              console.log("fail" + res)
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.userInfo',
            success() {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord()
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  },
  Promise: null,
  getArticles: function () {
    var promise = new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://43.226.165.24:8000/api/article',
        method: 'GET',
        data: {},
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          resolve(res);
        }
      })
    });
    return promise;
  }
  // ,
  // getUser: function (code) {
  //   console.log(code)
  //   var promise = new Promise(function (resolve, reject) {
  //     wx.request({
  //       url: 'http://43.226.165.24:8000/api/login/' + code,
  //       method: 'GET',
  //       data: {},
  //       header: {
  //         'content-type': 'application/json'
  //       },
  //       success: function (res) {
  //         console.log(res)
  //         resolve(res);
  //       }
  //     })
  //   });
  //   return promise;
  // }
})
 function search_wiki(){
  var x = document.form["myFrom"]["plantname"].value;
  $.get('http://43.226.165.24:8000/api/search/wiki/',{'plantname':x});
  header
}