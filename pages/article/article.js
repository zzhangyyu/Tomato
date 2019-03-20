// pages/article/article.js
var networkUtil = require("../common/js/network.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this;
    var articleId = option.articleId;
    var req = {
      "content": {
        "articleId": articleId
      },
      "os": getApp().globalData.os,
      "phone": getApp().globalData.phone,
      "version": getApp().globalData.version
    };
    networkUtil.postJson("https://www.rzit.top/grape/article/getArticle", req, "正在加载...", that.onGetArticleSuccess, that.onGetArticleFail);
  },
  /**
   * 获取数据成功事件
   */
  onGetArticleSuccess: function (data, requestCode) {
    var that = this;
    that.setData({
      hidden: false
    });
    var author = data.content.author;
    var title1 = data.content.title1;
    var title2 = data.content.title2;
    var writingTime = data.content.writingTime;
    var para = data.content.para;
    var paraArr = data.content.para.split("\n");
    that.setData({
      author: data.content.author,
      title1: data.content.title1,
      title2: data.content.title2,
      writingTime: data.content.writingTime,
      paraArr: paraArr
    });
  },
  /**
   * 获取数据失败事件
   */
  onGetArticleFail: function (data, requestCode) {
  },

})