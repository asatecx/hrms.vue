// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
//elementを導入する   https://element.eleme.io/#/zh-CN/component/quickstart
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });
/* eslint-disable no-new */
import sidemenu from '@/components/common/sidemenu'

Vue.component(sidemenu.name,sidemenu)

import '../static/global/index.css'
import axios from 'axios'
Vue.prototype.$axios = axios //把axios设置为所有Vue组件实例的成员属性，以后可以使用this.$axios使用异步请求功能

axios.defaults.withCredentials =false;  // 跨域访问需要发送cookie时一定要设定为 true,否则设定为false;

//引入多个对象的写法
import * as api from './restful/api'
Vue.prototype.$http = api

//提交表单时用得qs
import qs from 'qs'
Vue.prototype.$qs = qs;
//動画再生
//https://blog.csdn.net/qq_33479841/article/details/89420761
import VideoPlayer from 'vue-video-player'
Vue.use(VideoPlayer);

//https://www.jianshu.com/p/535b53989b39
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import topmenu from '@/components/common/topmenu'
Vue.component("topmenu", topmenu)
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import footer from '@/components/common/footer'
Vue.component("footer", footer)
