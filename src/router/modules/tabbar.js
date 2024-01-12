export default [{
    path: '/index',
    name: 'index',
    meta: {
      index: 1,
      showTabbar: true,
      title: '首页',
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/shopCart', // 购物车
    name: 'shopCart',
    meta: {
      index: 1,
      showTabbar: true,
      showBackHeader: true,
      title: '购物车',
      authority: ['customer'],
    },
    component: () => import('@/views/shopCart/index.vue')
  },
  {
    path: '/mine',
    name: 'mine',
    meta: {
      index: 1,
      showTabbar: true,
      title: '个人信息',
      authority: ['customer'],
    },
    component: () => import('@/views/mine/index.vue')
  },
]
