// Schema、Model、Entity或者Documents的关系请牢记，Schema生成Model，Model创造Entity，Model和Entity都可对数据库操作造成影响，但Model比Entity更具操作性。
var mongoose=require('mongoose');

// 连接数据库 如果不自己创建 默认数据库会自动生成
mongoose.connect('mongodb://127.0.0.1:27017/blog');
// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));

/************** 定义模式Schema **************/
//用户的表结构
const usersSchema = new mongoose.Schema({
    //用户名
    username:String,
    //密码
    password:String,
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
})
//内容的表结构
const contentsSchema = new mongoose.Schema({
    //公称直径DN
    diameter: {
        type:String,
        default:0
    },
    //允许载荷Q/KN
    allowLoad:{
        type:String,
        default:0
    },
    //鞍式支座高度h
    supportH:{
        type:String,
        default:0
    },
    //关联字段底板
    baseplate:{
        l1:String,
        b1:String,
        δ1:String
    },
    //腹板
    abdomenBoard: {
        type:String,
        default:0
    },
    //关联字段筋板
    hellsplate:{
        l3:String,
        b2:String,
        b3:String,
        δ3:String
    },
    //关联字段垫板
    underboard:{
        arcLength:String,
        b4:String,
        δ4:String,
        e:String
    },
    //关联字段螺栓间距
    boltgap:{
        l2:String,
        d:String,
        m:String,
        l:String
    },
    //鞍式支座质量
    supportWeight: {
        type:String,
        default:0
    },
    //增加100mm高度增加的质量/kg
    addHeight: {
        type:String,
        default:0
    }
})
/************** 定义模型Model **************/
const Models={
    User: mongoose.model('User',usersSchema),
    Content:mongoose.model('Content',contentsSchema)
}

module.exports=Models;