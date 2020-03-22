<template>
  <div>
      <table>
          <tr>
              <td><el-button type="info" @click="back">戻る</el-button></td>
               <td><el-button type="info" @click="goInterviewList">面接一覧</el-button></td>
              <td> <div v-show="!this.loginflg"><el-button type="primary" round @click="doLogin('hahah')">ログイン</el-button></div></td>
              <td> <div v-show="this.loginflg"><el-button type="primary" round @click="logout">ログアウト</el-button></div></td>
          </tr>
      </table>
      {{loginf}}
        
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
            watch:"" };
  },
  methods: {
    logout() {
      console.log("logout start");
      this.$cookies.remove("access_token");
      this.$router.push("/Home");
      console.log("logout");
      this.loginflg=false;
    },
    doLogin(title) {
      this.$router.push({ name: "Login", params: { title } });
     
    },
    back() {
      this.$router.go(-1); //返回上一层
    },
    goInterviewList(){
      this.$router.push("/interviewList");
    }
  },
  mounted() {
      console.log("lllllllllllllllllllll")
      this.watch=this.$store.state.userinfo
    if (this.$cookies.isKey("access_token")) {
      this.loginflg = true;
    } else {
      this.loginflg = false;
    }
  },
  computed:{
      loginf:function(){
      console.log("3333333333333333333")

              if (this.$cookies.isKey("access_token")) {
                this.loginflg = true;
                } else {
                this.loginflg = false;
                }
                return this.loginflg;
      }
  }
};
</script>

<style lang="scss" scoped>
</style>