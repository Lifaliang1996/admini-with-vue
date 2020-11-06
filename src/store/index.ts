import Vue from 'vue'
import Vuex from 'vuex'
import storage from '@/utils/local-storage'

Vue.use(Vuex)

interface User {
  user_id: string
  access_token: string
  expires_in?: number
  jti?: string
  organization?: string
  refresh_token?: string
  scope?: string
  token_type?: string
}

export default new Vuex.Store({
  state: {
    user: storage.getItem('user') as User
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
