// 导入数据库模块
const mysql = require('mysql')
const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '123456',
  database: 'student_db'
})

//sql:要执行的sql语句、params：给sql语句的占位符进行赋值的参数数组
module.exports = class Model {
  static query(sql, params) {
    return new Promise((resolve, reject) => {
      db.getConnection(function (err, connection) {
        if (err) {
          console.error(err)
          connection.relese()
        } else {
          connection.query(sql, params, (err, results) => {
            if (err) {
              console.error(err);
              reject(err)
            } else {
              resolve(results)
            }
            //结束会话，释放连接
            connection.release()
          })
        }
      })
    })
  }

  //把多个参数转换成数组的方法
  static formatParams() {
    let array = []
    // arguments.length 表示的是实际上向函数传入了多少个参数
    for (let i = 0, l = arguments.length; i < l; i++) {
      // 把传入的参数全部转换成数组
      array.push(arguments[i])
    }
    return array
  }

  static getNowAndLastDate() {
    let date = new Date()
    let Month = ""
    if ((date.getMonth() + 1) < 10) Month = "0" + String((date.getMonth() + 1))
    else Month = (date.getMonth() + 1) + ""

    let nowDate = "" + date.getFullYear() + Month + date.getDate()
    let lastDate = "" + date.getFullYear() + Month + (date.getDate() + 1)
    let nowMonth = "" + date.getFullYear() + Month + "01"
    let lastMonth = "" + date.getFullYear() + Month + "31"

    return {
      nowDate,
      lastDate,
      nowMonth,
      lastMonth
    }
  }
}