module.exports = class student_model extends require('./model') {
  //健康填报表
  static sethealthMod(u_id, temperature, warning) {
    return new Promise((resolve, reject) => {

      let sql = "insert into health(u_id,temperature,warning) values (?,?,?)"
      this.query(sql, this.formatParams(u_id, temperature, warning)).then(res => {
        resolve("成功")
      }).catch(err => {
        reject(`失败，错误信息:${err.message}`)
      })
    })
  }

  //分页获取当天填报表与总数量-----数据
  static gethealthNowDayMod(nowDate, lastDate, currPage, pageNum) {
    currPage = Number(currPage)
    pageNum = Number(pageNum)
    currPage = Number(pageNum * currPage)

    return new Promise((resolve, reject) => {
      let sql = "select * from health where createtime between ? and ? LIMIT ?,?"
      this.query(sql, this.formatParams(nowDate, lastDate, currPage, pageNum)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //分页获取当天填报表与总数量---数量
  static gethealthNowDayTotal(nowDate, lastDate) {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from health where createtime between ? and ?"
      this.query(sql, this.formatParams(nowDate, lastDate)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(`失败，错误信息:${err.message}`)
      })
    })
  }

  // 获取当天某用户报表
  static getHealthNowDayByidMod(u_id, nowDate, lastDate) {
    return new Promise((resolve, reject) => {
      let sql = "select * from health where (createtime between ? and ?) and u_id=?"
      // console.log(sql);
      // console.log(nowDate,lastDate);
      this.query(sql, this.formatParams(nowDate, lastDate, u_id)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(`失败，错误信息:${err.message}`)
      })
    })
  }

  // 获取当天所有填报表
  static getHealthNowDayMod(nowDate, lastDate) {
    return new Promise((resolve, reject) => {
      let sql = "select * from health where createtime between ? and ?"
      this.query(sql, this.formatParams(nowDate, lastDate)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(`失败，错误信息:${err.message}`)
      })
    })
  }

  // 获取当月所有填报表
  static gethealthNowMonthMod(nowMonth, lastMonth) {
    return new Promise((resolve, reject) => {
      let sql = "select * from health where createtime between ? and ?"
      console.log(nowMonth, lastMonth);
      
      this.query(sql, this.formatParams(nowMonth, lastMonth)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(`失败，错误信息:${err.message}`)
      })
    })
  }

  // 获取所有填报表
  static getAllHealthMod() {
    return new Promise((resolve, reject) => {
      let sql = "select * from health"
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(`失败，错误信息:${err.message}`)
      })
    })
  }

  // 请假申请
  static setLeaveMod(u_id, reason, leavetype, starttime, endtime) {
    return new Promise((resolve, reject) => {
      let sql = "insert into `leave` (u_id,reason,leavetype,starttime,endtime,state) values (?,?,?,?,?,0)"
      this.query(sql, this.formatParams(u_id,reason, leavetype, starttime, endtime)).then(res => {
        resolve('提交请假成功')
      }).catch(err => {
        reject('提交请假失败'+err.message)
      })
    })
  }

  //我的通知分页获取数据与数量---数据
  static getNoticeMod(u_id, pageNum, currPage) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(currPage * pageNum)

    return new Promise((resolve, reject) => {
      let sql = "select * from notice where u_id="+u_id+" order by createtime desc limit ?,?"
      this.query(sql, this.formatParams(currPage, pageNum)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //我的通知分页获取数据与数量---数量
  static getNoticeTotal(u_id) {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from notice where u_id="+u_id
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //获取的我通知已读列表(供已读未读状态渲染)
  static getNoticeReadMod(u_id) {
    return new Promise((resolve, reject) => {
      // read是特殊单词，所以需要占位符 ``
      let sql = "select * from `read` where u_id= ?"
      console.log(u_id);

      this.query(sql, this.formatParams(u_id)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //已读转未读
  static goweiduMod(u_id, n_id) {
    // u_id = Number(u_id)
    // n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "delete from `read` where u_id = ? and n_id = ?"
      console.log(u_id);

      this.query(sql, this.formatParams(u_id, n_id)).then(res => {
        resolve("已读转未读成功")
      }).catch(err => {
        reject(`已读转未读失败:${err.message}`)
      })
    })
  }

  //未读转已读
  static goyiduMod(u_id, n_id) {
    u_id = Number(u_id)
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      // let sql = "delete from `read` where u_id = ? and n_id = ?"
      let sql = "insert into `read` (u_id, n_id) values (?,?)"
      this.query(sql, this.formatParams(u_id, n_id)).then(res => {
        resolve("未读转已读成功")
      }).catch(err => {
        reject("未读转已读失败")
      })
    })
  }

}