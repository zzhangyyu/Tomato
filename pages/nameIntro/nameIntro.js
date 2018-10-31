var networkUtil = require("../common/js/network.js");
Page({
  data: {},
  onLoad: function(option) {
    var that = this;
    that.setData({
      patientName: option.patientName
    });
    var patientInfoId = option.patientInfoId;
    var reqJson = {
      "content": {
        "patientInfoId": patientInfoId
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameIntro", reqJson, "正在加载...", that.onGetConsiliaNameIntroSuccess, that.onGetConsiliaNameIntroFail);
  },
  /**
   * 获取数据成功事件
   */
  onGetConsiliaNameIntroSuccess: function(data, requestCode) {
    var that = this;
    that.setData({
      nameIntroList: data.content
    });
  },
  /**
   * 获取数据失败事件
   */
  onGetConsiliaNameIntroFail: function(data, requestCode) {
    var that = this;
    that.setData({
      nameIntroList: data.content
    });
  }
})