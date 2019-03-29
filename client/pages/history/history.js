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
})