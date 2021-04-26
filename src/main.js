import Vue from 'vue'
import App from './App.vue'
import {router} from './routes/index.js'
import {store} from './store/index.js'
import VueLazyLoad from 'vue-lazyload'
import VueLogger from 'vuejs-logger'

Vue.config.productionTip = false


// VueLazyLoad
Vue.use(VueLazyLoad, {
  preLoad : 2, // 로딩 줄 수
  attempt: 1, // 시도 횟수
  listenEvents: ['scroll']
})

// VueLogger
Vue.use(VueLogger, {
  isEnabled: true,
  logLevel : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
