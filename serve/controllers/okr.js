const Objective = require('./../models/objective.js');
const Keyresult = require('./../models/keyresult.js');
const formate = require('./../utils/date.js');

const okrController = {
  update: async function(ctx, next) {
    let id = ctx.params.id;
    let title = ctx.request.body.title;
    let keyresults = ctx.request.body.keyresults;
    let created_time = new Date();
    await Objective.update(id, {title});
    keyresults.forEach(async(data)=>{
      if(data.id){
        await Keyresult.update(data.id, { title: data.title })
      }else{
        await Keyresult.insert({ objective_id: id, title: data.title, status: 0, created_time })
      }
    })

    ctx.state.code = 200;
    ctx.state.data.message = 'success'
  },
  show: async function(ctx, next) {
    let id = ctx.params.id;
    let user_id = ctx.state.user_id;
    if(!user_id){
      ctx.state.code = 403;
      ctx.state.data.message = '没有登录'
      return
    }

    let objectives = await Objective.select({ id });
    let objective = objectives[0];
    let keyresults = await Keyresult.select({ objective_id: id });
    objective.keyresults = keyresults;
    objective.created_time = formate.formatTime(objective.created_time);
    if(objective.finished_time){
      objective.finished_time = formate.formatTime(objective.finished_time);
    }
    ctx.state.code = 200;
    ctx.state.data.okr = objective;
  },
  index: async function(ctx, next) {
    let status = ctx.request.query.status;
    let user_id = ctx.state.user_id;
    if(!user_id){
      ctx.state.code = 403;
      ctx.state.data.message = '没有登录'
      return
    }
    let params = { user_id };
    if(status){
      params.status = status
    }
    let objectives = await Objective.select(params)
    objectives = objectives.map( data => {
      data.created_time = formate.formatTime(data.created_time)
      if(data.finished_time) {
        data.finished_time = formate.formatTime(data.finished_time)
      }
      return data
    })
    ctx.state.code = 200;
    ctx.state.data.objectives = objectives;
  },
  insert: async (ctx, next) => {
    let title = ctx.request.body.objective;
    let keyresults = ctx.request.body.keyresults;
    let user_id = ctx.state.user_id;
    let status = 0;
    let created_time = new Date();
    if(!title || !keyresults.length || !user_id){
      ctx.state.data.message = '缺少必要参数'
      return
    }

    let objectives = await Objective.insert({
      title,
      status,
      created_time,
      user_id
    })

    let objective_id = objectives[0];
    keyresults.forEach(async (data)=>{
      let title = data.title;
      await Keyresult.insert({
        objective_id,
        title, 
        status,
        created_time
      })
    })

    ctx.state.code = 200;
    ctx.state.data.message = 'success'
  } 
}

module.exports = okrController;