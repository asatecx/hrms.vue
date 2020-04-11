<template>
  <div>
    <div class="tag-group">
      <span class="tag-group__title">一番人気なスキル</span>
      <el-tag v-for="item in items" :key="item.label" :type="item.type"
        effect="dark" style="margin:5px">
        {{ item.label }}
      </el-tag>
    </div>
    <el-row>
      <el-col :span="8" v-for="item in goodsList" :key="item">
        <el-card :body-style="{ padding: '0px 5px 0px 5px' }" class="box-card" shadow="hover">
          <div slot="header">
            <span>{{ item.name }}さん&nbsp;&nbsp;{{ item.gender }}&nbsp;&nbsp;{{ item.age }}歳</span>
          </div>
          <div class="text">
              {{ item.work_sts }}<br>
              会社名：{{ item.company }}<br>
              所属：{{ item.company }}<br>
              経験PR：{{ item.exp }}<br>
              希望月額単価：{{ item.price }}<br>
              更新日：{{ item.update }}
          </div>
          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="gotoPersonDetail">詳細をみる</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div style="line-height:50px;padding-top:20px">
      <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
      return {
        items: [
          { type: '', label: 'Java' },
          { type: 'success', label: 'Python' },
          { type: 'info', label: 'PHP' },
          { type: 'danger', label: 'AWS' },
          { type: 'warning', label: 'Android' },
          { type: '', label: 'C#' },
          { type: 'success', label: 'AWS' },
          { type: 'info', label: 'Linux' },
        ],
        goodsList: [
                  {
                    id: "1",
                    name: "TANG.XF",
                    gender: "男",
                    age: "39",
                    work_sts:"今後稼働が空く予定です（20/04/01 ~ ）",
                    company:"株式会社Asatecx",
                    exp: "JavaでのWebアプリケーション開発中心に上流工程までキャリアを育ててきました。業種としては、業界大手のECサイト、仮想通貨取引などの経験が豊富です。工...",
                    price:"70万円 〜 80万円 ※応相談",
                    update:"2020年03月24日"
                 }, {
                     id: "2",
                     name: "LIU.C",
                    gender: "男",
                    age: "39",
                    work_sts:"今後稼働が空く予定です（20/04/01 ~ ）",
                    company:"株式会社Asatecx",
                    exp: "JavaでのWebアプリケーション開発中心に上流工程までキャリアを育ててきました。業種としては、業界大手のECサイト、仮想通貨取引などの経験が豊富です。工...",
                    price:"70万円 〜 80万円 ※応相談",
                    update:"2020年03月24日"
                 }, {
                     id: "3",
                     name: "3"
                 }, {
                     id: "4",
                     name: "4"
                 }, {
                     id: "5",
                     name: "5"
                 }, {
                     id: "6",
                     name: "6"
                 }, {
                     id: "7",
                     name: "7"
                 }
             ]
      }
    },
    mounted () {
      // this.getRow();
    },
  methods: {
    gotoPersonDetail() {
      this.$router.push("/PersonDetail");
    },
    getCaseList() {
      console.log("i am  selecting");
      let searchkey = this.keyword;
      this.$axios
        .get("http://localhost:8080/niucaocao/getCaseList", {
          params: {
            // ここにクエリパラメータを指定する
            keyword: searchkey
            //interviewTime:time,
            // interviewPlace:place,
          }
        })
        .then(res => {
          this.tableData = res.data;
        })
        .catch(function(error) {
          // error 処理
        });
    },
    displayCase(event, id) {
      //すでに登録しているかを判別する。
      if (this.$cookies.isKey("access_token")) {
        this.$router.push({ name: "displayCase", params: { id } });
      } else {
        let title = "個人";
        this.$router.push({ name: "Login", params: { title } });
      }
    }
  },
  created() {
    this.gettopTen();
    this.getCaseList();
  }
  ,
    computed: {
        select: function() {
                this.getCaseList()
                return ""
        }

    }
};

</script>

<style>
  .text {
    font-size: 12px;
    line-height:15px;
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
    line-height:15px;
    text-align : left;
    background-color: yellowgreen;
  } 
  .box-card {
    width: 350px;
    height:350px;
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