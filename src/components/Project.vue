<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="项目名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="form.type" placeholder="请选择" @change="change()">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-upload
        class="upload-demo"
        action="http://localhost:9090/project/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        multiple
        :limit="1"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel/json/csv文件，且不超过500kb</div>
      </el-upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
   import dbJson from "../../static/json/db"
   import axios from "axios"
    export default {
        name: "Project",
        data() {
        return {
          fileList: [],
          form:{
            name: '',
            type:'',
          },
          options: dbJson.fileTypes
        }
      },
      methods: {
        beforeUpload(file){
          let name=file.name
          let index = name.lastIndexOf(".")
          let type = name.substring(index + 1)
          console.log(type)
          if (type == "json" || type == "csv" ||type=="excel") {
            return true;
          } else {
            this.$notify.error({
              title: '文件格式',
              message: "文件格式错误"
            });
            return false
          }
        },
        uploadSuccess(res){
          console.log("success")
          if(res.status){
            let data={"name":res.data.name,"url":res.data.url}
            this.fileList.push(data)
          }
        },
        change(){

        },
        onSubmit() {
          let data={"url":this.fileList[0].url,"projectName":this.form.name,"fileId":this.form.type}
          let url="http://localhost:9090/project/create"
          axios.post(url,data)
            .then(res=>{
              if(res.data.status){
                this.$notify({
                  title: '成功',
                  message: '新建项目成功',
                  type: 'success'
                });
              }else{
                this.$notify.error({
                  title: '错误',
                  message: res.data.message
                });
              }
            })
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleExceed(files, fileList) {
          this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        }
      }
    }
</script>

<style scoped>
  .el-input{
    width: 25%;
  }
  .el-select{
    width: 25%;
  }
  .el-upload{

  }

</style>
