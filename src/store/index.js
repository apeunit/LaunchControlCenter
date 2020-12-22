import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

const AUTH_TOKEN_COOKIE_NAME = process.env.VUE_APP_AUTH_TOKEN_COOKIE_NAME
const AUTH_NAME_COOKIE_NAME  = process.env.VUE_APP_AUTH_NAME_COOKIE_NAME

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading                : false,
    status                 : {},
    authToken              : Cookies.get(AUTH_TOKEN_COOKIE_NAME),
    authName               : Cookies.get(AUTH_NAME_COOKIE_NAME),
    events                 : []
  },
  mutations: {
    SET_LOADING (state, loading) {
      state.loading = loading
    },
    SET_AUTH_TOKEN (state, token) {
      state.authToken = token
      Cookies.set(AUTH_TOKEN_COOKIE_NAME, token, {
        sameSite: 'strict',
        expires: 7 })
    },
    SET_AUTH_NAME (state, name) {
      state.authName = name
      Cookies.set(AUTH_NAME_COOKIE_NAME, name, {
        sameSite: 'strict',
        expires: 7 })
    },
    SET_STATUS (state, status) {
      state.status = status
    },
    SET_EVENTS (state, events) {
      state.events = events
    },
  },
  actions: {
    loadHealth({commit},) {
      const url = `status`
      commit('SET_LOADING', true)
      Vue.axios
        .get(url)
        .then(r => r.data)
        .then(data => {
          console.log(data)
          commit("SET_STATUS", data)
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    },
    authLogin({commit}, payload) {
      const url = `/v1/auth/login`
      Vue.axios
        .post(url, payload)
        .then(r => r.data)
        .then(data => {
          console.log(data.message)
          commit("SET_AUTH_TOKEN", data.message)
          commit("SET_AUTH_NAME", payload.email)
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    },
    authLogout({commit}) {
      const url = `/v1/auth/logout`
      Vue.axios
        .post(url)
        .then(r => r.data)
        .then(data => {
          console.log(data)
          commit("SET_AUTH_TOKEN", null)
          commit("SET_AUTH_NAME", null)
          Cookies.remove(AUTH_TOKEN_COOKIE_NAME)
          Cookies.remove(AUTH_NAME_COOKIE_NAME)
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    },
    authRegister({commit}, payload) {
      const url = `/v1/auth/register`
      Vue.axios
        .post(url, payload)
        .then(r => r.data)
        .then(data => {
          console.log(data)
          commit("SET_STATUS", data)
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    },
    loadEvents({commit}) {
      const url = `/v1/events`
      Vue.axios
        .get(url)
        .then(r => r.data)
        .then(data => {
          console.log(data)
          commit("SET_EVENTS", data)
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    },
    createEvent({commit}, payload) {
      const url = `/v1/events`
      Vue.axios
        .post(url, payload)
        .then(r => r.data)
        .then(data => {
          console.log(data)
          //message: string-757d4915c70351874d60
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    },
    loadEvent({commit}, id) {
      const url = `/v1/events/${id}`
      Vue.axios
        .get(url)
        .then(r => r.data)
        .then(data => {
          console.log(data)
          commit("SET_STATUS", data)
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    },
    deleteEvent({commit}, id) {
      const url = `/v1/events/${id}`
      Vue.axios
        .delete(url)
        .then(r => r.data)
        .then(data => {
          console.log(data)
          commit("SET_STATUS", data)
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    },
    deployEvent({commit}, id) {
      const url = `/v1/events/${id}/deploy`
      Vue.axios
        .put(url)
        .then(r => r.data)
        .then(data => {
          console.log(data)
        })
        .catch(e => {
          console.log(e)
        })
        .then(() => {
          commit('SET_LOADING', false)
        })
    }
  },
  modules: {
  }
})
