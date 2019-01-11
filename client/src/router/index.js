import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import createTask from '@/components/createTask'
import Modal from '@/components/modal'
import TaskManage from '@/components/TaskManage'
import CakeForm from '@/components/CakeForm'
import Paperwork from '@/components/Paperwork'

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
      path: '/modal',
      name: 'modal',
      component: Modal
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
    }
  ]
})
