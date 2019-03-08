const Router=require('koa-router');
//创建路由
var router=new Router();
const db = require('../db');
//定义订单路由
router.get('/',async(ctx,next)=>{
    //测试
    // ctx.body='订单路由';
    // let {name,id} = ctx.query;
    let res = await db.find('orderList',{});
    // console.log(res);
    ctx.body=res;
});
router.post('/',async(ctx,next)=>{
    // ctx.body = '接收数据'
    let {id} = ctx.request.body;
    // console.log(id)
    let res1 = await db.delete('orderList',{'id':id});
    // ctx.body =res;
})

//暴露接口
module.exports=router;