const testController = {
  test: async (ctx, next) => {
    // ctx.body = 'Hello Koa!'
    ctx.state.code = 200;
    ctx.state.data = { message:'success' }
  } 
}

module.exports = testController;