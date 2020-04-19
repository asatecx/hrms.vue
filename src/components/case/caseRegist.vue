<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <span>案件情報入力</span>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">案件名称／概要<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="userNameFirst">
            <el-input v-model="ruleForm.userNameFirst" placeholder="例）山田"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">作業場所</div>
          <el-form-item prop="userNameDisp">
            <el-input v-model="ruleForm.userNameDisp" placeholder="例）yamada2020"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="5">
          <div class="sub-title">開始<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="">
            <el-date-picker v-model="value1" type="date" placeholder="选择日期"/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <div class="sub-title">終了</div>
          <el-form-item prop="">
            <el-date-picker v-model="value2" type="date" placeholder="选择日期"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">必須スキル<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="例）08033445566"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">尚可スキル<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="tel">
            <el-input v-model="ruleForm.tel" placeholder="例）08033445566"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="10">
          <div class="sub-title">作業内容<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="">
            <el-input type="textarea" placeholder="" v-model="textarea" maxlength="300" rows="5" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="5">
          <div class="sub-title">募集人数<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="password">
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="200" label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="5">
          <div class="sub-title">面談回数<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="companyName">
            <el-input-number v-model="num1" @change="handleChange1" :min="0" :max="5" label="描述文字"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="5">
          <div class="sub-title">精算時間<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="companyURL">
            <el-input v-model="ruleForm.companyURL" placeholder=""></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="4">
          <div class="sub-title">外国籍可否</div>
          <el-form-item prop="establishYear">
            <el-radio-group v-model="radio1">
              <el-radio-button label="可"></el-radio-button>
              <el-radio-button label="不可"></el-radio-button>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">備考</div>
          <el-form-item prop="staffNum">
            <el-input type="textarea" placeholder="" v-model="textarea" maxlength="200" rows="5" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bottom clearfix">
            <el-button type="primary" @click="submitForm('ruleForm')">案件登録</el-button>
          </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {

      ruleForm: {
        userNameFirst: "",
        userNameLast: "",
        userName: "",
        userNameDisp: "",
        tel: "",
        mail: "",
        password: "",
        companyName: "",
        companyURL: "",
        establishYear: "",
        staffNum: "",
      },
      rules: {
        userNameFirst: [
          { required: true, message: "お名前(姓)入力必須", trigger: "blur" },
          { max: 10, message: "最大桁数(10)超えた", trigger: "blur" }
        ],
        userNameLast: [
          { required: true, message: "お名前(名)入力必須", trigger: "blur" },
          { max: 10, message: "最大桁数(10)超えた", trigger: "blur" }
        ],
        userNameDisp: [
          { required: true, message: "表示名入力必須", trigger: "blur" },
          { max: 20, message: "最大桁数(20)超えた", trigger: "blur" }
        ],
        mail: [
          {
            type: "email",
            required: true,
            message: "メール形式不正",
            trigger: "blur"
          }
        ],
      },
      value1: '',
      value2: '',
      radio1: '可',
      num: 1,
      num1: 1,
    };
  },
  methods: {
    submitForm(formName) {
      var url = this.$store.state.globalSettings.apiUrl + '/company/regist';
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(url, this.ruleForm)
                    .then(res => {
                        console.log(res)
                    if (res.data.success) {
                        // 登录成功
                        // 进行视图跳转
                        this.$router.push("/People");
                        
                    } else {
                        //登录失败
                        this.$alert( res.data.message, { type: "error" })
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
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    focus() {
      this.zipcode = "";
      this.addressData = {};
      this.message = "";
    },
    handleChange(value) {
        console.log(value);
    },
    handleChange1(value) {
        console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
  .sub-title{
    height: 30px;
    line-height:30px;
    padding-left: 100px;
    text-align : left;
  }
</style>