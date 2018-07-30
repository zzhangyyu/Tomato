var networkUtil = require("../common/js/network.js");
Page({
  data: {
  },
  onLoad:function(){
    var that = this;
    var queryStartDate = "";
    var queryEndDate = "";
    var recordPerPage = "20";
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage, "queryStartDate": queryStartDate, "queryEndDate": queryEndDate }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  onPullDownRefresh:function(){
    console.log("下拉刷新了");
    var that = this;
    var queryStartDate = "";
    var queryEndDate = "";
    var recordPerPage = "20";
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage, "queryStartDate": queryStartDate, "queryEndDate": queryEndDate }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  onReachBottom:function () {
    console.log("上拉加载了");
  },
  //  点击日期组件确定事件  
  bindDateChange: function (e) {
    console.log(e.detail.value);
    var that = this;
    var queryStartDate = e.detail.value;
    var queryEndDate = e.detail.value;
    var recordPerPage = "20";
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage, "queryStartDate": queryStartDate, "queryEndDate": queryEndDate }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  onGetConsiliaDateDirSuccess: function (data, requestCode) {
    var that = this;
    that.setData({ patientdateList: data.content });
  },
  onGetConsiliaDateDirFail: function (data, requestCode) {
    var that = this;
    that.setData({ patientdateList: data.content });
  }
})

