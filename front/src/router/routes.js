const routes = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    redirect: '/quadros',
    children: [
      { path: 'quadros', name: 'quadros', component: () => import('@/pages/QuadrosPage.vue') },
      { path: 'quadros/:id', name: 'quadro', component: () => import('@/pages/QuadroPage.vue'), props: true },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
]

export default routes
