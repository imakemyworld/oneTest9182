import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import MenuItem from "./components/customNav/MenuItem.vue"; //循环调用，注册不识别
Vue.use(ElementUI);
Vue.component("menu-item",MenuItem);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
