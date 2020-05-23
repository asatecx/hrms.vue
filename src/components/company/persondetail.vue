<template>
  <div>
    <el-card :body-style="{ padding: '0px 5px 0px 5px' }" class="box-card" shadow="hover">
      <div slot="header">
        <span>{{ personDetail.USER_DISPLAY_NAME }}さん&nbsp;&nbsp;{{ personDetail.GENDER }}&nbsp;&nbsp;{{ personDetail.age }}歳</span>
      </div>
      <div class="text">
        現在の状況：{{ personDetail.STATUS }}
        <br />
        会社名：{{ personDetail.COMPANY }}
        <br />
        所属：{{ personDetail.CONTRACT_TYPE }}
        <br />
        経験PR：{{ personDetail.exp }}
        <br />
        希望月額単価：{{ personDetail.PRICE_MIN }} ～ {{ personDetail.PRICE_MAX }}
        <br />
        更新日：{{ personDetail.UPDATE_DATE_TIME }}
      </div>
      <div class="bottom clearfix">
        <el-button type="primary" icon="el-icon-video-play" @click="playmovie">個人PRビデオ</el-button>
        <el-button type="primary" icon="el-icon-download" @click="showResume">職歴書</el-button>
        <el-button type="primary" icon="el-icon-user" @click="interview">面談予約</el-button>
      </div>
    </el-card>
    <br/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personDetail: {
      }
    };
  },
  mounted() {
    // this.getRow();
  },
  methods: {
    playmovie() {
      // this.$router.push("/playvideo");
      this.$router.push({
        name: "playvideo",
        params: {
          personId: this.personDetail.PERSON_ID
        }
      });
    },
    showResume() {
      // this.$router.push("/resume");
      var url = this.$store.state.globalSettings.apiUrl + "/resume";
      this.$axios
        .post(url, this.personDetail, { responseType: "arraybuffer" })
        .then(res => {
          console.log(res.data);
          let blob = new Blob([res.data], {
            type: "application/pdf;charset-UTF-8"
          });
          let objectUrl = URL.createObjectURL(blob); // 创建URL
          // location.href = objectUrl;
          // URL.revokeObjectURL(objectUrl);
          let downEle = document.createElement("a");
          let fname = `職歴書`; //下载文件的名字
          downEle.href = objectUrl;
          downEle.setAttribute("download", fname);
          document.body.appendChild(downEle);
          downEle.click();
        });
    },
    interview() {
      // this.$router.push("/interview/makeinterview");
      this.$router.push({
        name: "makeinterview",
        params: { personId: this.personDetail.PERSON_ID }
      });
    }
  },
  created() {
    var personId = sessionStorage.getItem("personId");
    var url = this.$store.state.globalSettings.apiUrl + "/person/detail";
    this.$axios
      .post(url, { personId: personId })
      .then(res => {
        if (res.data.success) {
          // 登录成功
          // 进行视图跳转
          // this.$router.push("/interview/success");
          this.personDetail = res.data.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  computed: {}
};
</script>

<style scoped>
.text {
  font-size: 14px;
  line-height: 20px;
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
  line-height: 35px;
  text-align: left;
  background-color: yellowgreen;
}
.box-card {
  width: 70%;
  height: 500px;
  margin-left: 15%;
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