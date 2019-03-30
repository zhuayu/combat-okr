const Objective = require('./../models/objective.js');

const objectiveController = {
  update: async function(ctx, next) {
    let id = ctx.params.id;
    let params = ctx.request.body;
    params.finished_time = params.status ? new Date() : null;
    let objective = await Objective.update( id , params);
    ctx.state.code = 200;
    ctx.state.data.message = 'success';
  },
  delete: async function(ctx, next) {
    let id = ctx.params.id;
    await Objective.delete(id);
    ctx.state.code = 200;
    ctx.state.data.message = 'success';
  }
}

module.exports = objectiveController;