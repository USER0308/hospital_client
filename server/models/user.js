// models/user.js
import db from '../config/db.js'

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

const getUserById = async function (id) { // 注意是function* 而不是function 对于需要yield操作的函数都需要这种generator函数。
  const userInfo = await User.findOne({ // 用yield控制异步操作，将返回的Promise对象里的数据返回出来。也就实现了“同步”的写法获取异步IO操作的数据
    where: {
      id: id
    }
  })
  // console.log(userInfo)
  return userInfo // 返回数据
}

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

export default {
  getUserById,  // 导出getUserById的方法，将会在controller里调用
  getUserByAccount,
  getShareInfo,
  getRelations,
  getAddition,
  getCases
}
