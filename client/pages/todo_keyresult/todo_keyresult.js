import TodoKeyresult from './../../models/todoKeyresult.js';

Page({
  data: {
    okr: []
  },
  onLoad: function(opt) {
    let id = opt.id;
    TodoKeyresult.index(id).then(res => {
      this.setData({ id, okr : res.okr})
    })
  },
  handleChange: function(event) {
    let todo_id = this.data.id;
    let keyresult_id = event.currentTarget.dataset.keyresult_id;
    let active = event.currentTarget.dataset.active;
    let index = event.currentTarget.dataset.index;
    let objective_index = event.currentTarget.dataset.objective_index;
    let changeActive = !active;
    let okr = this.data.okr;

    if(changeActive){
      TodoKeyresult.insert(todo_id,{
        todo_id,
        keyresult_id,
      }).then( res => {
        okr[objective_index].keyresults[index].active = changeActive;
        this.setData({ okr })
      })
    }else{
      TodoKeyresult.delete(todo_id,{
        todo_id,
        keyresult_id,
      }).then( res => {
        okr[objective_index].keyresults[index].active = changeActive;
        this.setData({ okr })
      })
    }
  }
})