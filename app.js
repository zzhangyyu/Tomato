//app.js
var networkUtil = require("/pages/common/js/network.js");
App({
  onLaunch: function () {
    var that = this;
    wx.login({
      success: function (res) { 
        if (res.code) {
          var reqJson = res.code;
          networkUtil.postJson("https://www.rzit.top/grape/wx/code2Session", reqJson, "正在加载...", that.onGetCode2SessionSuccess, that.onGetCode2SessionFail);
        }else{
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    }); 
  },

  /**
     * 获取数据成功事件
     */
  onGetCode2SessionSuccess: function (data, requestCode) {
    var that = this;
    console.log(data.openid);
    console.log(that.globalData.userInfo);
    that.globalData.openid = data.openid;
   
  },
  /**
   * 获取数据失败事件
   */
  onGetCode2SessionFail: function (data, requestCode) {
    var that = this;
    
  },
  globalData: {
    userInfo: null,
    recordPerPage:'10',
    os:'WeiXin',
    phone:'15311496135',
    version:'V1.0',
    openid:null
  }
  
})