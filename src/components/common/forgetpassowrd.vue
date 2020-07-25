<template>
    <div>
<el-link type="primary" @click="dialogVisible = true">パスワードをお忘れの場合</el-link>
<el-dialog
  title="メッセージ"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>新しいパスワードを発行しますでしょうか</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">いいえ</el-button>
    <el-button type="primary" @click="sendNewPassWord">はい</el-button>
  </span>
</el-dialog>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                 dialogVisible: false,
                ruleForm: {
                    userId: this.$store.state.adminName,
                    password: '',
                    checkPass: '',
                    userType:'',
                    validFlg:""
                },
            }
        },
        methods:{
             handleClose(done) {
        this.$confirm('閉じます？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
            sendNewPassWord(){
                this.dialogVisible = false;
                let message='新しいパスワードを発行した後にご登録頂いたメールアドレスに送信、少々お待ちください。'
                this.open1(message);
              this.changePassword();
            },
                open1(message) {
        const h = this.$createElement;

        this.$notify({
          title: 'メッセージ',
          message: h('i', { style: 'color: teal'},message )
        });
      },

                 changePassword() {
                            this.$http.changePassword(this.$qs.stringify(this.ruleForm))
                            .then(res => {
                        console.log(res)
                            if (res.data.data.res == "OK") {
                            // 登录成功
                        
                           // this.$router.push("/personalInfo");
                           let message='新しいパスワードをご登録頂いたメールアドレスに送信しました、ご確認ください。'
                         this.open1(message);
                        } else {
                            //登录失败

                        }
                        }).catch(err => { console.log(err);
                                                            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                                                                loadingInstance.close();
                                                                });
                                                            this.$router.push("/errpage");
                                                        });
                    }



        }
    }
</script>

<style lang="scss" scoped>

</style>