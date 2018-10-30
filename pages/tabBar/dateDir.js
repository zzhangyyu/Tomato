var networkUtil = require("../common/js/network.js");
Page({
  data: {
    pageIdx: 1,
    patientdateList: [],
    isLastPage: false,
  },
  onLoad: function(option) {
    var that = this;
    var queryStartDate = "";
    var queryEndDate = "";
    var recordPerPage = "3";
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage,
        "queryStartDate": queryStartDate,
        "queryEndDate": queryEndDate
      },
      "os": "WeiXin",
      "phone": "15311496135",
      "version": "V1.0"
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  onPullDownRefresh: function(option) {
    console.log("下拉刷新了");
    wx.showLoading({
      title: '玩命加载中',
    })
    var that = this;
    var queryStartDate = "";
    var queryEndDate = "";
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage,
        "queryStartDate": queryStartDate,
        "queryEndDate": queryEndDate
      },
      "os": "Android",
      "phone": "15311496135",
      "version": "V1.0"
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  onReachBottom: function() {
    var that = this;
    console.log("上拉加载了");
    if (that.data.isLastPage) {
      return;
    }
    wx.showLoading({
      title: '玩命加载中',
    })
    var curPageIdx = that.data.pageIdx;
    var queryStartDate = "";
    var queryEndDate = "";
    var recordPerPage = "3";
    var reqJson = {
      "content": {
        "pageIdx": curPageIdx + 1,
        "recordPerPage": getApp().globalData.recordPerPage,
        "queryStartDate": queryStartDate,
        "queryEndDate": queryEndDate
      },
      "os": "Android",
      "phone": "15311496135",
      "version": "V1.0"
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onLoadMoreConsiliaDateDirSuccess, that.onLoadMoreConsiliaDateDirFail);
    wx.stopPullDownRefresh();
  },
  //  点击日期组件确定事件  
  bindDateChange: function(e) {
    console.log(e.detail.value);
    var that = this;
    var queryStartDate = e.detail.value;
    var queryEndDate = e.detail.value;
    var recordPerPage = "3";
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage,
        "queryStartDate": queryStartDate,
        "queryEndDate": queryEndDate
      },
      "os": "Android",
      "phone": "15311496135",
      "version": "V1.0"
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  onGetConsiliaDateDirSuccess: function(data, requestCode) {
    var that = this;
    that.setData({
      pageIdx: 1
    });
    that.setData({
      isLastPage: false
    });
    that.setData({
      patientdateList: data.content
    });
    wx.stopPullDownRefresh();
  },
  onGetConsiliaDateDirFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientdateList: data.content
    });
    wx.stopPullDownRefresh();
  },
  onLoadMoreConsiliaDateDirSuccess: function(data, requestCode) {
    var that = this;
    that.setData({
      pageIdx: that.data.pageIdx + 1
    });
    var curPatientdateList = that.data.patientdateList;
    var newPatientdateListData = data.content;
    if (newPatientdateListData.length < getApp().globalData.recordPerPage) {
      that.setData({
        isLastPage: true
      });
    }
    for (var i = 0; i < newPatientdateListData.length; i++) {
      curPatientdateList.push(newPatientdateListData[i]);
    }
    that.setData({
      patientdateList: curPatientdateList
    });

  },
  onLoadMoreConsiliaDateDirFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientdateList: data.content
    });
  }
})