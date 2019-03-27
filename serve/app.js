const Koa = require('koa');
const router = require('./routes');
const app = new Koa();
const response = require('./middlewares/response');

app
  .use(response)
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000)