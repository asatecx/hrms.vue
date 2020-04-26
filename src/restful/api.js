import Axios from 'axios'
import VueCookies from 'vue-cookies'
import store from '../store'

Axios.defaults.baseURL=store.state.globalSettings.apiUrl+'/niucaocao'
const addressurl='/getaddress'//人材の住所を取得する。
const skillurl='/getskillsource'
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

export function getaddress(searchkey){
    ////http://localhost:8091/niucaocao/getaddress

    return  Axios
    .get(addressurl, {
      params: {
        // ここにクエリパラメータを指定する
        city: searchkey
        //interviewTime:time,
        // interviewPlace:place,
      }
    })
    .then(res=>res.data);
  
   
}
export function getskillsource(){
   // http://localhost:8091/niucaocao/getskillsource

    return  Axios.get(skillurl)
   ;
}
export function getuserinfo(userid){
    return Axios.get(`${yyyurl}${userid}`).then(res=>res.data)
}

export function userinfo(paramas){
    return Axios.post(zzzzurl,paramas).then(res=>res.data)
}
