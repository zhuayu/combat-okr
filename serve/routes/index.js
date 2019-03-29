const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('./../controllers/test.js')
const userController = require('./../controllers/user.js')

router.get('/test', testController.test)
router.post('/login', userController.login)

module.exports = router