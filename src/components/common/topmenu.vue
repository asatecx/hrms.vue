<template>
  <div>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="black"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="home">
        <img src="../../assets/logo.jpg" height="100%" />
      </el-menu-item>
      <el-menu-item index="regist" style="float:right" v-show="!this.loginflg">会員登録</el-menu-item>
      <el-menu-item index="login" v-show="!this.loginflg" style="float:right">ログイン</el-menu-item>
      <el-submenu index="userInfo" v-show="this.loginflg" style="float:right">
        <template slot="title">
          <el-avatar  :src="`${headphoto+'?'+now}`"  @error="errorHandler">
            <img src="../../assets/default.png"/>
          </el-avatar>
          {{userid}}
        </template>
        <el-menu-item index="info">MY情報</el-menu-item>
         <el-menu-item index="eigyo" v-show="this.userType=='3'">自社人材管理</el-menu-item>
        <el-menu-item index="caseRegist" v-show="this.userType=='2'">案件登録</el-menu-item>
        <el-menu-item index="myinterview" v-show="this.userType=='2'">面接管理</el-menu-item>
        <el-menu-item index="resume" v-show="this.userType=='1'">MY履歴</el-menu-item>
        <el-menu-item index="interview" v-show="this.userType=='1'">MY面接</el-menu-item>
        <el-menu-item index="priceandshc" v-show="this.userType=='1'">MY単価・日程</el-menu-item>
        <el-menu-item index="appealvideo" v-show="this.userType=='1'">MYアピール動画</el-menu-item>
        <el-menu-item index="baseinfo" v-show="this.userType=='1'">MY基本情報</el-menu-item>
        <el-menu-item index="skillinfo" v-show="this.userType=='1'">MY技術情報</el-menu-item>
        <el-menu-item index="carearinfo" v-show="this.userType=='1'">MYプロジェクト履歴</el-menu-item>
        <el-menu-item index="logout">ログアウト</el-menu-item>
      </el-submenu>
      <el-menu-item index="findcase" style="float:right">案件を探す</el-menu-item>
      <el-menu-item index="findhr" style="float:right">人材を探す</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "topmenu",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return { 
      headphoto:this.$store.state.globalSettings.apiUrl +"/photos/"+this.$store.state.adminName + ".jpg",
      loginflg: false, activeIndex: "1", activeIndex2: "1", userid: "", userType: "" };
  },
  methods: {
    logout() {
      console.log("logout start");
      this.$cookies.remove("access_token");
      localStorage.clear();
      this.loginflg = false;
      this.$router.push("/Home");
      // this.$router.push({ name: "Login", params: { title: "" } });
      console.log("logout end");
    },
    doLogin(title) {
      this.$router.push({ name: "Login", params: { title } });
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    handleSelect(key, keyPath) {
      console.log(key);
      console.log(keyPath);
      if (key == "login") {
        this.doLogin("login");
      } else if (key == "home") {
        this.$router.push("/Home");
      } else if (key == "findcase") {
        // this.$router.push("/company");
        this.$router.push("/people");
      } else if (key == "findhr") {
        this.$router.push("/company");
      } else if (key == "regist") {
        //this.$router.push("/company.regist");
        this.$router.push("/regist");
      } else if (key == "caseRegist") {
        this.$router.push("/case/regist");
      } else if (key == "myinterview") {
        this.$router.push("/interview/interviewlist");
      } else if (key == "logout") {
        this.logout();
      } else if (key == "info") {
         this.$router.push("/myinfo");
      } else if (key == "interview") {
          this.$router.push("/interviewList");
      } else if (key == "priceandshc") {
         this.$router.push("/priceandshc");
      } else if (key =="eigyo"){
         
      }else if (key =="baseinfo"){
         this.$router.push("/baseinfo");
      }else if (key =="skillinfo"){
         this.$router.push("/skillinfo");
      }else if (key =="carearinfo"){
         this.$router.push("/carearinfo");
      }else if (key =="appealvideo"){
         this.$router.push("/appealvideo");//appealvideo
      }
    },
     errorHandler() {
        return true
      }
  },
  mounted() {
    this.userid = this.$store.state.adminName;
    if (this.$cookies.isKey("access_token")) {
      this.loginflg = true;
      // this.userType = this.$store.state.userInfo.userType;
      // this.userType = JSON.parse(localStorage.getItem('userType'));
      this.userType = localStorage.getItem('userType')
    } else {
      this.loginflg = false;
    }
  },
  computed: {

        now: function() {
        return Math.random();
      }
  }
};
</script>

<style lang="scss" scoped>
</style>