var networkUtil = require("../common/js/network.js");
Page({
  data: {

  },
  onGetUserInfo: function(e) {
    var that = this;
    if (!that.logged && e.detail.userInfo) {
      getApp().globalData.userInfo = e.detail.userInfo;
      console.log(e.detail.userInfo);
      var reqJson = {
        "content": {
          "avatarUrl": e.detail.userInfo.avatarUrl,
          "nickName": e.detail.userInfo.nickName,
          "wxOpenId": getApp().globalData.openid
        },
        "os": getApp().globalData.os,
        "phone": getApp().globalData.phone,
        "version": getApp().globalData.version
      };
      networkUtil.postJson("https://www.rzit.top/grape/user/signUp", reqJson, "正在加载...", that.onSignUpSuccess, that.onSignUpFail);
    }
  },
  onSignUpSuccess: function(data, requestCode) {
    wx.switchTab({
      url: '/pages/tabBar/mineDir',
    })
  },
  onSignUpFail: function(data, requestCode) {
    console.log("注册失败");
  }
});