Page({
  data: {
    avatarUrl: null,
    nickName: null
  },
  onLoad: function (option) {
    
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '/pages/auth/auth'
          })
        }else{
          this.setData({
            avatarUrl: getApp().globalData.userInfo.avatarUrl,
            nickName: getApp().globalData.userInfo.nickName
          });
        }
      }
    });
    
  }
})