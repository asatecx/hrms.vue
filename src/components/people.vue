<template>
  <div>
    <el-carousel :interval="20000" type="card" height="200px">
      <el-carousel-item v-for="item in lunboImgs" :key="item.id">
        <!-- <img :src="item.imgSrc" alt=""> -->
        <a @click="displayCase($event,item.id)">
          <h3
            style="line-height:18px;text-align:center;padding:25px"
            class="medium"
            v-html="item.content"
          ></h3>
        </a>
      </el-carousel-item>
    </el-carousel>会社名：
    <el-input v-model="selectkey.companyName" placeholder="会社名を入力" style="width:10%"></el-input>面接時間：
    <el-input v-model="selectkey.time" placeholder="面接時間を入力" style="width:10%"></el-input>面接場所：
    <el-input v-model="selectkey.place" placeholder="面接場所を入力" style="width:10%"></el-input>
    {{select}}<!--ここ書かないとcomputedがきかない-->
    
    <paging @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></paging>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="caseName" label="案件名" width="180"></el-table-column>
      <el-table-column prop="busiContent" label="業務内容" width="180"></el-table-column>
      <el-table-column prop="mustSkill" label="必須スキル"></el-table-column>
      <el-table-column prop="notMustSkill" label="尚可スキル"></el-table-column>
      <el-table-column prop="projectInterval" label="参画時期"></el-table-column>
      <el-table-column prop="others" label="その他"></el-table-column>
    </el-table>
  </div>
</template>

<script>
 var pagetotal=0;
 var currentPage=1;
 var pagesize=100;
export default {
 
  data() {
    return {
      lunboImgs: [
        {
          id: 1,
          content: "広告1"
        },
        {
          id: 2,
          content: "広告2"
        },
        {
          id: 3,
          content: "広告3"
        },
        {
          id: 4,
          content: "広告4"
        }
      ],
      keyword: "java",
      selectkey:{companyName:"",time:"",place:""},
      tableData:[]
    };
  },
  methods: {
    gettopTen() {
      console.log("i am  selecting");
      let searchkey = this.keyword;
      let id=this.$store.state.adminName;
    this.$http
        .gettopTen(searchkey,id)
        .then(res => {
          this.lunboImgs = res.data;
        })
        .catch(function(error) {
          // error 処理
        });
    },
    getCaseList(currentPage,pagesize) {
      console.log("i am  selecting");
      let searchkey = this.keyword;
       let id=this.$store.state.adminName;
    this.$http
        .getCaseList(searchkey,id,currentPage,pagesize)
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
    },
    handleSizeChange(val) {
      pagesize=val;
        console.log(`P每页 ${val} 条`);
        this.getCaseList(currentPage,pagesize);
       
    },
    handleCurrentChange(val) {
      currentPage=val;
        console.log(`P当前页: ${val}`);
        this.getCaseList(currentPage,pagesize);
    }
  },
  created() {
    this.gettopTen();
    this.getCaseList(currentPage,pagesize);
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
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>