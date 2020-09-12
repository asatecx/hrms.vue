<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class>
      <el-page-header @back="goBack" content="案件管理" />
      <el-button type="primary" @click="registCase()">新規</el-button>
      <el-tabs type="border-card">
        <el-row>
          <el-col :span="16">
            <div class="grid-content bg-purple">
              <span class="demonstration">案件名</span>
              <el-input v-model="select_param.caseName" placeholder="キーワード" style="width:80%"></el-input>
            </div>
          </el-col>
          <!--
          <el-col :span="6">
            <div class="grid-content bg-purple-light">
              <span class="demonstration">開始日付</span>
              <el-date-picker
                v-model="select_param.from"
                type="date"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                placeholder
              ></el-date-picker>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <span class="demonstration">終了日付</span>
              <el-date-picker
                v-model="select_param.to"
                type="date"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                placeholder
              ></el-date-picker>
            </div>
          </el-col>
          -->
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <el-checkbox v-model="select_param.validFlg" style="padding-right:30px">削除済</el-checkbox>
              <el-button type="primary" @click="getcaselist()">検索</el-button>
            </div>
          </el-col>
        </el-row>
      </el-tabs>
      <el-table :data="tableData" stripe style="width: 100%" header-cell-style="headerStyle">
        <el-table-column prop="CASENAME" label="案件名称／概要"></el-table-column>
        <el-table-column prop="WORKPLACE" label="作業場所"></el-table-column>
        <el-table-column prop="WORKCONTENT" label="作業内容"></el-table-column>
        <el-table-column prop="START_DATE" label="開始日"></el-table-column>
        <el-table-column prop="END_DATE" label="終了日"></el-table-column>
        <el-table-column prop="MEMO" label="備考"></el-table-column>
        <el-table-column label="操作" width="280px">
          <template slot-scope="scope">
            <!--<el-button size="mini" @click="handleEdit(scope.$index, scope.row, '2')">編集</el-button> -->
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >削除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      param: {
        companyId: "",
        personId: "",
        interviewresult: "",
        UPDATE_DATE_TIME: ""
      },
      select_param: {
        companyId: "",
        casename: "",
        validFlg: false
      },
      tableData: [],
      headerStyle: {
        "font-weight": "500",
        "font-size": "20px",
        height: "20px"
      },
      index: "",
    };
  },
  methods: {
    registCase(){
      this.$router.push("/case/regist");
    },
    getcaselist() {
      this.select_param.companyId = this.$store.state.adminName;
      var url =
        this.$store.state.globalSettings.apiUrl + "/case/caselist";
      this.$axios
        .post(url, this.select_param)
        .then(res => {
          if (res.data.success) {
            // 登录成功
            // 进行视图跳转
            // this.$router.push("/interview/success");
            this.tableData = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    goBack() {
      this.$router.go(-1); //返回上一层
    },
    handleEdit(index, row, opetype) {
      this.$router.push({
        name: "makeinterview",
        params: {
          personId: this.tableData[index].PERSON_ID,
          casename: this.tableData[index].CASE_NAME,
          workplace: this.tableData[index].WORK_PLACE,
          interviewplace: this.tableData[index].INTERVIEW_PLACE,
          interviewdate: this.tableData[index].INTERVIEW_DATE1,
          starttime: this.tableData[index].START_TIME1,
          endtime: this.tableData[index].END_TIME1s,
          workcontents: this.tableData[index].WORK_CONTENTS,
          interviewresult: this.tableData[index].INTERVIEW_RESULT,
          companyId: this.tableData[index].COMPANY_ID,
          UPDATE_DATE_TIME: this.tableData[index].UPDATE_DATE_TIME,
          opetype: opetype
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("面接キャンセル、よろしいでしょうか?", "確認", {
        confirmButtonText: "確定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteInterview(index);
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
    },
    deleteInterview(index) {
      this.param.companyId = this.$store.state.adminName;
      this.param.personId = this.tableData[index].PERSON_ID;
      this.param.interviewresult = "7";
      this.param.UPDATE_DATE_TIME = this.$moment(
        this.tableData[index].UPDATE_DATE_TIME
      )
        .utcOffset(540)
        .format("YYYY-MM-DD HH:mm:ss.SSS");
      var url = this.$store.state.globalSettings.apiUrl + "/interview/delete";
      this.$axios
        .post(url, this.param)
        .then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "面接キャンセルした!"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setInterviewResult() {
      this.param.companyId = this.$store.state.adminName;
      this.param.personId = this.tableData[this.index].PERSON_ID;
      this.param.UPDATE_DATE_TIME = this.$moment(
        this.tableData[this.index].UPDATE_DATE_TIME
      )
        .utcOffset(540)
        .format("YYYY-MM-DD HH:mm:ss.SSS");
      var url = this.$store.state.globalSettings.apiUrl + "/interview/updateResult";
      this.$axios
        .post(url, this.param)
        .then(res => {
          if (res.data.success) {
            this.$message({
              type: "success",
              message: "面接結果を更新した!"
            });
            this.dialogFormVisible = false;
            this.getcaselist();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getcaselist();
  }
};
</script>

<style lang="scss" scoped>
.el-table__header tr,
.el-table__header th {
  padding: 0;
  height: 40px;
}
</style>