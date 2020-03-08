<template>
  <div class="about">
    <el-card class="cat-login-card">
      <div slot="header">{{title}}登録</div>
      <div>
        <el-form label-width="100px">
          <el-form-item label="ユーザ名">
            <el-input placeholder="ユーザ名を入力してください" v-model="formData.aname"></el-input>
          </el-form-item>

          <el-form-item label="パスワード：">
            <el-input placeholder="パスワードを入力してください" type="password" v-model="formData.apwd"></el-input>
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
  </div>
  </div>
</template>
    
    <script>
        export default {

        name:'Login',
        data(){
            return{
                formData: {
                        //表单中用户输入的两个数据
                        aname: "",
                        apwd: ""
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
                    this.formData.aname = "";
                    this.formData.apwd = "";
                },
                doLogin() {
                //执行登录
               // var url =
                //    this.$store.state.globalSettings.apiUrl +
                //    `/admin/login/${this.formData.aname}/${this.formData.apwd}`;
                var url=`http://localhost:8080/${this.formData.aname}/${this.formData.apwd}`
                this.$axios
                    .get(url)
                    .then(res => {
                        console.log(res)
                    if (res.data.code == 200) {
                        // 登录成功
                        // 把用户名存入Vuex仓库
                        console.log("OKOKOKOK")
                       
                        this.$store.commit("setAdminName", this.formData.aname);
                        // 进行视图跳转
                        this.$router.push("/People");
                    } else {
                        //登录失败
                        this.$alert("用户名或密码有误！", "登录失败", { type: "error" })
                        .then(() => {
                            this.formData.apwd = "";
                        })
                        .catch(() => {
                            this.formData.apwd = "";
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