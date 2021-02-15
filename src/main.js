// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'


Vue.config.productionTip = false

Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:8090/MyApp/ApiRest/api.php?db=myapp&table=products';

// Vue.http.headers.common['Authorization'] = 'Basic zhegizhegiueuhrgi'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
