var networkUtil = require("../common/js/network.js");
var globalData = getApp().globalData;
Page({
  data: {

  },
  onGetUserInfo: function (e) {
    var that = this;
    globalData.userInfo = e.detail.userInfo;
    var reqJson = {
      "content": {
        "avatarUrl": globalData.userInfo.avatarUrl,
        "nickName": globalData.userInfo.nickName,
        "wxOpenId": globalData.userInfo.openid
      },
      "os": globalData.os,
      "phone": globalData.phone,
      "version": globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/user/signUp", reqJson, "正在加载...", that.onSignUpSuccess, that.onSignUpFail);
  },
  //注册成功事件
  onSignUpSuccess: function (data, requestCode) {
    wx.switchTab({
      url: '/pages/mineDir/mineDir',
    })
  },
  //注册失败事件
  onSignUpFail: function (data, requestCode) {
    console.log("注册失败");
  }
});