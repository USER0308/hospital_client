// controllers/user.js

import user from '../models/user.js'

const getUserInfo = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  console.log('id is ', id)
  const result = await user.getUserById(id)  // 通过yield “同步”地返回查询结果
  ctx.body = result // 将请求的结果放到response的body里返回
}

const authorize = async function (ctx) {
  const data = ctx.request.header
  // console.log('ctx is', ctx)
  // console.log('data is:', data)
  // console.log('account is:', data.account)
  // console.log('password is:', data.password)
  const getUser = await user.getUserByAccount(data.account)
  // console.log(getUser)
  if (getUser !== null) {
    if (getUser.dataValues.password === data.password) {
      let shareInfo = await user.getShareInfo(getUser.dataValues.id)
      let relations = await user.getRelations(getUser.dataValues.id)
      let addition = await user.getAddition(getUser.dataValues.id)
      let cases = await user.getCases(getUser.dataValues.id)
      ctx.body = {
        success: true,
        info: '登录成功',
        shareInfo: shareInfo,
        relation: relations,
        addition: addition,
        cases: cases
      }
    } else {
      ctx.body = {
        success: false,
        info: '登录失败,密码错误'
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '帐号不存在'
    }
  }
  console.log('in authorize', getUser)
  // ctx.body = getUser
}

export default {
  getUserInfo, // 把获取用户信息的方法暴露出去
  authorize
}
