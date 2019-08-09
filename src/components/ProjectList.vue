<template>
  <div>
    <el-dialog title="数据提取" :visible.sync="dialogFormVisible" >
      <!--<el-table-->
        <!--:data="tableData"-->
        <!--style="width: 100%">-->
        <!--<el-table-column-->
          <!--prop="index"-->
          <!--label="日期"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="label"-->
          <!--label="姓名"-->
          <!--width="180">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="value"-->
          <!--label="地址">-->
        <!--</el-table-column>-->
      <!--</el-table>-->
      <el-table :data="dealPageInfo.list" style="width: 100%">
        <el-table-column :prop="field.name" :label="field.name" width="180" v-for="field,index in fields" :key="index"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="dealhandleSizeChange"
        @current-change="dealhandleCurrentChange"
        :current-page.sync="dealPageNum"
        :page-sizes="[2, 4, 8, 10]"
        :page-size="dealPageSize"
        layout="sizes, prev, pager, next"
        :total="dealPageInfo.total">
      </el-pagination>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="过滤条件">
          <el-row>
            <el-col :span="18"><el-input v-model="form.name"></el-input></el-col>
            <el-col :span="6"><el-button>执行过滤</el-button></el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="提取字段">
          <el-checkbox-group v-model="form.keyword">
            <el-checkbox :label="field.name" name="keyword" v-for="field,index in fields" :key="index"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="存储类型" >
          <el-select v-model="form.type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.fileId"
              :label="item.name"
              :value="item.fileId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="pageInfo.list"
      border
      style="text-align: center">
      <el-table-column
        fixed
        prop="createDate"
        label="创建日期"
        width="150" :formatter="dateFormat">
      </el-table-column>
      <el-table-column
        prop="projectName"
        label="项目名字"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fileType"
        label="数据格式"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">数据转换和提取</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block pg">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.pageNum"
        :page-sizes="[2, 4, 8, 10]"
        :page-size="pageInfo.pageSize"
        layout="sizes, prev, pager, next"
        :total="pageInfo.total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import moment from "moment"
  export default {
    name:"ProjectList",
    methods: {
      handleClick(row) {
        console.log(row);
        this.dialogFormVisible=true
        let pythonReadUrl="http://localhost:8082/read?url="+row.url+"&type="+row.fileType
        axios.get(pythonReadUrl).then(res=>{
          /*
          将数据构造成pageSize
           */
          this.analyzeData=res.data
          let pageInfo={}
          //pageInfo["list"]=res.data.data
          if(res.data.data.length%this.dealPageSize==0){
            pageInfo["pageSize"]=res.data.data.length/this.dealPageSize
          }else{
            let result=Math.floor(res.data.data.length/this.dealPageSize)
            pageInfo["pageSize"]=result+1
          }
          pageInfo["list"]=res.data.data.slice(0,pageInfo.pageSize*this.dealPageNum)
          pageInfo["pageNum"]=this.dealPageNum
          pageInfo["total"]=res.data.data.length
          this.dealPageInfo=pageInfo
          this.fields=res.data.schema.fields
        }).catch(error=>{
          console.log(error)
        })
      },
      handleSizeChange(val){
        console.log("当前页数--"+val)
      },
      handleCurrentChange(){

      },
      dealhandleSizeChange(val){
        console.log("当前size"+val)
        let pageInfo={}
        if(this.analyzeData.data.length%val==0){
          pageInfo["pageSize"]=this.analyzeData.data.length/val
        }else{
          let result=Math.floor(this.analyzeData.data.length/val)
          pageInfo["pageSize"]=result+1
        }
        pageInfo["list"]=this.analyzeData.data.slice(0,val*this.dealPageNum)
        pageInfo["total"]=this.analyzeData.data.length
        pageInfo["pageNum"]=this.dealPageNum
        this.dealPageInfo=pageInfo
        console.log(this.dealPageInfo)
      },
      dealhandleCurrentChange(val){
         console.log("当前页数--"+val)
         //console.log((val-1)*this.de)
         this.dealPageInfo["list"]=this.analyzeData.data.slice((val-1)*this.dealPageSize,val*this.dealPageSize)
         this.dealPageInfo["pageNum"]=val
      },
      dateFormat: function(row, column){
        var date = row[column.property];
        //console.log(date)
        if (date === undefined) {
          return "";
        }
        return moment(date).format('YYYY-MM-DD HH:mm:ss')
      }
    },

    created(){
      let url=this.url+"/"+this.pageNum+"/"+this.pageSize
      axios.get(url)
        .then(res => {
        // 成功了, 更新数据(成功)
          console.log(res.data)
          if(res.data.status){
            this.pageInfo = res.data.data
          }
        })
        .catch(error => {
          // 失败了, 更新数据(失败)
          console.log(error)
        })
      url="http://localhost:9090/project/file"
      axios.get(url).then(res=>{
        console.log(res.data)
        if(res.data.status){
          this.options=res.data.data
        }
      }).then(error=>{
        console.log(error)
      })
    },

    data() {
      return {
        dialogFormVisible:false,
        analyzeData:{},
        dealPageSize:2,
        dealPageNum:1,
        dealPageInfo:{},
        pageSize:4,
        pageNum:1,
        pageInfo:{},
        url:"http://localhost:9090/project",
        options: [],
        form: {
          keyword:[],
          name: '',
          type: '',
        },
        tableData: [],
        fields:[]
      }
    }
  }
</script>

<style scoped>

</style>
