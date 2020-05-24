<template>

   <el-card class="cat-login-card">
      <div slot="header">アカウントを作成</div>
        
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="ユーザーID" prop="userId">
                    <el-input v-model="ruleForm.userId"></el-input>
                </el-form-item>

                <el-form-item label="パスワード" prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="もう一度パスワードを入力" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    prop="email"
                    label="Eメールアドレス"
                    :rules="[
                    { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' },
                    { type: 'email', message: '有効なメールアドレスを入力してください', trigger: ['blur', 'change'] }
                    ]"
                >
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>

                   <!-- <el-radio v-model="ruleForm.userType" label="1" border>フリーランス</el-radio>
                  <el-radio v-model="ruleForm.userType" label="2" border>営業担当</el-radio> -->

               
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">作成</el-button>
                    <el-button @click="resetForm('ruleForm')">リセット</el-button>
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
      userId: '',
      password: '',
      checkPass: '',
      email: '',
      userType:'1',
      validFlg:"1"
    },
    rules: {
      name: [
        { required: true, message: '名前を入力してください', trigger: 'blur' },
      
      ],
      furikana: [
        { required: true, message: '名前を入力してください', trigger: 'blur' },
        
      ],
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
          //this.$axios.post('http://localhost:8080/niucaocao/makeAcount',this.$qs.stringify(this.ruleForm))
          //alert('submit!');
         this.$store.commit("setUserInfo", this.ruleForm);
         this.$router.push("/comfirmAcount");
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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

.cat-login-card {
  width: 400px;
  margin: 150px auto;

  .el-card__header {
    text-align: center;
    font-size: 1.2em;
    // background-color: rgb(132, 230, 149);
    background: linear-gradient(to bottom,#1C86EE,#ffffff);
  }
}
</style>