module.exports = class users_model extends require('./model') {
  //据用户类型与查询字段模糊查询获得，分页获取数据
  static getUsersByTypeAndCharMod(type, inputText, CharType, currPage, pageNum) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(pageNum * currPage)

    return new Promise((resolve, reject) => {
      let sql = "select * from users where " + CharType + " like '%" + inputText + "%' and type = " + type + " order by modifytime desc LIMIT ?,?"
      console.log(sql);

      this.query(sql, this.formatParams(currPage, pageNum)).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //据用户类型与查询字段模糊查询获得，获取数据
  static getUsersByTypeAndCharTotal(type, inputText, CharType) {

    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from users where " + CharType + " like '%" + inputText + "%' and type = " + type
      console.log(sql);
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 获取该老师所属学生的全部请假单与数量(分页查询)--全部请假单
  static getLeaveMod(currPage, pageNum) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(currPage * pageNum)

    return new Promise((resolve, reject) => {
      let sql = "select * from `leave` order by createtime desc limit " + currPage + " , " + pageNum
      console.log(sql);
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject("您的学生没有请假")
      })
    })
  }

  // 获取该老师所属学生的全部请假单与数量(分页查询)--全部数量
  static getLeaveTotal() {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from `leave`"
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject("您的学生没有请假")
      })
    })
  }

  // 获取该用户请假审批与数量(分页)--请假审批
  static getuserLeaveMod(u_id, currPage, pageNum) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(currPage * pageNum)

    return new Promise((resolve, reject) => {
      let sql = "select * from `leave` where u_id= ? order by createtime desc limit ?,?"
      this.query(sql, this.formatParams(u_id, currPage, pageNum)).then(res => {
        resolve(res)
      }).catch(err => {
        reject("你没有请假记录")
      })
    })
  }

  // 获取该用户请假审批与数量(分页)--请假审批数量
  static getuserLeaveTotal(u_id, currPage, pageNum) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(currPage * pageNum)

    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from `leave` where u_id= ?"
      this.query(sql, this.formatParams(u_id)).then(res => {
        resolve(res)
      }).catch(err => {
        reject("你没有请假记录")
      })
    })
  }

  // 对请假条进行审批
  static upLeaveStateMod(l_id, upState) {
    return new Promise((resolve, reject) => {
      let sql = "update `leave` set state = ? where l_id=?"
      this.query(sql, this.formatParams(upState, l_id)).then(res => {
        resolve('审批成功')
      }).catch(err => {
        reject("审批失败" + err.message)
      })
    })
  }

  //发布通知
  static announceMod(u_id, title, content) {
    return new Promise((resolve, reject) => {
      let sql = "insert into `notice` (u_id,title,content) values (?,?,?)"
      this.query(sql, this.formatParams(u_id, title, content)).then(result => {
        resolve("发布成功")
      }).catch(err => {
        console.log(`发布错误：${err.message}`)
        reject("发布错误")
        reject(err)
      })
    })
  }

  //分页获取所有通知与数量---数据
  static getAllNoticeMod(pageNum, currPage) {
    pageNum = Number(pageNum)
    currPage = Number(currPage)
    currPage = Number(currPage * pageNum)
    return new Promise((resolve, reject) => {
      let sql = "select * from `notice` order by createtime desc LIMIT ?,?"
      this.query(sql, this.formatParams(currPage, pageNum)).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  //分页获取所有通知与数量---数量
  static getAllNoticTotal() {
    return new Promise((resolve, reject) => {
      let sql = "select count(1) as count from notice"
      this.query(sql).then(result => {
        resolve(result)
      }).catch(err => {
        reject(err)
      })
    })
  }

  // 当前通知删除功能(同时清空该通知的被阅读记录)
  static delNoticeMod(n_id) {
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "delete from `notice` where n_id=" + n_id
      this.query(sql).then(res => {
        resolve("删除通知数据成功")
      }).catch(err => {
        reject("删除通知数据失败")
      })
    })
  }
  static delReadMod(n_id) {
    n_id = Number(n_id)
    return new Promise((resolve, reject) => {
      let sql = "delete from `read` where n_id=" + n_id
      this.query(sql).then(res => {
        resolve("删除阅读数据成功")
      }).catch(err => {
        reject("删除阅读数据失败")
      })
    })
  }

  // 根据id查找用户信息
  static getUserByIdMod(id) {
    id = Number(id)
    return new Promise((resolve, reject) => {
      let sql = "select * from `users` where id=" + id
      this.query(sql).then(res => {
        resolve(res)
      }).catch(err => {
        reject("获取用户失败")
      })
    })
  }
}