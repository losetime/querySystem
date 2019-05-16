<template>
<div class="admin-wrap">
  <div class="header-wrap">
    <!-- <i class="el-icon-back"></i> -->
    <el-button type="primary" icon="el-icon-back" class="addBtn" size="mini" round @click="back"></el-button>
    <el-button type="primary" class="addBtn" size="mini" @click="showAdd=true" round>添加数据</el-button>
  </div>
  <el-table
      :data="tableData"
      style="width: 100%;">
      <el-table-column
        prop="diameter"
        fixed="left"
        label="公称直径DN"
        width="100">
      </el-table-column>
      <el-table-column
        prop="allowLoad"
        label="允许载荷Q/kN"
        width="120">
      </el-table-column>
      <el-table-column
        prop="supportH"
        label="鞍式支座高度H"
        width="120">
      </el-table-column>
      <el-table-column label="底板">
        <el-table-column
          prop="baseplate.l1"
          label="l1"
          width="80">
        </el-table-column>
        <el-table-column
          prop="baseplate.b1"
          label="b1"
          width="80">
        </el-table-column>
        <el-table-column
          prop="baseplate.δ1"
          label="δ1"
          width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="abdomenBoard"
        label="腹板"
        width="80">
      </el-table-column>
      <el-table-column label="筋板">
        <el-table-column
          prop="hellsplate.l3"
          label="l3"
          width="70">
        </el-table-column>
        <el-table-column
          prop="hellsplate.b2"
          label="b2"
          width="70">
        </el-table-column>
        <el-table-column
          prop="hellsplate.b3"
          label="b3"
          width="70">
        </el-table-column>
        <el-table-column
          prop="hellsplate.δ3"
          label="δ3"
          width="70">
        </el-table-column>
      </el-table-column>
      <el-table-column label="垫板">
        <el-table-column
          prop="underboard.arcLength"
          label="弧长"
          width="70">
        </el-table-column>
        <el-table-column
          prop="underboard.b4"
          label="b4"
          width="70">
        </el-table-column>
        <el-table-column
          prop="underboard.δ4"
          label="δ4"
          width="70">
        </el-table-column>
        <el-table-column
          prop="underboard.e"
          label="e"
          width="70">
        </el-table-column>
      </el-table-column>
      <el-table-column label="螺栓间距">
        <el-table-column
          prop="boltgap.l2"
          label="间距l2"
          width="70">
        </el-table-column>
        <el-table-column
          prop="boltgap.d"
          label="螺孔d"
          width="70">
        </el-table-column>
        <el-table-column
          prop="boltgap.m"
          label="螺纹M"
          width="70">
        </el-table-column>
        <el-table-column
          prop="boltgap.l"
          label="孔长l"
          width="70">
        </el-table-column>
      </el-table-column>
       <el-table-column
        prop="supportWeight"
        label="鞍式支座质量/kg"
        width="120">
      </el-table-column>
       <el-table-column
        prop="addHeight"
        label="增加100mm高度增加的质量/kg"
        width="120">
      </el-table-column>
      <el-table-column label="操作" fixed="right">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="delContent(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
  </el-table>
  <div class="addFrom" v-show="showAdd">
    <Add-data @cancel="cancel"></Add-data>
  </div>
</div>
  
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import AddData from "../components/addData.vue";
import axios from "axios";
@Component({
  components: {
    AddData
  },
})
export default class about extends Vue {
    tableData:Object =  []
    showAdd:Boolean = false
    getContent(){
      axios.get("/api/main/content").then(res=>{
        let result = res.data;
        if(result.code===0){
          this.tableData = result.data;
        }
      })
    }
    delContent(row:Object,index:Number){
      axios.post("/api/main/delData",{
        id:row._id
      }).then(res=>{
        let result = res.data;
        if(result.code===0){
          this.tableData = result.data;
          this.$message({
            message: result.message,
            type: 'success'
          });
        }
      })
    }
    cancel(){
      this.showAdd=false
    }
    back() {
      this.$router.push("/");
    }
    mounted(){
      this.getContent();
    }
  }
</script>
<style lang="scss" scoped>
.admin-wrap{
  width:100%;
  height: 100%;
  .header-wrap{
    width:98%;
    height:50px;
    display: flex;
    justify-content: space-between;
    margin:20px;
    box-sizing: border-box;
    .addBtn {
      width:5rem;
      height:40px;
    }
  }
  .addFrom{
    position: absolute;
    top:0;
    right:0;
    z-index:999;
    background: #ffffff;
  }
}

</style>
