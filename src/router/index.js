import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/view/Home'
import UserList from '@/view/UserList'
import Order from '@/view/Orders'
import Login from '@/view/Login'
import Register from '@/view/Register'
import Self from '@/view/Self'
import SelfOrder from '@/view/SelfOrder'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Home',
      meta:{
        keepAlive: true,
      },
      component: Home
    },
    {
      path: '/userlist',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/self',
      name: 'Self',
      component: Self
    },
    {
      path: '/selforder',
      name: 'SelfOrder',
      component: SelfOrder

    }

  ]
})
