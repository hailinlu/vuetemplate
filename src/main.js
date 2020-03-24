import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import "./plugin/element_ui";
// echarts resize 自定义指令
import "./directives/echartResizeHelper";

import { get, post, all, querypost, down } from "./utils/axios";

Vue.config.productionTip = false

Vue.prototype.post = post;
Vue.prototype.get = get;
Vue.prototype.all = all;
Vue.prototype.down = down;
Vue.prototype.postquery = querypost;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
