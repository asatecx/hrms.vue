import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
//多组件所共用的公共存储仓库
export default new Vuex.Store({
  // 公共数据读取方法：this.$store.state.adminName
  state: {  //当前数据的状态，类似于组件对象data属性
      adminName: '',  //当前登录的管理员名
      globalSettings: { //项目的全局设置信息
      apiUrl: 'http://127.0.0.1:8080'  //初始值
      },
      userinfo:'',
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
    setuserinfo(state, value){
      state.userinfo=value
      console.log("userinfo="+state.userinfo)
    }
  }
})
