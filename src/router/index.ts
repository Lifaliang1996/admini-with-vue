import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: 'login' */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    meta: {
      requiredUser: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: 'home' */ '@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        component: () =>
          import(/* webpackChunkName: 'menu' */ '@/views/menu/index.vue'),
        meta: {
          breadcrumb: [{ title: '菜单管理', path: '' }]
        }
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-update' */ '@/views/menu/create.vue'
          ),
        meta: {
          breadcrumb: [
            { title: '菜单管理', path: '/menu' },
            { title: '添加菜单', path: '' }
          ]
        }
      },
      {
        path: '/menu/update/:id',
        name: 'menu-update',
        component: () =>
          import(
            /* webpackChunkName: 'menu-create-update' */ '@/views/menu/update.vue'
          ),
        meta: {
          breadcrumb: [
            { title: '菜单管理', path: '/menu' },
            { title: '编辑菜单', path: '' }
          ]
        }
      },
      {
        path: '/resource',
        name: 'resource',
        component: () =>
          import(
            /* webpackChunkName: 'resource' */ '@/views/resource/index.vue'
          ),
        meta: {
          breadcrumb: [{ title: '资源管理', path: '' }]
        }
      },
      {
        path: '/resource/category',
        name: 'resource-category',
        component: () =>
          import(
            /* webpackChunkName: 'resource-category' */ '@/views/resource/category.vue'
          ),
        meta: {
          breadcrumb: [{ title: '资源管理', path: '/resource' }, { title: '资源分类', path: '' }]
        }
      },
      {
        path: '/resource/create',
        name: 'resource-create',
        component: () =>
          import(
            /* webpackChunkName: 'resource-create-update' */ '@/views/resource/create.vue'
          ),
        meta: {
          breadcrumb: [
            { title: '资源管理', path: '/resource' },
            { title: '添加资源', path: '' }
          ]
        }
      },
      {
        path: '/resource/update/:id',
        name: 'resource-update',
        component: () =>
          import(
            /* webpackChunkName: 'resource-create-update' */ '@/views/resource/update.vue'
          ),
        meta: {
          breadcrumb: [
            { title: '资源管理', path: '/resource' },
            { title: '修改资源', path: '' }
          ]
        }
      },
      {
        path: '/course',
        name: 'course',
        component: () =>
          import(/* webpackChunkName: 'course' */ '@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        component: () =>
          import(/* webpackChunkName: 'advert' */ '@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        component: () =>
          import(
            /* webpackChunkName: 'advert-space' */ '@/views/advert-space/index.vue'
          )
      }
    ]
  },
  {
    path: '*',
    name: 'error-404',
    component: () =>
      import(/* webpackChunkName: 'error-404' */ '@/views/error/404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // 登录验证
  if (to.matched.some(record => record.meta.requiredUser)) {
    if (store.state.user) {
      next()
    } else {
      next({ name: 'login', query: { back: to.fullPath } })
    }
  } else {
    next()
  }
})

export default router
