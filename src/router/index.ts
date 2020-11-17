import Vue from 'vue'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import store from '@/store'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(VueMeta)

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
