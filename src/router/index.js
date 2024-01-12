import { createRouter, createWebHashHistory } from 'vue-router'

// 初始化路由
const pageRouter = {
    path: '/',
    component: () => import('@/views/layout/index.vue'),
    redirect: '/index',
    children: [
        { path: '', redirect: '/index' },
    ]
  }

// 错误页面路由
const errorRouter = [
    {
        path: '/nopermission',
        name: 'nopermission',
        meta: {
          index: 1,
          title: '无权限',
        },
        component: () => import('@/views/error/NoPermission.vue')
      },
      {
        path: '/*',
        name: '404',
        meta: {
          index: 1,
          title: '页面找不到',
        },
        component: () => import('@/views/error/404.vue')
      },
]

// 路由规则
const routes = [
    pageRouter,
    ...errorRouter,
  ]
  const modules = import.meta.glob('./modules/*.js', { eager: true })
  Object.values(modules).forEach((val) => {
    pageRouter.children = [ 
      ...pageRouter.children,
      ...val.default,
    ]
  });
  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  router.beforeEach((to, from, next) => {
    if (to.meta.authority) {
      if (localStorage.getItem('usr-t')) {
        next()
      } else {
        next('/login')
      }
    } else {
      next()
    }
  })
  
  export default router;