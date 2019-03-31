const Todo = require('./../models/todo.js');
const formate = require('./../utils/date.js');
const TodoKeyresult = require('./../models/todoKeyresult.js');

const todoController = {
  index: async function(ctx, next) {
    let status = ctx.request.query.status;
    let user_id = ctx.state.user_id;
    if(!user_id){
      ctx.state.data.message = '缺少必要参数'
      return
    }

    let todos = await Todo.select({ user_id , status })
    todos = todos.map( data => {
      data.created_time = formate.formatTime(data.created_time)
      if(data.finished_time) {
        data.finished_time = formate.formatTime(data.finished_time)
      }
      return data
    })
    ctx.state.code = 200;
    ctx.state.data.todos = todos;
  },
  insert: async function(ctx, next){
    let title = ctx.request.body.title;
    let user_id = ctx.state.user_id;
    let status = 0;
    let created_time = new Date();
    if(!title || !user_id){
      ctx.state.data.message = '缺少必要参数'
      return
    }

    const todos = await Todo.insert({ title, user_id, status, created_time });
    let id = todos[0];
    ctx.state.code = 200;
    ctx.state.data.id = id;
  },
  update: async function(ctx, next) {
    let id = ctx.params.id;
    let params = ctx.request.body;
    params.finished_time = params.status ? new Date() : null;
    let todo = await Todo.update( id , params);
    ctx.state.code = 200;
    ctx.state.data.message = 'success';
  },
  delete: async function(ctx, next) {
    let id = ctx.params.id;
    await Todo.delete(id);
    await TodoKeyresult.select({todo_id: id}).del();
    ctx.state.code = 200;
    ctx.state.data.message = 'success';
  }
}

module.exports = todoController;