import Axios from 'axios'
import VueCookies from 'vue-cookies'
Axios.defaults.baseURL='http://localhost:8080/niucaocao'
const xxxurl='/cccc'
const yyyurl='/cccc/?userid='
const zzzzurl='/zzzz'

//tokenの説明
//https://blog.csdn.net/c880420/article/details/80346127
//https://blog.csdn.net/qq_32784541/article/details/79655146?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task

//axiosの説明
//https://www.kancloud.cn/yunye/axios/234845

// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if(VueCookies.isKey('access_token')){
        Axios.defaults.headers.common['Authorization'] = VueCookies.get('access_token');
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

export function geetest(){
    return Axios.get(xxxurl).then(res=>res.data)
}

export function getuserinfo(userid){
    return Axios.get(`${xxxurl}${userid}`).then(res=>res.data)
}

export function userinfo(paramas){
    return Axios.post(zzzzurl,paramas).then(res=>res.data)
}