<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-page-header @back="goBack" content="会社情報入力" />
      <div style="padding-top: 50px;padding-left: 20%;">
        <el-row class>
          <div class="sub-title">
            名前
            <el-tag type="danger" effect="dark" size="small">必須</el-tag>
          </div>
          <el-col :span="7">
            <div class="sub-title">姓</div>
            <el-form-item prop="userNameFirst">
              <el-input v-model="ruleForm.userNameFirst" placeholder="例）山田"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <div class="sub-title">名</div>
            <el-form-item prop="userNameLast">
              <el-input v-model="ruleForm.userNameLast" placeholder="例）一郎"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="10">
            <div class="sub-title">表示名前</div>
            <el-form-item prop="userNameDisp">
              <el-input v-model="ruleForm.userNameDisp" placeholder="例）yamada2020"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="10">
            <div class="sub-title">
              電話番号（ハイフン不要）
              <el-tag type="danger" effect="dark" size="small">必須</el-tag>
            </div>
            <el-form-item prop="tel">
              <el-input v-model="ruleForm.tel" placeholder="例）08033445566"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="10">
            <div class="sub-title">
              メールアドレス
              <el-tag type="danger" effect="dark" size="small">必須</el-tag>
            </div>
            <el-form-item prop="mail">
              <el-input v-model="ruleForm.mail" placeholder="例）sales@asatecx.com"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="10">
            <div class="sub-title">
              パスワード
              <el-tag type="danger" effect="dark" size="small">必須</el-tag>
            </div>
            <el-form-item prop="password">
              <el-input placeholder v-model="ruleForm.password" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="15">
            <div class="sub-title">
              会社名
              <el-tag type="danger" effect="dark" size="small">必須</el-tag>
            </div>
            <el-form-item prop="companyName">
              <el-input v-model="ruleForm.companyName" placeholder="例）株式会社アサテクス"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="15">
            <div class="sub-title">
              会社URL
              <el-tag type="danger" effect="dark" size="small">必須</el-tag>
            </div>
            <el-form-item prop="companyURL">
              <el-input v-model="ruleForm.companyURL" placeholder="例）http://www.asatecx.com"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="5">
            <div class="sub-title">
              設立年（西暦）
              <el-tag type="danger" effect="dark" size="small">必須</el-tag>
            </div>
            <el-form-item prop="establishYear">
              <el-date-picker v-model="ruleForm.establishYear" type="year" format="yyyy" value-format="yyyy" placeholder="例）2019"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="6">
            <div class="sub-title">
              従業員数（人）
              <el-tag type="danger" effect="dark" size="small">必須</el-tag>
            </div>
            <el-form-item prop="staffNum">
              <el-input-number
                v-model="ruleForm.staffNum"
                @change="handleChange1"
                :min="0"
                :max="100000"
                label="描述文字"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col :span="20">
            <div class="bottom clearfix">
              <el-button type="primary" @click="submitForm('ruleForm')" size="medium">会員登録</el-button>
              <el-button type="primary" @click="goBack()" size="medium">戻る</el-button>
            </div>
          </el-col>
        </el-row>
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
        staffNum: ""
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
        ]
      },

      zipcode: "",
      addressData: {},
      message: ""
    };
  },
  methods: {
    submitForm(formName) {
      var url = this.$store.state.globalSettings.apiUrl + "/company/regist";
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(url, this.ruleForm)
            .then(res => {
              console.log(res);
              if (res.data.success) {
                // 登录成功
                // 进行视图跳转
                this.$router.push("/Home");
              } else {
                //登录失败
                this.$alert(res.data.message, { type: "error" })
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
    goBack(){
        this.$router.push("/Home");
    },
  }
};
</script>

<style lang="scss" scoped>
.sub-title {
  height: 30px;
  line-height: 30px;
  padding-left: 100px;
  text-align: left;
}
</style>