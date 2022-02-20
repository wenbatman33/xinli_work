export default [
  { path: '/login', name: 'login', component: () => import('@/views/login.vue') },
  { path: '/ResetPass', name: 'resetPass', component: () => import('@/views/resetPassword.vue') },
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue'),
    children: [
      { path: '*'},
    ]
  },
  { path: '*', redirect: '/' },
]
