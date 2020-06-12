// pages/myCart/myCart.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: "",
    allNum: '',
    allPrice: '',
    foodsList: [],
    nickName:"",
    cardNum: '',
    address: '',
    tel: '',
    hiddenStatus: true      //模态框的初始状态为隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var cart = wx.getStorageSync('cartData');
    if(!cart){
      wx.showModal({
        title: '提示',
        content: '还没有商品加入购物车',
        showCancel: false
      })
    }else {
      this.setData({
        shop:cart.shop,
        allNum:cart.allNum,
        allPrice:cart.allPrice,
        foodsList:cart.foodsList,
      })
    }
  },
  /**处理提交按钮*/
  handleSub: function () {
    //判断登录状态
    let nickName = wx.getStorageSync('check');
    let that = this;
    if (nickName != false){
      wx.request({
        url: common.queryAll,
        data: {
          nickName: nickName
        },
        success: function(res) {
          if (res.data != '') {
            that.setData({
              nickName: nickName,
              cardNum: res.data[0].cardnum,
              address: res.data[0].address,
              tel: res.data[0].tel,
              hiddenStatus: false
            })
          }
        }
      });
    }else {
      wx.switchTab({
        url:'../my/my'
      })
    }
  },
  /***模态框 */
  modify: function() {
    //隐藏模态框
    this.setData({
      hiddenStatus: true
    });
    wx.switchTab({
      url: '../my/my'
    })
  },
  confirm: function () {
    //隐藏模态框
    this.setData({
      hiddenStatus: true
    });
    //将选购餐品赋值给item变量，并转换为JSON字符串
    let list = this.data.foodsList;
    let item = [];
    for (var i=0;i<list.length;i++){
      item[i] = {
        "title": list[i].title,
        "num": list[i].num
      }
    }
    item = JSON.stringify(item);
    //保存订单信息
    wx.request({
      url:common.setOrder,
      data:{
        nickName:this.data.nickName,
        shopTitle:this.data.shop,
        allNum:this.data.allNum,
        allPrice:this.data.allPrice,
        item:item,
      },
      success: function () {}
    });
    //清除本地缓存的购物车信息
    wx.removeStorageSync('cartData');
    //跳转到支付成功页面
    wx.navigateTo({
      url: '../success/success',
    })
  }
})