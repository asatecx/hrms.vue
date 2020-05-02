<template>
  <div>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class=""
    >
      <el-page-header @back="goBack" content="面接管理"/>
      <el-table :data="tableData" stripe style="width: 100%" header-cell-style='headerStyle'>
        <el-table-column prop="CASE_NAME" label="案件名称／概要"></el-table-column>
        <el-table-column prop="PERSON_ID" label="面接者"></el-table-column>
        <el-table-column prop="INTERVIEW_DATETIME" label="予約時間"></el-table-column>
        <el-table-column prop="INTERVIEW_PLACE" label="場所"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row, '2')">編集</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">削除</el-button>
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
        personId: ""
      },
      tableData: [],
      headerStyle:{
                   'font-weight':'500',
                    'font-size':'20px',
                    'height':'20px'
                }
    };
  },
  methods: {
    getInterviewlist(formName) {
      this.param.companyId = this.$store.state.adminName;
      var url =
        this.$store.state.globalSettings.apiUrl + "/interview/interviewlist";
      this.$axios
        .post(url, this.param)
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
          interviewdate: this.tableData[index].INTERVIEW_DATE,
          starttime: this.tableData[index].START_TIME,
          endtime: this.tableData[index].END_TIME,
          workcontents: this.tableData[index].WORK_CONTENTS,
          companyId: this.tableData[index].COMPANY_ID,
          UPDATE_DATE_TIME: this.tableData[index].UPDATE_DATE_TIME,
          opetype: opetype,
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  mounted() {
    this.getInterviewlist();
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