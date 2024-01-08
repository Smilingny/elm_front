import Vue, {createApp} from 'vue'
import App from './App.vue'
import router from './router'

import 'font-awesome/css/font-awesome.min.css'
import axios from 'axios'
import qs from 'qs'
import {
    getCurDate,
    setSessionStorage,
    getSessionStorage,
    removeSessionStorage,
    setLocalStorage,
    getLocalStorage,
    removeLocalStorage
} from './common.js'

const app = createApp(App);

app.config.productionTip = false

//设置axios的基础url部分
axios.defaults.baseURL = 'http://localhost:8080/elm/';
axios.interceptors.request.use((config) => {
    console.log(config.url);
    if (config.url !== '/login' && config.url !== '/register' &&
        config.url !== 'BusinessController/listBusinessByOrderTypeId' && config.url !== 'CartController/listCart' &&
        config.url !== 'BusinessController/getBusinessById' && config.url !== 'FoodController/listFoodByBusinessId') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

//将axios挂载到vue实例上，使用时就可以 this.$axios 这样使用了
app.config.globalProperties.$axios = axios;

app.config.globalProperties.$qs = qs;

app.config.globalProperties.$getCurDate = getCurDate;
app.config.globalProperties.$setSessionStorage = setSessionStorage;
app.config.globalProperties.$getSessionStorage = getSessionStorage;
app.config.globalProperties.$removeSessionStorage = removeSessionStorage;
app.config.globalProperties.$setLocalStorage = setLocalStorage;
app.config.globalProperties.$getLocalStorage = getLocalStorage;
app.config.globalProperties.$removeLocalStorage = removeLocalStorage;


router.beforeEach(function (to, from, next) {
    let user = localStorage.getItem('token');
    //除了登录、注册、首页、商家列表、商家信息之外，都需要判断是否登录
    if (!(to.path === '/' || to.path === '/index' || to.path === '/businessList' || to.path === '/businessInfo' || to.path === '/login' || to.path === '/register')) {
        if (user == null) {
            router.push('/login');
        }
    }
    next();
});

app.use(router).mount('#app')
