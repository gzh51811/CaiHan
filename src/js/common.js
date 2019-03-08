/*
    公共函数：经常使用的函数，大家都可以用，自己的库 
    
 */
/*
    getid(id) :通过id查找元素
    形参：
        id: id值
    
*/
function getid(id){
    return document.getElementById(id);
}
/*
 pullMenu(box, menu)
  参数：
    box ：外层节点
    memu ：隐藏的菜单节点
    用于二级菜单
 **/
function pullMenu(box,memu){
  //事件
  box.onmouseover=function(){
    memu.style.display='block';
  }
  box.onmouseout=function(){
    memu.style.display='none';
  }
}
/*
  过滤敏感词：filterTex(str)
  参数：
   * str 传字符串进来
   * 返回值： 过滤好的字符串

 */
function filterTex(str){
  //只要是直接可以发布留言不需要审核的内容，都应该过滤敏感词
  var sensitive=['傻B', '妈蛋', 'bitch', 'fuck', '操', '小学生', '反清复明'];
  for(var i=0;i<sensitive.length;i++){
    var reg=new RegExp(sensitive[i], 'gi');
    str=str.replace(reg, '***');
  }
  return str;//返回过滤后的数据
}
/*
  补零函数:toDB(num)
  参数：num数字
  返回值：小于10的补零返回

 */
function toDB(num){
  //补零操作
  if(num<10){
    return '0'+num;
  }else{
    return ''+num;
  }
}
/*
  秒转成时间：xx天xx时xx分xx秒   ：  -
  setTime(num)
    * 参数： 秒
    * 返回值： {}数据返回(灵活一点)
    
 */
function setTime(num) {
  //num是秒数    98876秒  有多少天： xx天xx时xx分xx秒
  var sec = toDB(num % 60); //06 秒
  var min = toDB(Math.floor(num / 60) % 60); //Math.floor(num / 60) % 60     分
  var hour = toDB(Math.floor(num / 60 / 60) % 24); //时
  var day = toDB(Math.floor(num / 60 / 60 / 24)); //天数

  return {
    secs: sec,
    mins: min,
    hours: hour,
    days: day
  }
}
function setTimeTo(num){
  //num是毫秒数
  var now=new Date(num);
  var year=toDB(now.getFullYear());
  var month=toDB(now.getMonth()+1);
  var day=toDB(now.getDate());
  var hour=toDB(now.getHours());
  var min=toDB(now.getMinutes());
  var sec=toDB(now.getSeconds());
  return {  
    years:year,
    months:month,
    days: day,
    hours: hour,
    mins: min,
    secs: sec
  }
}
//把字符串===>对象,字符串转数组，数组转对象
function strToObj(str){
    //字符串：key0=0&key1=1&key2=2
    var obj={};
    var arr1=str.split("&");
    //["key0=0", "key1=1", "key2=2"]
    arr1.forEach(function(item){
        var arr2=item.split("=");
        //["key0", "0"]
        obj[arr2[0]]=arr2[1];//键值对
    })
    return obj;
}
//把对象===>字符串
/* 比如给你一个对象：
        {
            name ： 'laoxie',
            age : 18
        }
        得到：
        new Array()name=laoxie&age=18
             */
function ObjTostr(obj){
    var str='';
    for(var key in obj){
        str+=key+'='+obj[key]+'&';
    }
     var str1=str.slice(0,-1);
     return str1;
}
/*
居中弹窗,并控制窗体的大小

 */
function selfAlert(div,a,b){
  var box=document.createElement('box');
  div.style.display='block';
  div.style.width=a+'px';
  div.style.height=b+'px';
  div.style.left=(window.innerWidth-div.offsetWidth)/2+'px';
  div.style.top=(window.innerHeight-div.offsetHeight)/2+'px';
  return div;
}
/*
  表单验证的方法： 调用里面的子功能  (json对象里面有很多子功能)
  var checkReg = {
    tel : function() {}
  }
  
  调用方法：
  checkReg.tel();
  
*/
var checkReg={
  tel:function(str){
    var reg=/^1[3-9]\d{9}$/;
    return reg.test(str);//布尔值
  },
  email:function(str){
    //1299091267@qq.com
    var reg=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(str);
  },
  idcard:function(str){
    var reg=/^\d{15}|\d{17}[\dXx]$/;
    return reg.test(str);
  },
  name:function(str){
    //账号字母开头,6-20位
    var reg=/^[a-zA-Z][\w\-]{5,19}$/;
    return reg.test(str);
  },
  birthday:function(str){
    //格式是1995-06-09
    var reg = /^((((19|20)\d{2})-(0?[13-9]|1[012])-(0?[1-9]|[12]\d|30))|(((19|20)\d{2})-(0?[13578]|1[02])-31)|(((19|20)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))-0?2-29))$/;
    return reg.test(str);
  },
  psweasy:function(str){
    //6-18位首字母开头
    var reg = /^[a-zA-Z]\w{5,17}$/;
    return reg.test(str);
  },
  pswagain:function(str1,str2){
    return str1===str2;//全等 恒等
  },
  nickname:function(str){
    //2到6个字的中文(昵称)
    var reg=/^[\u2E80-\u9FFF]{2,6}$/;
    return reg.test(str);
  }
}
/*
  cookie的相关操作：var cookie = {}
  子功能：
    存 ：set
    取：get
    删：remove
    
 */

var cookie = {
  set: function(name, value, prop) {
    //name和value是必写参数。prop是json格式的数据
    var str = name + '=' + value; //必写的

    //prop
    //expires:设置失效时间
    if(prop.expires) {
      str += ';expires=' + prop.expires.toUTCString(); //把时间转成字符串 toUTCString
    }
    //prop.path :设置路径
    if(prop.path) {
      str += ';path=' + prop.path;
    }
    //设置访问权限domain
    if(prop.domain) {
      str += ';domain=' + prop.domain;
    }

    //设置：存
    document.cookie = str;

  },
  get: function(key) {
    //获取
    var str = document.cookie; //name=jingjing; psw=123456
    var arr = str.split('; '); //[name=jingjing , psw=123456]
    for(var i = 0; i < arr.length; i++) {
      var arr2 = arr[i].split('='); //[name,jingjing] [psw,123456]
      if(key == arr2[0]) {
        return arr2[1]; //通过键名取键值
      }
    }
  },
  remove: function(key,path) {
    //cookie:设置时间失效，设置时间为过去的某个时间
    var now = new Date();
    now.setDate(now.getDate() - 1); //设置成昨天
    cookie.set(key, '', {
      expires: now,
      path:path,
    });
  }
}
/*
  设置和获取行内样式：css(节点,'width','40px') 设置样式  css(节点，'color') 获取样式
  两个个参数：获取行内样式
  三个参数：设置样式
*/
function css(){
  //设置样式：设置行内的样式
  if(arguments.length==2){
    return arguments[0].style[arguments[1]];
  }if(arguments.length==3){
    return arguments[0].style[arguments[1]]=arguments[2];
  }
}
/*
  getstyle(obj,name)
  参数： 
  obj:对象名
  name ：要获取的样式属性名
  返回：样式值
*/
function getStyle(obj,name){
  if(getComputedStyle(obj,false)){
    //主流  IE9+
    return getComputedStyle(obj,false)[name];
  }else{
    //IE8-
    return obj.currentStyle(name);
  }
}

/*
  运动框架封装：startMove()过渡    jq animate()
  最终版：多对象，多属性，链式运动框架(运动队列)
  参数一：对象名
  参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
  参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

  clearInterval(obj.timer); //防止定时器叠加
  obj.timer = setInterval(function() {

    var istrue = true;

    //1.获取属性名，获取键名：属性名->初始值
    for(var key in json) {
      //      console.log(key); //width heigth opacity
      var cur = 0; //存初始值

      if(key == 'opacity') { //初始值
        cur = getStyle(obj, key) * 100; //透明度
      } else {
        cur = parseInt(getStyle(obj, key)); //width heigth borderwidth px为单位的

      }

      //2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
      //距离越大，速度越大,下面的公式具备方向
      var speed = (json[key] - cur) / 6;
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

      if(cur != json[key]) { //width 200 heigth 400
        istrue = false; //如果没有达到目标值，开关false
      } else {
        istrue = true; //true true
      }

      //3、运动
      if(key == 'opacity') {
        obj.style.opacity = (cur + speed) / 100;
        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
      } else {
        obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
      }

    }

    //4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
    if(istrue) { //如果为true,证明以上属性都达到目标值了
      clearInterval(obj.timer);
      if(fnend) {
        fnend();
      }
    }

  }, 30); //obj.timer 每个对象都有自己定时器

}
/*
     1）、开定时器，让图片运动：旧图挪走，新图进入可视区
     2）、点击上下按钮：可以切换下一张和上一张
     3）、焦点跟随，点击焦点可以切到对应的图片

 */
function lunbo(ele,clsn){
    var box=getid(ele);//最外层节点
    var ul=box.children[0];
    var lis=ul.getElementsByTagName('li');
    // var lis=box.children[0].children;//找不到
    var iW=lis[0].offsetWidth;
    var light=box.getElementsByClassName('light')[0];
    var spans=light.getElementsByTagName('span');
    
    var prevBtn=box.getElementsByClassName('prev')[0];
    var nextBtn=box.getElementsByClassName('next')[0];
    // console.log(light,spans,iW);
    //1.所有的图片放在右侧，第一张放在可视区
    for(var i=0;i<lis.length;i++){
        css(lis[i],'left',iW+'px');
    }
    css(lis[0],'left',0);
    //2.开定时器，让图片自动轮播：旧图挪走，新图进入可视区
    var num=0;//可视区的图片下标
    var timer=null;
    var next=function(){
        //旧图挪走
        startMove(lis[num],{'left':-iW});
        //临界值判断
        num=++num>=lis.length?0:num;
        //新图进入可视区
        startMove(lis[num],{'left':0});
        //快速把新图放在右侧：不需要过渡
        css(lis[num],'left',iW+'px');
        // startMove(lis[num],{'left':0});
        spanNow();
    }
    //焦点跟随
    function spanNow(){
        //排他
        for(var i=0;i<spans.length;i++){
            spans[i].className='';
        }
        spans[num].className=clsn;
    }
    timer=setInterval(next, 2000);
    //鼠标进入可视区，停止定时器，移开又开始自动轮播
    slideimg.onmouseover=function(){
        clearInterval(timer);
    }
    slideimg.onmouseout=function(){
        clearInterval(timer);
        timer=setInterval(next, 1000);
    }
    //3.点击上下按钮：可以切换下一张和上一张
    //下一张
    //防止傻瓜操作行为 : 两次点击的时间太短，500毫秒内，就视为无效
    var old=new Date();
    nextBtn.onclick=function(){
        if(new Date()-old>500){//新旧时间差间隔
             next();
        }
       old=new Date();
    }
    //上一张
    prevBtn.onclick=function(){
        prev();
    }
    function prev(){
         //旧图挪走
        startMove(lis[num],{'left':-iW});
        //临界值判断(重点)
        num=--num<0?lis.length-1:num;
        //新图进入可视区
        startMove(lis[num],{'left':0});
        //快速把新图放在右侧：不需要过渡
        css(lis[num],'left',iW+'px');
        // startMove(lis[num],{'left':0});
        spanNow();
    }
    //4.点击焦点可以切到对应的图片(重点)
    for(var i=0;i<spans.length;i++){
        //添加自定义属性
        spans[i].index=i;
        spans[i].onclick=function(){
            console.log(this.index);
            if(num<this.index){//当点击的对象比当前的对象的索引大时
                //新图从右侧切入可视区
                //旧图移走
                startMove(lis[num],{'left':-iW});
                //新图移到可视区右侧
                css(lis[this.index],'left',iW+'px');
                //新图移到可视区
                startMove(lis[this.index],{'left':0});
                num=this.index;//新图进入到可视区后，变旧图
                spanNow();
            }
            if(num>this.index){
                //新图从左侧切入可视区
                //旧图移走
                startMove(lis[num],{'left':iW});
                //新图移到可视左测区域
                css(lis[this.index],'left',-iW+'px');   
            }
            //新图移到可视区
                startMove(lis[this.index],{'left':0});
                num=this.index;//新图进入到可视区后，变旧图
                spanNow();
        }
    }

}
/*
  ajax(method,url,data,fn)
  参数一：请求方式   get  和  post
  参数二：路径
  参数三：数据   name=malin&psw=12345
  参数四：成功的回调    回调函数
*/
function ajax(method,url,data,fn){
  //1.创建对象
  var xhr=new XMLHttpRequest();
  //告诉对象，你要什么
  if(method=='get'&&data){
    url=url+'?day='+new Date()+'&'+data;
  }
  xhr.open(method,url,true);
  //2.发送请求
  if(method=='get'){
    xhr.send(null);
  }else{
    //设置请求头
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send(data);
  }
  //3.3号线去后台制作
  //4.号线。接收数据，做渲染
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      if(xhr.status==200){
        //个性需求
        if(fn){
          fn(xhr.responseText);//实参
        }
      }else{
      alert('出错了，因为：' + xhr.status);//404找不到
      }
    }
  }
}
// ==========================jq的封装函数========================//
//========================封装函数================//
    //功能：1.选项卡功能
    //参数a:鼠标划过的对象
    //参数b:显示的内容
    function tab(a,b){
        $(a).on('mouseover',function(){
            // console.log($(this));
            // 排他
            $(a).removeAttr('class');
            $(b).css('display','none');
            $(this).attr('class','active');
            // console.log($(this).index());
            $(b).eq($(this).index()).css('display','block');
        });
    }
    function tab1(a,b){
        $(a).on('mouseover',function(){
            // console.log($(this));
            // 排他    
            $(b).css('display','none');
            // console.log($(this).index());
            $(b).eq($(this).index()).css('display','block');
        }).on('mouseout',function(){
            $(b).eq($(this).index()).css('display','none');
        });
    }
    // 功能：2.二级菜单的出现和隐藏
    // 参数：a,划过的元素
    //       b,显示的元素
    // ===========二级菜单==========//
    function twoMeun(a,b){
        $(a).on('mouseenter',function(){
            $(b).css('display','block');
        }).on('mouseleave',function(){
            $(b).css('display','none');
        });
    }
    // 功能：3.三级菜单：二级菜单+tab切换
    // 参数：a,划过的元素
    //       b,显示的元素
     function ThereMenu(a,b){
        $(a).on('mouseover',function(){
            $(b).css('display','block');
            //选项卡
            $(b).css('display','none');
            $(a).removeAttr('class');
            $(b).eq($(this).index()).css('display','block');
            $(this).attr('class','active');
        }).on('mouseout',function(){
             $(b).css('display','none');
             $(this).removeAttr('class');
        });
    }
