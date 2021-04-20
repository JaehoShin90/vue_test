import Vue from 'vue'
import App from './App.vue'
import {router} from './routes/index.js'
import {store} from './store/index.js'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyLoad)

Vue.use(VueLazyLoad, {
  preLoad : 2, // 로딩 줄 수
  attempt: 1, // 시도 횟수
  listenEvents: ['scroll']
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
