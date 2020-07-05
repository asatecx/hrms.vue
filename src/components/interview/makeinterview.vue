<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-page-header @back="goBack" content="面接予約登録"/>
      <el-row class>
        <el-form-item prop="">
          <br/>
        </el-form-item>
      </el-row>
      <el-row class>
        <el-col :span="10">
          <div class="sub-title">案件名称／概要</div>
          <el-form-item prop="casename">
            <el-input v-model="ruleForm.casename" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="10">
          <div class="sub-title">作業場所</div>
          <el-form-item prop="workplace">
            <el-input v-model="ruleForm.workplace" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="10">
          <div class="sub-title">面談場所</div>
          <el-form-item prop="interviewplace">
            <el-input v-model="ruleForm.interviewplace" placeholder></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="4">
          <div class="sub-title">
            予約時刻１
          </div>
          <el-form-item prop="interviewdate1">
            <el-date-picker v-model="ruleForm.interviewdate1" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder="日付" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div class="sub-title"/>
          <el-form-item prop="starttime1">
            <el-time-select
              v-model="ruleForm.starttime1"
              :picker-options="{start: '08:30',step: '00:15',end: '20:30'}"
              placeholder="開始時刻" style="width:150%"
            ></el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div class="sub-title"/>
          <el-form-item prop="endtime1">
            <el-time-select
              v-model="ruleForm.endtime1"
              :picker-options="{start: '08:30',step: '00:15',end: '20:30'}"
              placeholder="終了時刻" style="width:150%"
            ></el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="4">
          <div class="sub-title">
            予約時刻２
          </div>
          <el-form-item prop="interviewdate2">
            <el-date-picker v-model="ruleForm.interviewdate2" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder="日付" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div class="sub-title"/>
          <el-form-item prop="starttime2">
            <el-time-select
              v-model="ruleForm.starttime2"
              :picker-options="{start: '08:30',step: '00:15',end: '20:30'}"
              placeholder="開始時刻" style="width:150%"
            ></el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div class="sub-title"/>
          <el-form-item prop="endtime2">
            <el-time-select
              v-model="ruleForm.endtime2"
              :picker-options="{start: '08:30',step: '00:15',end: '20:30'}"
              placeholder="終了時刻" style="width:150%"
            ></el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="4">
          <div class="sub-title">
            予約時刻３
          </div>
          <el-form-item prop="interviewdate3">
            <el-date-picker v-model="ruleForm.interviewdate3" type="date" format="yyyy/MM/dd" value-format="yyyy/MM/dd" placeholder="日付" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div class="sub-title"/>
          <el-form-item prop="starttime3">
            <el-time-select
              v-model="ruleForm.starttime3"
              :picker-options="{start: '08:30',step: '00:15',end: '20:30'}"
              placeholder="開始時刻" style="width:150%"
            ></el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <div class="sub-title"/>
          <el-form-item prop="endtime3">
            <el-time-select
              v-model="ruleForm.endtime3"
              :picker-options="{start: '08:30',step: '00:15',end: '20:30'}"
              placeholder="終了時刻" style="width:150%"
            ></el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="10">
          <div class="sub-title">
            作業内容
          </div>
          <el-form-item prop="workcontents">
            <el-input
              type="textarea"
              placeholder
              v-model="ruleForm.workcontents"
              maxlength="500"
              rows="8"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col :span="10">
          <div class="sub-title">
            備考
          </div>
          <el-form-item prop="memo">
            <el-input
              type="textarea"
              placeholder
              v-model="ruleForm.memo"
              maxlength="300"
              rows="5"
              show-word-limit
            />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bottom clearfix">
        <el-button type="primary" @click="submitForm('ruleForm')" size="large">予約</el-button>
        <el-button type="primary" @click="back" size="large">戻る</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        casename: "",
        workplace: "",
        interviewplace: "",
        interviewdate1: "",
        starttime1: "",
        endtime1: "",
        interviewdate2: "",
        starttime2: "",
        endtime2: "",
        interviewdate3: "",
        starttime3: "",
        endtime3: "",
        workcontents: "",
        companyId: "",
        personId: "",
        memo: "",
        UPDATE_DATE_TIME: "",
      },
      rules: {
        casename: [
          { required: true, message: "入力必須です", trigger: "blur" },
          { max: 100, message: "最大桁数(100)超えた", trigger: "blur" }
        ],
        workplace: [
          { required: true, message: "入力必須です", trigger: "blur" },
          { max: 100, message: "最大桁数(100)超えた", trigger: "blur" }
        ],
        interviewplace: [
          { required: true, message: "入力必須です", trigger: "blur" },
          { max: 100, message: "最大桁数(100)超えた", trigger: "blur" }
        ],
        interviewdate1: [
          { required: true, message: "入力必須です", trigger: "blur" }
        ],
        starttime1: [
          { required: true, message: "入力必須です", trigger: "blur" }
        ],
        workcontents: [
          { required: true, message: "入力必須です", trigger: "blur" }
        ],
      },
      starttime: "",
      endtime: "",
    };
  },
  methods: {
    submitForm(formName) {
      this.ruleForm.personId = this.$route.params.personId;
      this.ruleForm.companyId = this.$store.state.adminName;
      var url = this.$store.state.globalSettings.apiUrl;
      if(this.$route.params.opetype == '2'){
        url = url + "/interview/update";
      }else{
        url = url + "/interview/regist";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(url, this.ruleForm)
            .then(res => {
              console.log(res);
              if (res.data.success) {
                // 登录成功
                // 进行视图跳转
                this.$router.push("/interview/success");
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
    initForm() {
      this.ruleForm.personId = this.$route.params.personId;
      this.ruleForm.casename = this.$route.params.casename;
      this.ruleForm.workplace = this.$route.params.workplace;
      this.ruleForm.interviewplace = this.$route.params.interviewplace;
      this.ruleForm.interviewdate = this.$route.params.interviewdate;
      this.ruleForm.starttime = this.$route.params.starttime;
      this.ruleForm.endtime = this.$route.params.endtime;
      this.ruleForm.workcontents = this.$route.params.workcontents;
      this.ruleForm.interviewresult = this.$route.params.interviewresult;
      this.ruleForm.companyId = this.$route.params.companyId;
      if(this.$route.params.opetype == '2'){
        this.ruleForm.UPDATE_DATE_TIME = this.$moment(this.$route.params.UPDATE_DATE_TIME).utcOffset(540).format('YYYY-MM-DD HH:mm:ss.SSS');
      }
      // this.ruleForm.UPDATE_DATE_TIME = this.$route.params.UPDATE_DATE_TIME;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back(){
        this.$router.go(-1);//返回上一层
    },
  },
  created() {
    this.initForm();
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