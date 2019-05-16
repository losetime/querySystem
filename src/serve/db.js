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
//底板的表结构
const baseplateSchema = new mongoose.Schema({
    l1:Number,
    b1:Number,
    δ1:Number
})
//筋板的表结构
const hellsplateSchema = new mongoose.Schema({
    l3:Number,
    b2:Number,
    b3:Number,
    δ3:Number
})
//垫板的表结构
const underboardSchema = new mongoose.Schema({
    arcLength:Number,
    b4:Number,
    δ4:Number,
    e:Number
})
//螺栓间距的表结构
const boltgapSchema = new mongoose.Schema({
    l2:Number,
    d:Number,
    m:Number,
    l:Number
})
//内容的表结构
const contentsSchema = new mongoose.Schema({
    //公称直径DN
    diameter: {
        type:Number,
        default:0
    },
    //允许载荷Q/KN
    allowLoad:{
        type:Number,
        default:0
    },
    //鞍式支座高度h
    supportH:{
        type:Number,
        default:0
    },
    //关联字段底板
    baseplate:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用模型
        ref:'BasePlate'
    },
    //腹板
    abdomenBoard: {
        type:Number,
        default:0
    },
    //关联字段筋板
    hellsplate:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用模型
        ref:'HellsPlate'
    },
    //关联字段垫板
    underboard:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用模型
        ref:'UnderBoard'
    },
    //关联字段螺栓间距
    boltgap:{
        //类型
        type:mongoose.Schema.Types.ObjectId,
        //引用模型
        ref:'BoltGap'
    },
    //鞍式支座质量
    supportWeight: {
        type:Number,
        default:0
    },
    //增加100mm高度增加的质量/kg
    addHeight: {
        type:Number,
        default:0
    }
})
/************** 定义模型Model **************/
const Models={
    User: mongoose.model('User',usersSchema),
    Content:mongoose.model('Content',contentsSchema),
    BasePlate:mongoose.model('BasePlate',baseplateSchema),
    HellsPlate:mongoose.model('HellsPlate',hellsplateSchema),
    UnderBoard:mongoose.model('UnderBoard',underboardSchema),
    BoltGap:mongoose.model('BoltGap',boltgapSchema)
}

module.exports=Models;