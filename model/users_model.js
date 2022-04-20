const tools = require('../utils/tools')
module.exports = class users_model extends require('./model') {
  // 登录：用username、password、type进行判断，如果数据库拿到数据，就成功。在users_dao被调用
  static LoginUser(username, password, type) {
    type = Number(type)
    return new Promise((resolve, reject) => {
      let sql = "select * from users where binary username='" + username + "' and password='" + password + "' and type=" + type
      console.log(sql)
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject('登录失败')
      })
    })
  }

  // 个人密码修改：通过password、id找到对应数据，通过updata对password修改
  static upPwdMod(u_id, oldpassword, newpassword) {
    return new Promise((resolve, reject) => {
      let sql = "update `users` set password= ? where password = ? and id = ?"
      this.query(sql, this.formatParams(newpassword, oldpassword, u_id)).then(res => {
        resolve('更新成功')
      }).catch(err => {
        reject('更新失败')
      })
    })
  }

  //根据用户类型进行用户信息获取(分页获取总数量与数据)--数据
  static getUsersByTypePageMod(type, currPage, pageNum) {
    // 防止用户输入的是字符，直接转数字
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(pageNum * currPage)
    //操作数据库，返回一个异步数组对象
    return new Promise((resolve, reject) => {
      // 具体操作数据库方法，利用 ？ 占位符
      let sql = 'select * from users where type = ' + type + ' order by modifytime desc LIMIT ?,?'
      // 执行数据库，formatParams是提前封装好的方法（参数转换成数组）
      this.query(sql, this.formatParams(currPage, pageNum)).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //根据用户类型进行用户信息获取(分页获取总数量与数据)--数量
  static getUsersByTypePageTotal(type) {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from users where type = " + type
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //用户删除
  static delUserdataMod(id) {
    return new Promise((resolve, reject) => {
      let sql = "delete from users where id = " + id
      console.log(sql);
      this.query(sql).then(res => {
        resolve("删除用户成功")
      }).catch(err => {
        reject("删除用户失败")
      })
    })
  }

  //管理员进行用户信息修改
  static upUserdataMod(u_id, username,email, sex, address, type) {
    let currTime = tools.getDate19()
    return new Promise((resolve, reject) => {
      let sql = "update `users` set username= '" + username + "',email='" +email+"' ,sex= '" + sex + "',address='" + address + "',type=" + type + ",modifytime='" + currTime + "' where id=" + u_id
      console.log(sql);
      this.query(sql).then(res => {
        resolve("更新成功")
      }).catch(err => {
        reject("更新失败")
      })
    })
  }

}