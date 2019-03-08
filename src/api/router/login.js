const Router=require('koa-router');

const db=require('../db');

const token = require('../utils/token');
//创建路由
var router=new Router();
//定义登录路由
router.post('/',async(ctx,next)=>{
    //测试
    // ctx.body='登录路由';
    // 打印前端传过来的数据
    // console.log(ctx.request.body);
    let {name,password,identity}=ctx.request.body;
    let res=await db.find('user',{name,password});
    //  console.log(res);
    if(res.length>0){
   // 登录成功：发令牌
    let _token = token.create(name);
        ctx.body={
            name:name,
            token:_token
        };
    }else{
        ctx.body='no';
    }
});


//暴露接口
module.exports=router;