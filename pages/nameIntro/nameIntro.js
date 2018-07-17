var networkUtil = require("../../utils/network.js");
Page({
  data: {
  },
  onLoad: function (option) {
    var that = this;
    that.setData({patientName: option.patientName});
    var patientInfoId = option.patientInfoId;
    var reqJson = { "content": { "patientInfoId": patientInfoId }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("http://118.24.19.145/grape/patient/getConsiliaNameIntro", reqJson, "正在加载...", that.onGetConsiliaNameIntroSuccess, that.onGetConsiliaNameIntroFail);
  },
  onGetConsiliaNameIntroSuccess: function (data, requestCode) {
    var that = this;
    that.setData({ nameIntroList: data.content });
  },
  onGetConsiliaNameIntroFail: function (data, requestCode) {
    var that = this;
    that.setData({ nameIntroList: data.content });
  }
})

