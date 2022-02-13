import Vue from 'vue'
import App from './App'

// 此处导入自定义封装的网络请求
import { myRequest } from './utils/api.js'
// 挂载到全局，让所有的页面都能调用myRequest方法
Vue.prototype.$myRequest = myRequest

// 导入全局变量 BASE_URL
import BASE_URL from './utils/api.js'
// 挂载到全局，让所有的页面都能调用BASE_URL方法
Vue.prototype.$BASE_URL = BASE_URL

// ===============================================
// 此处导入自定义的封装网络请求(加token)
// 不带token请求
import {httpRequest} from './utils/myRequest.js'
// 挂载到全局，让所有的页面都能调用httpRequest方法
Vue.prototype.$httpRequest = httpRequest

// 带Token请求
import {httpTokenRequest} from './utils/myRequest.js'
// 挂载到全局，让所有的页面都能调用httpTokenRequest方法
Vue.prototype.$httpTokenRequest = httpTokenRequest

// hadToken
import {hadToken} from './utils/myRequest.js'
// 挂载到全局，让所有的页面都能调用hadToken方法
Vue.prototype.$hadToken = hadToken

// 导入全局变量 baseUrl
import baseUrl from './utils/myRequest.js'
// 挂载到全局，让所有的页面都能调用baseUrl方法
Vue.prototype.$baseUrl = baseUrl



// 此处为引用自定义顶部
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);
import TnCustom from './components/TnCustom/TnCustom.vue'
Vue.component('tn-custom', TnCustom)

// 引入:uView-UI
import uView from 'uview-ui';
Vue.use(uView);


// tip
import tip from'./utils/tip.js'
Vue.prototype.$tip=tip;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
