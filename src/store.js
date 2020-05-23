import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//多组件所共用的公共存储仓库
export default new Vuex.Store({
  // 公共数据读取方法：this.$store.state.adminName
  state: {  //当前数据的状态，类似于组件对象data属性
      adminName: localStorage.getItem('adminName'),  //当前登录的用户名
      globalSettings: { //项目的全局设置信息
      //apiUrl: 'http://127.0.0.1:8091'  //ローカル
    apiUrl: 'http://47.74.24.150:8091'  //リリース
  //  apiUrl: 'http://192.168.99.100:8091'  //ToolBOx
      },
      userinfo:{
        userId: '',
        userType: ''
      },
      myinfo:"",
      baseinfo:"",
      skillinfo:"",
      loginflg:false,
  },
  // 公共数据的修改方法：this.$store.commit('setAdminName','boss')
  // 公共数据的修改方法：this.$store.commit('setGlobalSettings',{...})
  mutations: {  //控制数据的进化（即修改state）,类似于组件对象中的methods——用mutations，修改数据可以保证数据的“响应式”
    setAdminName(state, value) {
      state.adminName = value
      console.log("adminName="+state.adminName)
    },
    setGlobalSettings(state, value) {
      state.globalSettings = value
    },
    setUserInfo(state, value){
      state.userInfo = value
      console.log(state.userInfo)
    },
    setmyinfo(state, value){
      state.myinfo = value
      console.log(state.myinfo)
    },
    setbaseinfo(state, value){
      state.baseinfo = value
     
    },
    setskillinfo(state, value){
      state.skillinfo = value
     
    }
  }
})
