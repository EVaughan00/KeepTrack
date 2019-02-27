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
    day: localStorage.getItem('day'),
    daySelect: localStorage.getItem('daySelect'),
    isManager: localStorage.getItem('isManager')
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
    isManager (state, manager) {
      if (manager === true) {
        localStorage.setItem('isManager', true)
        state.isManager = localStorage.getItem('isManager')
      } else {
        localStorage.setItem('isManager', false)
        state.isManager = localStorage.getItem('isManager')
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
    },
    setDaySelect (state, day) {
      if (day) {
        localStorage.setItem('daySelect', day)
        state.daySelect = localStorage.getItem('daySelect')
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
    isManager ({commit}, manager) {
      commit('isManager', manager)
    },
    setName ({commit}, name) {
      commit('setName', name)
    },
    setDay ({commit}, day) {
      commit('setDay', day)
    },
    setDaySelect ({commit}, day) {
      commit('setDaySelect', day)
    }
  }
})
