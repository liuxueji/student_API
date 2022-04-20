const model = require('../model/users_model')
//导入工具类 jwt
const jwtUtil = require('../utils/jwtUtils')
//导入全局配置文件
const config = require('../config')
module.exports = class users_dao {
  // 登录
  static async Login(req, res) {
    let body = req.body
    console.log(body);

    // 获取用户名、密码、身份类型
    let loginData = await model.LoginUser(body.username, body.password, body.type)
    if (loginData.length != 0) {
      let jwt_token = jwtUtil.sign({
        id: loginData[0].id,
        username: loginData[0].username,
        type: loginData[0].type
      }, config.jwtSecretKey, 36000)
      res.send({
        loginData,
        jwt_token
      })
    } else res.status(500).send("用户名或密码错误")
  }

  // 根据token获取用户信息
  static async getUserDataByToken(req, res) {
    let result = await jwtUtil.verifysync(req.query.token, config.jwtSecretKey)
    res.send(result)
  }

  // 个人密码修改
  static async upPwd(req, res) {
    let verify = await jwtUtil.verifysync(req.body.token, config.jwtSecretKey)
    let u_id = verify.id
    let oldpassword = req.body.oldpassword
    let newpassword = req.body.newpassword
    let result = await model.upPwdMod(u_id, oldpassword, newpassword)

    res.send(result)
  }

  //根据用户类型进行用户信息获取(分页获取总数量与数据)
  static async getUsersByTypePage(req, res) {
    let query = req.query
    let data = await model.getUsersByTypePageMod(query.type, query.currPage, query.pageNum)
    let total = await model.getUsersByTypePageTotal(query.type)

    res.send({
      data,
      total: total[0].count
    })
  }

  // 用户删除（同时清空该用户的阅读记录）
  static async delUserdata(req, res) {
    let results = await model.delUserdataMod(req.query.u_id)
    res.send(results)
  }

  // 更改用户信息
  static async upUserdata(req, res) {
    let body = req.body
    let u_id = body.u_id
    let username = body.username
    let sex = body.sex
    let email = body.email
    let address = body.address
    let type = body.type
    let results = await model.upUserdataMod(u_id, username,email, sex, address, type)
    res.send(results)
  }
}