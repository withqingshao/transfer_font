<template>
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="100px" class="demo-dynamic">
    <el-form-item
      prop="name"
      label="名字"
    >
      <el-input v-model="dynamicValidateForm.name"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="dynamicValidateForm.type" placeholder="请选择" @change="change()">
        <el-option
          v-for="item in options"
          :key="item.datasourceId"
          :label="item.name"
          :value="item.datasourceId">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-for="(domain, index) in dynamicValidateForm.domains"
      :label="'' + domain.key"
      :key="domain.key"
      :prop="'domains.' + index + '.value'"
    >
      <el-input v-model="domain.value"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('dynamicValidateForm')">测试连接</el-button>
      <el-button type="primary" @click="saveForm('dynamicValidateForm')">保存连接</el-button>
      <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        dynamicValidateForm: {
          domains: [],
          name: '',
          type:''
        },
        optionList:[],
        mapList:{},
        options: [],
      };
    },
    created(){
      let url="http://localhost:9090/db/info"
      axios.get(url)
        .then(res=>{
          console.log(res.data)
          if(res.data.status){
            this.mapList=res.data.data.dbParameters;
            this.options=res.data.data.dbOptions;
          }
        })
        .catch(error => {
        // 失败了, 更新数据(失败)
        console.log(error)
      })

    },
    methods: {
      saveForm(formName){
        let url="http://localhost:9090/datasource/save"
        let data=this.dynamicValidateForm
        axios.post(url,data)
          .then(res=>{
            console.log(res.data)
            if(res.data.status){
              this.$notify({
                title: '成功',
                message: '保存成功',
                type: 'success'
              });
              this.$router.push("/datasource")
            }else{
              this.$notify.error({
                title: '错误',
                message: res.data.message
              });
            }
          })
      },
      submitForm(formName) {
        // let jsonValue=JSON.stringify(this.dynamicValidateForm)
        // console.log(jsonValue)
        let url="http://localhost:9090/datasource/connection"
        let data=this.dynamicValidateForm
        axios.post(url,data)
          .then(res=>{
            console.log(res.data)
            if(res.data.status){
              this.$notify({
                title: '成功',
                message: '连接成功',
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      change(){
        console.log(this.dynamicValidateForm)
        this.dynamicValidateForm.domains=[]
        const key=this.dynamicValidateForm.type
        console.log(key)
        console.log(this.mapList)
        this.optionList=this.mapList[key]
        console.log(this.optionList)
        this.optionList.forEach(x=>{
          this.dynamicValidateForm.domains.push({
            value: '',
            key: x
          });
        })
      },
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

</style>
