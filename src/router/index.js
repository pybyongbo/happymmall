import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },{
      path:'/login',
      name:'login',
      meta:{title:'用户登录'},
      component:resolve=>require(['../views/Login.vue'],resolve)
    },
    {
      path:'/dashboard',
      name:'dashboard',
      meta:{title:'系统首页'},
      component:resolve=>require(['../components/common/Home.vue'],resolve),
      children:[
          {
              path: '/',
              component: resolve => require(['../views/Dashboard.vue'], resolve),
              meta: { title: '系统首页' }
          },
          {
              path: '/product/index',
              component: resolve => require(['../views/Productlist.vue'], resolve),
              meta: { title: '商品列表' }
        },
        {
          path: '/product/detail/:id',
          component: resolve => require(['../views/Productdetail.vue'], resolve),
          meta: { title: '商品详情' }
        },
        {
            path: '/category/index',
            component: resolve => require(['../views/Categorylist.vue'], resolve),
            meta: { title: '品类管理' }
        },
        {
            path: '/order/index',
            component: resolve => require(['../views/Orderlist.vue'], resolve),
            meta: { title: '订单管理' }
        }
      ]
    }
  ]
})
