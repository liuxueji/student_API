const model = require('../model/student_model')
//导入工具类 jwt
const jwtUtil = require('../utils/jwtUtils')
//导入全局配置文件
const config = require('../config')
module.exports = class student_dao {

  //健康填报表
  static async sethealth(req, res) {
    let body = req.body
    let token = body.token
    let temperature = body.temperature
    let warning = body.warning
    //解密
    let verify = await jwtUtil.verifysync(token, config.jwtSecretKey)
    let u_id = verify.id
    let data = await model.sethealthMod(u_id, temperature, warning)

    res.send(data)
  }

  //获取当天所有填报表与总数量(分页获取)
  static async gethealthNowDay(req, res) {
    let nowDate = model.getNowAndLastDate().nowDate
    let lastDate = model.getNowAndLastDate().lastDate
    let currPage = req.query.currPage
    let pageName = req.query.pageName
    let data = await model.gethealthNowDayMod(nowDate, lastDate, currPage, pageName)
    let total = await model.gethealthNowDayTotal(nowDate, lastDate)

    res.send({
      data,
      total: total[0].count
    })
  }

  // 获取当天某用户报表
  static async getHealthNowDayByid(req, res) {
    let verify = await jwtUtil.verifysync(req.query.token, config.jwtSecretKey)
    let u_id = verify.id
    let nowDate = model.getNowAndLastDate().nowDate
    let lastDate = model.getNowAndLastDate().lastDate

    let data = await model.getHealthNowDayByidMod(u_id, nowDate, lastDate)
    res.send(data)
  }

  // 获取当天所有填报表
  static async gethealthNowDay(req, res) {
    let nowDate = model.getNowAndLastDate().nowDate
    let lastDate = model.getNowAndLastDate().lastDate

    let data = await model.getHealthNowDayMod(nowDate, lastDate)
    console.log(nowDate, lastDate);
    
    res.send(data)
  }

  // 获取当月所有填报表
  static async gethealthNowMonth(req, res) {
    let nowMonth = model.getNowAndLastDate().nowMonth
    let lastMonth = model.getNowAndLastDate().lastMonth
    nowMonth = Number(nowMonth)
    lastMonth = Number(lastMonth)
    let data = await model.gethealthNowMonthMod(nowMonth, lastMonth)
    console.log(nowMonth, lastMonth);
    
    res.send(data)
  }

  // 获取所有填报表
  static async getAllHealth(req, res) {
    let data = await model.getAllHealthMod()
    res.send(data)
  }

  // 请假申请
  static async setLeave(req, res) {
    let body = req.body
    let verify = await jwtUtil.verifysync(body.token, config.jwtSecretKey)
    let u_id = verify.id
    let reason = body.reason
    let leavetype = body.leavetype
    let starttime = body.starttime
    let endtime = body.endtime
    let results = await model.setLeaveMod(u_id, reason, leavetype, starttime, endtime)
    res.send(results)
  }

  //我的通知分页获取数据与数量
  static async getNotice(req, res) {
    let verify = await jwtUtil.verifysync(req.query.token, config.jwtSecretKey)
    let u_id = verify.id
    let pageNum = req.query.pageNum
    let currPage = req.query.currPage
    console.log(pageNum,currPage);
    
    let data = await model.getNoticeMod(u_id, pageNum, currPage)
    let title = await model.getNoticeTotal(u_id)
    res.send({
      data,
      title: title[0].count
    })
  }

  //获取的我通知已读列表(供已读未读状态渲染)
  static async getNoticeRead(req, res) {
    let verify = await jwtUtil.verifysync(req.query.token, config.jwtSecretKey)
    let u_id = verify.id
    let data = await model.getNoticeReadMod(u_id)
    res.send(data)
  }

  //已读转未读
  static async goweidu(req, res) {
    let verify = await jwtUtil.verifysync(req.query.token, config.jwtSecretKey)
    let u_id = verify.id
    let n_id = req.query.n_id
    let results = await model.goweiduMod(u_id, n_id)
    res.send(results)
  }

  //未读转已读
  static async goyidu(req, res) {
    let verify = await jwtUtil.verifysync(req.query.token, config.jwtSecretKey)
    let u_id = verify.id
    let n_id = req.query.n_id
    let results = await model.goyiduMod(u_id, n_id)
    res.send(results)
  }
}