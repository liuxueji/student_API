// 安全拦截器
const jwt = require("jsonwebtoken");
// 验证权限
function verify (token,secretkey,success,error){
    jwt.verify(token,secretkey,function(err,decode){
        if(err){
            if (error) {
                error(err);
            }
        }else{
            if (success) {
                success(decode);
            }
        }
    })
}


// 签名
function sign (load,secretkey,expiresIn) {
    var token = jwt.sign(load,secretkey,{expiresIn: expiresIn});
    return token;
}


// 异步转同步
 function   verifysync (token,secretkey){
    return   new Promise((resolve,reject)=>{
        jwt.verify(token,secretkey,function(err,decode){
            if (err) {
                console.log(err.message);
                resolve({err:'error',msg:'绘画已过期'})
            }else{
                console.log("解密成功")
                resolve(decode)
            }
        })

    })

}

module.exports = {verify,sign,verifysync};


/*//使用解密
let user={id:111,name:'user',password:123456};
/!*
//q清空密码
delete user.password;
let token=sign(user,'123456',10);*!/
//解密
let token=sign(user,'123456',10);
verify(token,"123456",function (user) {
    console.log(user);
},function (err) {
    console.error(err)
    }
)
console.log(token);*/


/*verify(token,'123456',function (user) {
    console.log(user)
},function (err) {
    console.error(err);
})*/


