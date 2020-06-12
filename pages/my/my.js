// pages/my/my.js
var common = require('../../utils/common.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,      //给控制变量isLogin赋值
    cardNum: '',
    address: '',
    tel: '',
    hiddenStatus: true,  //给模态框控制变量hiddenStatus赋初值，true表示隐藏模态框
    tmpCardNum: '', //临时变量
    tmpAddress: '', //临时变量
    tmpTel: '' //临时变量
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读取本地存储变量check，如果值为false表示未登录，否则表示已登录
    let nickName = wx.getStorageSync('check');
    if (nickName != false) { //已登录
      //设置控制变量isLogin、用户的昵称nickName
      this.setData({
        isLogin: true,
        nickName: nickName
      });
      //通过数据接口获取个人信息
      let that = this;
      wx.request({
        url: common.queryAll,
        data: {
          nickName: this.data.nickName
        },
        success: function(res) {
          if (res.data != '') {
            that.setData({
              cardNum: res.data[0].cardnum,
              address: res.data[0].address,
              tel: res.data[0].tel
            })
          }
        }
      })
    }
  },
  /***获取用户信息 */
  getMyInfo: function (e) {
    //获取并设置用户的头像、昵称
    let info = e.detail.userInfo
    this.setData({
      isLogin: true,
      src: info.avatarUrl,
      nickName: info.nickName
    })
    // 本地存储用户的昵称
    wx.setStorageSync('check', info.nickName)
    ///获取并设置卡号等个人信息
    let that = this;
    wx.request({
      url: common.queryAll,
      data: {
        nickName: this.data.nickName
      },
      success: function (res) {
        if (res.data != '') {
          that.setData({
            cardNum: res.data[0].cardnum,
            address: res.data[0].address,
            tel: res.data[0].tel
          })
        }
      }
    })
  },
  //单击“修改信息”按钮处理函数
  show: function(e) {
    //将模态框的控制变量hiddenStatus赋值为false，显示模态框
    this.setData({
      hiddenStatus: false
    })
  },
  /***模态框 */
  cancel: function(e) {
    //隐藏模态框
    this.setData({
      hiddenStatus: true
    })
  },
//更新个人信息
  confirm: function(e) {
    //隐藏模态框
    this.setData({
      hiddenStatus: true
    })
    let that = this
    //如果模态框的输入框中输入信息，则获取临时变量
    if (this.data.tmpCardNum != '') {
      that.setData({
        cardNum: this.data.tmpCardNum
      })
    }
    if (this.data.tmpAddress != '') {
      that.setData({
        address: this.data.tmpAddress
      })
    }
    if (this.data.tmpTel != '') {
      that.setData({
        tel: this.data.tmpTel
      })
    }
    //通过数据接口setAll更新后台数据库中的个人信息
    wx.request({
      url: common.setAll,
      data: {
        nickName: this.data.nickName,
        cardNum: this.data.cardNum,
        address: this.data.address,
        tel: this.data.tel
      },
    })
  },
  //如果模态框中的第一个输入框输入了信息，则赋值给临时变量tmpCardNum
  fixCard: function(e) {
    this.setData({
      tmpCardNum: e.detail.value
    })
  },
  //如果模态框中的第二个输入框输入了信息，则赋值给临时变量tmpAddress
  fixAddress: function(e) {
    this.setData({
      tmpAddress: e.detail.value
    })
  },
  //如果模态框中的第三个输入框输入了信息，则赋值给临时变量tmpTel
  fixTel: function(e) {
    this.setData({
      tmpTel: e.detail.value
    })
  },
  /**查询我的订单**/
  myOrders: function(e) {
    wx.navigateTo({
      url: '../orders/orders?nickName=' + this.data.nickName,
    })
  },
})