const Router=require('koa-router');
//与数据库默认的_id进行匹配
var ObjectID = require('mongodb').ObjectID;
//创建路由
var router=new Router();
const db = require('../db');
//定义用户路由
router.get('/all',async(ctx,next)=>{
    //测试
    // ctx.body='用户路由';
    let res = await db.find('user',{});
    // console.log(res)
    ctx.body = res;
});
router.post('/del',async(ctx,next)=>{
    // ctx.body = '接收数据'
    let {_id} = ctx.request.body;
    // console.log(_id)
    let res1 = await db.delete('user',{"_id":new ObjectID(_id)});
    ctx.body ='删除成功';
})
router.get('/check',async(ctx,next)=>{
    let {name} = ctx.query;
    let resCheck = await db.find('user',{name});
    // console.log(resCheck);
    if(resCheck.length>0){
        ctx.body = 'no'//用户名不存在
    }else{
        ctx.body = 'yes'//用户名存在
    }
})
router.post('/add',async(ctx,next)=>{
   let {name,password,identity,sex} = ctx.request.body;
   let data={name,password,identity,sex,regtime:Date.now()};
   let resAdd = await db.insert('user',data);
   ctx.body =resAdd;
})

//查找用户的身份
router.get('/_find',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    // console.log(ctx.query);
    let {name}=ctx.query;
    let res=await db.find('user',{name});
    
    ctx.body=res[0].identity;
});
//暴露接口
module.exports=router;