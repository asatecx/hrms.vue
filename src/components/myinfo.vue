<template>
  <div style="margin-top: 50px;margin-left: 450px;">
    <!-- -->
    <div style="text-align: left;width:1000px">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item>
          <el-col :span="8">
            <el-form-item label="写真　　">
              <div class="demo-basic--circle">
                <div class="block" v-for="size in sizeList" :key="size">
                  <el-avatar shape="square" :size="200" :src="`${squareUrl+'?'+now}`" v-if="isShow"></el-avatar>
                </div>
              </div>
              <div class="sub-title">プロフィール写真</div>
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
          <el-col :span="11">
            <el-form-item label="名前　　" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="性別　　" prop="sex">
              <el-radio-group v-model="ruleForm.sex">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="住所　　" required>
              <el-form-item label prop="province">
                <el-select v-model="ruleForm.province" placeholder="都道府県名" @change="getaddress()">
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label prop="city">
                <el-select v-model="ruleForm.city" placeholder="市区町村名">
                  <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="自己紹介">
              <el-upload
                class="upload-demo"
                :action="videouploadUrl"
                :on-change="handleChange"
                :file-list="fileList"
              >
                <el-button size="small" type="primary">アピール動画アップロード</el-button>
                <div slot="tip" class="el-upload__tip">ファイルサイズ100M以下</div>
              </el-upload>

              <el-button
                type="text"
                v-show="buttonDialogVisible"
                @click="centerDialogVisible = true"
              >プレビュー</el-button>

              <el-dialog title="自己紹介動画確認" :visible.sync="centerDialogVisible" width="30%" center>
                <span>
                  <movie whoseVideo="admin"></movie>
                </span>
                <span slot="footer" class="dialog-footer">
                  <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
                  <el-button type="primary" @click="centerDialogVisible = false">閉じる</el-button>
                </span>
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="10">
            <el-form-item label="生年月日" required>
              <el-form-item prop="birthday">
                <el-date-picker
                  type="date"
                  placeholder="日付を選択"
                  v-model="ruleForm.birthday"
                  style="width: 50%;"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="国籍　　　" prop="country">
              <el-select v-model="ruleForm.country" placeholder="国名">
                <el-option
                  v-for="item in countryList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="10">
            <el-form-item label="最寄り駅" prop="station">
              <el-input placeholder="駅名を入力してください" v-model="ruleForm.station" style="width:250px">
                <template slot="append">駅</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="最終学歴　" prop="school">
              <el-input placeholder="学校名を入力してください" v-model="ruleForm.school" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="10">
            <el-form-item label="専攻　　" prop="major">
              <el-input placeholder="例：情報通信" v-model="ruleForm.major" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="卒業年月日">
              <el-form-item prop="graduationDate">
                <el-date-picker
                  type="date"
                  placeholder="日付を選択"
                  v-model="ruleForm.graduationDate"
                  style="width: 45%;"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-col :span="10">
            <el-form-item label="実務経験" prop="workyears">
              <el-input
                placeholder="年数"
                v-model="ruleForm.workyears"
                type="number"
                min="0"
                style="width:120px"
              >
                <template slot="append">年</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="来日年度　" prop="comeJapanyears">
              <el-input
                placeholder="年数"
                v-model="ruleForm.comeJapanyears"
                type="number"
                min="0"
                style="width:120px"
              >
                <template slot="append">年</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-form-item>

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
                <el-table-column label="開発言語" width="300px">
                  <template slot-scope="scope">
                    <el-input placeholder v-model="scope.row.skill" :disabled="true"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="経験度" width="300px">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.exp" show-text @loadstart="loadstar(scope.row.exp)"></el-rate>
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
                <el-table-column label="開発DB" width="300px">
                  <template slot-scope="scope">
                    <el-input placeholder v-model="scope.row.skill" :disabled="true"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="経験度" width="300px">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.exp" show-text @loadstart="loadstar(scope.row.exp)"></el-rate>
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
                <el-table-column label="開発DB" width="300px">
                  <template slot-scope="scope">
                    <el-input placeholder v-model="scope.row.skill" :disabled="true"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="経験度" width="300px">
                  <template slot-scope="scope">
                    <el-rate v-model="scope.row.exp" show-text @loadstart="loadstar(scope.row.exp)"></el-rate>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-form-item>
        <!-- ------------------------------------------->
        <el-form-item>
          <el-col :span="20">
            <el-form-item label="職務履歴">
              <el-form-item v-for="(carear, index) in ruleForm.carears" :key="carear.key">
                <br />
                <el-divider>{{"No." + (index+1)}}</el-divider>
                <div style="text-align: right">
                  <i class="el-icon-delete" @click.prevent="removeCarear(carear)"></i>
                </div>
                <el-form-item label="期間">
                  <el-col :span="5">
                    <el-form-item :prop="'carears.' + index + '.projectFrom'">
                      <el-date-picker
                        type="date"
                        placeholder="日付を選択"
                        v-model="carear.projectFrom"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col class="line" :span="2">～</el-col>
                  <el-col :span="5">
                    <el-form-item :prop="'carears.' + index + '.projectTo'" :rules="validate">
                      <el-date-picker
                        type="date"
                        placeholder="日付を選択"
                        v-model="carear.projectTo"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-form-item>
                <el-form-item label="プロジェクト名" prop="projectname">
                  <el-input v-model="carear.projectname" maxlength="50" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="業種" prop="insustry">
                  <el-select v-model="carear.insustry" placeholder="業種名">
                    <el-option
                      v-for="item in industryList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="プロジェクトと作業の内容" prop="contents">
                  <el-input type="textarea" v-model="carear.contents"></el-input>
                </el-form-item>

                <el-form-item label="環境" prop="envirment">
                  <el-input type="textarea" v-model="carear.envirment"></el-input>
                </el-form-item>

                <el-form-item label="担当フェーズ" prop="face">
                  <el-checkbox-group v-model="carear.face">
                    <el-checkbox label="要件定義"></el-checkbox>
                    <el-checkbox label="基本設計"></el-checkbox>
                    <el-checkbox label="機能設計"></el-checkbox>
                    <el-checkbox label="詳細設計"></el-checkbox>
                    <el-checkbox label="製造"></el-checkbox>
                    <el-checkbox label="単体試験"></el-checkbox>
                    <el-checkbox label="結合試験"></el-checkbox>
                    <el-checkbox label="総合試験"></el-checkbox>
                    <el-checkbox label="運用試験"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>

                <el-form-item label="役割" prop="role">
                  <el-checkbox-group v-model="carear.role">
                    <el-checkbox label="tester"></el-checkbox>
                    <el-checkbox label="PG"></el-checkbox>
                    <el-checkbox label="SE"></el-checkbox>
                    <el-checkbox label="BSE"></el-checkbox>
                    <el-checkbox label="sub-Leader"></el-checkbox>
                    <el-checkbox label="TL"></el-checkbox>
                    <el-checkbox label="PMO"></el-checkbox>
                    <el-checkbox label="AM"></el-checkbox>
                    <el-checkbox label="PM"></el-checkbox>
                    <el-checkbox label="Architect"></el-checkbox>
                    <el-checkbox label="consultant"></el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
                <el-form-item label="備考" prop="biko">
                  <el-input v-model="carear.biko"></el-input>
                </el-form-item>
              </el-form-item>

              <div style="text-align: right">
                <i class="el-icon-circle-plus" @click="addCarear"></i>
              </div>
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
import * as infodata from "./myinfoData";
export default {
  data() {
    var lowerThanDateOnly = (date1, date2) => {
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
      console.log(rule);

      var i = rule.field.substr(8, 1);
      //carears.' + index + '.projectFrom
      console.log("ffffffrom" + this.ruleForm.carears[i].projectFrom);
      if (
        this.ruleForm.carears[i].projectFrom == "" &&
        this.ruleForm.carears[i].projectTo != ""
      ) {
        this.messagesss = "開始日は入力されていない";
        return callback(new Error("開始日は入力されていない"));
      } else if (
        this.ruleForm.carears[i].projectFrom != "" &&
        this.ruleForm.carears[i].projectTo != ""
      ) {
        var reulst = lowerThanDateOnly(
          this.ruleForm.carears[i].projectFrom,
          this.ruleForm.carears[i].projectTo
        );
        if (!reulst) {
          this.messagesss = "終了日は開始日より小さい";
          return callback(new Error("終了日は開始日より小さい"));
        }
      }
    };
    return {
      //url:this.$
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
      countryList: infodata.mydata.countris,
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
        name: "",
        sex: "",
        province: "",
        city: "",
        birthday: "",
        country: "",
        station: "",
        school: "",
        major: "",
        graduationDate: "",
        workyears: "",
        comeJapanyears: "",
        tableDataLanguage: [
          {
            skill: "",
            exp: ""
          }
        ],
        tableDataDB: [
          {
            skill: "",
            exp: ""
          }
        ],
        tableDataOS: [
          {
            skill: "",
            exp: ""
          }
        ],
        carears: [
          {
            projectFrom: "",
            projectTo: "",
            projectname: "",
            insustry: "",
            face: [],
            contents: "",
            envirment: "",
            role: [],
            biko: ""
          }
        ]
      },
      //https://www.jianshu.com/p/93c5cd5f3226
      //https://qiita.com/tekunikaruza/items/0a68d86084d961d632ac
      //https://blog.csdn.net/wadeltf/article/details/97629395
      rules: {
        name: [
          {
            required: true,
            message: "名前を入力してください",
            trigger: "blur"
          },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        province: [
          {
            required: true,
            message: "都道府県を入力してください",
            trigger: "change"
          }
        ],
        city: [
          {
            required: true,
            message: "市区町村を入力してください",
            trigger: "change"
          }
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "日付を選択してください",
            trigger: "change"
          }
        ],

        sex: [
          {
            required: true,
            message: "性別を選択してください",
            trigger: "change"
          }
        ]
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
      console.log("XXXXXXXXXXXXx");
      console.log(this.ruleForm);
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.commit("setmyinfo", this.ruleForm);
          alert("submit!");
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
        projectFrom: "",
        projectTo: "",
        projectname: "",
        insustry: "",
        face: "",
        contents: "",
        envirment: "",
        role: "",
        biko: "",
        key: Date.now()
      });
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
      let searchkey = this.ruleForm.province;
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
        .catch(function(error) {
          // error 処理
        });
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
    }
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
          let expV = 1;

          for (const key in tabledateLan) {
            if (tabledateLan.hasOwnProperty(key)) {
              const element2 = tabledateLan[key];
              if (element2.skill == element) {
                expV = element2.exp;
              }
            }
          }

          temp.push({
            skill: element,
            exp: expV //defalt　value
          });
        }
      }
      this.ruleForm.tableDataLanguage.length = 0;
      this.ruleForm.tableDataLanguage = temp;
      return this.ruleForm.tableDataLanguage;
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
          let expV = 1;

          for (const key in tabledatedb) {
            if (tabledatedb.hasOwnProperty(key)) {
              const element2 = tabledatedb[key];
              if (element2.skill == element) {
                expV = element2.exp;
              }
            }
          }

          temp.push({
            skill: element,
            exp: expV //defalt　value
          });
        }
      }
      this.ruleForm.tableDataDB.length = 0;
      this.ruleForm.tableDataDB = temp;
      return this.ruleForm.tableDataDB;
    },
    os: function() {
      let tabledateos = this.ruleForm.tableDataOS;
      let temp = [];
      for (const key in this.selectedOS) {
        if (this.selectedOS.hasOwnProperty(key)) {
          let index = this.selectedOS[key];
          const element = this.skillSourceOS[index - 1].label;
          let expV = 1;

          for (const key in tabledateos) {
            if (tabledateos.hasOwnProperty(key)) {
              const element2 = tabledateos[key];
              if (element2.skill == element) {
                expV = element2.exp;
              }
            }
          }

          temp.push({
            skill: element,
            exp: expV //defalt　value
          });
        }
      }
      this.ruleForm.tableDataOS.length = 0;
      this.ruleForm.tableDataOS = temp;
      return this.ruleForm.tableDataOS;
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