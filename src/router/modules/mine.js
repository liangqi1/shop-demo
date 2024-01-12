export default [
  {
    path: '/mine/order',
    name: 'order',
    meta: {
      index: 2,
      showBackHeader: true,
      title: '订单',
      authority: ['customer'],
    },
    component: () => import('@/views/order/index.vue')
  },
    {
      path: '/mine/address',
      name: 'address',
      meta: {
        index: 12,
        showBackHeader: true,
        title: '收货地址',
        authority: ['customer'],
      },
      component: () => import('@/views/address/index.vue')
    },
    {
      path: '/mine/address/new',
      name: 'editAddress',
      meta: {
        index: 12,
        showBackHeader: true,
        title: '新增收货地址',
        authority: ['customer'],
      },
      component: () => import('@/views/address/edit.vue')
    }
  ]
