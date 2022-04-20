const express = require('express')
const router = express.Router()
const admin = require('../dao/admin_dao')

// 根据用户类型与查询字段模糊查询 (数据与总数量返回)
router.get('/getUsersByTypeAndChar', function (req, res) {
  admin.getUsersByTypeAndChar(req, res)
})

// 获取该老师所属学生的全部请假单与数量(分页查询)
router.get('/getLeave', function (req, res) {
  admin.getLeave(req, res)
})

// 获取该用户请假审批与数量(分页)
router.get('/getuserLeave', function (req, res) {
  admin.getuserLeave(req, res)
})

// 对请假条进行审批
router.get('/upLeaveState', function (req, res) {
  admin.upLeaveState(req, res)
})

//发布通知
router.post('/announce', function (req, res) {
  admin.announce(req, res)
})

//分页获取所有通知与数量
router.post('/getAllNotice', function (req, res) {
  admin.getAllNotice(req, res)
})

// 当前通知删除功能(同时清空该通知的被阅读记录)
router.get('/delNotice', function (req, res) {
  admin.delNotice(req, res)
})

// 根据u_id查找用户信息
router.get('/getUserById', function (req, res) {
  admin.getUserById(req, res)
})
module.exports = router