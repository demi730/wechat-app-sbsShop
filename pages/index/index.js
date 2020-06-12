var common = require('../../utils/common.js');
Page({
  data: {
    swiperList: [
      { src: '../../images/p1.jpg' },
      { src: '../../images/p2.jpg' }
    ],
    shopList:[]
  },

  //事件处理函数
  onLoad: function (options) {
      //获取本地存储变量check，若check不存在则赋值为false。check为false时表示未登录
      let value = wx.getStorageSync('check')
      if (!value) {
          wx.setStorageSync('check', false)
      }
    wx.request({
      url: common.getShopList,
      success:res=>{
        this.setData(
            {shopList:res.data}
        )
      }
    })
  },
   // 跳转到详情页
   goToDetails: function (e) {
        let sid = e.currentTarget.dataset.sid;          //获取参数sid
        common.goToDetails(sid)                         //调用数据接口
    },
});
