const router = require('koa-router')()

const user = require('./auth')

router.use('/auth', user.routes(), user.allowedMethods())

module.exports = router
