import Todo from './../../models/todo.js';
import { formatTime } from './../../utils/date.js';
import TodoKeyresult from './../../models/todoKeyresult.js';


Page({
  data: {
    todos: [],
    value: '',
  },
  onShow: function() {
    Todo.index({status: 0}).then(res => {
      this.setData({todos: res.todos})
    })
  },
  handleInput: function(event) {
    let value = event.detail.value;
    this.setData({ value })
  },
  handleConfirm: function(event) {
    let title = event.detail.value;
    Todo.insert({ title }).then(res => {
      let created_time = formatTime(new Date())
      let id = res.id;
      let todos = this.data.todos;
      todos.push({ id, title, created_time })
      this.setData({ value: '', todos })
    })
  },
  handleShowActionSheet: function(event) {
    let index = event.currentTarget.dataset.index;
    let id = event.currentTarget.dataset.id;
    wx.showActionSheet({
      itemList: ['关联', '完成', '删除'],
      itemColor: '#333',
      success: (res)=> {
        let tapIndex = res.tapIndex;
        switch (tapIndex) {
          case 0:
            wx.navigateTo({url:'/pages/todo_keyresult/todo_keyresult?id=' + id })
            break;
          case 1:
            this.handleFinishTodo(id,index)
            break;
          case 2:
            wx.showModal({
              title: '删除',
              content: '是否确定要删除该 Todo',
              success:(res)=> {
                if (res.confirm) {
                  this.handleDeleteTodo(id,index)
                }
              }
            })
            break;
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  handleFinishTodo: function(id,index) {
    Todo.update(id, { status: 1 }).then( res => {
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