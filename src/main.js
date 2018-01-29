// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import '@/assets/styles/common.scss'
import axios from 'axios'
import module from '../service/const/constModule.js'


Vue.use(elementUI)
Vue.config.productionTip = false
Vue.use(VueRouter)
const router = new VueRouter({
  routes: routes
})
Vue.config.productionTip = false
axios.defaults.withCredentials=true
axios.defaults.baseURL = 'http://' + module.node.nodeURL + ':' + module.node.port
Vue.prototype.$http = axios

axios.interceptors.response.use(response => {
  console.log(response.data);
  return response;
}, error => {
	return Promise.reject(error);
})

router.beforeEach((route, redirect, next) => {
	next();
})

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
