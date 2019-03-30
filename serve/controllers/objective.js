const Objective = require('./../models/objective.js');
const Keyresult = require('./../models/keyresult.js');
const TodoKeyresult = require('./../models/todoKeyresult.js');

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
    let keyresults = await Keyresult.select({objective_id: id});
    let keyresult_ids = keyresults.map(data => data.id)
    await Keyresult.select({objective_id: id}).del();
    await TodoKeyresult.knex().whereIn('keyresult_id', keyresult_ids).del();
    ctx.state.code = 200;
    ctx.state.data.message = 'success';
  }
}

module.exports = objectiveController;