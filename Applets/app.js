//app.js
App({
  //设置全局请求URL
  globalData: {
    code: null,
    userInfo: null,
    imgUrl: "https://www.topsleep.net/static", 
     URL: 'https://www.topsleep.net/miniapp',  
    // URL: 'http://risk.rfyfb.com/miniapp', 
    testImgUrl: 'http://risk.rfyfb.com/file/offLine/online', 
    // URL: 'http://106.12.31.186:7004',
    // URL: 'http://106.14.34.18:1001/miniapp',
     //URL: 'http://172.168.9.63:1001/miniapp', 
    timer:{}, 
  },
  wxRequest(method, url, data, callback, errFun) {
    wx.request({
      url: url,
      method: method,
      data: data,
      header: {
        'content-type': method == 'GET' ? 'application/json' : 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      dataType: 'json',
      success: function (res) {
        callback(res.data);
      },
      fail: function (err) {
        errFun(res);
      }
    })
  },
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

})