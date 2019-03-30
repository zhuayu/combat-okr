import Okr from './../../models/okr.js';
import Objective from './../../models/objective.js';

Page({
  data: {
    objectives: []
  },
  onShow: function() {
    Okr.index({}).then(res => {
      this.setData({ objectives: res.objectives })
    })
  },
  handleObjectiveActionSheet: function(event) {
    let index = event.currentTarget.dataset.index;
    let id = event.currentTarget.dataset.id;
    let status = event.currentTarget.dataset.status;
    let statusChange = status ? 0 : 1;
    let statusChangeDisplay = statusChange ? '标记为已完成' : '标记为未完成';

    wx.showActionSheet({
      itemList: [ '查看 OKR 详情',statusChangeDisplay, '删除'],
      itemColor: '#333',
      success: (res)=> {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            wx.navigateTo({url:'/pages/okr_detail/okr_detail?id=' + id })
            break;
          case 1:
            this.handleChangeObjective(id,index,statusChange)
            break;
          case 2:
            this.handleDeleteObjective(id,index)
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleChangeObjective: function(id,index,status) {
    Objective.update(id, { status }).then(res => {
      let objectives = this.data.objectives;
      objectives[index].status = status;
      this.setData({ objectives })
    })
  },
  handleDeleteObjective: function(id,index) {
    Objective.delete(id).then( res => {
      let objectives = this.data.objectives;
      objectives.splice(index,1)
      this.setData({ objectives })
    })
  }
})