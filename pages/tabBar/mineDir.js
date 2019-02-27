Page({

  onLoad:function(option){
    var that = this;
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.redirectTo({
            url: '/pages/auth/auth'
          })
        }
      }
    })
    console.log(getApp().globalData.userInfo);

  }
  
})

