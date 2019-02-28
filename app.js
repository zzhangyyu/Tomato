var networkUtil = require("/pages/common/js/network.js");
App({
  globalData: {
    userInfo: null,
    recordPerPage: '10',
    os: 'WeiXin',
    phone: '15388888888',
    version: 'V1.0',
    openid: null
  },
  onLaunch: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          var reqJson = res.code;
          networkUtil.postJson("https://www.rzit.top/grape/wx/code2Session", reqJson, "正在加载...", that.onGetCode2SessionSuccess, that.onGetCode2SessionFail);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回,所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  /**
   * 获取Code2Session成功事件
   */
  onGetCode2SessionSuccess: function (data, requestCode) {
    this.globalData.openid = data.openid;
  },
  /**
   * 获取Code2Session失败事件
   */
  onGetCode2SessionFail: function (data, requestCode) {
    console.log("获取Code2Session失败");
  }
})