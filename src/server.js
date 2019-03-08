// 静态资源服务器
const  Koa=require('koa');
const static=require('koa-static');

//引入路由
const routers=require('./api/router/index.js');
//创建koa应用
const app=new Koa();//app.context

//连接数据库
app.context.myname='yiguo';

//创建静态资源服务器
app.use(static('./'));

// 处理status为404或null时，完善response信息
app.use(routers.allowedMethods());
app.use(routers.routes());


//监听端口
app.listen(10086,()=>{
    console.log('server is running on http://localhost:10086');
});
















