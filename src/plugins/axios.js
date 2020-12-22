"use strict";

import Vue from 'vue';
import axios from "axios";
import store from '../store'
import router from '../router'

const API_BASE_URL             = process.env.VUE_APP_API_BASE_URL
const AUTH_TOKEN_HEADER_NAME   = 'X-Lctrld-Token'
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: API_BASE_URL,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    if(store.state.authToken) {
      config.headers.post[AUTH_TOKEN_HEADER_NAME] = store.state.authToken
      config.headers.get[AUTH_TOKEN_HEADER_NAME] = store.state.authToken
      config.headers.delete[AUTH_TOKEN_HEADER_NAME] = store.state.authToken
      config.headers.put[AUTH_TOKEN_HEADER_NAME] = store.state.authToken
    }
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    if(typeof response.data.code !== 'undefined' && response.data.code === 401) {
      alert("Your session expired, please log in again")
      store.dispatch("authLogout")
      router.push('login')
    }
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
