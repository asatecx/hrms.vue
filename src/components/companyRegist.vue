<template>
  <div>
    <!-- <div style=" border: 4px  dashed #d9d9d9;width:178px">
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8080/niucaocao/headphoto"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>-->

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <span>会員情報入力</span>
      <el-row class>
        <div class="sub-title">名前<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
        <el-col :span="10">
          <div class="sub-title">姓</div>
          <el-form-item>
            <el-input v-model="userNameFirst" placeholder="例）山田"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <div class="sub-title">名</div>
          <el-form-item>
            <el-input v-model="userNameLast" placeholder="例）一郎"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">表示名前</div>
          <el-form-item>
            <el-input v-model="ruleForm.userNameDisp" placeholder="例）yamada2020"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">電話番号（ハイフン不要）<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item>
            <el-input v-model="ruleForm.tel" placeholder="例）08033445566"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">メールアドレス<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item>
            <el-input v-model="ruleForm.mail" placeholder="例）sales@asatecx.com"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">パスワード<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item>
            <el-input placeholder="" v-model="ruleForm.password" show-password></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">会社名<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item>
            <el-input v-model="ruleForm.companyName" placeholder="例）株式会社アサテクス"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">会社URL<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item>
            <el-input v-model="ruleForm.companyURL" placeholder="例）http://www.asatecx.com"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">設立年（西暦）<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item>
            <el-input v-model="ruleForm.establishYear" placeholder="例）2019"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">従業員数（人）<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item>
            <el-input v-model="ruleForm.staffNum" placeholder="例）30"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bottom clearfix">
            <el-button type="primary" @click="submitForm('ruleForm')">会員登録</el-button>
          </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      // ruleForm: {
      //   name: "",
      //   region: "",
      //   date1: "",
      //   date2: "",
      //   delivery: false,
      //   type: [],
      //   sex: "",
      //   desc: ""
      // },
      userNameFirst: "",
      userNameLast: "",
      ruleForm: {
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
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        sex: [{ required: true, message: "请选择活动资源", trigger: "change" }],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },

      zipcode: "",
      addressData: {},
      message: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitForm(formName) {
      var url = this.$store.state.globalSettings.apiUrl + '/company/regist';
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.userName = this.userNameFirst + '　' + this.userNameLast;
          this.$axios.post(url, this.ruleForm)
                    .then(res => {
                        console.log(res)
                    if (res.data.data.res == "OK") {
                        // 登录成功
                        // 进行视图跳转
                        this.$router.push("/People");
                        
                    } else {
                        //登录失败
                        this.$alert( "登录失败", { type: "error" })
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