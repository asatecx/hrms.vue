import Axios from 'axios'
import VueCookies from 'vue-cookies'
import store from '../store'

Axios.defaults.baseURL=store.state.globalSettings.apiUrl+'/niucaocao'
const addressurl='/getaddress'//人材の住所を取得する。
const skillurl='/getskillsource'
const toptenurl='/gettopTen'
const CaseListurl ='/getCaseList'
const interviewListurl ='/interviewList'

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

//http://localhost:8080/niucaocao/gettopTen
//toptenurl
export function gettopTen(searchkey,id){
  return Axios
  .get(toptenurl, {
    params: {
      // ここにクエリパラメータを指定する
      keyword: searchkey,
      userid:id,
      //interviewTime:time,
      // interviewPlace:place,
    }
  })
 
}
//http://localhost:8080/niucaocao/getCaseList
export function getCaseList(searchkey,id,currentPage,pagesize){
  return Axios
  .get(CaseListurl, {
    params: {
      // ここにクエリパラメータを指定する
      keyword: searchkey,
      userid:id,
      currentPage:currentPage,
      pagesize:pagesize,
      //interviewTime:time,
      // interviewPlace:place,
    }
  })
}
//http://localhost:8080/niucaocao/interviewList
export function getInterviewList(comName,id,currentPage,pagesize){
     
  return  Axios.get(interviewListurl, {
        params: {
            // ここにクエリパラメータを指定する
            companyName:comName ,
            userid:id,
            currentPage:currentPage,
            pagesize:pagesize,
            //interviewTime:time,
          // interviewPlace:place,
        }
    })
}

export function gettotest(userid){
    return Axios.get(`${yyyurl}${userid}`).then(res=>res.data)
}

export function userinfo(paramas){
    return Axios.post(zzzzurl,paramas).then(res=>res.data)
}
