<template>
  <div >
 <el-backtop ></el-backtop>
    <!-- -->
    <div style="text-align: left;">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="10%"
        class="demo-ruleForm"
        size="mini"
        :label-position="labelPosition"
        style="margin:0px auto"
      >

        <el-form-item>
         
           
              <el-form-item v-for="(carear, index) in ruleForm.carears" :key="carear.key">
                <br />
                  <el-row >
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>      
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">

                          <el-divider>{{"No." + (index+1)}}</el-divider>
                  </el-col>
                  </el-row>
 

                <el-row >
                   <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>

                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                      <div style="text-align: right">
                        <i class="el-icon-delete" @click.prevent="removeCarear(carear)"></i>
                      </div>
                  </el-col>
                  </el-row>


                   <el-row > 
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>     
                  <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" >               
                    <el-form-item :prop="'carears.' + index + '.start_ym'" label="開始日付">
                      <el-date-picker
                       
                        placeholder="日付を選択"
                        v-model="ruleForm.carears[index].start_ym"
                        style="width: 150px"
                       
                      ></el-date-picker>
                    </el-form-item>
                   </el-col>

                    <el-col :xs="12" :sm="6" :md="6" :lg="6" :xl="6" >
                          <el-form-item :prop="'carears.' + index + '.end_ym'" :rules="validate" label="終了日付">
                            <el-date-picker
                             
                              placeholder="日付を選択"
                              v-model="ruleForm.carears[index].end_ym"
                              style="width: 150px;"
                             
                            ></el-date-picker>
                          </el-form-item>
                      </el-col>
                  </el-row>
                 

                  <el-row > 
                     <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     
                     <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" >
                        <el-form-item label="プロジェクト名" prop="pj_name">
                          <el-input v-model="carear.pj_name" maxlength="50" show-word-limit　></el-input>
                        </el-form-item>
                    </el-col>

                  </el-row>
                <el-row > 
                      <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="勤務地" prop="work_place">
                        <el-input v-model="carear.work_place"  placeholder="例:日本.東京"></el-input>
                      </el-form-item>
                  </el-col>
                  </el-row>
                  <el-row > 
                     <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     

                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">

                 
                        <el-input v-model="carear.language"  placeholder="例:java/eclipse"></el-input>
                        <el-button class="transfer-footer" size="small" @click="startpop(index)">OK</el-button>

                        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                            <el-transfer
                              style="text-align: left; display: inline-block;"
                              v-model="skillselectedList"
                              filterable
                              :left-default-checked="[2, 3]"
                              :right-default-checked="[1]"
                              :titles="['ソース', 'ターゲット']"
                              :button-texts="['', '']"
                              :format="{
                                  noChecked: '${total}',
                                  hasChecked: '${checked}/${total}'
                                }"
                              @change="handleChange"
                              :data="skillList"
                            >
                              <span slot-scope="{ option }"> {{ option.label }}</span>
                            
                            
                            </el-transfer>
                          <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="setskilltoform()">确 定</el-button>
                               
                          </div>
                        </el-dialog>
                  </el-col>
                  </el-row> 

                   <el-row > 
                     <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     

                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">                 
                    <el-form-item label="業種" prop="bussness_type">
                      <el-select v-model="carear.bussness_type" placeholder="業種名">
                        <el-option
                          v-for="item in industryList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  </el-row> 

                  <el-row > 
                     <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     

                    <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="プロジェクトと作業の内容" prop="work_contents">
                        <el-input type="textarea" v-model="carear.work_contents" ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row> 
                  <el-row > 
                      <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     
                   
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="環境" prop="dev_env">
                        <el-input type="textarea" v-model="carear.dev_env" ></el-input>
                      </el-form-item>
                  </el-col>
                  </el-row> 
                  <el-row > 
                      <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     
                   
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="担当フェーズ" prop="face">
                        <el-checkbox v-model="carear.face.phase_rd" true-label="1" false-label="0" >要件定義</el-checkbox>
                        <el-checkbox v-model="carear.face.phase_bd" true-label="1" false-label="0">基本設計</el-checkbox>
                        <el-checkbox v-model="carear.face.phase_fd" true-label="1" false-label="0">機能設計</el-checkbox>
                        <el-checkbox v-model="carear.face.phase_dd" true-label="1" false-label="0">詳細設計</el-checkbox>
                        <el-checkbox v-model="carear.face.phase_cd" true-label="1" false-label="0">製造</el-checkbox>
                        <el-checkbox v-model="carear.face.phase_ut" true-label="1" false-label="0">単体試験</el-checkbox>
                        <el-checkbox v-model="carear.face.phase_it" true-label="1" false-label="0">結合試験</el-checkbox>
                        <el-checkbox v-model="carear.face.phase_st" true-label="1" false-label="0">総合試験</el-checkbox>
                        <el-checkbox v-model="carear.face.phase_ot" true-label="1" false-label="0">運用保守</el-checkbox>

                      </el-form-item>
                  </el-col>
                  </el-row> 
                  <el-row > 
                      <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     
                   
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                      <el-form-item label="役割" prop="role">
                          <el-checkbox v-model="carear.role.role_tester" true-label="1" false-label="0">tester</el-checkbox>
                          <el-checkbox v-model="carear.role.role_pg" true-label="1" false-label="0">PG</el-checkbox>
                          <el-checkbox v-model="carear.role.role_se" true-label="1" false-label="0">SE</el-checkbox>
                          <el-checkbox v-model="carear.role.role_bse" true-label="1" false-label="0">BSE</el-checkbox>
                          <el-checkbox v-model="carear.role.role_sl" true-label="1" false-label="0">sub-Leader</el-checkbox>
                          <el-checkbox v-model="carear.role.role_tl" true-label="1" false-label="0">TL</el-checkbox>
                          <el-checkbox v-model="carear.role.role_pmo" true-label="1" false-label="0">PMO</el-checkbox>
                          <el-checkbox v-model="carear.role.role_am" true-label="1" false-label="0">AM</el-checkbox>
                          <el-checkbox v-model="carear.role.role_pm" true-label="1" false-label="0">PM</el-checkbox>
                          <el-checkbox v-model="carear.role.role_arch" true-label="1" false-label="0">Architect</el-checkbox>
                          <el-checkbox v-model="carear.role.role_consul" true-label="1" false-label="0">consultant</el-checkbox>
                      </el-form-item>
                  </el-col>
                  </el-row> 
                  <el-row > 
                      <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     
                   
                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-form-item label="備考" prop="memo">
                      <el-input v-model="carear.memo"></el-input>
                    </el-form-item>
                  </el-col>
                  </el-row> 
            </el-form-item>
                  <el-row > 
                     <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                       <div>&nbsp;</div>
                      </el-col>     

                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <div style="text-align: right">
                      <i class="el-icon-circle-plus" @click="addCarear"></i>
                    </div>
                  </el-col>
                  </el-row> 
         
        </el-form-item>

        <!-- ------------------------------------------->
        <el-row > 
        <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
          <div>&nbsp;</div>
        </el-col>     
         
         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
            <el-form-item style="text-align: center">
              <el-button type="primary" @click="submitForm('ruleForm')">提出</el-button>
              <el-button @click="resetForm('ruleForm')">リセット</el-button>
            </el-form-item>
         </el-col>
         </el-row> 
      </el-form>
    </div>
   
  </div>
  
</template>

<script>
import * as infodata from "../myinfoData";
import { Loading } from 'element-ui';
export default {
  data() {
    var lowerThanDateOnly = (date1, date2) => {
      console.log(date1);
       console.log(date2);
       date1=new Date(date1);
        date2=new Date(date2);
              console.log(date1);
       console.log(date2);
      var year1 = date1.getFullYear();
      var month1 = date1.getMonth() + 1;
      var day1 = date1.getDate();

      var year2 = date2.getFullYear();
      var month2 = date2.getMonth() + 1;
      var day2 = date2.getDate();

      if (year1 == year2) {
        if (month1 == month2) {
          return day1 < day2;
        } else {
          return month1 < month2;
        }
      } else {
        return year1 < year2;
      }
    };

    var messagesss = "";
    var checkDateTo = (rule, value, callback) => {
    //  console.log(rule);

      var i = rule.field.substr(8, 1);
      //carears.' + index + '.start_ym
      if (
        this.ruleForm.carears[i].start_ym == "" &&
        this.ruleForm.carears[i].end_ym != ""
      ) {
        this.messagesss = "開始日は入力されていない";
         callback(new Error("開始日は入力されていない"));
      } else if (
        this.ruleForm.carears[i].start_ym != "" &&
        this.ruleForm.carears[i].end_ym != ""
      ) {
        var reulst = lowerThanDateOnly(
                      this.ruleForm.carears[i].start_ym,
                      this.ruleForm.carears[i].end_ym
                    );
        if (!reulst) {
          this.messagesss = "終了日は開始日より小さい";
           callback(new Error("終了日は開始日より小さい"));
        }else{
           callback();
        }
      }else{
        callback();
      }
    };
    return {
      //url:this.$
      tempindex:"",
           dialogFormVisible: false,
 skillList:[],
 skillselectedList:[],
      time:"",
      labelPosition:"top",
      buttonDialogVisible: false,
      centerDialogVisible: false,
      fileList: [],
      validate: [
        {
          required: true,
          message: messagesss,
          validator: checkDateTo,
          trigger: "blur"
        }
        //{required: true, message: '終了日は開始日より小さい', validator: checkDateTo,trigger: 'blur' },//写两个validator好像不行
      ],
      industryList: infodata.mydata.industryList,
      isShow: true,
      renderFunc(h, option) {
        return (
          <span>
            {option.key} - {option.label}
          </span>
        );
      },
      dynamicValidateForm: {
        domains: [
          {
            value: ""
          }
        ]
      },

      imageUrl: "",
      ruleForm: {
      
        carears: [
          {
            person_id:this.$store.state.adminName,
            start_ym: new Date(),
            end_ym: "",
            pj_name: "",
            language: "",
            work_place: "",
            bussness_type: "",
            face: {phase_rd:0,phase_bd:0,phase_fd:0,phase_dd:0,phase_cd:0,phase_ut:0,phase_it:0,phase_st:0,phase_ot:0},
            work_contents: "",
            dev_env: "",
            role: {role_tester:0,role_pg:0,role_se:0,role_bse:0,role_sl:0,role_tl:0,role_pmo:0,role_am:0,role_pm:0,role_arch:0,role_consul:0},
            memo: ""
          }
        ]
      },
      //https://www.jianshu.com/p/93c5cd5f3226
      //https://qiita.com/tekunikaruza/items/0a68d86084d961d632ac
      //https://blog.csdn.net/wadeltf/article/details/97629395
      rules: {
     
      }
    };
  },
  created() {

      let loadingInstance = Loading.service();
            this.$http.getCarearInfo(this.$store.state.adminName).then(
            res => {
              console.log(res);
             console.log(res.data[2]);
              this.ruleForm.carears=res.data
              if(res.data.length==0){
                 this.addCarear() ;
              }
            
                this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });
             }

           ).catch(err => {
          console.log(err);
             this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });
            this.$router.push("/errpage");
        });

        this.getskillsource();


  },
  methods: {
    test(index){console.log(index)},
    startpop(index){
dialogFormVisible = true;
this.tempindex=index;

    },
    setskilltoform(){

      console.log(this.tempindex);
     this.dialogFormVisible = false;
     
      var str=this.skillselectedList.join(',')

       this.ruleForm.carears[this.tempindex].language= this.ruleForm.carears[this.tempindex].language+str

    },
 
    getskillsource() {
      this.$http
        .getskillsourceNoKBN()
        .then(res => {
          this.skillList = [];
          for (const key in res.data.skills) {
            if (res.data.skills.hasOwnProperty(key)) {
              const element = res.data.skills[key];
              let index = Number(key) + 1;
              this.skillList.push({
                key: index,
                label: element
                //disabled: i % 4 === 0
              });
            }
          }


                // this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                //   this.loadingInstance.close();
                // });
        })
        .catch(err => {
          console.log(err);
             this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  this.loadingInstance.close();
                });
            this.$router.push("/errpage");
        });
    },
   
    submitForm(formName) {
      //console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
           console.log(valid);
        if (valid) {
          this.$store.commit("setmyinfo", this.ruleForm);
          alert("submit!");
            this.$router.push("/carearinfoComfirm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //skill list
    handleChange(value, direction, movedKeys) {
      console.log(value, direction, movedKeys);
    },
    loadstar(obj) {
      console.log("objobjobjobjobjobjobjobj");
      console.log(obj);
      obj = 1;
    },
    removeCarear(item) {
      var index = this.ruleForm.carears.indexOf(item);
      if (index !== -1) {
        this.ruleForm.carears.splice(index, 1);
      }
    },
    addCarear() {
      this.ruleForm.carears.push({
        person_id:this.$store.state.adminName,
        start_ym: "",
        end_ym: "",
        pj_name: "",
        work_place: "",
        language: "",
        bussness_type: "",
        face: {phase_rd:0,phase_bd:0,phase_fd:0,phase_dd:0,phase_cd:0,phase_ut:0,phase_it:0,phase_st:0,phase_ot:0},
        work_contents: "",
        dev_env: "",
        role: {role_tester:0,role_pg:0,role_se:0,role_bse:0,role_sl:0,role_tl:0,role_pmo:0,role_am:0,role_pm:0,role_arch:0,role_consul:0},
        memo: "",
        key: Date.now()
      });
    },


  },

  computed: {

  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 4px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>