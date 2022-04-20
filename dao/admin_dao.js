const model = require('../model/admin_model')
//导入工具类 jwt
const jwtUtil = require('../utils/jwtUtils')
//导入全局配置文件
const config = require('../config')
module.exports = class admin_dao {
  //根据用户类型与查询字段模糊查询 (数据与总数量返回)
  static async getUsersByTypeAndChar(req, res) {
    let query = req.query
    let type = query.type
    let inputText = query.inputText
    let CharType = query.CharType
    let pageNum = query.pageNum
    let currPage = query.currPage

    let data = await model.getUsersByTypeAndCharMod(type, inputText, CharType, currPage, pageNum)
    let total = await model.getUsersByTypeAndCharTotal(type, inputText, CharType)
    res.send({
      data,
      total: total[0].count
    })
  }

  // 获取该老师所属学生的全部请假单与数量(分页查询)
  static async getLeave(req, res) {
    let data = await model.getLeaveMod(req.query.currPage, req.query.pageNum)
    let total = await model.getLeaveTotal()
    res.send({
      data,
      total: total[0].count
    })
  }

  // 获取该用户请假审批与数量(分页)
  static async getuserLeave(req, res) {
    let verify = await jwtUtil.verifysync(req.query.token, config.jwtSecretKey)
    let u_id = verify.id
    let data = await model.getuserLeaveMod(u_id, req.query.currPage, req.query.pageNum)
    let total = await model.getuserLeaveTotal(u_id)
    res.send({
      data,
      total: total[0].count
    })
  }
  // 对请假条进行审批
  static async upLeaveState(req, res) {
    let data = await model.upLeaveStateMod(req.query.l_id, req.query.upState)
    res.send({
      data
    })
  }

  //发布通知
  static async announce(req, res) {
    let u_id = req.body.u_id
    let title = req.body.title
    let content = req.body.content
    let results = await model.announceMod(u_id, title, content)
    res.send(results)
  }

  //分页获取所有通知与数量
  static async getAllNotice(req, res) {
    let pageNum = req.body.pageNum
    let currPage = req.body.currPage
    let data = await model.getAllNoticeMod(pageNum, currPage)
    let total = await model.getAllNoticTotal()
    res.send({
      data,
      total: total[0].count
    })
  }

  // 当前通知删除功能(同时清空该通知的被阅读记录)
  static async delNotice(req, res) {
    let results = await model.delNoticeMod(req.query.n_id)
    results += await model.delReadMod(req.query.n_id)
    res.send(results)
  }

  // 根据u_id查找用户信息
  static async getUserById(req, res) {
    let results = await model.getUserByIdMod(req.query.id)
    res.send(results)
  }
}