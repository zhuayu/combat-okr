const User = require('./../models/user.js');
const Weixin = require('./../models/weixin.js');
const authCode = require('./../utils/authCode.js')
const { formateDay } = require('./../utils/date.js');

const userController = {
  login: async (ctx, next) => {
    let code = ctx.request.body.code;
    if(!code){
      ctx.state.data = { message: '缺少 code 参数' }
      return
    }

    let weixinRequest = await Weixin.code2Session(code);
    let weixinData = weixinRequest.data;
    let open_id    = weixinData.openid;
    let users = await User.select({ open_id })
    let user = users[0];
    let user_id;
    if(!user){
      let ids = await User.insert({ open_id });
      user_id = ids[0];
    }else{
      user_id = user.id;
    }

    let datetime = formateDay(new Date());
    let auth_Code = 'jikexueyuan'+'\t'+ datetime + '\t' + user_id;
    let token = authCode(auth_Code, 'ENCODE')
    ctx.state.code = 200;
    ctx.state.data = { token: token }
  } 
}

module.exports = userController;