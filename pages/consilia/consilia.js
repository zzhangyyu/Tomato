var networkUtil = require("../common/js/network.js");
Page({
  data: {
    hidden: true
  },
  onLoad: function(option) {
    var that = this;
    var patientConditionId = option.patientConditionId;
    var req = {
      "content": {
        "patientConditionId": patientConditionId
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDetail", req, "正在加载...", that.onGetConsiliaDetailSuccess, that.onGetConsiliaDetailFail);
  },
  /**
   * 获取数据成功事件
   */
  onGetConsiliaDetailSuccess: function(data, requestCode) {
    var that = this;
    that.setData({
      hidden: false
    });
    var prescriptionDetail = data.content.prescriptionDetail;
    var prescriptionDuration = data.content.prescriptionDuration;
    var prescriptionMethod = data.content.prescriptionMethod;
    var prescriptionDetailArr = prescriptionDetail.split("\n");
    var prescriptionDurationArr = prescriptionDuration.split("\n");
    var prescriptionMethodArr = prescriptionMethod.split("\n");
    that.setData({
      consilia: data.content,
      prescriptionDetailArr: prescriptionDetailArr,
      prescriptionDurationArr: prescriptionDurationArr,
      prescriptionMethodArr: prescriptionMethodArr,
    });
  },
  /**
   * 获取数据失败事件
   */
  onGetConsiliaDetailFail: function(data, requestCode) {}
})