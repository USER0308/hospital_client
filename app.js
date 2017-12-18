'use strict'
import Koa from 'koa'
import koa_router from 'koa-router'
import json from 'koa-json'
import logger from 'koa-logger'
import koa_body_parser from 'koa-bodyparser'

import auth from './server/routes/auth'

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
