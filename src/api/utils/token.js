// 生成、验证token
const jwt = require('jsonwebtoken');
let privateKey = 'liyifeng';//秘钥
//生成
exports.create = (name,expiresIn = '1h') =>{
    // username: 用于加密的用户名
    // expiresIn: token有效期(单位: s)，默认2小时
    // privateKey：用于加密的私钥
    let token = jwt.sign({name},privateKey,{
        expiresIn
    });
    return token;
}
// 验证token
exports.verify = (token) =>{
    let res = false;
    try{
        res = jwt.verify(token,privateKey);//得出解密后的结果Object:{username:xxx...}
    }catch(err){
        res = false;
    }
    console.log(res);
    return res;
} 