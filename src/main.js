// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'core-js/es6/promise'
import 'core-js/es6/string'
import 'core-js/es7/array'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueGoodTablePlugin from 'vue-good-table'
import JsonCSV from 'vue-json-csv'
import JsonExcel from 'vue-json-excel'
import VueHighcharts from 'vue-highcharts'

import App from './App'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.use(VueGoodTablePlugin)
Vue.use(VueHighcharts)

// Register JsonExcel and JsonCSV as Vue Components
Vue.component('downloadExcel', JsonExcel)
Vue.component('downloadCSV', JsonCSV)

// Disable Production Tip in development mode
Vue.config.productionTip = false

// Initializing the main Vue App
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
