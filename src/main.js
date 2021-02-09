import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueLuxon from 'vue-luxon';


Vue.config.productionTip = false

Vue.use(VueLuxon, {
    input: {
        zone: "utc",
        format: "iso"
    },
    output: {
      format: {
        year: null,
        month: 'long',
        day: 'numeric'
    }
    },
  }
),

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
