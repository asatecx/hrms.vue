<template>
  <div>
    <el-row>
      <el-card :body-style="{ padding: '0px 5px 0px 5px' }" class="box-card" shadow="hover">
          <div slot="header">
            <span>{{ personDetail.name }}さん&nbsp;&nbsp;{{ personDetail.gender }}&nbsp;&nbsp;{{ personDetail.age }}歳</span>
          </div>
          <div class="text">
              {{ personDetail.work_sts }}<br>
              会社名：{{ personDetail.company }}<br>
              所属：{{ personDetail.company }}<br>
              経験PR：{{ personDetail.exp }}<br>
              希望月額単価：{{ personDetail.price }}<br>
              更新日：{{ personDetail.update }}
          </div>
          <div class="bottom clearfix">
            <el-button type="primary" icon="el-icon-video-play" @click="playmovie">個人PRビデオ</el-button>
            <el-button type="primary" icon="el-icon-video-play" @click="showResume">職歴書</el-button>
          </div>
        </el-card>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
      return {
      personDetail:{
          id: "1",
          name: "TANG.XF",
          gender: "男",
          age: "39",
          work_sts:"今後稼働が空く予定です（20/04/01 ~ ）",
          company:"株式会社Asatecx",
          exp: "JavaでのWebアプリケーション開発中心に上流工程までキャリアを育ててきました。業種としては、業界大手のECサイト、仮想通貨取引などの経験が豊富です。工...",
          price:"70万円 〜 80万円 ※応相談",
          update:"2020年03月24日"
        }
             
      }
    },
    mounted () {
      // this.getRow();
    },
  methods: {
    playmovie(){
      this.$router.push("/movie");
    },
    showResume(){
      // this.$router.push("/resume");
      var url = this.$store.state.globalSettings.apiUrl + '/resume';
      this.$axios.post(url, this.formData, {responseType: 'arraybuffer'})
        .then(res => {
            console.log(res.data)
            let blob = new Blob([res.data], {type: "application/pdf;charset-UTF-8"})
            let objectUrl = URL.createObjectURL(blob) // 创建URL
            // location.href = objectUrl;
            // URL.revokeObjectURL(objectUrl);
            let downEle = document.createElement("a");
            let fname = `職歴書`; //下载文件的名字
            downEle.href = objectUrl;
            downEle.setAttribute("download", fname);
            document.body.appendChild(downEle);
            downEle.click();
      })
    }
  },
  created() {
  }
  ,
    computed: {
    }
};

</script>

<style>
  .text {
    font-size: 14px;
    line-height:20px;
    text-align : left;
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
    clear: both
  }

  .el-card__header {
    line-height:35px;
    text-align : left;
    background-color: yellowgreen;
  } 
  .box-card {
    width: 90%;
    height:450px;
    margin:10px;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: center;
  }
  .tag-group{
    height: 60px;
    line-height:30px;
    padding: 0;
  }
</style>