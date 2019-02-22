import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import createTask from '@/components/createTask'
import Modal1 from '@/components/modal1'
import Modal2 from '@/components/modal2'
import TaskManage from '@/components/TaskManage'
import CakeForm from '@/components/CakeForm'
import Paperwork from '@/components/Paperwork'
import TemplateEdit from '@/components/templatemod'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: HelloWorld
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/dashboard/createTask',
      name: 'task-create',
      component: createTask
    },
    {
      path: '/modal1',
      name: 'modal1',
      component: Modal1
    },
    {
      path: '/modal2',
      name: 'modal2',
      component: Modal2
    },
    {
      path: '/manage',
      name: 'manage',
      component: TaskManage
    },
    {
      path: '/cakeform',
      name: 'cakeform',
      component: CakeForm
    },
    {
      path: '/paperwork',
      name: 'paperwork',
      component: Paperwork
    },
    {
      path: '/templatemod',
      name: 'temp-mod',
      component: TemplateEdit
    }
  ]
})
