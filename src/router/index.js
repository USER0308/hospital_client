import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import UserInfo from '@/components/PersonInfo'
import Main from '@/components/Main'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/userinfo/:info',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    }
  ]
})
