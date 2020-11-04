import Vue from 'vue'
import Router from 'vue-router'
import Layout1 from '@/views/layout/Layout1'
import BaseLayout from '@/views/layout/BaseLayout'

Vue.use(Router)

export const routerMap = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    component: Layout1,
    path: '/',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home'),
        meta: { needLogin: false },
        name: 'Home'
      }
    ]
  },
  {
    component: BaseLayout,
    path: '/user',
    children: [
      {
        path: '',
        component: () => import('@/views/user/index'),
        meta: { needLogin: true },
        name: 'User'
      },
      {
        path: 'login',
        component: () => import('@/views/user/login'),
        meta: { needLogin: false },
        name: 'Login'
      }
    ]
  },
  {
    path: '/critical',
    component: () => import('@/views/errorPage/critical'),
    name: 'Critical'
  },
  {
    path: '/error',
    component: () => import('@/views/errorPage/error'),
    name: 'Error'
  },
  {
    path: '*',
    redirect: '/error',
    hidden: true
  }
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: routerMap
})
