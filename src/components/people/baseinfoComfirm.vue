<template>
    <div style="margin-top:40px">

           <div style="text-align: left;">
                          <el-row>
                                <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                                    <div>&nbsp;</div>
                                </el-col>  
                                <el-col  :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            ■ 基本情報  
                            <br>
                            </el-col>
                            </el-row>
          <el-form>
          <el-row>
                 <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
                <el-col  :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                         <el-form-item label="写真:">
                            <photo ></photo>
                         </el-form-item >
                    </el-col>
      
                 <el-col  :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                    <el-row  :gutter="10">
                    <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                       <el-form-item label="姓名（漢字):">
                          {{myinfo.user_name_kanji}}
                      </el-form-item >
                    </el-col>
                     <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                       <el-form-item label="姓名（カナ）:">
                          {{myinfo.user_name_kana}}
                      </el-form-item >
                    </el-col>
                    <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                       <el-form-item label="姓名（ローマ字）:">
                          {{myinfo.user_name_roma}}
                      </el-form-item >
                    </el-col>
                       <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="ニックネーム：">
                              {{myinfo.user_display_name}}
                            </el-form-item >
                        </el-col>
                         <el-col  :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                            <el-form-item label="会社:">
                            {{myinfo.company}}
                             </el-form-item >
                        </el-col>
                     </el-row >
                </el-col>
           </el-row>
                      <el-row>
     
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  


                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                   <el-form-item label="性別：">
                                {{myinfo.gender==1?"男":"女"}}
                            </el-form-item >
                        </el-col>

                     <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                                 <el-form-item label="生年月日:">
                            {{myinfo.birthday}}
                             </el-form-item >
                         </el-col>
                        <el-col :span="8">
               
                    </el-col>
             </el-row>
           <el-row>
     
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  


                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-form-item label="住所：">
                           {{myinfo.addr_pref+" "}}{{myinfo.addr_city}}
                             </el-form-item >
                        </el-col>

                     <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                              <el-form-item label="国籍:">
                                {{myinfo.country}}
                             </el-form-item >
                         </el-col>
                        <el-col :span="8">
               
                    </el-col>
             </el-row>
             <el-row>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  

                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-form-item label="最寄り駅:">
                        {{myinfo.station}}
                        </el-form-item >
                    </el-col>
                    <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-form-item label="最終学歴:">
                        {{myinfo.education}}
                         </el-form-item >
                    </el-col>
             </el-row>
              <el-row>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  

                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-form-item label="専攻:">
                        {{myinfo.major}}
                        </el-form-item >
                    </el-col>
                      <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-form-item label="実務経験:">
                        {{myinfo.work_exp}}年
                         </el-form-item >
                    </el-col>
                 </el-row>
                 <el-row>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  

                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-form-item label="日本語レベル:">
                        {{myinfo.japaneselevel}}
                        </el-form-item >
                    </el-col>

                     <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                        <el-form-item label="電話番号:">
                        {{myinfo.tel}}
                        </el-form-item >
                    </el-col>
                </el-row>
                 <el-row>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  

                  <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-form-item label="来日年度:">
                        {{myinfo.japan_exp}}年
                         </el-form-item >
                    </el-col>
                      <el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
                            <el-form-item label="Eメール:">
                        {{myinfo.mail}}
                         </el-form-item >
                    </el-col>
           </el-row>  
                            <el-row>
                  <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  

                  <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                            <el-form-item label="経験PR:">
                        {{myinfo.exp_pr}}
                         </el-form-item >
                    </el-col>
   
           </el-row> 
            </el-form>   
            <div style="text-align:center" v-show="showflg">
                <el-button type="primary" @click="submitForm()" size="large">提出</el-button>
                <el-button type="primary" @click="back" size="large">戻る</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Loading } from 'element-ui';
    export default {
            props: {showflg:{
                    type: Boolean,
                    default: true,
                 
                },
            },
           data(){
            return{
                 buttonDialogVisible: true,
                centerDialogVisible: false,
                 myinfo:''
             }
           },
           computed:{
     

           },
           created(){
        console.log("###"+this.showflg)
               if(this.showflg){
                  console.log("×××"+this.showflg)
                    this.myinfo=this.$store.state.baseinfo;
                   
               }else{
                 this.getinfo();
               }
           },
           methods: {
             getinfo(){

                 console.log("〇〇〇〇〇〇"+this.showflg)
                        let loadingInstance = Loading.service();
                                this.$http.getBaseInfo(this.$store.state.adminName).then(
                                    res => {
                                    //console.log(res.data);
                                
                                    this.myinfo=res.data
                                    
                                    this.$emit('nickname', this.myinfo.user_display_name)
                                    }

                                ).catch(err => {
                                        console.log(err);
                                            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                                                loadingInstance.close();
                                                });
                                            this.$router.push("/errpage");
                                        });
                                        return this.myinfo;
             },
            submitForm() {
                this.$http.modifybaseinfo(this.$qs.stringify(this.myinfo))
              
                this.$router.push("/interviewList");
            },
                back: function() {
                this.$router.go(-1); //返回
                },
           },
       
    }
</script>

<style lang="scss" scoped>



</style>