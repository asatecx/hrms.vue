<template>
    <div>
 
           <div style="text-align: left;width:1200px;margin-left:400px">
            ■ 基本情報  
               <br>
          <el-form>
          <el-row>
                    <el-col :span="8">
                         <el-form-item label="写真:">
                            <photo ></photo>
                         </el-form-item >
                    </el-col>
                    <el-col :span="8" >
                       <el-form-item label="名前:">
                          {{myinfo.name}}
                      </el-form-item >
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="性別：">
                                {{myinfo.sex}}
                            </el-form-item >
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="住所：">
                           {{myinfo.province+" "}}{{myinfo.city}}
                             </el-form-item >
                        </el-col>
                         <el-col :span="8">
                            <el-form-item label="自己紹介：">
                              <el-button type="text"
                                                v-show="buttonDialogVisible"
                                                @click="centerDialogVisible = true"
                                            >プレビュー</el-button>

                                        <el-dialog title="自己紹介動画確認" :visible.sync="centerDialogVisible" width="30%" center>
                                            <span>
                                            <movie whoseVideo="admin"></movie>
                                            </span>
                                            <span slot="footer" class="dialog-footer">
                                            <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
                                            <el-button type="primary" @click="centerDialogVisible = false">閉じる</el-button>
                                            </span>
                                        </el-dialog>
                                </el-form-item >
                        </el-col>
                       <el-col :span="8">
                          <el-form-item label="生年月日:">
                            {{myinfo.birthday| moment}}
                        </el-form-item >
                    </el-col>
                        <el-col :span="8">
                             <el-form-item label="国籍:">
                                {{myinfo.country}}
                             </el-form-item >
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最寄り駅:">
                        {{myinfo.station}}
                        </el-form-item >
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="最終学歴:">
                        {{myinfo.school}}
                         </el-form-item >
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="専攻:">
                        {{myinfo.major}}
                        </el-form-item >
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="実務経験:">
                        {{myinfo.workyears}}年
                         </el-form-item >
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="日本語レベル:">
                        {{myinfo.major}}
                        </el-form-item >
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="来日年度:">
                        {{myinfo.comeJapanyears}}年
                         </el-form-item >
                    </el-col>
           </el-row>  

■ スキルレベル
<table border="1" style="border-spacing:0px;height:10px;border:1px solid #CCCCCC;border-collapse:collapse;">
     <tr style="height:10px;background-color:#F3F4F7;">
         <td style="width:60px"></td>
         <td style="width:120px">言語環境</td>
         <td style="width:200px">期間</td>
         <td style="width:708px">レベル</td>
    </tr>
     <tr style="height:10px;">
         <td :rowspan="myinfo.tableDataLanguage.length">言語</td>
         <td>{{myinfo.tableDataLanguage[0].skill}}</td>
         
         <td >{{myinfo.tableDataLanguage[0].exp}}</td>
         <td >XXXXXXXXXXXXXXXXXXXXXXXX</td>
    </tr>
      <template v-for=" n of myinfo.tableDataLanguage.length-1">
        <tr :key="n+'la'" style="height:10px;">
            
            <td>{{myinfo.tableDataLanguage[n].skill}}</td>
            
            <td >{{myinfo.tableDataLanguage[n].exp}}</td>
            <td >XXXXXXXXXXXXXXXXXXXXXXXXｘ</td>
        </tr>
     </template >

　　<tr style="height:10px;">
         <td :rowspan="myinfo.tableDataDB.length">DB</td>
         <td>{{myinfo.tableDataDB[0].skill}}</td>
         
         <td >{{myinfo.tableDataDB[0].exp}}</td>
         <td >XXXXXXXXXXXXXXXXXXXXXXXX</td>
    </tr>
      <template v-for=" n of myinfo.tableDataDB.length-1">
        <tr :key="n+'db'" style="height:10px;">
            
            <td>{{myinfo.tableDataDB[n].skill}}</td>
            
            <td >{{myinfo.tableDataDB[n].exp}}</td>
            <td >XXXXXXXXXXXXXXXXXXXXXXXXｘ</td>
        </tr>
     </template >

　　<tr style="height:10px;">
         <td :rowspan="myinfo.tableDataOS.length">OS</td>
         <td>{{myinfo.tableDataOS[0].skill}}</td>
         
         <td >{{myinfo.tableDataOS[0].exp}}</td>
         <td >XXXXXXXXXXXXXXXXXXXXXXXX</td>
    </tr>
      <template v-for=" n of myinfo.tableDataOS.length-1">
        <tr :key="n+'os'" style="height:10px;">
            
            <td>{{myinfo.tableDataOS[n].skill}}</td>
            
            <td >{{myinfo.tableDataOS[n].exp}}</td>
            <td >XXXXXXXXXXXXXXXXXXXXXXXXｘ</td>
        </tr>
     </template >
</table>
 <br>
■ 職務履歴
<table border="1" style="border-spacing:0px;height:10px;border:1px solid #CCCCCC;border-collapse:collapse;">
    <tr style="height:10px;background-color:#F3F4F7;">
        <td rowspan="2">No</td>
        <td rowspan="2">開発期間</td>
        <td rowspan="2">勤務地</td>
        <td rowspan="2" colspan="4" >プロジェクト名及び作業内容</td>
        <td rowspan="2">OS/DB</td>
        <td rowspan="2">言語</td>
        <td rowspan="2">役割</td>
        <td colspan="9">開発フェーズ</td>
 
    </tr>
    <tr  style="height:10px;background-color:#F3F4F7;">
     
  
        <td width="6px">要件定義</td>
        <td width="6px">基本設計</td>
        <td width="6px">機能設計</td>
        <td width="6px">詳細設計</td>
        <td width="6px" > 製造</td>
        <td width="6px">単体試験</td>
        <td width="6px">結合試験</td>
        <td width="6px">総合試験</td>
        <td width="6px">運用保守</td>
    </tr>
  <template v-for="(item, index) in myinfo.carears">
    <tr :key="index" style="height:10px">
        <td rowspan="2" style="width:20px">No</td>
        <td rowspan="2" width="20px">{{item.projectFrom| moment}}～{{item.projectTo| moment}}</td>
        <td rowspan="2" style="width:60px">No</td>

        <td style="background-color:#F3F4F7;width:60px">案件名</td>
        <td width="110px">{{item.projectname}}</td>
        <td  style="background-color:#F3F4F7;width:60px">業種</td>
        <td style="width:180px">{{item.insustry}}</td>

        <td rowspan="2" style="width:100px">{{item.envirment}}</td>
        <td rowspan="2" style="width:100px">No</td>
        <td rowspan="2" style="width:30px">{{item.role|connection}}</td>
        <td rowspan="2">{{item.face.yo|maru}}</td>
        <td rowspan="2">{{item.face.kiho|maru}}</td>
        <td rowspan="2">{{item.face.kino|maru}}</td>
        <td rowspan="2">{{item.face.syo|maru}}</td>
        <td rowspan="2">{{item.face.sei|maru}}</td>
        <td rowspan="2">{{item.face.dan|maru}}</td>
        <td rowspan="2">{{item.face.ketu|maru}}</td>
        <td rowspan="2">{{item.face.so|maru}}</td>
        <td rowspan="2">{{item.face.un|maru}}</td>
    </tr>
     <tr :key="index+'sub'">
         <td colspan="4" >{{item.contents}}</td>
     </tr >
     </template >
</table>
　

            </el-form>   
              
           <el-button type="primary" @click="submitForm()">ok</el-button>
           </div>
    </div>
</template>

<script>
    export default {

           data(){
            return{
                 buttonDialogVisible: true,
                centerDialogVisible: false,
                myinfo:''
             }
           },
           created(){
               console.log(this.$store.state.myinfo)
               this.myinfo=this.$store.state.myinfo
           },
           methods: {
            submitForm() {
                this.$axios.post('http://localhost:8080/niucaocao/makeAcount',this.$qs.stringify(this.myinfo))
                this.$router.push("/people");
            }
           },
       
    }
</script>

<style lang="scss" scoped>



</style>