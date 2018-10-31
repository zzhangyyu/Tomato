var networkUtil = require("../common/js/network.js");
Page({
  data: {},
  onLoad: function(option) {
    var that = this;
    that.setData({
      visitingDate: option.visitingDate
    });
    var queryDate = option.visitingDate;
    var recordPerPage = "20";
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": recordPerPage,
        "queryDate": queryDate
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateIntro", reqJson, "正在加载...", that.onGetConsiliaDateIntroSuccess, that.onGetConsiliaDateIntroFail);
  },
  /**
   * 获取数据成功事件
   */
  onGetConsiliaDateIntroSuccess: function(data, requestCode) {
    var that = this;
    that.setData({
      patientIntroList: data.content
    });
  },
  /**
   * 获取数据失败事件
   */
  onGetConsiliaDateIntroFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientIntroList: data.content
    });
  }
})