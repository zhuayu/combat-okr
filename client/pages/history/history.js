import Todo from './../../models/todo.js';

Page({
  data: {
    todos: []
  },
  onShow: function() {
    Todo.index({status: 1}).then(res => {
      this.setData({todos: res.todos})
    })
  },
  handleShowActionSheet: function(event) {
    let index = event.currentTarget.dataset.index;
    let id = event.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['标记为未完成', '删除'],
      itemColor: '#333',
      success: (res)=> {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            this.handleChangeTodo(id,index)
            break;
          case 1:
            this.handleDeleteTodo(id,index)
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleChangeTodo: function(id,index) {
    Todo.update(id, { status: 0, finished_time: null }).then( res => {
      let todos = this.data.todos;
      todos.splice(index,1)
      this.setData({ todos })
    })
  },
  handleDeleteTodo: function(id, index) {
    Todo.delete(id).then( res => {
      let todos = this.data.todos;
      todos.splice(index,1)
      this.setData({ todos })
    })
  }
})