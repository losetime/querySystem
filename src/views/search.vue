<template>
  <div class="home">
    <div class="control-wrap">
      <div class="input-wrap">
        <!-- <div class="weight-wrap">
          <p class="title-weight">重量</p>
          <el-select v-model="pnData" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <!-- <div class="PN-wrap">
          <p class="title-pn">PN</p>
          <el-select v-model="pnData" placeholder="请选择">
            <el-option
              v-for="item in pnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="DN-wrap">
          <p class="title-dn">DN</p>
          <el-select v-model="dnData" placeholder="请选择">
            <el-option
              v-for="item in dnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <el-button type="primary" class="search-btn" style="margin-left:10px;" @click="getContent">查询</el-button>
      <!-- <el-button type="primary" class="search-btn" @click="manageData">管理数据</el-button> -->
    </div>
    <div class="view-wrap">
      <div class="view-item1">
        <img src="../assets/photo1-1.png" alt="">
        <p class="l1" v-if="contentData.baseplate!=undefined">{{contentData.baseplate.l1}}</p>
        <p class="l2" v-if="contentData.baseplate!=undefined">{{contentData.boltgap.l2}}</p>
        <p class="δ1" v-if="contentData.baseplate!=undefined">{{contentData.baseplate.δ1}}</p>
        <p class="δ4" v-if="contentData.baseplate!=undefined">{{contentData.underboard.δ4}}</p> 
      </div>
      
      <div class="view-item3">
        <img src="../assets/photo2-1.png" alt="">
        <p class="b1" v-if="contentData.baseplate!=undefined">{{contentData.baseplate.b1}}</p>
        <p class="b3" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.b3}}</p>
        <p class="b4" v-if="contentData.baseplate!=undefined">{{contentData.underboard.b4}}</p>
        <p class="e" v-if="contentData.baseplate!=undefined">{{contentData.underboard.e}}</p>
        <p class="δ4" v-if="contentData.baseplate!=undefined">{{contentData.underboard.δ4 * 3}}</p>
      </div>
      <div class="view-item2">
        <img src="../assets/photo1-2.png" alt="">
        <p class="l3-1" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.l3}}</p>
        <p class="l3-2" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.l3}}</p>
        <p class="δ3-1-1" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.δ3}}</p>
        <p class="δ3-1-2" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.δ3}}</p>
        <p class="δ3-2-1" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.δ3}}</p>
        <p class="δ3-2-2" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.δ3}}</p>
        <p class="δ2" v-if="contentData.baseplate!=undefined">{{contentData.abdomenBoard}}</p>
        <p class="b2" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.b2}}</p>
        <p class="d" v-if="contentData.baseplate!=undefined">{{contentData.boltgap.d}}</p> 
        <p class="b1" v-if="contentData.baseplate!=undefined">{{contentData.baseplate.b1/2}}</p>
      </div>
      <div class="view-item4">
        <img src="../assets/photo2-2.png" alt="">
        <p class="l3-1" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.l3}}</p>
        <p class="l3-2" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.l3}}</p>
        <p class="δ3-1-1" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.δ3}}</p>
        <p class="δ3-1-2" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.δ3}}</p>
        <p class="δ3-2-1" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.δ3}}</p>
        <p class="δ3-2-2" v-if="contentData.baseplate!=undefined">{{contentData.hellsplate.δ3}}</p>
        <p class="l" v-if="contentData.baseplate!=undefined">{{contentData.boltgap.l}}</p>
        <p class="d" v-if="contentData.baseplate!=undefined">{{contentData.boltgap.d}}</p>
        <p class="b1" v-if="contentData.baseplate!=undefined">{{contentData.baseplate.b1/2}}</p>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import axios from "axios";
@Component({
  components: {
  },
})
export default class Home extends Vue {
  //data
  pnOptions:Object = [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
  dnOptions:Object = [];
  pnData:String = "";
  dnData:String = "";
  contentData:Object={}
  result:Object = []
  //查询
  getContent(){
    // axios.post("/api/main/contentOne",{
    //   diameter:this.dnData
    // }).then(res=>{
    //   let result = res.data;
    //   if(result.code===0){
    //     this.contentData = result.data;
    //   }
    // })
    this.result.map((item:Object, index:Number) => 
      if(item.diameter == this.dnData) {
        this.contentData = item;
        console.log(this.contentData)
      }
    })
  }
  //获取PN选项
  getPnOption() {
    axios.get("/api/main/dn").then(res=>{
      let result = res.data;
      if(result.code===0){
        this.dnOptions = result.data.map(item => {
          return {
            label:item.diameter,
            value:item._id
          }
        })
      }
    })
  }
  manageData() {
    this.$router.push("/dataManage")
  }
  mounted(){
    // this.getPnOption()
    this.result = require("../../data.json");
    this.dnOptions = this.result.map(item => {
        return {
          label:item.diameter,
          value:item.diameter
        }
    })
  }
}
</script>

<style scoped lang="scss">
@mixin view-item{
  position: absolute;
  font-weight: 700;
  background: #ffffff;
  height:30px;
  line-height: 30px;
}
.home {
  display: flex;
  justify-content: center;
  align-items: center;
}
.control-wrap{
  width:30%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .weight-wrap,.PN-wrap,.DN-wrap{
    display: flex;
    justify-content: center;
    align-items: center;
    width:100%;
    height:50%;
    p {
      width:50px;
      margin-right:10px;
    }
  }
  .search-btn{
    display: block;
    width:150px;
    margin-top:20px;
  }
}
.view-wrap {
  width:1200px;
  .view-item1{
    float: left;
    position:relative;
    width: 600px;
    height: 600px;
    img {
      width: 600px;
      height:600px;
    }
    .l1,.l2,.δ1,.δ4 {
      @include view-item
    }
    .l1{
      bottom:64px;
      left: 240px;
      width:80px;
    }
    .l2{
      bottom:115px;
      left: 240px;
      width:80px;
    }
    .δ1{
      bottom:200px;
      left: 57px;
      width:50px;
      transform: rotate(-90deg);
    }
    .δ4{
      top: 161px;
      left: 23px;
      width: 50px;
      -webkit-transform: rotate(-90deg);
      transform: rotate(-32deg);
    }
  }
  .view-item2{
    float: left;
    position:relative;
    width: 600px;
    height: 350px;
    img {
      width: 600px;
      height:350px;
    }
    .l3-1,.l3-2,.δ3-1-1,.δ3-1-2,.δ3-2-1,.δ3-2-2,.δ2,.b2,.d,.b1 {
      @include view-item
    }
    .l3-1{
        bottom: 85px;
        left: 185px;
        width: 43px;
    }
    .l3-2{
      bottom: 85px;
      left: 383px;
      width: 43px;
    }
    .δ3-1-1 {
      bottom: 85px;
      left: 100px;
      width: 43px;
    }
    .δ3-1-2 {
      bottom: 85px;
      left: 255px;
      width: 43px;
    }
    .δ3-2-1 {
      bottom: 85px;
      left: 313px;
      width: 43px;
    }
    .δ3-2-2 {
      bottom: 85px;
      left: 460px;
      width: 43px;
    }
    .δ2 {
      bottom: 211px;
      left: 25px;
      width: 43px;
      transform: rotate(-90deg);
    }
    .b2 {
      bottom: 168px;
      left: 31px;
      width: 43px;
      transform: rotate(-90deg);
    }
    .d {
      top: 12px;
      left: 374px;
      width: 22px;
    }
    .b1 {
      top: 87px;
      right: 43px;
      width: 50px;
      transform: rotate(-90deg);
    }
  }
  .view-item3{
    float: right;
    position:relative;
    width: 600px;
    height: 600px;
    img {
      width: 600px;
      height:600px;
    }
    .b1,.b3,.b4,.e,.δ4 {
      @include view-item
    }
    .b1{
      bottom: 38px;
      left: 266px;
      width: 43px;
    }
    .b3{
      top: 93px;
      left: 286px;
      width: 43px;
    }
    .b4{
      top: 4px;
      left: 289px;
      width: 43px;
    }
    .e{
      top: 60px;
      left: 236px;
      width: 43px;
    }
    .δ4 {
      top: 59px;
      left: 423px;
      width: 70px;
    }
  }
  .view-item4{
    float: right;
    position:relative;
    width: 600px;
    height: 350px;
    img {
      width: 600px;
      height:350px;
    }
    .l3-1,.l3-2,.δ3-1-1,.δ3-1-2,.δ3-2-1,.δ3-2-2,.l,.d,.b1 {
      @include view-item
    }
    .l3-1{
        bottom: 91px;
        left: 145px;
        width: 43px;
    }
    .l3-2{
      bottom: 91px;
      left: 390px;
      width: 43px;
    }
    .δ3-1-1 {
      bottom: 91px;
      left: 42px;
      width: 43px;
    }
    .δ3-1-2 {
      bottom: 91px;
      left: 233px;
      width: 43px;
    }
    .δ3-2-1 {
      bottom: 91px;
      left: 302px;
      width: 43px;
    }
    .δ3-2-2 {
      bottom: 91px;
      left: 480px;
      width: 43px;
    }
    .l {
      bottom: 183px;
      left: 10px;
      width: 43px;
      transform: rotate(-90deg);
    }
    .d {
      top: 0px;
      left: 455px;
      width: 43px;
    }
    .b1 {
      top: 76px;
      right: 12px;
      width: 50px;
      transform: rotate(-90deg);
    }
  }
}

</style>
