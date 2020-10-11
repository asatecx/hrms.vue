<template>
<div style="margin-top:45px">
  
    <el-form  label-width="100px">
        <el-row >
           <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                <div>&nbsp;</div>
           </el-col> 


         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <el-row >
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                            <el-form-item label="案件名称：" >
                                  <el-input v-model="selectkey.casename" style="width:200px" placeholder="案件名を入力"></el-input>
                              </el-form-item>
                      
                  </el-col>

                  
                           <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                                      <el-form-item label="面接時間：" >
                                  <el-input v-model="selectkey.time" placeholder="面接時間を入力" style="width:200px"></el-input>
                              </el-form-item>
                  </el-col>
                   </el-row >
                    <el-row >
                     
                         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                            <el-form-item label="面接場所：" >
                  <el-input v-model="selectkey.place" placeholder="面接場所を入力" style="width:200px"></el-input>
                        </el-form-item>
                  </el-col>
                         <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                            <el-form-item label="面接結果：" >
                    <el-select v-model="selectkey.result" clearable placeholder="選択してください">
                      
                    
                      <el-option
                        v-for="item in interviewstatuss"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                      </el-form-item>
                    </el-col>
                    </el-row >
          </el-col>

   </el-row >
 </el-form>
{{select}}<!--ここ書かないとcomputedがきかない-->


 <el-row >
           <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                <div>&nbsp;</div>
        </el-col> 
    <el-col :xs="24" :sm="24" :md="24" :lg="15" :xl="24">
       <div style="text-align: left;"><el-button type="danger" round @click="deletedetail">一括削除</el-button></div>
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
    
    @selection-change="handleSelectionChange"
    v-show="showflg"
    >
    <el-table-column
      type="selection"
      width="55" >
    </el-table-column>
    
    <el-table-column
    prop="casename"
    label="案件名"
    width="120px">
    </el-table-column>

        <el-table-column
    prop="interview_datetimeUI"
    label="面接時間"
    width="214px" >
    </el-table-column>
    <el-table-column
    prop="interviewplace"
    label="面接場所" width="200px" >
    </el-table-column>
    <el-table-column
    prop="interviewresult"
    label="結果"  width="60px" >
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
     <el-table-column label="詳細" width="80px">
        <template slot-scope="scope">
              <el-popover
                placement="right"
                width="400"
                trigger="click">
      
             プロジェクト内容: {{scope.row.workcontents}}<br>
             プロジェクト現場: {{scope.row.workplace}}<br>
               <el-button slot="reference" icon="el-icon-more" circle></el-button> 
                
              </el-popover>
          </template>
     </el-table-column>
    <el-table-column
      align="right" width="10px">
      <!-- <template slot="header" >
        <el-input
          v-model="search"
          size="mini"
          placeholder="キーワードで検索"/>
      </template> -->
      <template slot-scope="scope">
 
           <i class="el-icon-edit" @click.prevent="handleEdit(scope.$index, scope.row)"></i>
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">×</el-button> -->

            <i class="el-icon-delete" @click.prevent="handleDelete(scope.$index, scope.row)"></i>

               <el-dialog title="ステータス更新" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                  <el-form-item label="ステータス" :label-width="formLabelWidth">
                    <el-select v-model="form.status" placeholder="ステータスを選ぶ">
                      <el-option label="面接を受ける" value="2"></el-option>
                      <el-option label="面接を断る" value="3"></el-option>
                      <el-option label="面接参加をキャンセル" value="8"></el-option>
                      <el-option label="合格を辞退" value="9"></el-option>
                      
                    </el-select>
                  </el-form-item>
                     <el-form-item label="面接時間" :label-width="formLabelWidth">
                        <el-select  v-model="form.interview_datetime" placeholder="面接時間" >
                          <el-option :value="scope.row.interview_datetime1" >{{scope.row.interview_datetime1}}</el-option>
                          <el-option  :value="scope.row.interview_datetime2" >{{scope.row.interview_datetime2}}</el-option>
                          <el-option  :value="scope.row.interview_datetime3">{{scope.row.interview_datetime3}}</el-option>
                        </el-select>
                    </el-form-item>
                 
                      <el-form-item label="評価" :label-width="formLabelWidth">
                      <el-rate v-model="form.rate"></el-rate>
                    </el-form-item>

                     <el-form-item label="面接側へのメッセージ" :label-width="formLabelWidth">
                     　<el-input
                        type="textarea"
                        autosize
                        placeholder="面接側へのメッセージ"
                        v-model="form.messageToCompany">
                      </el-input>
                    </el-form-item>
                </el-form>
            
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="confirm(tempindex, temprow)">确 定</el-button>
                </div>
              </el-dialog>
      </template>
    </el-table-column>
  </el-table>

  <el-table
    :data="tableData.filter(data => {
      
      var str = data.casename
               +data.starttime
               +data.endtime
               +data.workplace
               +data.interviewresult
           
      return !search || str.toLowerCase().includes(search.toLowerCase())
    
    
    })"
    
    @selection-change="handleSelectionChange"
    v-show="!showflg"
    >
    <el-table-column
      type="selection"
      width="55" >
    </el-table-column>
    
    <el-table-column
    prop="casename"
    label="案件名"
    width="100px">
    </el-table-column>

            <el-table-column
  prop="interview_datetimeUI"
    label="面接時間"
    width="214px" >

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
     <el-table-column label="詳細" width="80px">
        <template slot-scope="scope">
              <el-popover
                placement="right"
                width="400"
                trigger="click">
            面接場所: {{scope.row.interviewplace}}<br>
             面接結果: {{scope.row.interviewresult}}<br>
             プロジェクト内容: {{scope.row.workcontents}}<br>
             プロジェクト現場: {{scope.row.workplace}}<br>
               <el-button slot="reference" icon="el-icon-more" circle></el-button> 
                
              </el-popover>
          </template>
     </el-table-column>
    <el-table-column
      align="right" width="10px">
      <!-- <template slot="header" >
        <el-input
          v-model="search"
          size="mini"
          placeholder="キーワードで検索"/>
      </template> -->
      <template slot-scope="scope">
        <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>-->
        <!-- <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">×</el-button> -->
            <i class="el-icon-edit" @click.prevent="handleEdit(scope.$index, scope.row)"></i>
            <i class="el-icon-delete" @click.prevent="handleDelete(scope.$index, scope.row)"></i>
      </template>
    </el-table-column>
  </el-table>
    </el-col>
   </el-row >


</div>
</template>

<script>
import * as infodata from "../myinfoData";
 import { Loading } from 'element-ui';
 var currentPage=1;
 var pagesize=5;
export default {
    data() {

      
        return {
         
       param: {
        companyId: "",
        personId: "",
        interviewresult: "",
        UPDATE_DATE_TIME: "",
        rateToCompany: "",
        messageToCompany:"",
        interview_datetime:"",
      },
          tempindex:"",
          temprow:"",
          dialogFormVisible:false,
                  form: {
          interview_datetime: '',
          status: '',
          rate: '',
          messageToCompany: '',
        },
        formLabelWidth: '120px',
          showflg:true,
            interviewstatus:"",
            interviewstatuss: infodata.mydata.interviewstatuss,
            show:false,
            selectkey:{casename:"",time:"",place:"",result:""},
            tableData:[],
            multipleSelection: [],
            search: '',
            pagetotal:0,
            loadingInstance:'',
        }
    },
     methods:{
       setInterviewResult(index) {
         this.param.interviewresult=this.tableData[index].interviewresult;
         this.param.rateToCompany=this.tableData[index].rateToCompany;
         this.param.messageToCompany=this.tableData[index].messageToCompany;
          this.param.interview_datetime=this.tableData[index].interview_datetime;
      this.param.companyId = this.tableData[index].companyId;
      this.param.personId = this.$store.state.adminName;
      this.param.UPDATE_DATE_TIME = this.$moment(
        this.tableData[index].update_DATE_TIME
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
            this.getlist();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
       confirm(index,row){
         console.log(index,row);
         console.log(index,row.casename);
         row.interview_datetime=this.form.interview_datetime;
           row.interviewresult=this.form.status;
           row.rateToCompany=this.form.rate;
           row.messageToCompany=this.form.messageToCompany;
         this.setInterviewResult(index) ;
         this.dialogFormVisible = false
       },
         getlist(){
            let caseName = this.selectkey.casename;
            let casetime = this.selectkey.time;
            let caseplace= this.selectkey.place;
            let result=this.selectkey.result;
            
            let id=this.$store.state.adminName;
             this.$http.getInterviewList(caseName,casetime,caseplace,result,id,currentPage,pagesize)
          .then((res) => {
            this.tableData = res.data;
            console.log(this.tableData);
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              this.loadingInstance.close();
            });
            }).catch(err => {
                console.log(err);
                  this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        this.loadingInstance.close();
                      });
                  this.$router.push("/errpage");
              });
         },
         getpagetotal(){
            let caseName = this.selectkey.casename
            let id=this.$store.state.adminName;
             this.$http.getpagetotal(caseName,id,currentPage,pagesize)
          .then((res) => {
            console.log(res)
            this.pagetotal = res.data.data.count;
            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              this.loadingInstance.close();
            });
            }).catch(err => {
                console.log(err);
                  this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                        this.loadingInstance.close();
                      });
                  this.$router.push("/errpage");
              });
         },
      handleEdit(index, row) {
       this.form.interview_datetime=this.tableData[index].interview_datetimeUI;
          this.form.status=this.tableData[index].interviewresult;
          this.form.rate=this.tableData[index].rateToCompany;
          this.form.messageToCompany=this.tableData[index].messageToCompany;

        this.dialogFormVisible = true
    this.tempindex=index;
    this.temprow=row;
        
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
          .catch(err => {
                    console.log(err);
                      this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                            loadingInstance.close();
                          });
                      this.$router.push("/errpage");
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
          .catch(err => {
                  console.log(err);
                    this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                          loadingInstance.close();
                        });
                    this.$router.push("/errpage");
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
      this.loadingInstance = Loading.service();
        this. getpagetotal();
            this.getlist()
          

    },

    mounted(){

 var evt = "onorientationchange" in window ? "orientationchange" : "resize";
     //  let  $botton =  this.$refs.botton; 
    window.addEventListener(evt, function() {
            var width = document.documentElement.clientWidth;
            var height =  document.documentElement.clientHeight;
            if( width < height ){
                console.log("phone"+width);
               
              this.showflg=false


            } else{
                console.log("pc"+width);
              this.showflg=true
            }

 }, false);

             var width = document.documentElement.clientWidth;
            var height =  document.documentElement.clientHeight;
            if( width < height ){
                console.log("phonew"+width);
               
              this.showflg=false


            } else{
                console.log("pcw"+width);
              this.showflg=true
            }


},
    computed: {



        select: function() {
                this.getlist()
                return ""
        }

    }
}
</script>

<style lang="scss" scoped>

</style>
