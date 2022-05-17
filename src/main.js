// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
//http网络请求库
import axios from 'axios'
//UI框架库
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-carbon.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store'


import App from './App'
import router from './router'

Vue.prototype.$http = axios


Vue.use(MuseUI)
Vue.use(ElementUI)
Vue.config.productionTip = false


router.beforeEach( (to, from, next) => {
  store.commit('getToken')
  const token = store.state.token
  if (!token && to.path !== '/login'){
    next({path: '/login'})
  }
  if(to.path == 'login' || to.path == '/register'){
    next()
  }
  else if(token && to.path == '/login'){
    next({path: '/'})
  }
  else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
