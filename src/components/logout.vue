<template>
  <div>
      <!-- <table>
          <tr>
              <td><el-button type="info" @click="back">戻る</el-button></td>
               <td><el-button type="info" @click="goInterviewList">面接一覧</el-button></td>
              <td> <div v-show="!this.loginflg"><el-button type="primary" round @click="doLogin('hahah')">ログイン</el-button></div></td>
              <td> <div v-show="this.loginflg"><el-button type="primary" round @click="logout">ログアウト</el-button></div></td>
          </tr>
      </table>
  -->



<el-menu
  :default-active="activeIndex2"
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  background-color="black"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="1"><img src="../assets/logo.jpg" height="100%"><img></el-menu-item>
  <el-menu-item index="2" >案件情報</el-menu-item>
  <!-- <el-menu-item index="2" disabled>案件情報</el-menu-item> -->
  <!-- <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item> -->
  <el-menu-item index="3" v-show="!this.loginflg">ログイン</el-menu-item> 
  <el-submenu index="4" v-show="this.loginflg">
    <template slot="title">
      <el-avatar src="http://localhost:8080/movie/head.jpg"></el-avatar>
      {{userid}}
    </template>
     <el-menu-item index="info">MY情報</el-menu-item>
    <el-menu-item index="resume">MY履歴</el-menu-item>
    <el-menu-item index="interview">MY面接</el-menu-item>
    <el-menu-item index="logout">ログアウト</el-menu-item>
  </el-submenu>
</el-menu>





        
  </div>
</template>

<script>
export default {
  name: "LoginOut",
  provide () {
    return {
      reload: this.reload
    }
  },
  data() {
    return { loginflg: false,
        activeIndex: '1',
        activeIndex2: '1',
        userid:""
            };
  },
  methods: {
    logout() {
      console.log("logout start");
      this.$cookies.remove("access_token");
       this.loginflg=false;
      //this.$router.push("/Home");
        this.$router.push({ name: 'Login', params:{title:"kkk"}});
      console.log("logout end");
     
    },
    doLogin(title) {
      this.$router.push({ name: "Login", params: { title } });
     
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    goInterviewList(){
      this.$router.push("/interviewList");
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
        if(keyPath[1]=="logout"){
            this.logout();
        }else if (key[0]=="3"){
          this.doLogin("login");
        }else if(key[0]=="1"){
          this.$router.push("/Home");
        }else if(keyPath[1]=="info"){
          this.$router.push("/myinfo");
        }
      }
  },
  mounted() {
      console.log("lllllllllllllllllllll")
      console.log("lllllllllllllllllllll"+this.$store.state.adminName)
      this.userid=this.$store.state.adminName;
      
    if (this.$cookies.isKey("access_token")) {
      this.loginflg = true;
    } else {
      this.loginflg = false;
    }
  },
  computed:{

  }
};
</script>

<style lang="scss" scoped>
</style>