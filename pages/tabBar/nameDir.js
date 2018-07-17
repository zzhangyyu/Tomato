var networkUtil = require("../../utils/network.js");
Page({
  data: {
  },
  onLoad: function () {
    var that = this;
    var recordPerPage = "20";
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage}, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("http://118.24.19.145/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
  },
  onPullDownRefresh: function () {
    console.log("下拉刷新了");
    var that = this;
    var recordPerPage = "20";
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("http://118.24.19.145/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
  },
  onReachBottom: function () {
    console.log("上拉加载了");
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value);
    var that = this;
    var recordPerPage = "20";
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("http://118.24.19.145/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  onGetConsiliaNameDirSuccess: function (data, requestCode) {
    var that = this;
    that.setData({ patientNameList: data.content });
  },
  onGetConsiliaNameDirFail: function (data, requestCode) {
    var that = this;
    that.setData({ patientNameList: data.content });
  }
})

