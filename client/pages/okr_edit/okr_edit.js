import Okr from './../../models/okr.js';
import Keyresult from './../../models/keyresult.js';

Page({
  data: {
    objective: '',
    keyresults: []
  },
  onLoad: function(opt) {
    let id = opt.id || 2;
    Okr.show(id).then(res => {
      let objective = res.okr.title;
      let keyresults = res.okr.keyresults;
      this.setData({ objective,keyresults, id })
    })
  },
  handleAddKeyresult: function() {
    let keyresults = this.data.keyresults;
    keyresults.push({title: ''})
    this.setData({ keyresults })
  },
  handleDeleteKeyresult: function(e) {
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let keyresults = this.data.keyresults;
    Keyresult.delete(id).then((res)=>{
      keyresults.splice(index,1)
      this.setData({ keyresults })
    })
  },
  handleChangeKeyresult: function(e) {
    let index = e.currentTarget.dataset.index;
    let value = e.detail.value;
    let keyresults = this.data.keyresults;
    keyresults[index].title = value
    this.setData({ keyresults })
  },
  handleChangeObjective: function(e) {
    let value = e.detail.value;
    this.setData({ objective: value })
  },
  handleSubmit: function(e) {
    let objective = this.data.objective;
    let keyresults = this.data.keyresults;
    if(!objective || !keyresults.length){
      wx.showToast({
        title: '目标和成果为必填项目',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }
    let tmp = keyresults.every( data => data.title);
    if(!tmp){
      wx.showToast({
        title: '所添加成果为必填',
        icon: 'none',
        mask: true,
        duration: 2000
      })
      return
    }

    
    let id = this.data.id;
    let data = { title: objective}
    data.keyresults = keyresults;
    Okr.update(id, data).then(res => {
      wx.showToast({
        title: '成功',
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