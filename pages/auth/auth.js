var networkUtil = require("../common/js/network.js");
Page({
  data: {
  },
  onGetUserInfo: function(e) {
    var that = this;
    getApp().globalData.userInfo = e.detail.userInfo;
    wx.login({
      success: function(res) {
        if (res.code) {
          var reqJson = res.code;
          networkUtil.postJson("https://www.rzit.top/grape/wx/code2Session", reqJson, "正在加载...", that.onGetCode2SessionSuccess, that.onGetCode2SessionFail);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  /**
   * 获取Code2Session成功事件
   */
  onGetCode2SessionSuccess: function(data, requestCode) {
    console.log(data.openid);
    getApp().globalData.openid = data.openid;
    var reqJson = {
      "content": {
        "avatarUrl": getApp().globalData.userInfo.avatarUrl,
        "nickName": getApp().globalData.userInfo.nickName,
        "wxOpenId": data.openid
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/user/signUp", reqJson, "正在加载...", this.onSignUpSuccess, this.onSignUpFail);
  },
  /**
   * 获取Code2Session失败事件
   */
  onGetCode2SessionFail: function(data, requestCode) {
    console.log("获取Code2Session失败");
  }, //注册成功事件
  onSignUpSuccess: function(data, requestCode) {
    wx.switchTab({
      url: '/pages/byDateTab/byDate',
    })
  },
  //注册失败事件
  onSignUpFail: function(data, requestCode) {
    console.log("注册失败");
    t
  },
});