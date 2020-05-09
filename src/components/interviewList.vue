<template>
<div>

   <div style="text-align: left;"><el-button type="danger" @click="deletedetail">一括削除</el-button></div>
会社名：<el-input v-model="selectkey.companyName" placeholder="会社名を入力" style="width:10%"></el-input>
面接時間：<el-input v-model="selectkey.time" placeholder="面接時間を入力" style="width:10%"></el-input>
面接場所：<el-input v-model="selectkey.place" placeholder="面接場所を入力" style="width:10%"></el-input>
{{select}}<!--ここ書かないとcomputedがきかない-->

<el-table
    :data="tableData.filter(data => {
      
      var str = data.companyName
               +data.time
               +data.interviewPlace
               +data.interviewstatus
               +data.comment
               +data.firstDayTime
               + data.firstDayPlace
               + data.firstDaynotes;
      return !search || str.toLowerCase().includes(search.toLowerCase())
    
    
    })"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    
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
    prop="interviewstatus"
    label="面接結果">
    </el-table-column>
     <!-- <el-table-column label="メモ" width="300px">
                  <template slot-scope="scope">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="メモ書き"
                        v-model="scope.row.memo">
                      </el-input>
                
                  </template>
     </el-table-column> -->
     <el-table-column label="詳細" width="300px">
        <template slot-scope="scope">
              <el-popover
                placement="right"
                width="400"
                trigger="click">
             面接官コメント: {{scope.row.comment}}<br>
             入場時間: {{scope.row.firstDayTime}}<br>
             現場住所/駅: {{scope.row.firstDayPlace}}<br>
             注意事項: {{scope.row.firstDaynotes}}
                <el-button slot="reference">見る</el-button>
              </el-popover>
          </template>
     </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" >
        <el-input
          v-model="search"
          size="mini"
          placeholder="キーワードで検索"/>
      </template>
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
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
      //"comment":"you are very good222",
      //"firstDaynotes":"take your notebook",
      //"firstDayPlace":"tamachi",
      //"firstDayTime":"2020-11-01 9:00"},
      
        return {
            show:false,
            selectkey:{companyName:"",time:"",place:""},
            tableData:[],
            multipleSelection: [],
            search: ''
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
        var interviewId=this.tableData[index].interviewId
        this.$http.deleteInterview(interviewId,this.$store.state.adminName)
           .then(res => {
             console.log(res)
             if(res.data="ok"){
                this.getlist();
             }else{

             }
            
        })
        .catch(function(error) {
          // error 処理
        });
        
        ;
      },
      handleSelectionChange(val) {
        console.log(val);
        this.multipleSelection = val;
      },
      deletedetail(){
        this.multipleSelection
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