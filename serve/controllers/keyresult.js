const Keyresult = require('./../models/keyresult.js');
const TodoKeyresult = require('./../models/todoKeyresult.js');

const keyresultController = {
  update: async function(ctx, next) {
    let id = ctx.params.id;
    let params = ctx.request.body;
    params.finished_time = params.status ? new Date() : null;
    await Keyresult.update( id , params);
    ctx.state.code = 200;
    ctx.state.data.message = 'success';
  },
  delete: async function(ctx, next) {
    let id = ctx.params.id;
    await Keyresult.delete(id);
    await TodoKeyresult.select({keyresult_id: id}).del();
    ctx.state.code = 200;
    ctx.state.data.message = 'success'
  }
}

module.exports = keyresultController;