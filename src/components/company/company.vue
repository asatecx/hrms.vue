<template>
  <div style="width:100%;">
    <div class="sidemenu">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-row class>
          <el-form-item prop="userNameDisp">
            <el-input v-model="xxxxx" placeholder="フリーキーワード" style="width:220px"></el-input>
          </el-form-item>
        </el-row>
        <el-row class>
          <div class="sub-title">所属</div>
          <el-form-item prop>
            <el-checkbox-group v-model="ruleForm.contractType">
              <el-checkbox label="1">自社</el-checkbox>
              <br />
              <el-checkbox label="2">協力</el-checkbox>
              <br />
              <el-checkbox label="3">フリーランス</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <el-row class>
          <div class="sub-title">現在の状況</div>
          <el-form-item prop>
            <el-checkbox-group v-model="ruleForm.status">
              <el-checkbox label="1">すぐ稼働可能です</el-checkbox>
              <br />
              <el-checkbox label="2">今後稼働が空く予定です</el-checkbox>
              <br />
              <el-checkbox label="3">案件によります</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-row>
        <!-- <el-row class>
          <div class="sub-title">参画可能期間</div>
          <el-col>
            <el-form-item prop>
              <el-date-picker v-model="ruleForm.startdate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="から" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class>
          <el-col>
            <el-form-item prop>
              <el-date-picker v-model="ruleForm.enddate" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="まで" />
            </el-form-item>
          </el-col>
        </el-row>-->
        <el-row class>
          <div class="sub-title">性別</div>
          <el-form-item prop>
            <el-select v-model="ruleForm.gender" placeholder="未選択">
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
            <el-select v-model="ruleForm.country" placeholder="未選択">
              <el-option
                v-for="item in opt_country"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-row>
        <div class="bottom clearfix" style="text-align: center">
          <el-button type="primary" @click="getPersonList(1)">検索</el-button>
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
            <div class="card-body">
              {{ item.work_sts }}
              <br />
              <span>会社名：</span>{{ item.COMPANY }}
              <br />
              <span>所属：</span>{{ item.CONTRACT_TYPE }}
              <br />
              <span>現在状況：</span>{{ item.STATUS }}
              <br />
              <span>経験PR：</span>{{ item.exp }}
              <br />
              <span>希望月額単価：</span>{{ item.PRICE_MIN }} ～ {{ item.PRICE_MAX }}
              <br />
              <span>更新日：</span>{{ item.UPDATE_DATE_TIME }}
            </div>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click="gotoPersonDetail(item.PERSON_ID)">詳細をみる</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div style="line-height:50px;padding-top:20px">
        <el-pagination
          v-if="this.total > 0"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          background
          layout="prev, pager, next, total"
          :page-size="pagesize"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        contractType: [],
        status: [],
        startdate: "",
        enddate: "",
        gender: "0",
        country: "0"
      },
      cl_contractType: [],
      cl_status: [],
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
      pagesize: 12,
      currentPage:1,
      total : 0,
    };
  },
  mounted() {},
  methods: {
    gotoPersonDetail(personId) {
      sessionStorage.setItem("personId", personId);
      this.$router.push({
        name: "persondetail",
        params: {
          personId: personId
        }
      });
    },
    getPersonList(pageNo) {
      var url = this.$store.state.globalSettings.apiUrl + "/person/list/" + pageNo + "/" + this.pagesize;
      this.$axios
        .post(url, this.ruleForm)
        .then(res => {
          if (res.data.success) {
            this.total = res.data.totalCount;
            this.tableData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 分页
        // 每页显示的条数
       handleSizeChange(val) {
           // 改变每页显示的条数 
           this.PageSize=val
           // 注意：在改变每页显示的条数时，要将页码显示到第一页
           this.currentPage=1
       },
         // 显示第几页
       handleCurrentChange(val) {
           // 改变默认的页数
            this.currentPage=val;
            // 切换页码时，要获取每页显示的条数
            this.getPersonList(val);
       },
  },
  created() {
    this.getPersonList(1);
  },
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
.sidemenu {
  width: 16%;
  float: left;
  text-align: left;
  padding: 1% 1% 3% 2%;
  background-color:#F8F8FF;
  border:1px solid rgb(201, 199, 199)
}
.sub-title {
  font-weight:bold;
  margin: 5px 0px 5px 0px;
}
.card-body {
  padding: 0 1% 3% 5%;
  font-size: 14px;
  text-align: left;
  line-height: 30px;
}
.card-body span{
  font-weight: bold;
}
</style>