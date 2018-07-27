Page({
  data: {
  },
  onLoad: function (option) {
    var that = this;
    var patientConditionId = option.patientConditionId;
    var req = { "content": { "patientConditionId": patientConditionId }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    wx.request({
      url: 'https://www.rzit.top/grape/patient/getConsiliaDetail',
      header: {
        contentType: 'application/json;charset=utf-8',
      },
      dataType: 'json',
      method: "POST",
      data: req,
      success: function (res) {
        console.log(res.data);
        that.setData({ consilia: res.data.content });
      }
    })
  }
})

