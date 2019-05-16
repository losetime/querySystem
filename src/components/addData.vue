<template>
  <div class="addData">
    <el-form ref="addData" :model="addData" label-width="80px" size="mini">
      <el-form-item label="公称直径">
        <el-input v-model="addData.diameter" class="input"></el-input>
      </el-form-item>
      <el-form-item label="允许载荷">
        <el-input v-model="addData.allowLoad" class="input"></el-input>
      </el-form-item>
      <el-form-item label="支座高度">
        <el-input v-model="addData.supportH" class="input"></el-input>
      </el-form-item>

        <el-form-item label="底板">
        </el-form-item>
        <el-form-item label="l1">
          <el-input v-model="addData.baseplate.l1" class="input"></el-input>
        </el-form-item>
        <el-form-item label="b1">
          <el-input v-model="addData.baseplate.b1" class="input"></el-input>
        </el-form-item>
        <el-form-item label="δ1">
          <el-input v-model="addData.baseplate.δ1" class="input"></el-input>
        </el-form-item>
      
      <el-form-item label="腹板">
        <el-input v-model="addData.abdomenBoard" class="input"></el-input>
      </el-form-item>

      <el-form-item label="筋板">
      </el-form-item>
        <el-form-item label="l3">
          <el-input v-model="addData.hellsplate.l3" class="input"></el-input>
        </el-form-item>
        <el-form-item label="b2">
          <el-input v-model="addData.hellsplate.b2" class="input"></el-input>
        </el-form-item>
        <el-form-item label="b3">
          <el-input v-model="addData.hellsplate.b3" class="input"></el-input>
        </el-form-item>
        <el-form-item label="δ3">
          <el-input v-model="addData.hellsplate.δ3" class="input"></el-input>
        </el-form-item>
      
      <el-form-item label="垫板">
        </el-form-item>
        <el-form-item label="弧长">
          <el-input v-model="addData.underboard.arcLength" class="input"></el-input>
        </el-form-item>
        <el-form-item label="b4">
          <el-input v-model="addData.underboard.b4" class="input"></el-input>
        </el-form-item>
        <el-form-item label="δ4">
          <el-input v-model="addData.underboard.δ4" class="input"></el-input>
        </el-form-item>
        <el-form-item label="e">
          <el-input v-model="addData.underboard.e" class="input"></el-input>
        </el-form-item>
      
        <el-form-item label="螺栓间距">
        </el-form-item>
        <el-form-item label="间距l2">
          <el-input v-model="addData.boltgap.l2" class="input"></el-input>
        </el-form-item>
        <el-form-item label="螺孔d">
          <el-input v-model="addData.boltgap.d" class="input"></el-input>
        </el-form-item>
        <el-form-item label="螺纹M">
          <el-input v-model="addData.boltgap.m" class="input"></el-input>
        </el-form-item>
        <el-form-item label="孔长l">
          <el-input v-model="addData.boltgap.l" class="input"></el-input>
        </el-form-item>
        <el-form-item label="鞍式支座质量/kg">
          <el-input v-model="addData.supportWeight" class="input"></el-input>
        </el-form-item>
        <el-form-item label="增加100mm高度增加的质量/kg">
          <el-input v-model="addData.addHeight" class="input"></el-input>
        </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addContent">添加</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from "axios";
@Component({})
export default class AddData extends Vue {
   addData:Object = {
      diameter: null,
      allowLoad: null,
      supportH: null,
      baseplate:{
        l1:null,
        b1:null,
        δ1:null,
      },
      abdomenBoard:null,
      hellsplate:{
        l3:null,
        b2:null,
        b3:null,
        δ3:null
      },
      underboard:{
        arcLength:null,
        b4:null,
        δ4:null,
        e:null
      },
      //关联字段螺栓间距
      boltgap:{
          l2:null,
          d:null,
          m:null,
          l:null
      },
      supportWeight:null,
      addHeight:null
    }
    addContent(){
      axios.post("/api/main/addData",this.addData).then(res=>{
        let result = res.data;
        if(result.code===0){
          
        }
      })
    }
    cancel(){
      this.$emit("cancel")
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.addData {
  height:920px;
  width: 400px;
  overflow: auto;
  padding-left: 50px;
  padding-top: 20px;
  box-sizing: border-box;
  .input {
    width:100px;
  }
}
</style>
