var networkUtil = require("../common/js/network.js");
Page({
  data: {
    // 当前选择的导航字母
    selected: 0,
    // 选择字母视图滚动的位置id
    scrollIntoView: 'A',
    // 导航字母
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
      'U', 'V', 'W', 'X', 'Y', 'Z'],
    pageIdx: 1,
    patientNameList: [],
    isLastPage: false
  },
  onLoad: function () {
    var that = this;
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": getApp().globalData.recordPerPage}, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);



    const res = wx.getSystemInfoSync(),
      letters = this.data.letters;
    // 设备信息
    this.setData({
      windowHeight: res.windowHeight,
      windowWidth: res.windowWidth,
      pixelRatio: res.pixelRatio
    });
    const navHeight = this.data.windowHeight * 0.94, // 
      eachLetterHeight = navHeight / 26,
      comTop = (this.data.windowHeight - navHeight) / 2,
      temp = [];
    this.setData({
      eachLetterHeight: eachLetterHeight
    });
    for (let i = 0, len = letters.length; i < len; i++) {
      const x = this.data.windowWidth - (10 + 50) / this.data.pixelRatio,
        y = comTop + (i * eachLetterHeight);
      temp.push([x, y]);
    }
    this.setData({
      lettersPosition: temp
    })

  },
  onPullDownRefresh: function () {
    console.log("下拉刷新了");
    var that = this;
    var reqJson = { "content": { "pageIdx": "1", "recordPerPage": getApp().globalData.recordPerPage }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
  },
  onReachBottom: function () {
    console.log("上拉加载了");
  },
  onGetConsiliaNameDirSuccess: function (data, requestCode) {
    var that = this;
    var internetData = data.content;
    if (internetData == null || internetData.length == 0) {
      wx.showToast({
        title: '无数据',
        icon:'none',
        duration:1000,
        mask:true
      })
    }
    that.setData({ pageIdx: 1 });
    that.setData({ isLastPage: false });
    that.setData({ patientNameList: internetData });
    wx.stopPullDownRefresh();
  },
  onGetConsiliaNameDirFail: function (data, requestCode) {
    var that = this;
    that.setData({ patientNameList: data.content });
    wx.stopPullDownRefresh();
  },
  onLoadMoreConsiliaNameDirSuccess: function (data, requestCode) {
    var that = this;
    that.setData({ pageIdx: that.data.pageIdx + 1 });
    var curPatientNameList = that.data.patientNameList;
    var internetPatientNameListData = data.content;
    if (internetPatientNameListData.length < getApp().globalData.recordPerPage) {
      that.setData({ isLastPage: true });
    }
    for (var i = 0; i < internetPatientNameListData.length; i++) {
      curPatientNameList.push(internetPatientNameListData[i]);
    }
    that.setData({ patientNameList: curPatientNameList });

  },
  onLoadMoreConsiliaNameDirFail: function (data, requestCode) {
    var that = this;
    that.setData({ patientNameList: data.content });
  },
  search:function(e){
    var that = this;
    var patientNameLike = that.data.searchValue;
    var reqJson = { "content": { "patientNameLike": patientNameLike, "pageIdx": "1", "recordPerPage": getApp().globalData.recordPerPage}, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
  },

  searchValueInput: function (e) {
    var value = e.detail.value;
    this.setData({
      searchValue: value,
    });
    if (value == null || value==''){
      var that = this;
      var patientNameLike = that.data.searchValue;
      var reqJson = { "content": { "patientNameLike": patientNameLike, "pageIdx": "1", "recordPerPage": getApp().globalData.recordPerPage }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
      networkUtil.postJson("https://www.rzit.top/grape/patient/getConsiliaNameDir", reqJson, "正在加载...", that.onGetConsiliaNameDirSuccess, that.onGetConsiliaNameDirFail);
    }
  },

  tabLetter(e) {
    const index = e.currentTarget.dataset.index;
    console.log(index);
    this.setData({
      selected: index,
      scrollIntoView: index
    })
    this.cleanAcitvedStatus();
  },
  // 清除字母选中状态
  cleanAcitvedStatus() {
    setTimeout(() => {
      this.setData({
        selected: 0
      })
    }, 1000);
  },
  touchmove(e) {
    const x = e.touches[0].clientX,
      y = e.touches[0].clientY,
      lettersPosition = this.data.lettersPosition,
      eachLetterHeight = this.data.eachLetterHeight,
      letters = this.data.letters;
    console.log(y);
    // 判断触摸点是否在字母导航栏上
    if (x >= lettersPosition[0][0]) {
      for (let i = 0, len = lettersPosition.length; i < len; i++) {
        // 判断落在哪个字母区域，取出对应字母所在数组的索引，根据索引更新selected及scroll-into-view的值
        const _y = lettersPosition[i][1], // 单个字母所处高度
          __y = _y + eachLetterHeight; // 单个字母最大高度取值范围， 50为字母高50rpx
        if (y >= _y && y <= __y) {
          this.setData({
            selected: letters[i],
            scrollIntoView: letters[i]
          });
          break;
        }
      }
    }
  },
  touchend(e) {
    this.cleanAcitvedStatus();
  }
})

