Page({
  data: {
  },
  onLoad:function(){
    var that = this;
    var queryStartDate = "2017-06-01";
    var queryEndDate = "2018-08-01";
    var recordPerPage = "20";
    var req = { "content": { "pageIdx": "1", "recordPerPage": recordPerPage, "queryStartDate": queryStartDate, "queryEndDate": queryEndDate }, "os": "Android", "phone": "15311496135", "version": "V1.0" };
    wx.request({
      url: 'http://118.24.19.145/grape/patient/getConsiliaDateDir',
      header:{
        contentType: 'application/json;charset=utf-8',
      },
      dataType: 'json',
      method:"POST",
      data: req,
      success:function(res){
        console.log(res.data);
        that.setData({patientdateList:res.data.content});
      }
    })
  }
})

