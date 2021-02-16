import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueLuxon from 'vue-luxon';
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

Vue.config.productionTip = false
Vue.use(VueLuxon);

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

Sentry.init({
  Vue,
  dsn: "https://b48788ea342e49b59ab9611277803f86@o413394.ingest.sentry.io/5627706",
  integrations: [new Integrations.BrowserTracing()],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 1.0,
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
