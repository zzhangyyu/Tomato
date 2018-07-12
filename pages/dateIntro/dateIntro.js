Page({
  data: {
  },
  onLoad: function (option) {
    var that = this;
    that.setData({ visitingDate: option.visitingDate });
    var queryStartDate = option.visitingDate;
    var queryEndDate = option.visitingDate;
    var recordPerPage = "20";
    var req = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage, "queryStartDate": queryStartDate, "queryEndDate": queryEndDate }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    wx.request({
      url: 'http://118.24.19.145/grape/patient/getConsiliaDateIntro',
      header: {
        contentType: 'application/json;charset=utf-8',
      },
      dataType: 'json',
      method: "POST",
      data: req,
      success: function (res) {
        console.log(res.data);
        that.setData({ patientIntroList: res.data.content[0].patientInfos});
      }
    })
  }
})

