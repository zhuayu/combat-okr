import User from './../../models/user.js';

Page({
  onLoad: function() {
    let token = wx.getStorageSync('token')
    if(token){
      wx.switchTab({ url: '/pages/todo/todo' })
    }
  },
  handleLogin: function() {
    wx.login({
      success(res) {
        if (res.code) {
          User.login(res.code).then(res => {
            let token = res.token;
            wx.setStorage({ key: 'token', data: token })
            wx.switchTab({ url: '/pages/todo/todo' })
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})