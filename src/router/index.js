import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/hospital',
    component: Layout,
    redirect: '/hospital/table',
    name: '医院管理',
    meta: { title: '医院管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '医院列表',
        component: () => import('@/views/hospital/table'),
        meta: { title: '医院列表', icon: 'table' }
      },
      {
        path: 'save/:id',
        name: '医院修改',
        component: () => import('@/views/hospital/save'),
        meta: { title: '修改医院', icon: 'tree' },
        hidden:true
      },
      {
        path: 'save',
        name: '医院添加',
        component: () => import('@/views/hospital/save'),
        meta: { title: '添加医院', icon: 'tree' },
        hidden:true
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/table',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '用户列表',
        component: () => import('@/views/user/table'),
        meta: { title: '用户列表', icon: 'table' }
      },
      {
        path: 'update/:id',
        name: '用户修改',
        component: () => import('@/views/user/update'),
        meta: { title: '用户修改', icon: 'tree' },
        hidden: true
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    redirect: '/order/table',
    name: '订单管理',
    meta: { title: '订单管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '订单列表',
        component: () => import('@/views/order/table'),
        meta: { title: '订单列表', icon: 'table' }
      },
      {
        path: 'update/:id',
        name: '订单修改',
        component: () => import('@/views/order/update'),
        meta: { title: '订单修改', icon: 'tree' },
        hidden:true
      }
    ]
  },


  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
