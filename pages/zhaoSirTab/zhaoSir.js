var networkUtil = require("../common/js/network.js");
Page({
  data: {
    pageIdx: 1,
    articleList: [],
    isLastPage: false,
  },
  onLoad: function (option) {
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
    networkUtil.postJson("https://www.rzit.top/grape/article/getArticleList", reqJson, "正在加载...", that.onGetArticleListSuccess, that.onGetArticleListFail);
  },
  /**
   * 下拉刷新
   */
  onPullDownRefresh: function (option) {
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
        "recordPerPage": getApp().globalData.recordPerPage
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/article/getArticleList", reqJson, "正在加载...", that.onGetArticleListSuccess, that.onGetArticleListFail);
  },
  /**
   * 上拉加载
   */
  onReachBottom: function () {
    var that = this;
    console.log("上拉加载了");
    if (that.data.isLastPage) {
      return;
    }
    wx.showLoading({
      title: '玩命加载中',
    })
    var curPageIdx = that.data.pageIdx;
    var reqJson = {
      "content": {
        "pageIdx": curPageIdx + 1,
        "recordPerPage": getApp().globalData.recordPerPage
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/article/getArticleList", reqJson, "正在加载...", that.onLoadMoreArticleListSuccess, that.onLoadMoreArticleListFail);
    wx.stopPullDownRefresh();
  },
  /**
   * 获取数据成功事件
   */
  onGetArticleListSuccess: function (data, requestCode) {
    var that = this;
    var internetData = data.content;
    that.setData({
      pageIdx: 1,
      isLastPage: false,
      articleList: internetData
    });
    if (internetData == null || internetData.length == 0) {
      wx.showToast({
        title: '还没有分享~',
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
  onGetArticleListFail: function (data, requestCode) {
    
  },
  /**
  * 上拉加载成功事件
  */
  onLoadMoreArticleListSuccess: function (data, requestCode) {
    var that = this;
    that.setData({
      pageIdx: that.data.pageIdx + 1
    });
    var curArticleList = that.data.articleList;
    var newArticleListData = data.content;
    if (newArticleListData.length < getApp().globalData.recordPerPage) {
      that.setData({
        isLastPage: true
      });
    }
    for (var i = 0; i < newArticleListData.length; i++) {
      curArticleList.push(newArticleListData[i]);
    }
    that.setData({
      articleList: curArticleList
    });

  },
  /**
   * 上拉加载失败事件
   */
  onLoadMoreArticleListFail: function (data, requestCode) {
   
  }
})