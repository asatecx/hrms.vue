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
                       <el-form-item label="姓名（漢字:">
                          {{myinfo.USER_NAME_KANJI}}
                      </el-form-item >
                    </el-col>
                    <el-col :span="8" >
                       <el-form-item label="姓名（カナ）:">
                          {{myinfo.USER_NAME_KANA}}
                      </el-form-item >
                    </el-col>
                   <el-col :span="8" >
                       <el-form-item label="姓名（ローマ字:">
                          {{myinfo.USER_NAME_ROMA}}
                      </el-form-item >
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="性別：">
                                {{myinfo.GENDER}}
                            </el-form-item >
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="住所：">
                           {{myinfo.ADDR_PREF+" "}}{{myinfo.ADDR_CITY}}
                             </el-form-item >
                        </el-col>
                         <el-col :span="8">
                            <el-form-item label="生年月日:">
                            {{myinfo.BIRTHDAY| moment}}
                             </el-form-item >
                        </el-col>
                       <el-col :span="8">
                              <el-form-item label="国籍:">
                                {{myinfo.COUNTRY}}
                             </el-form-item >
                         </el-col>
                        <el-col :span="8">
               
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="最寄り駅:">
                        {{myinfo.STATION}}
                        </el-form-item >
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="最終学歴:">
                        {{myinfo.EDUCATION}}
                         </el-form-item >
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="専攻:">
                        {{myinfo.MAJOR}}
                        </el-form-item >
                    </el-col>
                    <el-col :span="8">
                            <el-form-item label="実務経験:">
                        {{myinfo.WORK_EXP}}年
                         </el-form-item >
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="日本語レベル:">
                        {{myinfo.JAPANESELEVEL}}
                        </el-form-item >
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="来日年度:">
                        {{myinfo.JAPAN_EXP}}年
                         </el-form-item >
                    </el-col>
                     <el-col :span="8">
                        <el-form-item label="電話番号:">
                        {{myinfo.TEL}}
                        </el-form-item >
                    </el-col>
                        <el-col :span="8">
                            <el-form-item label="Eメール:">
                        {{myinfo.MAIL}}年
                         </el-form-item >
                    </el-col>
           </el-row>  


　

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
               console.log(this.$store.state.baseinfo)
               this.myinfo=this.$store.state.baseinfo;
           },
           methods: {
            submitForm() {
                this.$http.modifyskillinfo(this.$qs.stringify(this.myinfo))
              
                this.$router.push("/people");
            }
           },
       
    }
</script>

<style lang="scss" scoped>



</style>