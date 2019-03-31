const authCode = require('./../utils/authCode.js')

const auth = {
  decode: async function(ctx, next){
    let token = ctx.headers.authorization
    if(token){
      let authArr = authCode(token,'DECODE').split('\t');
      let jikexueyuan = authArr[0];
      let user_id = authArr[2];
      if(jikexueyuan = 'jikexueyuan' && user_id){
        ctx.state.user_id = Number(user_id);
      }
    }    
    await next()
  }
}

module.exports = auth;