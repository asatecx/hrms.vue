<template>

   <el-card >
      <div slot="header">パスワード</div>
        
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">


                <el-form-item label="パスワード" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                パスワードの安全度:
8 文字以上にしてください。別のサイトで使用しているパスワードや、すぐに推測できる単語（たとえばペットの名前）は使用しないでください
                <el-form-item label="もう一度パスワードを入力" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
  
    

               
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">パスワードを変更</el-button>
                  
                </el-form-item>
            </el-form>

        </el-card >
    
</template>

<script>
export default {
data() {
      var validatePass = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('パスワードを入力してください'));
    } else {
      if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('checkPass');
      }
      callback();
    }
  };
  var validatePass2 = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('パスワードを再度入力してください'));
    } else if (value !== this.ruleForm.password) {
      callback(new Error('パスワードが一致しません!'));
    } else {
      callback();
    }
  };
  return {
    ruleForm: {
      userId: this.$store.state.adminName,
      password: '',
      checkPass: '',
      userType:'1',
      validFlg:"1"
    },
    rules: {
      password: [
        { validator: validatePass, trigger: 'blur' }
      ],
      checkPass: [
        { validator: validatePass2, trigger: 'blur' }
      ],
      
    }
  };
},
methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {

         this.$store.commit("setUserInfo", this.ruleForm);
         this.changeAcount();
         this.$router.push("/comfirmAcount");
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
     changeAcount() {
                this.$http.changeAcount(this.$qs.stringify(this.ruleForm))
                .then(res => {
               console.log(res)
            if (res.data.data.res == "OK") {
            // 登录成功
        
              this.$router.push("/personalInfo");
 
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
    body{text-align:center} 
    .divcss5{margin:0 auto;
    width:500px;
    height:600px;
    padding: 20px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
    } 


</style>