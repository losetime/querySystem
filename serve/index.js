//应用程序启动文件（入口）

//引入编号的API
var api=require('./api');
//引入文件模块
var fs=require('fs');
//引入处理路径的模块
var path=require('path');
//加载express模块
var express =require('express');
//加载中间件body-parser,用来处理前端提交过来的数据
var bodyParser=require('body-parser');
//加载cookie
var cookieParser=require('cookie-parser');
//创建app服务
var app=express();
//设置静态文件托管
//当用户访问的url为/public,那么返回对应路径下的文件
app.use('/public',express.static(__dirname+'/public'));
//body-parser设置,.urlencoded是处理url的方法，也可以设置post，json等格式，后边是extended是参数
app.use(bodyParser.json());
//设置后会在req参数里增加这样一个属性
app.use(bodyParser.urlencoded({extended:true}));
app.use(api);

// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, '../dist')));

// 因为是单页应用 所有请求都走/dist/index.html
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
});

app.listen(3000,function(){
    console.log('成功，请访问端口3000');
});


//用户发送http请求 =》url =》解析路由 =》找到匹配的规则 =》制定绑定的函数，返回对应内容至用户

// /public=>静态，直接返回指定目录下的文件

// 路由方式 =》一般属于动态，加载业务逻辑，加载模版，解析模版，返回数据给用户 

