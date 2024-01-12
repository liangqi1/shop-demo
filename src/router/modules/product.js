export default [
    {
    path: '/product', // 商品详情
    name: 'product',
    meta: {
      index: 2,
      showBackHeader: true,
      title: '商品详情',
      backBarBgColor: 'white',
      authority: ['customer'],
    },
    component: () => import('@/views/product/index.vue')
  }
  ]
  