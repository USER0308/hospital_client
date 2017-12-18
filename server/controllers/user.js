// controllers/user.js

import user from '../models/user.js'

const getUserInfo = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  console.log('id is ', id)
  const result = await user.getUserById(id)  // 通过yield “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

module.exports = {
  getUserInfo // 把获取用户信息的方法暴露出去
}
