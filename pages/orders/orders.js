// pages/orders/orders.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orders: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let nickName = wx.getStorageSync('check');
    let that = this;
    wx.request({
      url:common.getOrder,
      data: {
        nickName: nickName
      },
      success:function (res) {
        if (res != ''){
          that.setData({
            orders:res.data.order
          });
        }
      }
    });
    let orders = wx.getStorageSync('orders');
    this.setData({
      orders: orders,
    });
  },
  goBack: function () {
    wx.switchTab({
      url: '../my/my'
    })
  }

})