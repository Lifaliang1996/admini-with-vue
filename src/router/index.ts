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
        redirect: '/course'
      },
      {
        path: '/role',
        name: 'role',
        component: () =>
          import(/* webpackChunkName: 'role' */ '@/views/role/index.vue'),
        meta: {
          breadcrumb: [{ title: '角色管理', path: '' }]
        }
      },
      {
        path: '/role/allocate-menu/:roleId',
        name: 'role-allocate-menu',
        component: () =>
          import(
            /* webpackChunkName: 'role-allocate-menu' */ '@/views/role/allocate-menu.vue'
          ),
        props: true,
        meta: {
          breadcrumb: [
            { title: '角色管理', path: '/role' },
            { title: '分配菜单', path: '' }
          ]
        }
      },
      {
        path: '/role/allocate-resource/:roleId',
        name: 'role-allocate-resource',
        component: () =>
          import(
            /* webpackChunkName: 'role-allocate-resource' */ '@/views/role/allocate-resource.vue'
          ),
        props: true,
        meta: {
          breadcrumb: [
            { title: '角色管理', path: '/role' },
            { title: '分配资源', path: '' }
          ]
        }
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
          breadcrumb: [
            { title: '资源管理', path: '/resource' },
            { title: '资源分类', path: '' }
          ]
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
          import(/* webpackChunkName: 'course' */ '@/views/course/index.vue'),
        meta: {
          breadcrumb: [{ title: '课程管理', path: '' }]
        }
      },
      {
        path: '/course/create',
        name: 'course-create',
        component: () =>
          import(
            /* webpackChunkName: 'course-create-update' */ '@/views/course/create.vue'
          ),
        meta: {
          breadcrumb: [
            { title: '课程管理', path: '/course' },
            { title: '添加课程', path: '' }
          ]
        }
      },
      {
        path: '/course/update/:courseId',
        name: 'course-update',
        component: () =>
          import(
            /* webpackChunkName: 'course-create-update' */ '@/views/course/update.vue'
          ),
        meta: {
          breadcrumb: [
            { title: '课程管理', path: '/course' },
            { title: '修改课程', path: '' }
          ]
        },
        props: true
      },
      {
        path: '/course/section/:courseId',
        name: 'course-section',
        component: () =>
          import(
            /* webpackChunkName: 'course-section' */ '@/views/course/section.vue'
          ),
        meta: {
          breadcrumb: [
            { title: '课程管理', path: '/course' },
            { title: '课程结构', path: '' }
          ]
        },
        props: true
      },
      {
        path: '/user',
        name: 'user',
        component: () =>
          import(/* webpackChunkName: 'user' */ '@/views/user/index.vue'),
        meta: {
          breadcrumb: [{ title: '用户管理', path: '' }]
        }
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
