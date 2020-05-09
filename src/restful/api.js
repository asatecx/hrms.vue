import Axios from 'axios'
import VueCookies from 'vue-cookies'
import store from '../store'

Axios.defaults.baseURL=store.state.globalSettings.apiUrl
const addressurl='/niucaocao/getaddress'//人材の住所を取得する。
const skillurl='/niucaocao/getskillsource'
const toptenurl='/niucaocao/gettopTen'
const CaseListurl ='/niucaocao/getCaseList'
const interviewListurl ='/niucaocao/interviewList'
const delInterviewurl ='/niucaocao/deleteInterview'
const caseDetailurl ='/niucaocao/getCaseDetail'
const acounturl='/main/makeAcount'
const tankaurl='/niucaocao/tanka'
const gettankaurl='/niucaocao/gettanka'
const baseinfourl='/niucaocao/baseinfo'
const skillinfourl='/niucaocao/skillinfo'
const carearinfourl='/niucaocao/carearinfo'

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
            casename:comName ,
            userid:id,
            currentPage:currentPage,
            pagesize:pagesize,
            //interviewTime:time,
          // interviewPlace:place,
        }
    })
}
//delInterviewurl
export function deleteInterview(interviewId,userid){
     
  return  Axios.get(delInterviewurl, {
        params: {
            // ここにクエリパラメータを指定する
            interviewId:interviewId ,
            userid:userid,
 
        }
    })
}
//http://localhost:8080/niucaocao/getCaseDetail
//caseDetailurl
export function getCaseDetail(selectID){
 
  return  Axios.get(caseDetailurl, {
      params: {
          // ここにクエリパラメータを指定する
          id:selectID ,
      }
  })
}
//this.$axios.post('http://localhost:8080/niucaocao/makeAcount',this.$qs.stringify(this.userinfo))
export function makeAcount(userinfo){
 
  return  Axios.post(acounturl,userinfo)
}

export function modifytanka(tankainfo){
 
  return  Axios.post(tankaurl,tankainfo)
}

export function modifybaseinfo(baseinfo){
 
  return  Axios.post(baseinfourl,baseinfo)
}

//https://blog.csdn.net/Moddlec/article/details/83894308
export function modifyskillinfo(skillinfo){
 
  return  Axios.post(skillinfourl, skillinfo
)
}

export function modifycarearinfo(carearinfo){
 
  return  Axios.post(carearinfourl,carearinfo)
}

export function getTanka(userId){
     
  return  Axios.get(gettankaurl, {
        params: {
            // ここにクエリパラメータを指定する
    
            userid:userId,

        }
    })
}







export function gettotest(userid){
    return Axios.get(`${yyyurl}${userid}`).then(res=>res.data)
}

export function userinfo(paramas){
    return Axios.post(zzzzurl,paramas).then(res=>res.data)
}
