// routes/auth.js

import auth from '../controllers/user.js'
import koaRouter from 'koa-router'
const router = koaRouter()

router.get('/user/:id', auth.getUserInfo) // 定义url的参数是id,用user的auth方法引入router

module.exports = router // 把router规则暴露出去
