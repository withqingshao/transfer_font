<template>
  <el-container>
    <el-header>在线数据转换平台</el-header>
    <el-container>
      <el-aside width="200px">
        <el-dropdown split-button type="primary" @click="handleClick">
          菜单
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><router-link to="/project/create">创建项目</router-link></el-dropdown-item>
            <el-dropdown-item><router-link to="/datasource/create">新建数据源</router-link></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-aside>
      <el-main>
            <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import echarts from 'echarts'
export default {
  name: 'HelloWorld',
  data () {
    return {
      chart: null
    }
  },
  methods:{
    handleClick(){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    /*text-align: center;*/
    /*line-height: 200px;*/
    width: 200px;
    height: 500px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  /*.el-container:nth-child(5) .el-aside,*/
  /*.el-container:nth-child(6) .el-aside {*/
    /*line-height: 260px;*/
  /*}*/

  /*.el-container:nth-child(7) .el-aside {*/
    /*line-height: 320px;*/
  /*}*/
</style>
