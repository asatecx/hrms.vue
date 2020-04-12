<template>
  <div class="about">
    <el-card class="cat-login-card">
      <div slot="header">{{title}}ログイン</div>
      <div>
        <el-form label-width="100px">
          <el-form-item label="ユーザ名">
            <el-input placeholder="ユーザ名を入力してください" v-model="formData.userId"></el-input>
          </el-form-item>

          <el-form-item label="パスワード：">
            <el-input placeholder="パスワードを入力してください" type="password" v-model="formData.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="doLogin">ログイン</el-button>
            <el-button @click="doCancel">キャンセル</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div style="text-align: center;">
    HRMの新しいお客様ですか？<br>
 　<el-button type="primary" @click="makeAcount">HRMのアカウントを作成</el-button>
 <el-button type="primary" @click="upload">upload</el-button>
 <el-button type="primary" @click="playmovie">movie</el-button>
  </div>
  </div>
</template>
    
    <script>
        export default {
        inject: ['reload'],
        name:'Login',
        data(){
            return{
                formData: {
                        //表单中用户输入的两个数据
                        userId: "",
                        password: ""
                },
                title: ""
            }
        },
        methods:{
                back: function(){
                    this.$router.go(-1); //返回
                },
                showInfo: function(){
                    // 获取传过来的参数
                    this.title = this.$route.params.title;
                    //this.params = this.$route.query.name;
                },
                doCancel: function(){
                          //清除用户登录
                    this.formData.userId = "";
                    this.formData.password = "";
                },
                doLogin() {
                //执行登录
                var url = this.$store.state.globalSettings.apiUrl + '/main/login';
                this.$axios
                    .post(url,this.$qs.stringify(this.formData))
                    .then(res => {
                        console.log(res)
                    //if (res.data.data.res == "OK") {
                    if (res.data.errCode == "10000") {
                        // 登录成功
                        // 把用户名存入Vuex仓库
                        console.log("OKOKOKOK")
                       //http://docs.geetest.com/ 滑动认证的链接 但是我没用
                        this.$cookies.set('access_token',res.data.data)
                        this.$store.commit("setAdminName", this.formData.userId);
                        // console.log(this.$parent)
                       // this.$root.reload();
                       this.reload(); //刷新login控件
                         //this.$store.commit("setloginflg", true);
                        // 进行视图跳转
                     //   if(res.data.data.detail.userType == '1'){
                          this.$router.push("/People");
                     //   }else{
                     //     this.$router.push("/company");
                     //   }
                        
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
                    .catch(err => {
                    console.log(err);
                    });
                },
               makeAcount(){
                    this.$router.push("/makeAcount");
               },
               upload(){
                    this.$router.push("/upload");
               },
               playmovie(){
                    this.$router.push("/movie");
               },
            },
        mounted(){
            this.showInfo();
            }
        }
    </script>
    
<style lang="scss">
.cat-login-card {
  width: 400px;
  margin: 150px auto;

  .el-card__header {
    text-align: center;
    font-size: 1.2em;
  } 
}
</style>