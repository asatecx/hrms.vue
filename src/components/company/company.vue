<template>
  <div style="width:100%;">
    <div style="width:20%;float:left;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="sidemenu">
        <el-row class>
          <el-form-item prop="userNameDisp">
            <el-input v-model="xxxxx" placeholder="フリーキーワード"></el-input>
          </el-form-item>
        </el-row>
        <el-row class>
          <div class="sub-title">所属</div>
          <el-form-item prop="userNameDisp">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="自社"></el-checkbox>
              <br />
              <el-checkbox label="協力"></el-checkbox>
              <br />
              <el-checkbox label="フリーランス"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row class>
          <div class="sub-title">現在の状況</div>
          <el-form-item prop="userNameDisp">
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="すぐ稼働可能です"></el-checkbox>
              <br />
              <el-checkbox label="今後稼働が空く予定です"></el-checkbox>
              <br />
              <el-checkbox label="案件によります"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row class>
          <div class="sub-title">参画可能期間</div>
          <el-col>
            <el-form-item prop>
              <el-date-picker v-model="value1" type="date" placeholder="から" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col>
            <el-form-item prop>
              <el-date-picker v-model="value2" type="date" placeholder="まで" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <div class="sub-title">性別</div>
          <el-form-item prop>
            <el-select v-model="val_gender" placeholder="未選択">
              <el-option
                v-for="item in opt_gender"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row class>
          <div class="sub-title">国籍</div>
          <el-form-item prop>
            <el-select v-model="val_country" placeholder="未選択">
              <el-option
                v-for="item in opt_country"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <div class="bottom clearfix">
          <el-button type="primary" @click="getPersonList()">検索</el-button>
        </div>
      </el-form>
    </div>
    <div style="width:80%;float:left;">
      <div class="tag-group">
        <span class="tag-group__title">一番人気なスキル</span>
        <el-tag
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          effect="dark"
          style="margin:5px"
        >{{ item.label }}</el-tag>
      </div>
      <el-row>
        <el-col :span="8" v-for="item in tableData" :key="item">
          <el-card :body-style="{ padding: '0px 5px 0px 5px' }" class="box-card" shadow="hover">
            <div slot="header">
              <span>{{ item.USER_DISPLAY_NAME }}さん&nbsp;&nbsp;{{ item.GENDER }}&nbsp;&nbsp;{{ item.age }}歳</span>
            </div>
            <div class="text">
              {{ item.work_sts }}
              <br />
              会社名：{{ item.COMPANY }}
              <br />
              所属：{{ item.CONTRACT_TYPE }}
              <br />
              経験PR：{{ item.exp }}
              <br />
              希望月額単価：{{ item.PRICE_MIN }} ～ {{ item.PRICE_MAX }}
              <br />
              更新日：{{ item.UPDATE_DATE_TIME }}
            </div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="gotoPersonDetail">詳細をみる</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div style="line-height:50px;padding-top:20px">
        <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {
        companyId: "",
        personId: ""
      },
      checkList: [],
      opt_gender: [
        {
          value: "0",
          label: "未選択"
        },
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }
      ],
      val_gender: "",

      opt_country: [
        {
          value: "0",
          label: "未選択"
        },
        {
          value: "1",
          label: "日本"
        },
        {
          value: "2",
          label: "日本以外"
        }
      ],
      val_country: "",
      items: [
        { type: "", label: "Java" },
        { type: "success", label: "Python" },
        { type: "info", label: "PHP" },
        { type: "danger", label: "AWS" },
        { type: "warning", label: "Android" },
        { type: "", label: "C#" },
        { type: "success", label: "AWS" },
        { type: "info", label: "Linux" }
      ],
      tableData: [],
      goodsList: [
        {
          id: "1",
          name: "TANG.XF",
          gender: "男",
          age: "39",
          work_sts: "今後稼働が空く予定です（20/04/01 ~ ）",
          company: "株式会社Asatecx",
          exp:
            "JavaでのWebアプリケーション開発中心に上流工程までキャリアを育ててきました。業種としては、業界大手のECサイト、仮想通貨取引などの経験が豊富です。工...",
          price: "70万円 〜 80万円 ※応相談",
          update: "2020年03月24日"
        },
        {
          id: "2",
          name: "LIU.C",
          gender: "男",
          age: "39",
          work_sts: "今後稼働が空く予定です（20/04/01 ~ ）",
          company: "株式会社Asatecx",
          exp:
            "JavaでのWebアプリケーション開発中心に上流工程までキャリアを育ててきました。業種としては、業界大手のECサイト、仮想通貨取引などの経験が豊富です。工...",
          price: "70万円 〜 80万円 ※応相談",
          update: "2020年03月24日"
        },
        {
          id: "3",
          name: "3"
        },
        {
          id: "4",
          name: "4"
        },
        {
          id: "5",
          name: "5"
        },
        {
          id: "6",
          name: "6"
        },
        {
          id: "7",
          name: "7"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    gotoPersonDetail() {
      this.$router.push("/PersonDetail");
    },
    getPersonList() {
      var url = this.$store.state.globalSettings.apiUrl + "/person/list";
      this.$axios
        .post(url, this.param)
        .then(res => {
          if (res.data.success) {
            this.tableData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    // alert(this.$route.params.test);
    // alert(res.data.data[0].PERSON_ID);
  }
};
</script>

<style>
.text {
  font-size: 12px;
  line-height: 15px;
  text-align: left;
  white-space: pre-wrap;
}

.item {
  padding: 18px 0;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-card__header {
  line-height: 15px;
  text-align: left;
  background-color: yellowgreen;
}
.box-card {
  width: 350px;
  height: 350px;
  margin: 10px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: center;
}
.tag-group {
  height: 60px;
  line-height: 30px;
  padding: 0;
}
</style>