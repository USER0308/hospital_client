// models/user.js
const db = require('../config/db.js')

const userModel = '../schema/user.js' // 引入user的表结构
const shareInfoModel = '../schema/share_info.js'
const relationsModel = '../schema/relations.js'
const additionModel = '../schema/addition.js'
const casesModel = '../schema/cases.js'

const hospitalClient = db.HospitalClient // 引入数据库

const User = hospitalClient.import(userModel) // 用sequelize的import方法引入表结构，实例化了User。
const ShareInfo = hospitalClient.import(shareInfoModel)
const Relations = hospitalClient.import(relationsModel)
const Addition = hospitalClient.import(additionModel)
const Cases = hospitalClient.import(casesModel)

// const getUserById = async function (id) { // 注意是function* 而不是function 对于需要yield操作的函数都需要这种generator函数。
//   const userInfo = await User.findOne({ // 用yield控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
//     where: {
//       id: id
//     }
//   })
//   // console.log(userInfo)
//   return userInfo // 返回数据
// }

const getUserByAccount = async function (account) {
  const getUser = await User.findOne({
    where: {
      account: account
    }
  })
  // console.log('in model', getUser)
  return getUser
}

const getShareInfo = async function (id) {
  const shareInfo = await ShareInfo.findOne({
    where: {
      user_id: id
    }
  })
  // console.log(shareInfo)
  return shareInfo
}

const getRelations = async function (id) {
  const relations = await Relations.findAll({
    where: {
      user_id: id
    }
  })
  console.log(relations)
  return relations
}

const getAddition = async function (id) {
  const addition = await Addition.findAll({
    where: {
      user_id: id
    }
  })
  console.log(addition)
  return addition
}

const getCases = async function (id) {
  const cases = await Cases.findAll({
    where: {
      user_id: id
    }
  })
  console.log(cases)
  return cases
}

const resetPassword = async function (id, account, password) {
  const result = await User.update({
    password
  }, {
    where: {
      id,
      account: account
    }
  })
  console.log('in reset password', result)
  return result[0] === 1
}

const update = async function (id, info) {
  console.log(typeof info)
  console.log('info is', info)
  const result = await ShareInfo.update(info, {
    where: {
      user_id: id
    }
  })
  console.log('in update, result is', result)
  return true
}

// const add = async function (account, info) {
//   const result = await ShareInfo.update({
//     //
//   }, {
//     where: {
//       account: account
//     }
//   })
//   return result[0] !== 0
// }

const addCase = async function (id, cases) {
  // let successNum = 0
  for (let i = 0; i < cases.length; i++) {
    await Cases.create({
      user_id: id,
      hospital_name: cases[i].hospital_name,
      case_date: cases[i].case_date,
      doctor_name: cases[i].doctor_name,
      situation: cases[i].situation,
      suggestion: cases[i].suggestion,
      prescription: cases[i].prescription,
      diagnosis: cases[i].diagnosis
    })
    // if (result[0] === 1) {
    //   successNum++
    // }
  }
  return true
  // if (successNum === cases.length) {
  //   return true
  // } else {
    // 错误恢复
    // let destroyNum = 0
    // for (let i = 0; i < successNum; i++) {
    //   const result = await Cases.destroy({
    //     where: {
    //       user_id: id,
    //       hospital_name: cases[i].hospital_name,
    //       case_date: cases[i].case_date,
    //       doctor_name: cases[i].doctor_name,
    //       situation: cases[i].situation,
    //       suggestion: cases[i].suggestion,
    //       prescription: cases[i].prescription,
    //       diagnosis: cases[i].diagnosis
    //     }
    //   })
    //   if (result[0] === 1) {
    //     destroyNum++
    //   }
    // }
    // if (destroyNum === successNum) {
    //   console.log('错误已恢复')
    // } else {
    //   console.log('还有' + (successNum - destroyNum) + '条错误未恢复')
    // }
    // return false
  // }
}

const addRelation = async function (id, relations) {
  // let successNum = 0
  for (let i = 0; i < relations.length; i++) {
    await Relations.create({
      user_id: id,
      relation_name: relations[i].relation_name,
      relation_phone: relations[i].relation_phone,
      relation: relations[i].relation
    })
    // console.log('result is ', result)
    // if (result[0] === 1) {
    //   successNum++
    // }
  }
  return true
  // if (successNum === relations.length) {
  //   console.log('successNum, relations.length is', successNum, relations.length)
  //   return true
  // } else {
  //   // 错误恢复
  //   let destroyNum = 0
  //   for (let i = 0; i < successNum; i++) {
  //     const result = await Relations.destroy({
  //       where: {
  //         user_id: id,
  //         relation_name: relations[i].relation_name,
  //         relation_phone: relations[i].relation_phone,
  //         relation: relations[i].relation
  //       }
  //     })
  //     console.log('result is ', result)
  //     if (result[0] === 1) {
  //       destroyNum++
  //     }
  //   }
  //   if (destroyNum === successNum) {
  //     console.log('错误已恢复')
  //   } else {
  //     console.log('还有' + (successNum - destroyNum) + '条错误未恢复')
  //   }
  //   return false
  // }
}

module.exports = {
  // getUserById,  // 导出getUserById的方法，将会在controller里调用
  getUserByAccount,
  getShareInfo,
  getRelations,
  getAddition,
  getCases,
  resetPassword,
  update,
  // add,
  addCase,
  addRelation
}
