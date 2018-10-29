var networkUtil = require("../common/js/network.js");
Page({
  data: {
    hidden: true
  },
  onLoad: function (option) {
    var that = this;
    var patientConditionId = option.patientConditionId;
    var req = { "content": { "patientConditionId": patientConditionId }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDetail", req, "正在加载...", that.onGetConsiliaDetailSuccess, that.onGetConsiliaDetailFail);
  },
  onGetConsiliaDetailSuccess: function (data, requestCode) {
    var that = this;
    that.setData({ hidden: false });
    that.setData({ consilia: data.content });
  },
  onGetConsiliaDetailFail: function (data, requestCode) {
    var that = this;
  }
})

