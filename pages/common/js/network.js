/**
 * post json请求封装
 * 
 * url：接口地址
 * json：json请求参数
 * message：加载消息
 * onNetworkSuccess：成功回调函数
 * onNetworkFail：失败回调函数
 */
function postJson(url, json, message, onNetworkSuccess, onNetworkFail) {
  wx.showLoading({
    title: message,
  })
  wx.request({
    url: url,
    data: json,
    header: {
      'content-type': 'application/json;charset=utf-8'
    },
    method: 'POST',
    success: function (res) {
      wx.hideLoading()
      if (res.statusCode == 200) {
        onNetworkSuccess(res.data);
      } else {
        onNetworkFail();
      }
    },
    fail: function (err) {
      wx.hideLoading();
    }
  })
}
module.exports = {
  postJson: postJson
}