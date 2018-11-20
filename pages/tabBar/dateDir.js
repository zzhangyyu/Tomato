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
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage,
        "queryStartDate": queryStartDate,
        "queryEndDate": queryEndDate
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  /**
   * 下拉刷新
   */
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
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onGetConsiliaDateDirSuccess, that.onGetConsiliaDateDirFail);
  },
  /**
   * 上拉加载
   */
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
    var reqJson = {
      "content": {
        "pageIdx": curPageIdx + 1,
        "recordPerPage": getApp().globalData.recordPerPage,
        "queryStartDate": queryStartDate,
        "queryEndDate": queryEndDate
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
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
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage,
        "queryStartDate": queryStartDate,
        "queryEndDate": queryEndDate
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaDateDir", reqJson, "正在加载...", that.onSearchSuccess, that.onSearchFail);
  },
  /**
   * 获取数据成功事件
   */
  onGetConsiliaDateDirSuccess: function(data, requestCode) {
    var that = this;
    var internetData = data.content;
    that.setData({
      pageIdx: 1,
      isLastPage: false,
      patientdateList: internetData
    });
    if (internetData == null || internetData.length == 0) {
      wx.showToast({
        title: '没查到内容，换个日期吧~',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    };
    wx.stopPullDownRefresh();
  },
  /**
   * 获取数据失败事件
   */
  onGetConsiliaDateDirFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientdateList: data.content
    });
    wx.stopPullDownRefresh();
  },
  /**
  * 获取数据成功事件
  */
  onSearchSuccess: function (data, requestCode) {
    var that = this;
    var internetData = data.content;
    that.setData({
      pageIdx: 1,
      isLastPage: true,
      patientdateList: internetData
    });
    if (internetData == null || internetData.length == 0) {
      wx.showToast({
        title: '没查到内容，换个日期吧~',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    };
  },
  /**
   * 获取数据失败事件
   */
  onSearchFail: function (data, requestCode) {
    var that = this;
    that.setData({
      patientdateList: data.content
    });
  },
  /**
   * 上拉加载成功事件
   */
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
  /**
   * 上拉加载失败事件
   */
  onLoadMoreConsiliaDateDirFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientdateList: data.content
    });
  }
})