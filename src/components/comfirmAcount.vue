<template>
    <div>
          <table border="1" style="border-color:gray">
              <tr >
                  <td>名前</td>
                  <td style="width:100px">{{userinfo.userId}}</td>
              </tr>
             
              <tr>
                  <td>Eメール</td>
                  <td>{{userinfo.email}}</td>
              </tr>

              <tr>
                  <td>type</td>
                  <td>{{userinfo.userType}}</td>
              </tr>
          </table>
           <el-button type="primary" @click="submitForm()">ok</el-button>
    </div>
</template>

<script>
    export default {
          inject: ["reload"],
                data(){
            return{
                userinfo:''
             }
           },
           created(){
               console.log(this.$store.state.userInfo)
               this.userinfo=this.$store.state.userInfo
           },
           methods: {
            submitForm() {
                this.$http.makeAcount(this.$qs.stringify(this.userinfo))
                .then(res => {
               console.log(res)
            if (res.data.data.res == "OK") {
            // 登录成功
            // 把用户名存入Vuex仓库
            //http://docs.geetest.com/ 滑动认证的链接 但是我没用
            this.$cookies.set("access_token", res.data.data);
            this.$store.commit("setAdminName", res.data.data.detail.userId);
            this.$store.commit("setUserInfo", res.data.data.detail);
            // console.log(this.$parent)
            // this.$root.reload();
            this.reload(); //刷新login控件??????????
            //this.$store.commit("setloginflg", true);
            // 进行视图跳转
            if (res.data.data.detail.userType == "1") {
              this.$router.push("/People");
            } else {
              this.$router.push("/company");
            }
          } else {
            //登录失败
            this.$alert("用户名或密码有误！", "登录失败", { type: "error" })
              .then(() => {
                this.formData.password = "";
              })
              .catch(() => {
                this.formData.password = "";
              });
          }
        })
          
                //this.$axios.post('http://localhost:8080/niucaocao/makeAcount',this.$qs.stringify(this.userinfo))
                //this.$router.push("/people");
            }
           }
    }
</script>

<style lang="scss" scoped>

</style>