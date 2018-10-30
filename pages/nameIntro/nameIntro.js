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
      "os": "WeiXin",
      "phone": "15311496135",
      "version": "V1.0"
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameIntro", reqJson, "正在加载...", that.onGetConsiliaNameIntroSuccess, that.onGetConsiliaNameIntroFail);
  },
  onGetConsiliaNameIntroSuccess: function(data, requestCode) {
    var that = this;
    that.setData({
      nameIntroList: data.content
    });
  },
  onGetConsiliaNameIntroFail: function(data, requestCode) {
    var that = this;
    that.setData({
      nameIntroList: data.content
    });
  }
})