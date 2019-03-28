Page({
  data: {
    okr: {
      id: 1,
      status: 1,
      title: '我想让网站打开速度快一些',
      created_time: '2018-3-28',
      finished_time: '2018-4-1',
      keyresults: [{
        id: 1,
        title: '打开速度快 30%',
        status: 1,
        created_time: '2018-3-28',
        finished_time: null,
        todos: [{
          id: 1,
          title: '替换提及较大的资源库',
          status: 0,
          created_time: '2018-3-28',
        },{
          id: 1,
          title: 'JavaScript 代码压缩',
          status: 1,
          created_time: '2018-3-28',
          finished_time: '2018-4-1',
        },{
          id: 1,
          title: '图片资源压缩和代理',
          status: 0,
          created_time: '2018-3-28',
        }]
      }]
    }
  },
  handleShowActionSheet: function(event) {
    wx.showActionSheet({
      itemList: ['完成'],
      itemColor: '#333',
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleKeyresultActionSheet: function(event) {
    wx.showActionSheet({
      itemList: ['完成'],
      itemColor: '#333',
      success(res) {
        console.log(res.tapIndex)
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleObjectiveActionSheet: function(event) {
    wx.showActionSheet({
      itemList: ['完成','删除'],
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