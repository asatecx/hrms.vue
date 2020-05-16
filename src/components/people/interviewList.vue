<template>
<div>

   <div style="text-align: left;"><el-button type="danger" @click="deletedetail">一括削除</el-button></div>
案件名：<el-input v-model="selectkey.casename" placeholder="会社名を入力" style="width:10%"></el-input>
面接時間：<el-input v-model="selectkey.time" placeholder="面接時間を入力" style="width:10%"></el-input>
面接場所：<el-input v-model="selectkey.place" placeholder="面接場所を入力" style="width:10%"></el-input>
  面接結果：<el-select v-model="interviewstatus" clearable placeholder="選択してください">
    <el-option
      v-for="item in interviewstatuss"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
{{select}}<!--ここ書かないとcomputedがきかない-->
<paging :pagetotal="pagetotal" @sizeChange="handleSizeChange" @currentChange="handleCurrentChange"></paging>
<el-table
    :data="tableData.filter(data => {
      
      var str = data.casename
               +data.starttime
               +data.endtime
               +data.workplace
               +data.interviewresult
           
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
    prop="casename"
    label="案件名"
    width="180">
    </el-table-column>
    <el-table-column
    prop="interview_datetime"
    label="面接時間"
    width="180">
    </el-table-column>
    <el-table-column
    prop="interviewplace"
    label="面接場所">
    </el-table-column>
    <el-table-column
    prop="interviewresult"
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
     <el-table-column label="プロジェクト詳細" width="300px">
        <template slot-scope="scope">
              <el-popover
                placement="right"
                width="400"
                trigger="click">
             プロジェクト内容: {{scope.row.workcontents}}<br>
             プロジェクト現場: {{scope.row.workplace}}<br>
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
import * as infodata from "../myinfoData";
 
 var currentPage=1;
 var pagesize=5;
export default {
    data() {

      
        return {
            interviewstatus:"",
            interviewstatuss: infodata.mydata.interviewstatuss,
            show:false,
            selectkey:{casename:"",time:"",place:""},
            tableData:[],
            multipleSelection: [],
            search: '',
            pagetotal:0,
        }
    },
     methods:{
         getlist(){
            let caseName = this.selectkey.casename
            let id=this.$store.state.adminName;
             this.$http.getInterviewList(caseName,id,currentPage,pagesize)
          .then((res) => {
            this.tableData = res.data;
            }).catch(function(error) {
                // error 処理
            });
         },
         getpagetotal(){
            let caseName = this.selectkey.casename
            let id=this.$store.state.adminName;
             this.$http.getpagetotal(caseName,id,currentPage,pagesize)
          .then((res) => {
            console.log(res)
            this.pagetotal = res.data.data.count;
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
               this.getpagetotal();
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
        
          this.$http.deleteIntervies({interviews:this.multipleSelection},this.$store.state.adminName)
           .then(res => {
             console.log(res)
             if(res.data="ok"){
               this.getpagetotal();
                this.getlist();
             }else{

             }
            
        })
        .catch(function(error) {
          // error 処理
        });
      },
      handleSizeChange(val) {
        pagesize=val;
          console.log(`P每页 ${val} 条`);
          this.getlist();
       
      },
     handleCurrentChange(val) {
        currentPage=val;
          console.log(`P当前页: ${val}`);
          this.getlist();
      }

     }
    ,created(){
        this. getpagetotal();
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