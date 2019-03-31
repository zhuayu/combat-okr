const TodoKeyresult = require('./../models/todoKeyresult.js');
const Objective = require('./../models/objective.js');
const Keyresult = require('./../models/keyresult.js');

const todoKeyresultController = {
  index: async function(ctx, next) {
    let todo_id = ctx.params.id;
    let user_id = ctx.state.user_id;
    let params = {
      user_id: user_id,
      status: 0,
    }

    let objectives = await Objective.select(params);
    let objective_ids = objectives.map(data => data.id);
    let keyresults = await Keyresult.knex().whereIn('objective_id', objective_ids)
    let todoKeyresults = await TodoKeyresult.select({ todo_id })
    let keyresult_ids = todoKeyresults.map(data => data.keyresult_id);

    let okr = {};
    objectives.forEach(data => {
      data.keyresults = [];
      okr[data.id] = data
    });

    keyresults.forEach(data => {
      data.active = keyresult_ids.includes(data.id)
      okr[data.objective_id].keyresults.push(data)
    })
    
    okr = Object.values(okr)
    ctx.state.code = 200;
    ctx.state.data.okr = okr;
  },
  insert: async function(ctx, next) {
    let todo_id = ctx.request.body.todo_id;
    let keyresult_id = ctx.request.body.keyresult_id;
    await TodoKeyresult.insert({ todo_id, keyresult_id })
    ctx.state.code = 200;
    ctx.state.data.message = 'message';
  },
  delete: async function(ctx, next) {
    let todo_id = ctx.request.body.todo_id;
    let keyresult_id = ctx.request.body.keyresult_id;
    await TodoKeyresult.select({ todo_id, keyresult_id }).del();
    ctx.state.code = 200;
    ctx.state.data.message = 'message';
  },
}

module.exports = todoKeyresultController;