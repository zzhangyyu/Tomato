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
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);

  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function() {
    console.log("下拉刷新了");
    var that = this;
    var reqJson = {
      "content": {
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
    that.clear();
  },
  /**
   * 上拉加载
   */
  onReachBottom: function() {
    var that = this;
    console.log("上拉加载了");
    if (that.data.isLastPage) {
      return;
    };
    wx.showLoading({
      title: '玩命加载中',
    });
    var curPageIdx = that.data.pageIdx;
    var queryStartDate = "";
    var queryEndDate = "";
    var reqJson = {
      "content": {
        "pageIdx": curPageIdx + 1,
        "recordPerPage": getApp().globalData.recordPerPage
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onLoadMoreConsiliaNameDirSuccess, that.onLoadMoreConsiliaNameDirFail);
    wx.stopPullDownRefresh();
  },
  /**
   * 获取数据成功事件
   */
  onGetConsiliaNameDirSuccess: function(data, requestCode) {
    var that = this;
    var internetData = data.content;
    if (internetData == null || internetData.length == 0) {
      wx.showToast({
        title: '没查到内容，换个名字吧~',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
    that.setData({
      pageIdx: 1,
      isLastPage: false,
      patientNameList: internetData
    });
    wx.stopPullDownRefresh();
  },
  /**
   * 获取数据失败事件
   */
  onGetConsiliaNameDirFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientNameList: data.content
    });
    wx.stopPullDownRefresh();
  },
  /**
   * 搜索成功事件
   */
  onSearchSuccess: function (data, requestCode) {
    var that = this;
    var internetData = data.content;
    if (internetData == null || internetData.length == 0) {
      wx.showToast({
        title: '没查到内容，换个名字吧~',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
    that.setData({
      pageIdx: 1,
      isLastPage: true,
      patientNameList: internetData
    });
  },
  /**
   * 获取数据失败事件
   */
  onSearchFail: function (data, requestCode) {
    var that = this;
    that.setData({
      patientNameList: data.content
    });
    wx.stopPullDownRefresh();
  },
  /**
   * 上拉加载成功事件
   */
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
  /**
   * 上拉加载失败事件
   */
  onLoadMoreConsiliaNameDirFail: function(data, requestCode) {
    var that = this;
    that.setData({
      patientNameList: data.content
    });
  },
  /**
   * 搜索框点击事件
   */
  search: function(e) {
    var that = this;
    var patientNameLike = that.data.searchValue;
    if (patientNameLike == null || patientNameLike.trim() == '') {
      that.clear();
      return;
    }
    var reqJson = {
      "content": {
        "patientNameLike": patientNameLike,
        "pageIdx": "1",
        "recordPerPage": getApp().globalData.recordPerPage
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onSearchSuccess, that.onSearchFail);
  },
  /**
   * 搜索框文字变化监听事件
   */
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
      that.onPullDownRefresh();
    } else {
      that.setData({
        clearIconShow: true
      });
    }
  },
  /**
   * 搜索框清除按钮点击事件
   */
  clear: function(e) {
    this.setData({
      clearIconShow: false,
      searchValue: ''
    });
  }
})