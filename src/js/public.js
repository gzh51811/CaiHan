//登录页面的ajax
function Login(data){
    //发送ajax请求
    let xhr=new XMLHttpRequest();
    xhr.onload=()=>{
        if(xhr.status==200){
            // console.log(xhr.responseText);
            let res=xhr.responseText;
           console.log(res);
            if(res=='no'){
                alert('密码或者用户名不正确');
            }else{
                let user=strToObj(data);
                if($('.remember').is(":checked")){//勾选
                    // console.log(111)
                    localStorage.setItem('users',xhr.responseText);

                    let users = localStorage.getItem('users');
                    // console.log(users);
                    if(users.token){
                        //判断本地是否有token
                        let xhr = new XMLHttpRequest();
                        xhr.onload = () =>{
                            let result = JSON.parse(xhr.responseText);
                        }
                        xhr.open('post','/tokenverify',true);
                        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
                        xhr.send('token='+users.token)
                    }
                    // cookie.set('user',user.name,{path:'/'});
                        location.href='../index.html?';
                }else{//不勾选
                    sessionStorage.setItem('users',xhr.responseText);
                    let users = sessionStorage.getItem('users');
                }
                
            }
        }
    }
    xhr.open('post','/login',true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    xhr.send(data);
}
// function getItem(users){
//     let users = localStorage.getItem(users);
//     console.log(users);
// }
//用户名渲染封装
function showUsername(TokenVal){
    let ul=document.querySelector('.layui-layout-right');
    let user=ul.querySelectorAll('span')[0];
    // console.log(user);
    user.innerText=TokenVal;
}
//用户退出封装
function outUsername(outToken){
    //退出
    let outName = document.querySelector('.outName');
    outName.onclick = (e) =>{
            localStorage.removeItem('users');
            location.reload();
    }
}

function login(){
  //用户名登录渲染
  let users = localStorage.getItem('users');
  // console.log(JSON.parse(users).name);
  if(users){
    let _name=JSON.parse(users).name;
    showUsername(_name);
    //用户退出
    outUsername(_name);
  }else{
    location.href="login.html";
  }
}

//=========================
function  index(){
    $('.layui-logo').on('click',function(){
      location.href='../index.html';
    })
}

//============================================
// 通过cookie设置头部的用户名显示，
// 参数：cookieVal：用户名
// function showUsername(cookieVal){
//     let ul=document.querySelector('.layui-layout-right');
//     let user=ul.querySelectorAll('span')[0];
//     // console.log(user);
//     user.innerText=cookie;
// }
// //=====================ajax的封装===================
// //1.查询所有的商品分类
// //参数：show是要渲染页面的函数
// //      url:查询所有数据的路由
// function findAll(fn){
//      $.ajax({
//         type:'get',
//         url:'/category/_findAll',
//         data:{},
//         async:true,
//         success:function(str){
//             fn(str);
//         }
//      });   
// }


// //2.查询单条数据,再执行相应的操作
// //参数val:查询的值
// //      fun:data是函数要传到后端的值，是一个对象
// //      fun2:渲染数据结构的函数，在这里，所有渲染数据结构的函数名都是show
// function findOne(val,fun,data,fun2){
//     $.ajax({
//         type:'get',
//         url:'/category/_find',
//         data:{
//           category:val,
//         },
//         async:true,
//         success:function(str){
//           if(str=='1'){
//             fun(data,fun2);
//           }else{
//             alert('商品分类名已存在');
//           }
//         }
//     });
// }


// //3.增加数据（增加后渲染页面）
// //参数：data:商品分类的值,是一个对象,格式data={name:xiao,age:18}
// //      fun2:渲染数据结构的函数，在这里，所有渲染数据结构的函数名都是show
// //      url:查询所有数据的路由
//  function add(data,fun){

//        //ajax请求
//        $.ajax({
//           type:'get',
//           url:'/category/_add',
//           data:data,
//           async:true,
//           success:function(str){
//               // console.log(str);
//               // var res=JSON.parse(str);
//               if(str.n=='1'){
//                 //渲染页面
//                 findAll(fun);
//               }else{
//                 alert('增加失败');
//               }
//           }
//        });   
      
// }


// //修改数据
// //参数：data:修改前和修改后的值的集合，是一个对象
// //      fun:渲染数据结构的函数，在这里，所有渲染数据结构的函数名都是show
// //      url1:更新路由
// //      url2:查询所有数据的路由
// function update(data,fun){
//   $.ajax({
//     type:'get',
//     url:'/category/_update',
//     data:data,
//     async:true,
//     success:function(str){
//         // console.log(str);
//         // 更新成功，重新渲染
//         if(str.n==1){
//           findAll(fun);
//         }
//     }
//   });
// }


// //删除数据
// //参数：data:修改前和修改后的值的集合，是一个对象
// //      fun:渲染数据结构的函数，在这里，所有渲染数据结构的函数名都是show
// //      url:查询所有数据的路由
// function _delete(data,fun){
//     $.ajax({
//       type:'get',
//       url:'/category/_delete',
//       data:data,
//       async:true,
//       success:function(str){
//           // console.log(str);
//           // 删除数据
//           if(str.n==1){
//             // currentTr.remove();
//             findAll(fun);

//           }
//       }
//     });
// }
















