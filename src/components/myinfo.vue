<template>
  <div style="margin-top: 50px;">

    <!-- -->
    <div style="text-align: left;width:800px">
      　      <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
              size="mini"
              >
    
                  <el-form-item>
                    <el-col :span="10">
               
                        
                        <div class="demo-basic--circle">
                          <div class="block" v-for="size in sizeList" :key="size">
                            <el-avatar shape="square" :size="200" :src="`${squareUrl+'?'+now}`" v-if="isShow"></el-avatar>
                          </div>
                        </div>
                        <div class="sub-title">square</div>
                          <el-button type="text" @click="dialogVisible = true">編集</el-button>
                        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                          <div style=" border: 4px  dashed #d9d9d9;width:178px">
                            <el-upload
                              class="avatar-uploader"
                              action="http://localhost:8080/niucaocao/headphoto"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                              :before-upload="beforeAvatarUpload"
                            >
                              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                          </div>

                        </el-dialog>
                    </el-col>  
                    <el-col :span="11">
                      <el-form-item label="名前" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item label="性別" prop="sex">
                        <el-radio-group v-model="ruleForm.sex">
                          <el-radio label="男"></el-radio>
                          <el-radio label="女"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </el-col>
                    <el-col :span="11">
                      <el-form-item label="住所" required >
                        <el-form-item label="" prop="province" >
                          <el-select  v-model="ruleForm.province" placeholder="都道府県名" @change="getaddress()">
                            <el-option
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="" prop="city" >
                          <el-select  v-model="ruleForm.city" placeholder="市区町村名">
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
                  </el-form-item>

                  <el-form-item label="生年月日" required>
                    <el-form-item prop="birthday">
                      <el-date-picker
                        type="date"
                        placeholder="日付を選択してください"
                        v-model="ruleForm.birthday"
                        style="width: 30%;"
                      ></el-date-picker>
                    </el-form-item>
                  </el-form-item>

              <el-form-item label="国籍" prop="country" >
                <el-select  v-model="ruleForm.country" placeholder="国名">
                  <el-option
                    v-for="item in countryList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
            　</el-form-item>
              <el-form-item label="最寄り駅" prop="station">
                <el-input placeholder="駅名を入力してください" v-model="ruleForm.station" style="width:250px">
                  <template slot="append">駅</template>
                </el-input>
              </el-form-item>
             <el-form-item label="最終学歴" prop="school">
                <el-input placeholder="学校名を入力してください" v-model="ruleForm.school" style="width:250px">
                </el-input>
              </el-form-item>
              <el-form-item label="専攻" prop="major">
                <el-input placeholder="例：情報通信" v-model="ruleForm.major" style="width:250px">
                </el-input>
              </el-form-item>
              <el-form-item label="卒業年月日" required>
                <el-form-item prop="graduationDate">
                  <el-date-picker
                    type="date"
                    placeholder="日付を選択してください"
                    v-model="ruleForm.graduationDate"
                    style="width: 30%;"
                  ></el-date-picker>
                </el-form-item>
              </el-form-item>
              <el-form-item label="実務経験" prop="workyears">
                <el-input placeholder="年数" v-model="ruleForm.workyears" style="width:120px">
                  <template slot="append">年</template>
                </el-input>
              </el-form-item>
              <el-form-item label="来日年度" prop="comeJapanyears">
                <el-input placeholder="年数" v-model="ruleForm.comeJapanyears" style="width:120px">
                  <template slot="append">年</template>
                </el-input>
              </el-form-item>


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

                <el-form-item label="">
                  <el-table :data="language" stripe style="width: 100%">
                    <el-table-column label="開発言語" width="180"></el-table-column>
                    <el-table-column label="経験度" width="500">
                      <template slot-scope="scope">
                        <el-rate v-model="scope.row.exp" show-text @loadstart="loadstar(scope.row.exp)"></el-rate>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>

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

                <el-form-item label="">
                  <el-table :data="db" stripe style="width: 100%">
                    <el-table-column  label="開発DB" width="180"></el-table-column>
                    <el-table-column label="経験度" width="500">
                      <template slot-scope="scope">
                        <el-rate v-model="scope.row.exp" show-text @loadstart="loadstar(scope.row.exp)"></el-rate>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>

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

                <el-form-item label="">
                  <el-table :data="os" stripe style="width: 100%">
                    <el-table-column  label="開発DB" width="180"></el-table-column>
                    <el-table-column label="経験度" width="500">
                      <template slot-scope="scope">
                        <el-rate v-model="scope.row.exp" show-text @loadstart="loadstar(scope.row.exp)"></el-rate>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>

<!-- ------------------------------------------->

        <el-form-item label="職務履歴">
          <el-form-item
            v-for="(carear, index) in ruleForm.carears"
            :key="carear.key"
          >
              <br />
              <el-divider>{{"No." + index}}</el-divider>
              <div style="text-align: right">
                <i class="el-icon-delete" @click.prevent="removeCarear(carear)"></i>
              </div>
              <el-form-item label="期間" required>
                <el-col :span="5">
                  <el-form-item 
                    :prop="'carears.' + index + '.projectFrom'"
                    :rules="{
                      required: true, message: '開始日は必須です', trigger: 'blur'
                        }"
                  >
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
                  <el-form-item 
                    :prop="'carears.' + index + '.projectTo'"
                    :rules="validate"
                  >
                    <el-date-picker
                      type="date"
                      placeholder="日付を選択"
                      v-model="carear.projectTo"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <!-- <el-form-item label="プロジェクト名" prop="projectname" >
                 <el-input v-model="carear.projectname" maxlength="50" show-word-limit></el-input>
              </el-form-item>
              <el-form-item label="業種" prop="insustry" >
                <el-select  v-model="carear.insustry" placeholder="業種名">
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
              </el-form-item>  -->
          </el-form-item>

          <div style="text-align: right">
            <i class="el-icon-circle-plus" @click="addCarear"></i>
          </div>
        </el-form-item>



<!-- ------------------------------------------->
                 <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提出</el-button>
                  <el-button @click="resetForm('ruleForm')">リセット</el-button>
                 </el-form-item>


      　      </el-form>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    var   lowerThanDateOnly=(date1, date2)=>  {
        var year1 = date1.getFullYear();
        var month1 = date1.getMonth() + 1;
        var day1 = date1.getDate();
 
        var year2 = date2.getFullYear();
        var month2= date2.getMonth() + 1;
        var day2 = date2.getDate();
 
        if (year1 == year2) {
            if (month1 == month2) {
                return day1 < day2;
            }
            else {
                return month1 < month2;
            }
        } else {
            return year1 < year2;
        }
    }

    var messagesss="";
    var checkDateTo = (rule, value, callback) => { 
      console.log("ffffffrom"+rule)

          var i=rule.field.substr(8,1);
          //carears.' + index + '.projectFrom
          //console.log("ffffffrom"+this.ruleForm.carears[i].projectFrom)
          if(this.ruleForm.carears[i].projectFrom==""){
              this.messagesss='開始日は入力されていない';
              return callback(new Error('開始日は入力されていない'));
          }else{
            
              var reulst=lowerThanDateOnly(this.ruleForm.carears[i].projectFrom,
              this.ruleForm.carears[i].projectTo
              )
              if(!reulst){
                  this.messagesss='終了日は開始日より小さい';
                  return callback(new Error('終了日は開始日より小さい'));
              }
          }
	    };
    return {
      validate:[
        {required: true, message: messagesss, validator: checkDateTo,trigger: 'blur' },
        //{required: true, message: '終了日は開始日より小さい', validator: checkDateTo,trigger: 'blur' },//写两个validator好像不行
         ],
      industryList:[{value:'建設業',label:'建設業'},
                          {value:'製造業',label:'製造業'},
                          {value:'電気･ガス･熱供給･水道業',label:'電気･ガス･熱供給･水道業'},
                          {value:'情報通信業',label:'情報通信業'},
                          {value:'運輸業',label:'運輸業'},
                          {value:'郵便業',label:'郵便業'},
                          {value:'卸売業',label:'卸売業'},
                          {value:'小売業',label:'小売業'},
                          {value:'金融業',label:'金融業'},
                          {value:'保険業',label:'保険業'},
                          {value:'不動産業',label:'不動産業'},
                          {value:'物品賃貸業',label:'物品賃貸業'},
                          {value:'学術研究､専門･技術サービス業',label:'学術研究､専門･技術サービス業'},
                          {value:'宿泊業',label:'宿泊業'},
                          {value:'飲食サービス業',label:'飲食サービス業'},
                          {value:'生活関連サービス業',label:'生活関連サービス業'},
                          {value:'娯楽業',label:'娯楽業'},
                          {value:'教育､学習支援業',label:'教育､学習支援業'},
                          {value:'医療',label:'医療'},
                          {value:'福祉',label:'福祉'},
                          {value:'複合サービス事業',label:'複合サービス事業'},
                          {value:'サービス業',label:'サービス業'},
                          {value:'公務',label:'公務'},
                          {value:'農業',label:'農業'},
                          {value:'林業',label:'林業'},
                          {value:'漁業',label:'漁業'},
                          {value:'鉱業',label:'鉱業'},
                          {value:'採石業',label:'採石業'},
                          {value:'砂利採取業',label:'砂利採取業'},],
      countryList:[{value:'日本',label:'日本'},
                    {value:'中国',label:'中国'},
                    {value:'韓国',label:'韓国'},
                    {value:'中国(台湾)',label:'中国(台湾)'},
                    {value:'インド',label:'インド'},
                    {value:'米国',label:'米国'},
                    {value:'アイスランド',label:'アイスランド'},
                    {value:'アイルランド',label:'アイルランド'},
                    {value:'アゼルバイジャン',label:'アゼルバイジャン'},
                    {value:'アフガニスタン',label:'アフガニスタン'},
                    {value:'アラブ首長国連邦',label:'アラブ首長国連邦'},
                    {value:'アルジェリア',label:'アルジェリア'},
                    {value:'アルゼンチン',label:'アルゼンチン'},
                    {value:'アルバニア',label:'アルバニア'},
                    {value:'アルメニア',label:'アルメニア'},
                    {value:'アンゴラ',label:'アンゴラ'},
                    {value:'アンティグア・バーブーダ',label:'アンティグア・バーブーダ'},
                    {value:'アンドラ',label:'アンドラ'},
                    {value:'イエメン',label:'イエメン'},
                    {value:'イスラエル',label:'イスラエル'},
                    {value:'イタリア',label:'イタリア'},
                    {value:'イラク',label:'イラク'},
                    {value:'イラン',label:'イラン'},
                    {value:'インドネシア',label:'インドネシア'},
                    {value:'ウガンダ',label:'ウガンダ'},
                    {value:'ウクライナ',label:'ウクライナ'},
                    {value:'ウズベキスタン',label:'ウズベキスタン'},
                    {value:'ウルグアイ',label:'ウルグアイ'},
                    {value:'英国',label:'英国'},
                    {value:'エクアドル',label:'エクアドル'},
                    {value:'エジプト',label:'エジプト'},
                    {value:'エストニア',label:'エストニア'},
                    {value:'エスワティニ',label:'エスワティニ'},
                    {value:'エチオピア',label:'エチオピア'},
                    {value:'エリトリア',label:'エリトリア'},
                    {value:'エルサルバドル',label:'エルサルバドル'},
                    {value:'オーストラリア',label:'オーストラリア'},
                    {value:'オーストリア',label:'オーストリア'},
                    {value:'オマーン',label:'オマーン'},
                    {value:'オランダ',label:'オランダ'},
                    {value:'カーボベルデ',label:'カーボベルデ'},
                    {value:'カザフスタン',label:'カザフスタン'},
                    {value:'カタール',label:'カタール'},
                    {value:'カナダ',label:'カナダ'},
                    {value:'カメルーン',label:'カメルーン'},
                    {value:'カンボジア',label:'カンボジア'},
                    {value:'ガーナ',label:'ガーナ'},
                    {value:'ガイアナ',label:'ガイアナ'},
                    {value:'ガボン',label:'ガボン'},
                    {value:'ガンビア',label:'ガンビア'},
                    {value:'北マケドニア',label:'北マケドニア'},
                    {value:'キプロス',label:'キプロス'},
                    {value:'キューバ',label:'キューバ'},
                    {value:'キリバス',label:'キリバス'},
                    {value:'キルギス',label:'キルギス'},
                    {value:'ギニア',label:'ギニア'},
                    {value:'ギニアビサウ',label:'ギニアビサウ'},
                    {value:'ギリシャ',label:'ギリシャ'},
                    {value:'クウェート',label:'クウェート'},
                    {value:'クック諸島',label:'クック諸島'},
                    {value:'クロアチア',label:'クロアチア'},
                    {value:'グアテマラ',label:'グアテマラ'},
                    {value:'グレナダ',label:'グレナダ'},
                    {value:'ケニア',label:'ケニア'},
                    {value:'コートジボワール',label:'コートジボワール'},
                    {value:'コスタリカ',label:'コスタリカ'},
                    {value:'コソボ',label:'コソボ'},
                    {value:'コモロ',label:'コモロ'},
                    {value:'コロンビア',label:'コロンビア'},
                    {value:'コンゴ共和国',label:'コンゴ共和国'},
                    {value:'コンゴ民主共和国',label:'コンゴ民主共和国'},
                    {value:'サウジアラビア',label:'サウジアラビア'},
                    {value:'サモア',label:'サモア'},
                    {value:'サントメ・プリンシペ',label:'サントメ・プリンシペ'},
                    {value:'サンマリノ',label:'サンマリノ'},
                    {value:'ザンビア',label:'ザンビア'},
                    {value:'シエラレオネ',label:'シエラレオネ'},
                    {value:'シリア',label:'シリア'},
                    {value:'シンガポール',label:'シンガポール'},
                    {value:'ジブチ',label:'ジブチ'},
                    {value:'ジャマイカ',label:'ジャマイカ'},
                    {value:'ジョージア',label:'ジョージア'},
                    {value:'ジンバブエ',label:'ジンバブエ'},
                    {value:'スーダン',label:'スーダン'},
                    {value:'スイス',label:'スイス'},
                    {value:'スウェーデン',label:'スウェーデン'},
                    {value:'スペイン',label:'スペイン'},
                    {value:'スリナム',label:'スリナム'},
                    {value:'スリランカ',label:'スリランカ'},
                    {value:'スロバキア',label:'スロバキア'},
                    {value:'スロベニア',label:'スロベニア'},
                    {value:'セーシェル',label:'セーシェル'},
                    {value:'赤道ギニア',label:'赤道ギニア'},
                    {value:'セネガル',label:'セネガル'},
                    {value:'セルビア',label:'セルビア'},
                    {value:'セントクリストファー・ネービス',label:'セントクリストファー・ネービス'},
                    {value:'セントビンセント・グレナディーン諸島',label:'セントビンセント・グレナディーン諸島'},
                    {value:'セントルシア',label:'セントルシア'},
                    {value:'ソマリア',label:'ソマリア'},
                    {value:'ソロモン',label:'ソロモン'},
                    {value:'タイ',label:'タイ'},
                    {value:'タジキスタン',label:'タジキスタン'},
                    {value:'タンザニア',label:'タンザニア'},
                    {value:'チェコ',label:'チェコ'},
                    {value:'チャド',label:'チャド'},
                    {value:'中央アフリカ',label:'中央アフリカ'},
                    {value:'チュニジア',label:'チュニジア'},
                    {value:'チリ',label:'チリ'},
                    {value:'ツバル',label:'ツバル'},
                    {value:'デンマーク',label:'デンマーク'},
                    {value:'トーゴ',label:'トーゴ'},
                    {value:'トリニダード・トバゴ',label:'トリニダード・トバゴ'},
                    {value:'トルクメニスタン',label:'トルクメニスタン'},
                    {value:'トルコ',label:'トルコ'},
                    {value:'トンガ',label:'トンガ'},
                    {value:'ドイツ',label:'ドイツ'},
                    {value:'ドミニカ共和国',label:'ドミニカ共和国'},
                    {value:'ドミニカ国',label:'ドミニカ国'},
                    {value:'ナイジェリア',label:'ナイジェリア'},
                    {value:'ナウル',label:'ナウル'},
                    {value:'ナミビア',label:'ナミビア'},
                    {value:'ニカラグア',label:'ニカラグア'},
                    {value:'ニジェール',label:'ニジェール'},
                    {value:'ニュージーランド',label:'ニュージーランド'},
                    {value:'ネパール',label:'ネパール'},
                    {value:'ノルウェー',label:'ノルウェー'},
                    {value:'ハイチ',label:'ハイチ'},
                    {value:'ハンガリー',label:'ハンガリー'},
                    {value:'バーレーン',label:'バーレーン'},
                    {value:'バチカン',label:'バチカン'},
                    {value:'バヌアツ',label:'バヌアツ'},
                    {value:'バハマ',label:'バハマ'},
                    {value:'バルバドス',label:'バルバドス'},
                    {value:'バングラデシュ',label:'バングラデシュ'},
                    {value:'パキスタン',label:'パキスタン'},
                    {value:'パナマ',label:'パナマ'},
                    {value:'パプアニューギニア',label:'パプアニューギニア'},
                    {value:'パラオ',label:'パラオ'},
                    {value:'パラグアイ',label:'パラグアイ'},
                    {value:'パレスチナ(PLO)',label:'パレスチナ(PLO)'},
                    {value:'東ティモール',label:'東ティモール'},
                    {value:'フィジー',label:'フィジー'},
                    {value:'フィリピン',label:'フィリピン'},
                    {value:'フィンランド',label:'フィンランド'},
                    {value:'フランス',label:'フランス'},
                    {value:'ブータン',label:'ブータン'},
                    {value:'ブラジル',label:'ブラジル'},
                    {value:'ブルガリア',label:'ブルガリア'},
                    {value:'ブルキナファソ',label:'ブルキナファソ'},
                    {value:'ブルネイ・ダルサラーム',label:'ブルネイ・ダルサラーム'},
                    {value:'ブルンジ',label:'ブルンジ'},
                    {value:'ベトナム',label:'ベトナム'},
                    {value:'ベナン',label:'ベナン'},
                    {value:'ベネズエラ',label:'ベネズエラ'},
                    {value:'ベラルーシ',label:'ベラルーシ'},
                    {value:'ベリーズ',label:'ベリーズ'},
                    {value:'ベルギー',label:'ベルギー'},
                    {value:'ペルー',label:'ペルー'},
                    {value:'ホンジュラス',label:'ホンジュラス'},
                    {value:'ボスニア・ヘルツェゴビナ',label:'ボスニア・ヘルツェゴビナ'},
                    {value:'ボツワナ',label:'ボツワナ'},
                    {value:'ボリビア',label:'ボリビア'},
                    {value:'ポーランド',label:'ポーランド'},
                    {value:'ポルトガル',label:'ポルトガル'},
                    {value:'マーシャル',label:'マーシャル'},
                    {value:'マダガスカル',label:'マダガスカル'},
                    {value:'マラウイ',label:'マラウイ'},
                    {value:'マリ',label:'マリ'},
                    {value:'マルタ',label:'マルタ'},
                    {value:'マレーシア',label:'マレーシア'},
                    {value:'ミクロネシア',label:'ミクロネシア'},
                    {value:'南アフリカ',label:'南アフリカ'},
                    {value:'南スーダン',label:'南スーダン'},
                    {value:'ミャンマー',label:'ミャンマー'},
                    {value:'メキシコ',label:'メキシコ'},
                    {value:'モーリシャス',label:'モーリシャス'},
                    {value:'モーリタニア',label:'モーリタニア'},
                    {value:'モザンビーク',label:'モザンビーク'},
                    {value:'モナコ',label:'モナコ'},
                    {value:'モルディブ',label:'モルディブ'},
                    {value:'モルドバ',label:'モルドバ'},
                    {value:'モロッコ',label:'モロッコ'},
                    {value:'モンゴル',label:'モンゴル'},
                    {value:'モンテネグロ',label:'モンテネグロ'},
                    {value:'ヨルダン',label:'ヨルダン'},
                    {value:'ラオス',label:'ラオス'},
                    {value:'ラトビア',label:'ラトビア'},
                    {value:'リトアニア',label:'リトアニア'},
                    {value:'リヒテンシュタイン',label:'リヒテンシュタイン'},
                    {value:'リビア',label:'リビア'},
                    {value:'リベリア',label:'リベリア'},
                    {value:'ルーマニア',label:'ルーマニア'},
                    {value:'ルクセンブルク',label:'ルクセンブルク'},
                    {value:'ルワンダ',label:'ルワンダ'},
                    {value:'レソト',label:'レソト'},
                    {value:'レバノン',label:'レバノン'},
                    {value:'ロシア連邦',label:'ロシア連邦'},],
      options1:[{value:'北海道',label:'北海道'},
              {value:'青森県',label:'青森県'},
              {value:'岩手県',label:'岩手県'},
              {value:'宮城県',label:'宮城県'},
              {value:'秋田県',label:'秋田県'},
              {value:'山形県',label:'山形県'},
              {value:'福島県',label:'福島県'},
              {value:'茨城県',label:'茨城県'},
              {value:'栃木県',label:'栃木県'},
              {value:'群馬県',label:'群馬県'},
              {value:'埼玉県',label:'埼玉県'},
              {value:'千葉県',label:'千葉県'},
              {value:'東京都',label:'東京都'},
              {value:'神奈川県',label:'神奈川県'},
              {value:'新潟県',label:'新潟県'},
              {value:'富山県',label:'富山県'},
              {value:'石川県',label:'石川県'},
              {value:'福井県',label:'福井県'},
              {value:'山梨県',label:'山梨県'},
              {value:'長野県',label:'長野県'},
              {value:'岐阜県',label:'岐阜県'},
              {value:'静岡県',label:'静岡県'},
              {value:'愛知県',label:'愛知県'},
              {value:'三重県',label:'三重県'},
              {value:'滋賀県',label:'滋賀県'},
              {value:'京都府',label:'京都府'},
              {value:'大阪府',label:'大阪府'},
              {value:'兵庫県',label:'兵庫県'},
              {value:'奈良県',label:'奈良県'},
              {value:'和歌山県',label:'和歌山県'},
              {value:'鳥取県',label:'鳥取県'},
              {value:'島根県',label:'島根県'},
              {value:'岡山県',label:'岡山県'},
              {value:'広島県',label:'広島県'},
              {value:'山口県',label:'山口県'},
              {value:'徳島県',label:'徳島県'},
              {value:'香川県',label:'香川県'},
              {value:'愛媛県',label:'愛媛県'},
              {value:'高知県',label:'高知県'},
              {value:'福岡県',label:'福岡県'},
              {value:'佐賀県',label:'佐賀県'},
              {value:'長崎県',label:'長崎県'},
              {value:'熊本県',label:'熊本県'},
              {value:'大分県',label:'大分県'},
              {value:'宮崎県',label:'宮崎県'},
              {value:'鹿児島県',label:'鹿児島県'},
              {value:'沖縄県',label:'沖縄県'},],//都道府県
      options2:[],//市区町村
      skillSourceLanguage:[],
      skillSourceDB:[],
      skillSourceOS:[],
      isShow: true,
      squareUrl:
        "http://localhost:8080/movie/" + this.$store.state.adminName + ".jpg",
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
        province:"",
        city:"",
        birthday: "",
        country: "",
        station: "",
        school: "",
        major: "",
        graduationDate: "",
        workyears: "",
        comeJapanyears: "",
        tableDataLanguage: [{
            skill: "",
            exp: ""
          }],
        tableDataDB: [{
            skill: "",
            exp: ""
          }],
        tableDataOS: [{
            skill: "",
            exp: ""
          }],
          carears:[{
                    projectFrom: "",
                    projectTo: "",
          }

          ]

      },
      //https://www.jianshu.com/p/93c5cd5f3226
      //https://qiita.com/tekunikaruza/items/0a68d86084d961d632ac
      //https://blog.csdn.net/wadeltf/article/details/97629395
      rules: {
        name: [
          { required: true, message: "名前を入力してください", trigger: "blur" },
          { min: 2, max: 20, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        province: [
          { required: true, message: "都道府県を入力してください", trigger: "change" }
        ],
        city: [
          { required: true, message: "市区町村を入力してください", trigger: "change" }
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "日付を選択してください",
            trigger: "change"
          }
        ],
        projectFrom: [
          {
            type: "date",
            required: true,
            message: "時間を選択してください",
            trigger: "change"
          }
        ],
        projectTo: [
          {
            type: "date",
            required: true,
            message: "時間を選択してください",
            trigger: "change"
          }
        ],
        sex: [{ required: true, message: "请选择活动资源", trigger: "change" }],
      }
    };
  },
  created(){
    console.log("ccccccccc")
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
      this.$refs[formName].validate(valid => {
        if (valid) {
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
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
    removeCarear(item) {
      var index = this.ruleForm.carears.indexOf(item);
      if (index !== -1) {
        this.ruleForm.carears.splice(index, 1);
      }
    },
    addCarear() {
      this.ruleForm.carears.push({
        value: "",
        key: Date.now()
      });
    },
    //photo
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    myreload() {

      this.dialogVisible = false;
            this.isShow = false;
      this.$nextTick(() => (this.isShow = true));
      console.log("tttttttt");
    },
     getaddress() {
      console.log("i am  selecting");
      let searchkey = this.ruleForm.province;
      this.$axios
        .get("http://localhost:8080/niucaocao/getaddress", {
          params: {
            // ここにクエリパラメータを指定する
            city: searchkey
            //interviewTime:time,
            // interviewPlace:place,
          }
        })
        .then(res => {
          this.options2=[];
          for (const key in res.data) {
            if (res.data.hasOwnProperty(key)) {
              const element = res.data[key];
              console.log(element)
              this.options2.push({value:element,label:element})

            }
          }
          
        })
        .catch(function(error) {
          // error 処理
        });
    },
 getskillsource() {
      console.log("i am  selecting tttttt");
      
      this.$axios
        .get("http://localhost:8080/niucaocao/getskillsource")
        .then(res => {
          console.log(res)
        this.skillSourceLanguage=[];
          for (const key in res.data.language) {
                  if (res.data.language.hasOwnProperty(key)) {
                    const element = res.data.language[key];
                    let index=Number(key)+1
                    this.skillSourceLanguage.push({
                         key: index,
                        label: element,
                        //disabled: i % 4 === 0
                      });
                  }
          }
          this.skillSourceDB=[];
          for (const key in res.data.db) {
                  if (res.data.db.hasOwnProperty(key)) {
                    const element = res.data.db[key];
                    let index=Number(key)+1
                    this.skillSourceDB.push({
                         key: index,
                        label: element,
                        //disabled: i % 4 === 0
                      });
                  }
          }
          this.skillSourceOS=[];
          for (const key in res.data.os) {
                  if (res.data.os.hasOwnProperty(key)) {
                    const element = res.data.os[key];
                    let index=Number(key)+1
                    this.skillSourceOS.push({
                         key: index,
                        label: element,
                        //disabled: i % 4 === 0
                      });
                  }
          }

          
        })
        .catch(function(error) {
          // error 処理
        });
    },
  },
 
  computed: {
    now: function() {
      console.log("nnnnnnnnn")
      this.imageUrl
      return Math.random();
    }
    ,
    // cities:function(){
    //   this.province;
    //    this.getaddress() ;
    // }
    language: function() {
       console.log("ssssssssss")
      //tabledataをクリアする。
      //this.tableData.length = 0;
      let tabledateLan =this.ruleForm.tableDataLanguage
      let temp = [];
      for (const key in this.selectedLanguage) {
        if (this.selectedLanguage.hasOwnProperty(key)) {
          let index =this.selectedLanguage[key]
          const element = this.skillSourceLanguage[index-1].label;
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
      this.ruleForm.tableDataLanguage= temp;
      return this.ruleForm.tableDataLanguage;
    },
     db: function() {
      let tabledatedb =this.ruleForm.tableDataDB
      let temp = [];
      for (const key in this.selectedDB) {
        if (this.selectedDB.hasOwnProperty(key)) {
          let index =this.selectedDB[key]
          const element = this.skillSourceDB[index-1].label;
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
      this.ruleForm.tableDataDB= temp;
      return this.ruleForm.tableDataDB;
    },
    os: function() {
      let tabledateos =this.ruleForm.tableDataOS
      let temp = [];
      for (const key in this.selectedOS) {
        if (this.selectedOS.hasOwnProperty(key)) {
          let index =this.selectedOS[key]
          const element = this.skillSourceOS[index-1].label;
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
      this.ruleForm.tableDataOS= temp;
      return this.ruleForm.tableDataOS;
    },
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