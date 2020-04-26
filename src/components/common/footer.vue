<template>
  <div>
    xxxxxxx
  </div>
</template>

<script>
export default {
  name: "footer",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return { loginflg: false, activeIndex: "1", activeIndex2: "1", userid: "", userType: "" };
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
    goInterviewList() {
      this.$router.push("/interviewList");
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
        this.$router.push("/company.regist");
      } else if (key == "caseRegist") {
        this.$router.push("/case/regist");
      } else if (key == "logout") {
        this.logout();
      } else if (key == "info") {
         this.$router.push("/myinfo");
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
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>