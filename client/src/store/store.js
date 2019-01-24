import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
    name: localStorage.getItem('name'),
    isUserLoggedIn: localStorage.getItem('loggedIn'),
    day: localStorage.getItem('day')
  },
  mutations: {
    setToken (state, token) {
      if (token) {
        state.isUserLoggedIn = true
        localStorage.setItem('loggedIn', true)
      } else {
        state.isUserLoggedIn = false
        localStorage.setItem('loggedIn', false)
      }
      localStorage.setItem('token', token)
      state.token = localStorage.getItem('token')
    },
    setUser (state, user) {
      if (user) {
        localStorage.setItem('user', user)
        state.user = localStorage.getItem('user')
      } else {
        localStorage.setItem('user', null)
        state.user = localStorage.getItem('user')
      }
    },
    setName (state, name) {
      if (name) {
        localStorage.setItem('name', name)
        state.name = localStorage.getItem('name')
      } else {
        localStorage.setItem('name', null)
        state.name = localStorage.getItem('name')
      }
    },
    setDay (state, day) {
      if (day) {
        localStorage.setItem('day', day)
        state.day = localStorage.getItem('day')
      }
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setName ({commit}, name) {
      commit('setName', name)
    },
    setDay ({commit}, day) {
      commit('setDay', day)
    }
  }
})
