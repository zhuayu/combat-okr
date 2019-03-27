const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('./../controllers/test.js')

router.get('/', testController.test)

module.exports = router