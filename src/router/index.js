import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Main'
import Project from "@/components/Project";
import Datasource from "@/components/Datasource";
import ProjectList from "../components/ProjectList";
import DatasourceList from "../components/DatasourceList";
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:"project",
          name:"ProjectList",
          component: ProjectList,
        },
        {
          path:"project/create",
          name:"project",
          component:Project
        },
        {
          path:"datasource",
          name:"DatasouceList",
          component:DatasourceList
        },
        {
          path:"datasource/create",
          name:"Datasource",
          component:Datasource
        }
      ]
    }
  ]
})
