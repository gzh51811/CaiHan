const Router=require('koa-router');
const db=require('../db');
//与数据库默认的_id进行匹配
var ObjectID=require('mongodb').ObjectID;
//创建路由
var router=new Router();

//定义商品分类路由
//定义商品分类查询的路由
router.get('/_find',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    // console.log(ctx.query);
    let {category}=ctx.query;
    let res=await db.find('category',{category});
    // console.log(res);
    if(res.length>0){
        ctx.body='0';//不合要求
    }else{
        ctx.body='1';//符合要求
    }
});
//定义商品分类增加的路由
router.get('/_add',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    // console.log(ctx.query);
    let {category}=ctx.query;
    let res=await db.insert('category',{category,regtime:Date.now()});
    ctx.body=res;
    // console.log(res);

});
//定义商品分类查找所有的路由
router.get('/_findAll',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    // console.log(ctx.query);
    // let {category}=ctx.query;
    var res3=await db.find('category',{});
    ctx.body=res3;
    // console.log(res3);
    
});

//定义商品分类修改的路由
router.get('/_update',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    // console.log(ctx.query);
    let {_id,category}=ctx.query;
    // console.log(new ObjectID(_id));
    let res=await db.update('category',{"_id":new ObjectID(_id)},{$set:{category}});
    ctx.body=res;
    // console.log(res);

});
//定义删除单条数据的路由
router.get('/_delete',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    // console.log(ctx.query);
    let {_id}=ctx.query;
    let res=await db.delete('category',{"_id":new ObjectID(_id)});
    ctx.body=res;
    // console.log(res);

});
//暴露接口
module.exports=router;