import Vue from 'vue'
import Router from 'vue-router'

import welcome from '@/components/welcome'
import login from '@/components/login'
import mainInter from '@/components/main'
import buyEl from '@/components/buy-el'
import buyNet from '@/components/buy-net'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'welcome',
      component: welcome
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/mainInter',
      name: 'mainInter',
      component: mainInter
    },
    {
      path: '/buy-el',
      name: 'buy-el',
      component: buyEl
    },
    {
      path: '/buy-net',
      name: 'buy-net',
      component: buyNet
    }
  ]
})
