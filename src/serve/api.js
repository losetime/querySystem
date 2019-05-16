const express=require('express');
const db=require('./db');
const router=express.Router();

//返回统一格式
var responseData;

router.use(function(req,res,next){
    responseData={
        code:0, //错误代码
        message:''
    }
    next();
});

// populate(['BasePlate', 'HellsPlate','UnderBoar','BoltGap']).
router.get('/api/main/content', function (req, res) {
    db.Content.find().populate(['hellsplate']).then((contents)=> {
        console.log(contents)
        responseData.data = contents;
        responseData.message='获取成功';
        res.json(responseData);
    })
    // db.Content.aggregate([
    //     {
    //       $lookup:
    //         {
    //            from: "BoltGap", // 需要关联的表
    //            localField: "_id", // product 表需要关联的键
    //            foreignField: "b1`y", // orders 的 matching key
    //            as: "inventory_docs" // 对应的外键集合的数据
    //          }
    //    }
    // ]).then((contents)=> {
    //     console.log(contents)
    //     responseData.data = contents;
    //     responseData.message='获取成功';
    //     res.json(responseData);
    // })
})






//登录
router.post('/api/admin/signin',function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    db.User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        //用户名是否正确
        if(!userInfo){
        responseData.code=1;
        responseData.message="用户名或密码错误";
        //通过res.json返回数据
        res.json(responseData);
        return;
        }
        responseData.message="登录成功";
        responseData.userInfo=userInfo;
        res.json(responseData);
        res.cookie('userId',userInfo._id,{
            path:'/',
            maxAge:1000*60*60
        });
        // req.session.user=userInfo;
    })
});
//登出
router.post('/api/admin/logout',function(req,res,next){
    res.cookie('userId','',{
        path:'/',
        maxAge:-1
    });
    responseData.message="退出成功";
    res.json(responseData);
})
//注册
router.post('/api/admin/register',function(req,res,next){
    var username=req.body.username;
    var password=req.body.password;
    db.User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){
        //如果有这个用户
        if( !userInfo ){
            new db.User({
                username:username,
                password:password
            }).save().then(function(newUserInfo){
                responseData.data=newUserInfo;
                responseData.message='注册成功';
                res.json(responseData);
            });
        }else{
            responseData.code=2;
            responseData.message="该用户已经存在！";
            //通过res.json返回数据
            res.json(responseData);
            return;
        }
    })
})
//用户编辑
router.post('/api/admin/editUser',function(req,res,next){
    var id=req.body.userId || '';
    var username=req.body.username;
    var password=req.body.password;
    var isAdmin=req.body.isAdmin;
    db.User.update({
        _id:id
    },{
        username:username,
        password:password,
        isAdmin:isAdmin
    }).then(()=>{
        db.User.find().then((newUser)=>{
            responseData.data=newUser;
            responseData.message='保存成功';
            res.json(responseData);
        })
    })
})
//删除用户
router.post('/api/admin/delUser',function(req,res){
    var id=req.body.id || '';
    db.User.remove({
        _id:id
    }).then(function(){
        db.User.find().then((newUser)=>{
            responseData.data=newUser;
            responseData.message='删除成功';
            res.json(responseData);
        }) 
    })
})
//获取文章分类
router.get('/api/admin/categorieList',function(req,res,next){
    db.Category.find().then((categorieList)=>{
        responseData.data=categorieList;
        responseData.message='获取成功';
        res.json(responseData);
    })
})
//删除文章分类
router.post('/api/admin/delCategory',function(req,res){
    var id=req.body.id || '';
    db.Category.remove({
        _id:id
    }).then(function(){
        db.Category.find().then((category)=>{
            responseData.data=category;
            responseData.message='删除成功';
            res.json(responseData);
        })
    })
})
//修改文章分类
router.post('/api/admin/editCategory',function(req,res){
    var id=req.body.categoryId || '';
    var classify=req.body.classify;
    var name=req.body.name;
    db.Category.update({
        _id:id
    },{
        name:name,
        classify:classify
    }).then(function(){
        db.Category.find().then((newCategory)=>{
            responseData.data=newCategory;
            responseData.message='保存成功';
            res.json(responseData);
        })
    })
})
//添加文章分类
router.post('/api/admin/addCategory',function(req,res){
    var name=req.body.name || "";
    var classify=req.body.classify || "";
    //数据库中是否有同名分类
    //$or 多种条件查找 
    db.Category.findOne({"$or":[{name:name},{classify:classify}]}).then(function(rs){
        if(rs){//数据库已有该分类
            responseData.code=2;
            responseData.message='已有相同分类或者相同序号';
            res.json(responseData);
            return Promise.reject();//返回一个被拒绝的Promise 
        }else{//数据库不存在，可以保存
            return new db.Category({
                name:name,
                classify:classify
            }).save();
        }
    }).then(function(){
        db.Category.find().then((newCategory)=>{
            responseData.data=newCategory;
            responseData.message='添加文章分类成功';
            res.json(responseData);
        })
    })
})
//获取全部文章
router.get('/api/admin/articleList', function (req, res) {
    db.Content.find().populate(['category', 'user']).then(function (contents) {
        responseData.data = contents;
    }).then(()=>{
        db.Category.find().then((category)=>{
            responseData.category=category;
            responseData.message = '保存成功';
            res.json(responseData);
        });
    })
})
//删除文章
router.post('/api/admin/delArticle',function(req,res,next){
    let id=req.body.id;
    db.Content.remove({
        _id:id
    }).then(()=>{
        db.Content.find().populate(['category','user']).then((contents)=>{
            responseData.data=contents;
            responseData.message="删除成功";
            res.json(responseData);
        })
    })
})

//修改文章
router.post('/api/admin/editContent',function(req,res,next){
    let contentId=req.body.contentId;
    let categoryId=req.body.categoryId;
    let title=req.body.title;
    let content=req.body.content;
    let description=req.body.description;
    db.Content.update({
        _id:contentId
    },{
        category:categoryId,
        title:title,
        description:description,
        content:content
    }).then(()=>{
        db.Content.find().populate(['category','user']).then((contents)=>{
            responseData.data=contents;
            responseData.message="修改成功";
            res.json(responseData);
        })
    })
})
//添加文章
router.post('/api/admin/addContent',function(req,res,next){
    let categoryId=req.body.categoryId;
    let userId=req.body.userId;
    let title=req.body.title;
    let content=req.body.content;
    let description=req.body.description;
    db.Content.findOne({
        category:categoryId,
        title:title
    }).then((oldContent)=>{
        if(!oldContent){
            db.Content({
                user:userId,
                category:categoryId,
                title:title,
                content:content,
                description:description
            }).save().then(()=>{
                db.Content.find().populate(['category', 'user']).then((newContents)=>{
                    responseData.data=newContents;
                    responseData.message="添加文章成功";
                    res.json(responseData);
                })
            })
        }else{
            responseData.code=1;
            responseData.message="该分类下已有相同题目，请修改";
            res.json(responseData);
        }
    })
    
})
//提交评论
router.post('/api/admin/comments',function(req,res){
    let contentId=req.body.contentId;
    let data={
        username:req.body.user,
        postTime:new Date(),
        content:req.body.comments
    }
    db.Content.findOne({
        _id:contentId
    }).then((content)=>{
        content.comments.push(data);
        return content.save();
    }).then((newContent)=>{
        responseData.data=newContent;
        responseData.message='发表成功';
        res.json(responseData);
    })
})
//阅读加1
router.post('/api/admin/view',function(req,res){
    let contentId=req.body.id;
    db.Content.findOne({
        _id:contentId
    }).then((content)=>{
        content.views+=1;
        return content.save();
    }).then((newContent)=>{
        responseData.data=newContent;
        res.json(responseData);
    })
})
module.exports=router;