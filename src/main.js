import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueLuxon from 'vue-luxon';
import VueFilterDateFormat from 'vue-filter-date-format';


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  VueLuxon, 
  VueFilterDateFormat,
  render: h => h(App)
}).$mount('#app')
