//对外暴露配置路由(常量)

export const constantRoute = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
  },
  {
    //登陆成以后展示数据的路由
    path: '/',
    component: () => import('@/views/home/index.vue'),
    name: 'layout',
  },
  {
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
  },
  {
    path: '/:pathMath(.*)*',
    redirect: '/404',
    name: '404',
  },
]
