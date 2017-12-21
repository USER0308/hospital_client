// routes/auth.js

const auth = require('../controllers/user.js')
const koaRouter = require('koa-router')
const router = koaRouter()

router.post('/user/getCases', auth.getCasesByAccount)
router.post('/user/info', auth.getUserInfo) // 定义url的参数是id,用user的auth方法引入router
router.post('/user/resetPass', auth.passwordReset)
router.post('/user/update', auth.updateInfo)
router.post('/user/add', auth.add)
router.post('/user', auth.authorize)

module.exports = router // 把router规则暴露出去
