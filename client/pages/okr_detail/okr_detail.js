import Okr from './../../models/okr.js';
import Objective from './../../models/objective.js';
import Keyresult from './../../models/keyresult.js';
import { formatTime } from './../../utils/date.js';

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
  onLoad: function(opt) {
    let id = opt.id || 3;
    Okr.show(id).then(res => {
      this.setData({ okr: res.okr, id })
    })
  },
  handleKeyresultActionSheet: function(event) {
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    let index = event.currentTarget.dataset.index;
    let statusChange = status ? 0 : 1;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';

    wx.showActionSheet({
      itemList: [ statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: (res)=> {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            Keyresult.update(id, { status: statusChange }).then(res => {
              let okr = this.data.okr;
              okr.keyresults[index].status = statusChange;
              this.setData({ okr })
            })
            break;
          case 1:
            Keyresult.delete(id).then(res => {
              let okr = this.data.okr;
              okr.keyresults.splice(index,1)
              this.setData({ okr })
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleObjectiveActionSheet: function(event) {
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    let statusChange = status ? 0 : 1;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';

    wx.showActionSheet({
      itemList: [ statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: (res)=> {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            this.handleChangeObjective(id,statusChange)
            break;
          case 1:
            this.handleDeleteObjective(id)
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleChangeObjective: function(id,status) {
    Objective.update(id, { status }).then(res => {
      let finished_time = status ? formatTime(new Date()) : null
      let okr = this.data.okr;
      okr.status = status;
      okr.finished_time = finished_time;
      this.setData({ okr })
    })
  },
  handleDeleteObjective: function(id) {
    Objective.delete(id).then( res => {
      wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 1000,
        mask: true
      })
      setTimeout(()=>{
        wx.switchTab({ url: '/pages/okr/okr' })
      },1000)
    })
  }
})