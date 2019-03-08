const Router=require('koa-router');
const db=require('../db');
//与数据库默认的_id进行匹配
var ObjectID=require('mongodb').ObjectID;

const multer = require('multer');
const fs=require('fs');

//创建路由
var router=new Router();
//查找所有
router.get('/_findAll',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
   var res3=await db.find('goods',{});
   ctx.body=res3;
   // console.log(res3);
});
//根据id查找
router.post('/All',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    let {_id}=ctx.request.body;
   var res4=await db.find('goods',{"_id":new ObjectID(_id)});
   ctx.body=res4;
   // console.log(res3);
});
router.post('/_All',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    let {_id,now_price,stock}=ctx.request.body;
   var res5=await db.update('goods',{"_id":new ObjectID(_id)},{$set:{now_price,stock}});
   ctx.body=res5;
   console.log(res5);
});
//定义删除单条数据的路由
router.get('/_delete',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    // console.log(ctx.query);
    let {_id}=ctx.query;
    let res=await db.delete('goods',{"_id":new ObjectID(_id)});
    ctx.body=res;
    // console.log(res);

});

//定义增加单条数据的路由
router.get('/_add',async(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    // console.log(ctx.query);
    let {name,category,before_price,now_price,stock,introduce,img1}=ctx.query;
    let res=await db.insert('goods',{name,category,before_price,now_price,stock,introduce,img1,data:Date.now()});
    ctx.body='上传图片成功';

});
//删除多条
router.post('/del',async(ctx,next)=>{
    // ctx.body = '接收数据'
    let {_id} = ctx.request.body;
    // console.log(_id)
    let res1 = await db.delete('goods',{"_id":new ObjectID(_id)});
    // ctx.body =res;
})
//图片上传
router.post('/upload',(ctx,next)=>{
    //测试,返回前端的数据
    // ctx.body='商品分类路由';
    // 打印前端传过来的数据
    const {file} = ctx.request.files; 
    // const file = ctx.request.files.images; 
    // console.log(file.path);
    let imagename=file.path;

    // console.log(imagename);
    // ctx.body='上传图片成功';
    ctx.body = {
        code: 0,
        imagename: imagename,
        msg: '上传成功'
    };
});
//暴露接口
module.exports=router;