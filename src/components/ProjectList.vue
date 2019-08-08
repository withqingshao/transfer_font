<template>
  <div>
    <el-dialog title="数据提取" :visible.sync="dialogFormVisible" >
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageInfo.pageNum"
        :page-sizes="[2, 4, 8, 10]"
        :page-size="pageInfo.pageSize"
        layout="sizes, prev, pager, next"
        :total="pageInfo.total">
      </el-pagination>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="过滤条件">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="提取字段">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
            <el-checkbox label="地推活动" name="type"></el-checkbox>
            <el-checkbox label="线下主题活动" name="type"></el-checkbox>
            <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="存储类型">
          <el-select v-model="form.type" placeholder="请选择" @change="change()">
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
          console.log("aaaa--")
          console.log(res.data)
        }).catch(error=>{
          console.log(error)
        })
      },
      handleSizeChange(val){

      },
      handleCurrentChange(){

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
        pageSize:2,
        pageNum:1,
        pageInfo:{},
        url:"http://localhost:9090/project",
        options: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      }
    }
  }
</script>

<style scoped>
.el-dialog__header{}
</style>
