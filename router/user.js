const express = require('express')
const router = express.Router()
const users = require('../dao/users_dao')
// 导入工具类 jwt
// const jwtUtil = require('../utils/jwtUtils')


// 登录
router.post('/login', function (req, res) {
  users.Login(req, res)
})

// 通过token解析成用户信息
router.get('/getUserDataByToken', function (req, res) {
  users.getUserDataByToken(req, res)
})

// 个人密码修改
router.post('/upPwd', function (req, res) {
  users.upPwd(req, res)
})

//根据用户类型进行用户信息获取(分页获取总数量与数据)
router.get('/getUsersByTypePage', users.getUsersByTypePage)

//用户删除
router.get('/delUserdata', function (req, res) {
  if (req.query.u_id == 0) res.send("您不能删除管理员")
  else users.delUserdata(req, res)
})

//更改用户信息
router.post('/upUserdata', function (req, res) {
  users.upUserdata(req, res)
})




module.exports = router