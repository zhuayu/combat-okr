import Todo from './../../models/todo.js';

Page({
  data: {
    todos: [{
      id: 1,
      status: 0,
      title: '替换提及较大的资源库',
      created_time: '2018-3-28'
    },{
      id: 2,
      status: 0,
      title: 'JavaScript 代码压缩',
      created_time: '2018-3-28'
    },{
      id: 3,
      status: 0,
      title: '图片资源压缩和代理',
      created_time: '2018-3-28'
    }],
    value: '',
  },
  onLoad: function() {
    Todo.test().then(res => {
      console.log(res)
    })
  },
  handleConfirm: function(event) {
    let value = event.detail.value;
    console.log(value)
  },
  handleShowActionSheet: function(event) {
    wx.showActionSheet({
      itemList: ['关联', '完成', '删除'],
      itemColor: '#333',
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})