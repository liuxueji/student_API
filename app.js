const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser');
// 使用中间件
app.use(bodyParser.json()) // 支持 json 格式
// 使用第三方插件 qs 来处理
app.use(bodyParser.urlencoded({
  extended: true
}))
// 跨域
app.use(cors())

// 导入并使用路由模块
const users = require('./router/user')
const admin = require('./router/admin')
const student = require('./router/student')

app.use('/users', users)
app.use('/admin', admin)
app.use('/student', student)

app.listen(3007, () => {
  console.log("server running")
})