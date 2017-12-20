'use strict'
const Koa = require('koa')
const koa_router = require('koa-router')
const json = require('koa-json')
const logger = require('koa-logger')
const koa_body_parser = require('koa-bodyparser')

const auth = require('./server/routes/auth')

const app = new Koa()
const router = koa_router()

// const auth = require('./server/routes/auth.js')

app.use(koa_body_parser())
app.use(json())
app.use(logger())

app.use(async function(ctx, next) {
  let start = new Date
  await next()
  let ms = new Date - start
  console.log('%s %s - %s', ctx.method, ctx.url, ms);
})

app.on('error', function(err,ctx){
  console.log('server error', err)
})

router.use('/auth', auth.routes())
app.use(router.routes())

app.listen(8889, () => {
  console.log('Koa is listening in 8889');
});



module.export = app;
