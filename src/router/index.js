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
          //编辑和新增共用一个模板页面,通过地址栏路由参数来判断.
          path: '/product/save/:id?',
          component: resolve => require(['../views/Productsave.vue'], resolve),
          meta: { title: '商品新增/编辑' }
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
          path: '/category/add',
          component: resolve => require(['../views/Categoryadd.vue'], resolve),
          meta: { title: '品类管理' }
      },
        {
          path: '/category/index/:id',
          component: resolve => require(['../views/Categorylistitem.vue'], resolve),
          meta: {title: '品类管理'}
        },
        {
            path: '/order/index',
            component: resolve => require(['../views/Orderlist.vue'], resolve),
            meta: { title: '订单列表' }
        },
        {
          path: '/order/detail/:id',
          component: resolve => require(['../views/Orderdetail.vue'], resolve),
          meta: { title: '订单详情' }
      }
      ]
    }
  ]
})
