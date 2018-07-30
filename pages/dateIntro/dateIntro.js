var networkUtil = require("../common/js/network.js");
Page({
  data: {
  },
  onLoad: function (option) {
    var that = this;
    that.setData({ visitingDate: option.visitingDate });
    var queryDate = option.visitingDate;
    var recordPerPage = "20";
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage, "queryDate": queryDate }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateIntro", reqJson, "正在加载...", that.onGetConsiliaDateIntroSuccess, that.onGetConsiliaDateIntroFail);
  },
  onGetConsiliaDateIntroSuccess: function (data, requestCode) {
    var that = this;
    that.setData({ patientIntroList: data.content});
  },
  onGetConsiliaDateIntroFail: function (data, requestCode) {
    var that = this;
    that.setData({ patientIntroList: data.content});
  }
})

