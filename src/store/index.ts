import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/local-storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storage.getItem('user')
  },
  mutations: {
    setUser (state, user) {
      storage.setItem('user', user)
      state.user = JSON.parse(user)
    }
  },
  actions: {
  },
  modules: {
  }
})
