const router = require('koa-router')({
  prefix: '/api'
})

const testController = require('./../controllers/test.js')
const userController = require('./../controllers/user.js')
const todoController = require('./../controllers/todo.js')
const okrController = require('./../controllers/okr.js')
const keyresultController = require('./../controllers/keyresult.js')
const objectiveController = require('./../controllers/objective.js')
const todoKeyresultController = require('./../controllers/todoKeyresult.js')


router.get('/test', testController.test)
router.post('/login', userController.login)
router.post('/todo', todoController.insert)
router.get('/todo', todoController.index)
router.put('/todo/:id', todoController.update)
router.delete('/todo/:id', todoController.delete)
router.post('/okr', okrController.insert)
router.get('/okr', okrController.index)
router.get('/okr/:id', okrController.show)
router.put('/okr/:id', okrController.update)
router.put('/objective/:id', objectiveController.update)
router.delete('/objective/:id', objectiveController.delete)
router.put('/keyresult/:id', keyresultController.update)
router.delete('/keyresult/:id', keyresultController.delete)

router.get('/todo/:id/keyresult', todoKeyresultController.index)
router.post('/todo/:id/keyresult', todoKeyresultController.insert)
router.delete('/todo/:id/keyresult', todoKeyresultController.delete)

module.exports = router