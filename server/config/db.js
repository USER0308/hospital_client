// db.js

const Sequelize = require('sequelize') // 引入sequelize

// 使用url连接的形式进行连接，注意将root: 后面的XXXX改成自己数据库的密码
const HospitalClient = new Sequelize('hospital_client', 'hospital_client', 'hospital_client', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  dialectOptions: {
    socketPath: '/var/run/mysqld/mysqld.sock' // 指定套接字文件路径
  },
  define: {
    timestamps: false // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
  },
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

module.exports = {
  HospitalClient // 将Todolist暴露出接口方便Model调用
}
