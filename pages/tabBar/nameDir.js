var networkUtil = require("../common/js/network.js");
Page({
  data: {
    pageIdx: 1,
    patientNameList: [],
    isLastPage: false,
    clearIconShow: false
  },
  onLoad: function() {
    var that = this;
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage
      },
      "os": "WeiXin",
      "phone": "15311496135",
      "version": "V1.0"
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);

  },
  onPullDownRefresh: function() {
    console.log("下拉刷新了");
    var that = this;
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage
      },
      "os": "Android",
      "phone": "15311496135",
      "version": "V1.0"
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
  },
  onReachBottom: function() {
    console.log("上拉加载了");
  },
  onGetConsiliaNameDirSuccess: function(data, requestCode) {
    var that = this;
    var internetData = data.content;
    if (internetData == null || internetData.length == 0) {
      wx.showToast({
        title: '无数据',
        icon: 'none',
        duration: 1000,
        mask: true
      })
    }
    that.setData({
      pageIdx: 1
    });
    that.setData({
      isLastPage: false
    });
    that.setData({
      patientNameList: internetData
    });
    wx.stopPullDownRefresh();
  },
  onGetConsiliaNameDirFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientNameList: data.content
    });
    wx.stopPullDownRefresh();
  },
  onLoadMoreConsiliaNameDirSuccess: function(data, requestCode) {
    var that = this;
    that.setData({
      pageIdx: that.data.pageIdx + 1
    });
    var curPatientNameList = that.data.patientNameList;
    var internetPatientNameListData = data.content;
    if (internetPatientNameListData.length < getApp().globalData.recordPerPage) {
      that.setData({
        isLastPage: true
      });
    }
    for (var i = 0; i < internetPatientNameListData.length; i++) {
      curPatientNameList.push(internetPatientNameListData[i]);
    }
    that.setData({
      patientNameList: curPatientNameList
    });
  },
  onLoadMoreConsiliaNameDirFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientNameList: data.content
    });
  },
  search: function(e) {
    var that = this;
    var patientNameLike = that.data.searchValue;
    var reqJson = {
      "content": {
        "patientNameLike": patientNameLike,
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage
      },
      "os": "Android",
      "phone": "15311496135",
      "version": "V1.0"
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
  },
  searchValueInput: function(e) {
    var that = this;
    var value = e.detail.value;
    that.setData({
      searchValue: value,
    });
    if (value == null || value == '') {
      that.setData({
        clearIconShow: false
      });
      var patientNameLike = that.data.searchValue;
      var reqJson = {
        "content": {
          "patientNameLike": patientNameLike,
          "pageIdx": "1",
          "recordPerPage": getApp().globalData.recordPerPage
        },
        "os": "Android",
        "phone": "15311496135",
        "version": "V1.0"
      };
      networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
    } else {
      that.setData({
        clearIconShow: true
      });
    }
  },
  clear: function(e) {
    this.setData({
      clearIconShow: false,
      searchValue: ''
    });
  }
})