// pages/details/details.js
var common = require('../../utils/common.js');    //获取common.js文件暴露的数据接口
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop: {},
    foodsList: [],
    allNum: 0,   //给allNum变量赋初值
    allPrice: 0,   //给allPrice变量赋初值
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopSid = options.sid;
    let that = this;
    wx.request({
      url: common.getFoodsBySid,
      data: {
        Sid: shopSid
      },
      success: function (res) {
        //设置选购商品的初始值
        let list = [];
        for (var i = 0; i < res.data.foods.length; i++) {
          list[i] = res.data.foods[i];
          list[i]['num'] = 0
        }
        that.setData({
          foodsList: list,
          shop: res.data.shop[0],
        });
      }
    })
  },
  /* 输入框事件 */
  bindManual(e) {
    const {fid} = e.currentTarget.dataset; //获取fid和加减操作
    let input_num = parseInt(e.detail.value); //获取输入框数值
    let list = this.data.foodsList; //获取餐品列表
    let {sum,price} = common.getSum({fid,undefined,list,input_num});
    this.setData({
      foodsList: list,
      allNum: sum,
      allPrice: price.toFixed(2)
    });
  },
  /* 加号、减号单击事件 */
  bindChange(e) {
    const {fid,operation} = e.currentTarget.dataset;
    let list = this.data.foodsList;
    let { sum, price } = common.getSum({fid,operation,list,});
    this.setData({
      foodsList: list,
      allNum: sum,
      allPrice: price.toFixed(2)
    });
  },
  /**跳转到购物车**/
  goCart: function(e) {
    //选购的餐品总件数大于0时
    if (this.data.allNum > 0) {
      //将选购的foods选出
      let clist = this.data.foodsList;
      let trueList = [];
      for (var i = 0; i < clist.length; i++) {
        if (clist[i].num != 0) {
          trueList.push(clist[i])
        }
      }
      //将选购的餐品数据同步存储到本地
      let cart = {
        'shop': this.data.shop.title,
        'allNum': this.data.allNum,
        'allPrice': this.data.allPrice,
        'foodsList': trueList
      };
      wx.setStorageSync('cartData', cart);
      //跳转到购物车
      wx.switchTab({
        url: '../myCart/myCart',
      })
    } else {
      //****未选购餐品时，显示模态框
      wx.showModal({
        title: '提示',
        content: '请选择餐品，再结算',
        showCancel: false
      })
    }
  }
})