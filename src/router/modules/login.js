export default [
    {
    path: '/login',
    name: 'login',
    meta: {
      index: 2,
      showBackHeader: false,
      title: '登陆',
    },
    component: () => import('@/views/login/index.vue')
  }
  ]
  