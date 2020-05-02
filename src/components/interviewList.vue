<template>
<div>
会社名：<el-input v-model="selectkey.companyName" placeholder="会社名を入力" style="width:10%"></el-input>
面接時間：<el-input v-model="selectkey.time" placeholder="面接時間を入力" style="width:10%"></el-input>
面接場所：<el-input v-model="selectkey.place" placeholder="面接場所を入力" style="width:10%"></el-input>
{{select}}<!--ここ書かないとcomputedがきかない-->

<el-table
    :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
    style="width: 100%">
    <el-table-column
    prop="companyName"
    label="会社名"
    width="180">
    </el-table-column>
    <el-table-column
    prop="time"
    label="面接時間"
    width="180">
    </el-table-column>
    <el-table-column
    prop="interviewPlace"
    label="面接場所">
    </el-table-column>
    <el-table-column
    prop="interviewResult"
    label="面接結果">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
 var pagetotal=0;
 var currentPage=1;
 var pagesize=100;
export default {
    data() {

       // {"companyName":"NEC","time":"2020-10-20 17:00",
      // "notes":"please wear your suits",
      // "interviewPlace":"tamachi",
      // "interviewMeetingPlace":"tamachi Station",
      //"interviewstatus":"ok",
      //"comment":"you are very good",
      //"firstDaynotes":"take your notebook",
      //"firstDayPlace":"tamachi",
      //"firstDayTime":"2020-11-01 9:00"},
      
        return {
            selectkey:{companyName:"",time:"",place:""},
            tableData:[]
        }
    },
     methods:{
         getlist(){
             console.log("i am  selecting")
            let comName = this.selectkey.companyName
            let id=this.$store.state.adminName;
             this.$http.getInterviewList(comName,id,currentPage,pagesize)
          .then((res) => {
            this.tableData = res.data;
            }).catch(function(error) {
                // error 処理
            });
         },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }

     }
    ,created(){
            this.getlist()

    },
    computed: {
        select: function() {
                this.getlist()
                return ""
        }

    }
}
</script>