<template>
  <div style="margin-top: 50px;">
    <!-- -->
    <div style="text-align: left;">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
         :label-position="labelPosition"
      >

    <el-row  :gutter="10">
                <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
                <el-col  :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="写真　　">
              <photo v-if="isShow" ></photo>
              <el-button type="text" @click="dialogVisible = true">編集</el-button>
              <el-dialog
                title="※JPGファイルをアップロードしてください"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose"
              >
                <div style=" border: 4px  dashed #d9d9d9;width:178px">
                  <el-upload
                    class="avatar-uploader"
                    :action="photouploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
              </el-dialog>
            </el-form-item>

             </el-col>


                <el-col  :xs="24" :sm="6" :md="6" :lg="6" :xl="6">

                            <el-row  :gutter="10">
                  
                            <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            
                              <el-form-item label="姓名（漢字）" prop="user_name_kanji">
                                  <el-badge :value="ruleForm.name_privacy|privacy" class="item">
                                <el-input v-model="ruleForm.user_name_kanji" style="width:200px"></el-input>
                                  </el-badge>
                              </el-form-item>
                            
                            </el-col>
                            <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                              <el-form-item label="姓名（カナ）" prop="user_name_kana">
                                 <el-badge :value="ruleForm.name_privacy|privacy" class="item">
                                <el-input v-model="ruleForm.user_name_kana" style="width:200px"></el-input>
                                 </el-badge>
                              </el-form-item>
                            </el-col>

                                      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <el-form-item label="姓名（ローマ字）" prop="user_name_roma">
                                    <el-badge :value="ruleForm.name_privacy|privacy" class="item">
                                    <el-input v-model="ruleForm.user_name_roma" style="width:200px"></el-input>
                                     </el-badge>
                                  </el-form-item>
                                </el-col>
                            </el-row>
                </el-col>
       </el-row>
         <el-row  :gutter="10">
                 <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
           <el-form-item label="ニックネーム" prop="user_display_name">
              <el-input placeholder="ニックネームを入力" v-model="ruleForm.user_display_name" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
           <el-form-item label="会社" prop="company">
              <el-badge :value="ruleForm.company_privacy|privacy" class="item">
              <el-input placeholder="所属会社を入力" v-model="ruleForm.company" style="width:250px"></el-input>
               </el-badge>
            </el-form-item>
          </el-col>
     </el-row>
           <el-row  :gutter="10">
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  

                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                    <el-form-item label="性別　　" prop="gender">
                      <el-radio-group v-model="ruleForm.gender">
                        <el-radio :label="'1'" >男</el-radio>
                        <el-radio :label="'0'" >女</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                           <el-col  :xs="24" :sm="6" :md="6" :lg="6" :xl="6">

                                             <el-form-item label="国籍　　　" prop="country">
                  <el-select v-model="ruleForm.country" placeholder="国名" @change="hidenforJapanese">
                    <el-option
                      v-for="item in countryList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                 </el-form-item>

     
                          </el-col>


                          
           </el-row>

 <el-row  :gutter="10">
                 <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
          
              <el-form-item  prop="addr_pref" label="住所:都道府県名" >
                <el-select v-model="ruleForm.addr_pref" placeholder="都道府県名" @change="getaddress()">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              </el-col >
                <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
              <el-form-item  prop="addr_city" label="住所:市区町村名">
                <el-select v-model="ruleForm.addr_city" placeholder="市区町村名">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
          </el-col>
       </el-row>


 <el-row  :gutter="10">
                 <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
             <el-form-item label="生年月日" required>
              
              <el-form-item prop="birthday">
                  <el-badge :value="ruleForm.birthday_privacy|privacy" class="item">
                <el-date-picker
                  type="date"
                  placeholder="日付を選択"
                  v-model="ruleForm.birthday"
                  style="width: 50%;"
                   value-format="yyyy/MM/dd"
                ></el-date-picker>
                   </el-badge>
              </el-form-item>
             
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
           
                <el-form-item
                    prop="mail"
                    label="Eメールアドレス"
                    :rules="[
                    { required: true, message: 'メールアドレスを入力してください', trigger: 'blur' },
                    { type: 'email', message: '有効なメールアドレスを入力してください', trigger: ['blur', 'change'] }
                    ]"
                >
                  <el-badge :value="ruleForm.mail_privacy|privacy" class="item">
                    <el-input v-model="ruleForm.mail"  style="width:200px"></el-input>
                      </el-badge>
                </el-form-item>
          </el-col>
     </el-row>
 <el-row  :gutter="10">
                 <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
             <el-form-item label="電話番号" prop="tel">
                <el-badge :value="ruleForm.tel_privacy|privacy" class="item">
                    <el-input
                    placeholder="(営業担当)電話番号を入力"
                    v-model="ruleForm.tel"
                    style="width:200px"
                    clearable>
                  </el-input>
                  </el-badge>
              </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
          
                                        <el-form-item label="最寄り駅" prop="station">
              <el-input placeholder="駅名を入力してください" v-model="ruleForm.station" style="width:250px">
                <template slot="append">駅</template>
              </el-input>
            </el-form-item>
          </el-col>
   </el-row>

 <el-row  :gutter="10">
                 <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
               <el-form-item label="日本語レベル　　　" prop="country" v-show="japaneseFlg">
                  <el-select v-model="ruleForm.japaneselevel" placeholder="日本語資格">
                    <el-option
                      v-for="item in japaneseList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                 </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
             <el-form-item label="来日年度　" prop="comeJapanyears" v-show="japaneseFlg">
                              <el-input
                                placeholder="年数"
                                v-model="ruleForm.japan_exp"
                                type="number"
                                min="0"
                                style="width:120px"
                              >
                                <template slot="append">年</template>
                              </el-input>
                            </el-form-item>
          </el-col>

       </el-row>  

 <el-row  :gutter="10">
                 <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="最終学歴　" prop="school">
              <el-input placeholder="学校名を入力してください" v-model="ruleForm.education" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
       
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="専攻　　" prop="major">
              <el-input placeholder="例：情報通信" v-model="ruleForm.major" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
    </el-row>   
 <el-row  :gutter="10">
                 <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col> 
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="卒業年月日">
              <el-form-item prop="graduationDate">
                <el-date-picker
                  type="date"
                  placeholder="日付を選択"
                  v-model="ruleForm.graduationdate"
                  style="width: 45%;"
                   value-format="yyyy/MM/dd"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
            <el-form-item label="実務経験" prop="workyears">
              <el-input
                placeholder="年数"
                v-model="ruleForm.work_exp"
                type="number"
                min="0"
                style="width:120px"
              >
                <template slot="append">年</template>
              </el-input>
            </el-form-item>
          </el-col>
      </el-row>
       <el-row  :gutter="10">
                      <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col> 
                 <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6" >
                          
                              <el-form-item label="経験PR" prop="exp_pr">
                        
                                <el-input
                                  type="textarea"
                                  :rows="2"
                                  placeholder="経験PRを入力"
                                  v-model="ruleForm.exp_pr" style="width:500px">
                                </el-input>
                              </el-form-item>
                            
                  </el-col> 
 
       </el-row>
        <!-- ------------------------------------------->
        <el-form-item style="text-align: center">
          <el-button type="primary" @click="submitForm('ruleForm')">提出</el-button>
          <el-button @click="resetForm('ruleForm')">リセット</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as infodata from "../myinfoData";
import { Loading } from 'element-ui';
export default {
  data() {
    var messagesss = "";

    return {
     japaneseFlg:true,
      labelPosition:"top",
      //url:this.$
      buttonDialogVisible: false,
      centerDialogVisible: false,
      fileList: [],

      industryList: infodata.mydata.industryList,
      countryList: infodata.mydata.countris,
      japaneseList: infodata.mydata.japanese,
      options1: infodata.mydata.cities, //都道府県
      options2: [], //市区町村
      skillSourceLanguage: [],
      skillSourceDB: [],
      skillSourceOS: [],
      isShow: true,
      squareUrl:
        this.$store.state.globalSettings.apiUrl +
        "/photos/" +
        this.$store.state.adminName +
        ".jpg",
      photouploadUrl:
        this.$store.state.globalSettings.apiUrl +
        "/headphoto?username=" +
        this.$store.state.adminName,
      videouploadUrl:
        this.$store.state.globalSettings.apiUrl +
        "/video?username=" +
        this.$store.state.adminName,
      sizeList: ["large"],
      dialogVisible: false,
      checkList: ["选中且禁用", "复选框 A"],
      star: null,
      value: [1],
      selectedLanguage: [],
      selectedDB: [],
      selectedOS: [],
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
        person_id:this.$store.state.adminName,
        user_name_kanji: "",
        user_name_kana: "",
        user_name_roma: "",
        user_display_name:"",
        company:"",
        gender: "",
        addr_pref: "",
        addr_city: "",
        birthday: "",
        country: "",
        japaneselevel:"",
        station: "",
        education: "",
        major: "",
        graduationdate: "",
        work_exp: "",
        japan_exp: "",
        mail: "",
        tel: "",
        exp_pr:""
      },
      //https://www.jianshu.com/p/93c5cd5f3226
      //https://qiita.com/tekunikaruza/items/0a68d86084d961d632ac
      //https://blog.csdn.net/wadeltf/article/details/97629395
      rules: {
        user_name_kanji: [
          {
            required: true,
            message: "名前を入力してください",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        user_name_kana: [
          {
            required: true,
            message: "名前を入力してください",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
          user_name_roma: [
          {
            required: true,
            message: "名前を入力してください",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
       user_display_name: [
          {
            required: true,
            message: "ニックネームを入力してください",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        
        addr_pref: [
          {
            required: true,
            message: "都道府県を入力してください",
            trigger: "blur"
          }
        ],
        addr_city: [
          {
            required: true,
            message: "市区町村を入力してください",
            trigger: "blur"
          }
        ],
        birthday: [
          {
           
            required: true,
            message: "日付を選択してください",
            trigger: "blur"
          }
        ],

        gender: [
          {
            required: true,
            message: "性別を選択してください",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
         let loadingInstance = Loading.service();
           this.$http.getBaseInfo(this.$store.state.adminName).then(
            res => {
              console.log(res.data);
           
              this.ruleForm=res.data
      
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
           this.getaddress()
  },
  methods: {
    hidenforJapanese(){
      if(this.ruleForm.country=="日本"){
        this.japaneseFlg=false;
      }else{
        this.japaneseFlg=true;
      }
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.myreload();
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
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
         
        if (valid) {
          this.$store.commit("setbaseinfo", this.ruleForm);
          alert("submit!");
            this.$router.push("/baseinfoComfirm");
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

      obj = 1;
    },

    //photo
    handleClose(done) {
      this.$confirm("閉じますか？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    myreload() {
      this.dialogVisible = false;
      this.isShow = false;
      this.$nextTick(() => (this.isShow = true));
    },
    getaddress() {
      console.log("i am  selecting");
      
      let searchkey = this.ruleForm.addr_pref;
      this.$http
        .getaddress(searchkey)
        .then(res => {
          this.options2 = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              const element = res[key];
              console.log(element);
              this.options2.push({ value: element, label: element });
            }
          }
        })
          .catch(err => {
                console.log(err);
                  this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        loadingInstance.close();
                      });
                  this.$router.push("/errpage");
              });
    },
   
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      this.buttonDialogVisible = true;
    },

  },

  computed: {
    now: function() {
      console.log("nnnnnnnnn");
      this.imageUrl;
      return Math.random();
    },
    // cities:function(){
    //   this.province;
    //    this.getaddress() ;
    // }


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
.item {
  margin-top: 10px;
  margin-right: 40px;
}
</style>