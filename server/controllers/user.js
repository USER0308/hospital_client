// controllers/user.js

const user = require('../models/user.js')

const getUserInfo = async function (ctx) {
  const data = ctx.request.body
  console.log('in get users info', data)
  const getUser = await user.getUserByAccount(data.account)
  if (getUser !== null) {
    let shareInfo = await user.getShareInfo(getUser.dataValues.id)
    let relations = await user.getRelations(getUser.dataValues.id)
    let addiction = await user.getAddiction(getUser.dataValues.id)
    let cases = await user.getCases(getUser.dataValues.id)
    delete shareInfo.id
    delete shareInfo.user_id
    for (let i = 0; i < relations.length; i++) {
      delete relations[i].id
      delete relations[i].user_id
    }
    for (let i = 0; i < cases.length; i++) {
      delete cases[i].id
      delete cases[i].user_id
    }
    shareInfo.dataValues['relation'] = relations
    shareInfo.dataValues['addition'] = addiction
    shareInfo.dataValues['cases'] = cases
    console.log('shareinfo is:', shareInfo)
    ctx.body = {
      success: true,
      info: '登录成功',
      shareInfo: shareInfo
    }
  }
  console.log('in authorize', getUser)
  // ctx.body = getUser
}

const authorize = async function (ctx) {
  const data = ctx.request.body
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
      let addiction = await user.getAddiction(getUser.dataValues.id)
      let cases = await user.getCases(getUser.dataValues.id)
      delete shareInfo.id
      delete shareInfo.user_id
      for (let i = 0; i < relations.length; i++) {
        delete relations[i].id
        delete relations[i].user_id
      }
      for (let i = 0; i < cases.length; i++) {
        delete cases[i].id
        delete cases[i].user_id
      }
      shareInfo.dataValues['relation'] = relations
      shareInfo.dataValues['addition'] = addiction
      shareInfo.dataValues['cases'] = cases
      console.log('shareinfo is:', shareInfo)
      ctx.body = {
        success: true,
        info: '登录成功',
        shareInfo: shareInfo
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

const passwordReset = async function (ctx) {
  const data = ctx.request.body
  console.log(data)
  const getUser = await user.getUserByAccount(data.account)
  if (getUser !== null) {
    let status = await user.resetPassword(getUser.dataValues.id, getUser.dataValues.account, data.password)
    console.log('in password reset, status is', status)
    if (status) {
      ctx.body = {
        success: status,
        info: '更改成功'
      }
    } else {
      ctx.body = {
        success: status,
        info: '更改失败'
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '帐号不存在'
    }
  }
}

const updateInfo = async function (ctx) {
  const data = ctx.request.body
  console.log(data)
  const getUser = await user.getUserByAccount(data.account)
  if (getUser !== null) {
    //
    let status = await user.update(getUser.dataValues.id, data.info)
    console.log('in update, status is', status)
    if (status) {
      ctx.body = {
        success: status,
        info: '更新成功'
      }
    } else {
      ctx.body = {
        success: status,
        info: '更新失败'
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '帐号不存在'
    }
  }
}

const add = async function (ctx) {
  const data = ctx.request.body
  console.log(data)
  const getUser = await user.getUserByAccount(data.account)
  if (getUser !== null) {
    // add cases
    if ('cases' in data) {
      let status = await user.addCase(getUser.dataValues.id, data.cases)
      console.log('in add cases, status is', status)
      if (status) {
        ctx.body = {
          success: status,
          info: '添加成功'
        }
      } else {
        ctx.body = {
          success: status,
          info: '添加失败'
        }
      }
    }
    // add addition
    // add relations
    if ('relations' in data) {
      let status = await user.addRelation(getUser.dataValues.id, data.relations)
      console.log('in add relation, status is', status)
      if (status) {
        ctx.body = {
          success: status,
          info: '添加成功'
        }
      } else {
        ctx.body = {
          success: status,
          info: '添加失败'
        }
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '帐号不存在'
    }
  }
}

const getCasesByAccount = async function (ctx) {
  const data = ctx.request.body
  const getUser = await user.getUserByAccount(data.account)
  if (getUser !== null) {
    let result = await user.getCases(getUser.dataValues.id)
    ctx.body = {
      success: true,
      info: '查询成功',
      cases: result
    }
    console.log('query result is', result)
  } else {
    ctx.body = {
      success: false,
      info: '帐号不存在'
    }
  }
}

const validate = async function (ctx) {
  const data = ctx.request.body
  if ('info' in data) {
    await user.createUser(data.token, data.info)
    ctx.body = {
      success: true,
      info: '获得授权'
    }
  } else {
    if (user.correct(data.token)) {
      ctx.body = {
        success: true,
        info: 'token 正确'
      }
    } else {
      ctx.body = {
        success: false,
        info: 'token 不正确'
      }
    }
  }
}

const operation = async function (ctx) {
  const data = ctx.request.body
  console.log('data in request is', data)
  if (data.type === '1') {
    // add
    // data = {
    // account
    // cases
    // (relations)
    const getUser = await user.getUserByAccount(data.account)
    if (getUser !== null) {
      // add cases
      if ('cases' in data) {
        let status = await user.addCase(getUser.dataValues.id, data.cases)
        console.log('in add cases, status is', status)
        if (status) {
          ctx.body = {
            success: status,
            info: '添加成功'
          }
        } else {
          ctx.body = {
            success: status,
            info: '添加失败'
          }
        }
      }
      // add addition
      // add relations
      if ('relations' in data) {
        let status = await user.addRelation(getUser.dataValues.id, data.relations)
        console.log('in add relation, status is', status)
        if (status) {
          ctx.body = {
            success: status,
            info: '添加成功'
          }
        } else {
          ctx.body = {
            success: status,
            info: '添加失败'
          }
        }
      }
    } else {
      ctx.body = {
        success: false,
        info: '帐号不存在'
      }
    }
  } else if (data.type === '2') {
    // remove
  } else if (data.type === '0') {
    // update
    // data = {
    // account
    // key
    // value
    const u = await user.getUserByAccount(data.account)
    if (u === null) {
      ctx.body = {
        success: false,
        info: '帐号不存在'
      }
      return
    }
    let obj = {}
    let key = data.key
    obj[key] = data.value
    await user.update(u.dataValues.id, obj)
    ctx.body = {
      success: true,
      info: '更新成功'
    }
  }
}

module.exports = {
  getUserInfo, // 把获取用户信息的方法暴露出去
  authorize,
  passwordReset,
  updateInfo,
  add,
  getCasesByAccount,
  validate,
  operation
}
