<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
    <el-page-header @back="goBack" content="案件登録" /><br/>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">案件名称／概要<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="casename">
            <el-input v-model="ruleForm.casename" maxlength="100" placeholder="例）XXXXシステム開発"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">作業場所<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="workplace">
            <el-input v-model="ruleForm.workplace" placeholder="東京"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="5">
          <div class="sub-title">開始<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="startdate">
            <el-date-picker v-model="ruleForm.startdate" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder=""/>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <div class="sub-title">終了</div>
          <el-form-item prop="enddate">
            <el-date-picker v-model="ruleForm.enddate" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder=""/>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row class>
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
      </el-row> -->
      <el-row class>
        <el-col :span="10">
          <div class="sub-title">作業内容<el-tag type="danger" effect="dark" size="small">必須</el-tag></div>
          <el-form-item prop="workcontent">
            <el-input type="textarea" placeholder="" v-model="ruleForm.workcontent" maxlength="300" rows="5" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row class>
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
      </el-row> -->
      <el-row class>
        <el-col :span="20">
          <div class="sub-title">備考</div>
          <el-form-item prop="memo">
            <el-input type="textarea" placeholder="" v-model="ruleForm.memo" maxlength="200" rows="5" show-word-limit />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bottom clearfix">
            <el-button type="primary" @click="caseRegist('ruleForm')">登録</el-button>
          </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {

      ruleForm: {
        userId: this.$store.state.adminName,
        casename: "",
        workplace: "",
        workcontent: "",
        startdate: "",
        enddate: "",
        memo: "",
      },
      rules: {
        caseName: [
          { required: true, message: "案件名称入力必須", trigger: "blur" },
          { max: 100, message: "最大桁数(100)超えた", trigger: "blur" }
        ],
        workplace: [
          { required: true, message: "作業場所入力必須", trigger: "blur" },
          { max: 300, message: "最大桁数(300)超えた", trigger: "blur" }
        ],
        workcontent: [
          { required: true, message: "作業内容入力必須", trigger: "blur" },
          { max: 300, message: "最大桁数(300)超えた", trigger: "blur" }
        ],
        startdate: [
          { required: true, message: "開始日入力必須", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    caseRegist(formName) {
      var url = this.$store.state.globalSettings.apiUrl + '/case/regist';
      this.ruleForm.startdate = this.$moment(this.$route.params.startdate).utcOffset(540).format('YYYY-MM-DD HH:mm:ss.SSS');
      this.ruleForm.enddate = this.$moment(this.$route.params.enddate).utcOffset(540).format('YYYY-MM-DD HH:mm:ss.SSS');
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post(url, this.ruleForm)
                    .then(res => {
                        console.log(res)
                    if (res.data.success) {
                        // 登录成功
                        // 进行视图跳转
                        this.$router.push("/case/caselist");
                        
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
    goBack() {
      this.$router.go(-1); //返回上一层
    },
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