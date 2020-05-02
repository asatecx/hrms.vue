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
          <el-avatar  :src="`${headphoto+'?'+now}`"></el-avatar>
          {{userid}}
        </template>
        <el-menu-item index="info">MY情報</el-menu-item>
        <el-menu-item index="caseRegist" v-show="this.userType=='2'">案件登録</el-menu-item>
        <el-menu-item index="resume">MY履歴</el-menu-item>
        <el-menu-item index="interview">MY面接</el-menu-item>
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
        alert("工事中");
      } else if (key == "findhr") {
        this.$router.push("/company");
      } else if (key == "regist") {
        //this.$router.push("/company.regist");
        this.$router.push("/regist");
      } else if (key == "caseRegist") {
        this.$router.push("/case/regist");
      } else if (key == "logout") {
        this.logout();
      } else if (key == "info") {
         this.$router.push("/myinfo");
      } else if (key == "interview") {
          this.$router.push("/interviewList");
      }
    }
  },
  mounted() {
    this.userid = this.$store.state.adminName;
    if (this.$cookies.isKey("access_token")) {
      this.loginflg = true;
      this.userType = this.$store.state.userInfo.userType;
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