<template>
    <div style="box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);width:500px">
続行するには、まず本人確認を行ってください
<el-input placeholder="パスワードを入力" v-model="formData.password" show-password></el-input>
 <el-button type="primary" @click="change">次へ</el-button>

<fogetpassword></fogetpassword>
    </div>
</template>

<script>
    export default {
            data() {
                    return {
                            formData: {
                              //表单中用户输入的两个数据
                              userId: this.$store.state.adminName,
                              password: ""
                            },


                    }
            },
      methods:{
          change(){
              this.doLogin();
          },
           doLogin() {
      //执行登录
      var url = this.$store.state.globalSettings.apiUrl + "/main/login";
      this.$axios
        .post(url, this.formData)
        .then(res => {
          console.log(res)
            if (res.data.success) {
            // 登录成功
            // 把用户名存入Vuex仓库

            this.$cookies.set("access_token", res.data.data);
            this.$store.commit("setAdminName", this.formData.userId);
            this.$store.commit("setUserInfo", res.data.data.detail);
            localStorage.setItem('adminName', this.formData.userId);
     
            localStorage.setItem('userType', res.data.data.detail.userType);

            //this.reload(); //刷新login控件
              this.$router.push("/passwordChange");
  
          } else {
            //登录失败
             this.$alert("パスワードが正しくありません!", "パスワード", { type: "error" })
               .then(() => {
                 this.formData.password = "";
               })
               .catch(() => {
                 this.formData.password = "";
               });
            this.isShow = true;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
      }
        
    }
</script>

<style lang="scss" scoped>

</style>