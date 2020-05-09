<template>
  <div style="margin-top: 50px;margin-left: 450px;">
    <!-- -->
    <div style="text-align: left;width:1200px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >

     
        <el-form-item>
          <el-col :span="20">
            <el-form-item label="開発言語">
              <div style="text-align: left;">
                <el-transfer
                  style="text-align: left; display: inline-block;"
                  v-model="selectedLanguage"
                  filterable
                  :left-default-checked="[2, 3]"
                  :right-default-checked="[1]"
                  :titles="['元', '先']"
                  :button-texts="['', '']"
                  :format="{
                      noChecked: '${total}',
                      hasChecked: '${checked}/${total}'
                    }"
                  @change="handleChange"
                  :data="skillSourceLanguage"
                >
                  <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
                  <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button> -->
                  <!-- <el-button class="transfer-footer" slot="right-footer" size="small" @click="copyskill">OK</el-button> -->
                </el-transfer>
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="20">
            <el-form-item label="　">
              <el-table :data="language" stripe style="width: 100%">
                <el-table-column label="開発言語" width="100px">
                  <template slot-scope="scope">
                    <el-input placeholder v-model="scope.row.skill" :disabled="true"></el-input>
                  </template>
                </el-table-column>


                <el-table-column label="期間" width="130px">
                   <template slot-scope="scope">
                    <el-input
                      placeholder="年数"
                      v-model="scope.row.exp"
                      type="number"
                      min="0"
                      style="width:120px"
                    >
                      <template slot="append">年</template>
                    </el-input>
                     </template>
                 </el-table-column>

                <el-table-column label="経験度" width="550px">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.level" show-text :texts="textsLan" @loadstart="loadstar(scope.row.level)"></el-rate>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="20">
            <el-form-item label="ﾃﾞｰﾀﾍﾞｰｽ">
              <div style="text-align: left;">
                <el-transfer
                  style="text-align: left; display: inline-block;"
                  v-model="selectedDB"
                  filterable
                  :left-default-checked="[2, 3]"
                  :right-default-checked="[1]"
                  :titles="['元', '先']"
                  :button-texts="['', '']"
                  :format="{
                      noChecked: '${total}',
                      hasChecked: '${checked}/${total}'
                    }"
                  @change="handleChange"
                  :data="skillSourceDB"
                >
                  <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
                  <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button> -->
                  <!-- <el-button class="transfer-footer" slot="right-footer" size="small" @click="copyskill">OK</el-button> -->
                </el-transfer>
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="20">
            <el-form-item label="　">
              <el-table :data="db" stripe style="width: 100%">
                <el-table-column label="開発DB" width="100px">
                  <template slot-scope="scope">
                    <el-input placeholder v-model="scope.row.skill" :disabled="true"></el-input>
                  </template>
                </el-table-column>


                <el-table-column label="期間" width="130px">
                   <template slot-scope="scope">
                    <el-input
                      placeholder="年数"
                      v-model="scope.row.exp"
                      type="number"
                      min="0"
                      style="width:120px"
                    >
                      <template slot="append">年</template>
                    </el-input>
                     </template>
                 </el-table-column>

                <el-table-column label="経験度" width="550px">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.level" show-text :texts="textsDB" @loadstart="loadstar(scope.row.level)"></el-rate>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="20">
            <el-form-item label="OS">
              <div style="text-align: left;">
                <el-transfer
                  style="text-align: left; display: inline-block;"
                  v-model="selectedOS"
                  filterable
                  :left-default-checked="[2, 3]"
                  :right-default-checked="[1]"
                  :titles="['元', '先']"
                  :button-texts="['', '']"
                  :format="{
                      noChecked: '${total}',
                      hasChecked: '${checked}/${total}'
                    }"
                  @change="handleChange"
                  :data="skillSourceOS"
                >
                  <span slot-scope="{ option }">{{ option.key }} - {{ option.label }}</span>
                  <!-- <el-button class="transfer-footer" slot="left-footer" size="small">操作</el-button> -->
                  <!-- <el-button class="transfer-footer" slot="right-footer" size="small" @click="copyskill">OK</el-button> -->
                </el-transfer>
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-col :span="20">
            <el-form-item label="　">
              <el-table :data="os" stripe style="width: 100%">
                <el-table-column label="開発環境" width="100px">
                  <template slot-scope="scope">
                    <el-input placeholder v-model="scope.row.skill" :disabled="true"></el-input>
                  </template>
                </el-table-column>

                <el-table-column label="期間" width="130px">
                   <template slot-scope="scope">
                    <el-input
                      placeholder="年数"
                      v-model="scope.row.exp"
                      type="number"
                      min="0"
                      style="width:120px"
                    >
                      <template slot="append">年</template>
                    </el-input>
                     </template>
                 </el-table-column>

                <el-table-column label="経験度" width="550px">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.level" show-text :texts="textsOS" @loadstart="loadstar(scope.row.level)"></el-rate>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-form-item>
       

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
export default {
  data() {


    var messagesss = "";

    return {
      //url:this.$
      textsLan:infodata.mydata.textsLan,
      textsDB:infodata.mydata.textsDB,
      textsOS:infodata.mydata.textsOS,
      buttonDialogVisible: false,
      centerDialogVisible: false,

      skillSourceLanguage: [],
      skillSourceDB: [],
      skillSourceOS: [],
      isShow: true,
     
      sizeList: ["large"],
      dialogVisible: false,
      checkList: ["选中且禁用", "复选框 A"],
      star: null,
     
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

      imageUrl: "",
      ruleForm: {
      
        tableDataLanguage: [
          { 
             person_id:this.$store.state.adminName,
            skill: "",
            exp: "",
            level: "",
          }
        ],
        tableDataDB: [
          {
             person_id:this.$store.state.adminName,
            skill: "",
            exp: "",
             level: "",
          }
        ],
        tableDataOS: [
          {
             person_id:this.$store.state.adminName,
            skill: "",
            exp: "",
             level: "",
          }
        ],

      },
      //https://www.jianshu.com/p/93c5cd5f3226
      //https://qiita.com/tekunikaruza/items/0a68d86084d961d632ac
      //https://blog.csdn.net/wadeltf/article/details/97629395
      rules: {
      
      }
    };
  },
  created() {
    console.log("ccccccccc");
    this.getskillsource();
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.myreload();
    },

    submitForm(formName) {
      //console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
         
        if (valid) {
          this.$store.commit("setskillinfo", this.ruleForm);
            console.log(this.ruleForm);
          alert("submit!");
            this.$router.push("/skillinfoComfirm");
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

    getskillsource() {
      this.$http
        .getskillsource()
        .then(res => {
          this.skillSourceLanguage = [];
          for (const key in res.data.language) {
            if (res.data.language.hasOwnProperty(key)) {
              const element = res.data.language[key];
              let index = Number(key) + 1;
              this.skillSourceLanguage.push({
                key: index,
                label: element
                //disabled: i % 4 === 0
              });
            }
          }
          this.skillSourceDB = [];
          for (const key in res.data.db) {
            if (res.data.db.hasOwnProperty(key)) {
              const element = res.data.db[key];
              let index = Number(key) + 1;
              this.skillSourceDB.push({
                key: index,
                label: element
                //disabled: i % 4 === 0
              });
            }
          }
          this.skillSourceOS = [];
          for (const key in res.data.os) {
            if (res.data.os.hasOwnProperty(key)) {
              const element = res.data.os[key];
              let index = Number(key) + 1;
              this.skillSourceOS.push({
                key: index,
                label: element
                //disabled: i % 4 === 0
              });
            }
          }
        })
        .catch(function(error) {
          // error 処理
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
    language: function() {
      console.log("ssssssssss");
      //tabledataをクリアする。
      //this.tableData.length = 0;
      let tabledateLan = this.ruleForm.tableDataLanguage;
      let temp = [];
      for (const key in this.selectedLanguage) {
        if (this.selectedLanguage.hasOwnProperty(key)) {
          let index = this.selectedLanguage[key];
          const element = this.skillSourceLanguage[index - 1].label;
          let levelV = 1;
          let expV = 1;
          for (const key in tabledateLan) {
            if (tabledateLan.hasOwnProperty(key)) {
              const element2 = tabledateLan[key];
              if (element2.skill == element) {
                levelV = element2.level;
                expV=element2.exp;
              }
            }
          }

          temp.push({
             person_id:this.$store.state.adminName,
             skillkbn: "LAN",
            skill: element,
            level: levelV ,//defalt　value
            exp:expV
          });
        }
      }
      this.ruleForm.tableDataLanguage.length = 0;
      
      if(temp.length==0){
         this.ruleForm.tableDataLanguage.push(   { 
             person_id:this.$store.state.adminName,
               skillkbn: "LAN",
            skill: "",
            exp: "",
            level: 5,
          });
      }else{
          this.ruleForm.tableDataLanguage = temp;
      }
     
      return temp;
    },
    db: function() {
      let tabledatedb = this.ruleForm.tableDataDB;
      let temp = [];
      for (const key in this.selectedDB) {
        if (this.selectedDB.hasOwnProperty(key)) {
          let index = this.selectedDB[key];
          const element = this.skillSourceDB[index - 1].label;
          console.log("-----------");
          console.log(element);
          let levelV = 1;
          let expV = 1;
          for (const key in tabledatedb) {
            if (tabledatedb.hasOwnProperty(key)) {
              const element2 = tabledatedb[key];
              if (element2.skill == element) {
                levelV = element2.level;
                expV = element2.exp;
              }
            }
          }

          temp.push({
             person_id:this.$store.state.adminName,
               skillkbn:"DB",
            skill: element,
            level: levelV, //defalt　value
            exp:expV
          });
        }
      }
      this.ruleForm.tableDataDB.length = 0;
      if(temp.length==0){
         this.ruleForm.tableDataDB.push(   { 
             person_id:this.$store.state.adminName,
              skillkbn:"DB",
            skill: "",
            exp: "",
            level: 5,
          });
      }else{
          this.ruleForm.tableDataDB = temp;
      }
     
      return temp;
    },
    os: function() {
      let tabledateos = this.ruleForm.tableDataOS;
      let temp = [];
      for (const key in this.selectedOS) {
        if (this.selectedOS.hasOwnProperty(key)) {
          let index = this.selectedOS[key];
          const element = this.skillSourceOS[index - 1].label;
          let levelV = 1;
          let expV = 1;
          for (const key in tabledateos) {
            if (tabledateos.hasOwnProperty(key)) {
              const element2 = tabledateos[key];
              if (element2.skill == element) {
                levelV = element2.level;
                expV = element2.exp;
              }
            }
          }

          temp.push({
             person_id:this.$store.state.adminName,
              skillkbn:"OS",
            skill: element,
            level: levelV, //defalt　value
            exp:expV
          });
        }
      }
      this.ruleForm.tableDataOS.length = 0;
         if(temp.length==0){
         this.ruleForm.tableDataOS.push(   { 
             person_id:this.$store.state.adminName,
              skillkbn:"OS",
            skill: "",
            exp: "",
            level: 5,
          });
      }else{
          this.ruleForm.tableDataOS = temp;
      }
     
      return temp;
    }
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