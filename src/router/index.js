import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/Main'
import Project from "@/components/Project";
import Datasource from "@/components/Datasource";
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children:[
        {
          path:"project/create",
          name:"Project",
          component: Project
        },
        {
          path:"datasource/create",
          name:"Datasouce",
          component:Datasource
        }
      ]
    }
  ]
})
