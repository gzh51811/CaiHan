const Koa=require('koa');
const Router=require('koa-router');
const koaBody=require('koa-body');

var router=new Router();

//引入每个页面的路由
const categoryRouter=require('./category.js');
const goodsRouter=require('./goods.js');
const loginRouter=require('./login.js');
const orderRouter=require('./order.js');
const userRouter=require('./user.js');
const path = require('path');

//要接收前端的信息一定要有这种格式的输出
router.use(koaBody({
    // 支持formdata
    multipart:true,

    // 文件支持
    formidable:{
        // 指定保存路径
        uploadDir:'./uploads',
        keepExtensions:true,
        // 改文件名
        onFileBegin(filename,file){
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
            var extName = path.extname(file.name);

            file.path = './uploads/' + filename + Date.now() + extName;
        }
    }
}));

//定义各个html页面的路由
//关于列表的路由
router.use('/category',categoryRouter.routes());
//关于商品的路由
router.use('/goods',goodsRouter.routes());
//关于登录的路由
router.use('/login',loginRouter.routes());
//关于订单的路由
router.use('/order',orderRouter.routes());
//关于商品分类的路由
router.use('/user',userRouter.routes());

//暴露接口
module.exports=router;