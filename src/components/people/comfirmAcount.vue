<template>
    <div style="height:600px">
          <table  style="border-color:gray;margin: 0px auto">
              <tr >
                  <td>名前:</td>
                  <td style="width:100px">{{userinfo.userId}}</td>
              </tr>
             
              <tr>
                  <td>Eメール:</td>
                  <td>{{userinfo.email}}</td>
              </tr>

  
          </table>
          <div style="margin-top: 50px ">
           <el-button type="primary" @click="submitForm()">提出</el-button>
           <el-button type="primary" @click="back" >戻る</el-button>
           </div>
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
             back: function() {
                this.$router.go(-1); //返回
             },
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
           localStorage.setItem('userType', res.data.data.detail.userType);
           
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
            this.$alert("登録が失敗しました", "登録が失敗しました", { type: "error" })
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