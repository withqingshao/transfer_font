<template>
  <div>

    <el-table
      :data="pageInfo.list"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="createDate"
        label="日期"
        width="150" :formatter="dateFormat" >
      </el-table-column>
      <el-table-column
        prop="connectionName"
        label="数据源名字"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dataSourceType"
        label="类型"
        width="120">
      </el-table-column>
      <el-table-column
        prop="connectionParam"
        label="参数"
        width="300">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
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
    },

    data() {
      return {
        url:"http://localhost:9090/datasource",
        pageSize:2,
        pageNum:1,
        pageInfo:{}
      }
    }
  }
</script>

<style scoped>

</style>
