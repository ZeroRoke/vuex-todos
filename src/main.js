import Vue from 'vue'
import App from './App.vue'
import store from './store'
import AntD from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.use(AntD)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
