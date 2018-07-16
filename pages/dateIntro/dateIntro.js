var networkUtil = require("../../utils/network.js");
Page({
  data: {
  },
  onLoad: function (option) {
    var that = this;
    that.setData({ visitingDate: option.visitingDate });
    var queryStartDate = option.visitingDate;
    var queryEndDate = option.visitingDate;
    var recordPerPage = "20";
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage, "queryStartDate": queryStartDate, "queryEndDate": queryEndDate }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("http://118.24.19.145/grape/patient/getConsiliaDateIntro", reqJson, "正在加载...", that.onGetConsiliaDateIntroSuccess, that.onGetConsiliaDateIntroFail);
  },
  onGetConsiliaDateIntroSuccess: function (data, requestCode) {
    var that = this;
    that.setData({ patientIntroList: data.content[0].patientInfos});
  },
  onGetConsiliaDateIntroFail: function (data, requestCode) {
    var that = this;
    that.setData({ patientIntroList: data.content[0].patientInfos});
  }
})

