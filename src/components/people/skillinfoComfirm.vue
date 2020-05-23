<template>
    <div>
 
           <div style="text-align: left;width:1200px;margin-left:400px">
         
          <el-form>
        

■ スキルレベル
<table border="1" style="border-spacing:0px;height:10px;border:1px solid #CCCCCC;border-collapse:collapse;">
   
     <tr style="height:10px;background-color:#F3F4F7;">
         <td style="width:60px"></td>
         <td style="width:120px">言語環境</td>
         <td style="width:200px">期間(年)</td>
         <td style="width:708px">レベル</td>
    </tr>
     <tr style="height:10px;">
         <td :rowspan="myinfo.tableDataLanguage.length">言語</td>
         <td>{{myinfo.tableDataLanguage[0].skill}}</td>
         
         <td >{{myinfo.tableDataLanguage[0].exp}}</td>
         <td >{{levelarry.textsLan[myinfo.tableDataLanguage[0].level-1]}}</td>
    </tr>
      <template v-for=" n of myinfo.tableDataLanguage.length-1">
        <tr :key="n+'la'" style="height:10px;">
            
            <td>{{myinfo.tableDataLanguage[n].skill}}</td>
            
            <td >{{myinfo.tableDataLanguage[n].exp}}</td>
            <td >{{levelarry.textsLan[myinfo.tableDataLanguage[n].level-1]}}</td>
        </tr>
     </template >

　　<tr style="height:10px;">
         <td :rowspan="myinfo.tableDataDB.length">DB</td>
         <td>{{myinfo.tableDataDB[0].skill}}</td>
         
         <td >{{myinfo.tableDataDB[0].exp}}</td>
         <td >{{levelarry.textsDB[myinfo.tableDataDB[0].level-1]}}</td>
    </tr>
      <template v-for=" n of myinfo.tableDataDB.length-1">
        <tr :key="n+'db'" style="height:10px;">
            
            <td>{{myinfo.tableDataDB[n].skill}}</td>
            
            <td >{{myinfo.tableDataDB[n].exp}}</td>
            <td >{{levelarry.textsDB[myinfo.tableDataDB[n].level-1]}}</td>
        </tr>
     </template >

　　<tr style="height:10px;">
         <td :rowspan="myinfo.tableDataOS.length">OS</td>
         <td>{{myinfo.tableDataOS[0].skill}}</td>
         
         <td >{{myinfo.tableDataOS[0].exp}}</td>
         <td >{{levelarry.textsOS[myinfo.tableDataOS[0].level-1]}}</td>
    </tr>
      <template v-for=" n of myinfo.tableDataOS.length-1">
        <tr :key="n+'os'" style="height:10px;">
            
            <td>{{myinfo.tableDataOS[n].skill}}</td>
            
            <td >{{myinfo.tableDataOS[n].exp}}</td>
            <td >{{levelarry.textsOS[myinfo.tableDataOS[n].level-1]}}</td>
        </tr>
     </template >
</table>
 <br>

　

            </el-form>   
              
           <!-- <el-button type="primary" @click="submitForm()">ok</el-button> -->
              <div style="text-align:center" v-show="showflg">
                  <el-button type="primary" @click="submitForm()" size="large">提出</el-button>
                  <el-button type="primary" @click="back" size="large">戻る</el-button>
              </div>
           </div>
    </div>
</template>

<script>
import * as infodata from "../myinfoData";
    export default {
          props: {showflg:{
                  type: Boolean,
                  default: true,
                
              },
            },
           data(){
            return{
                levelarry:infodata.mydata,
                 buttonDialogVisible: true,
                centerDialogVisible: false,
                myinfo:''
             }
           },
           created(){
                if(this.showflg){
                  this.myinfo=this.$store.state.skillinfo
                }else{
                          this.$http.getSkillInfo(this.$store.state.adminName).then(
                          res => {
                            // this.loadflg1=true;
                            // this.loadflg2=true;
                            // this.loadflg3=true;
                            this.myinfo=res.data

                            // this.initselectedskill(this.ruleForm.tableDataLanguage,this.skillSourceLanguage,this.selectedLanguage);
                            // this.initselectedskill(this.ruleForm.tableDataDB,this.skillSourceDB,this.selectedDB);
                            // this.initselectedskill(this.ruleForm.tableDataOS,this.skillSourceOS,this.selectedOS);

                          }
                        )
                }
           },
           methods: {
            submitForm() {
             console.log(this.myinfo)
                  this.$http.modifyskillinfo(this.myinfo)
                this.$router.push("/mycv");
            },
            back: function() {
                this.$router.go(-1); //返回
             },
           },
       
    }
</script>

<style lang="scss" scoped>



</style>