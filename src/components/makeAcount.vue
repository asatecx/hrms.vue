    <template>
        <div class="divcss5">
            <p style="text-align: center;"> アカウントを作成</p>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="名前" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="フリガナ" prop="furikana">
                        <el-input v-model="ruleForm.furikana"></el-input>
                    </el-form-item>
                    <el-form-item label="パスワード" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
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
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">作成</el-button>
                        <el-button @click="resetForm('ruleForm')">リセット</el-button>
                    </el-form-item>
                </el-form>
        </div>
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
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('パスワードが一致しません!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          name: '',
          furikana: '',
          pass: '',
          checkPass: '',
          email: ''
        },
        rules: {
          name: [
            { required: true, message: '名前を入力してください', trigger: 'blur' },
          
          ],
         furikana: [
            { required: true, message: '名前を入力してください', trigger: 'blur' },
           
          ],
         pass: [
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
              
          let formData = new FormData();
            //下面是表单绑定的data 数据
            formData.append('name', this.name);
            formData.append('furikana', this.name);
            formData.append('password', this.age);
            formData.append('email', this.file);
            
            //vue-resource
            this.$http.post('/makeAcount', formData).then(res => {
                // success callback
            }, err => {
                // error callback
            });

            alert('submit!');
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
        .divcss5{margin:0 auto;width:600px;height:600px;border:1px solid #000} 
    </style>