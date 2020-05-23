<template>
    <div>
 
           <div style="text-align: left;width:1200px;margin-left:400px">

          <el-form>
         

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
        <td rowspan="2" style="width:20px">{{ index+1}}</td>
        <td rowspan="2" width="20px">{{item.start_ym| moment}}～{{item.end_ym| moment}}</td>
        <td rowspan="2" style="width:60px">{{item.work_place}}</td>

        <td style="background-color:#F3F4F7;width:60px">案件名</td>
        <td width="110px">{{item.pj_name}}</td>
        <td  style="background-color:#F3F4F7;width:60px">業種</td>
        <td style="width:180px">{{item.bussness_type}}</td>

        <td rowspan="2" style="width:100px">{{item.dev_env}}</td>
        <td rowspan="2" style="width:100px">{{item.language}}</td>
        <td rowspan="2" style="width:30px">
            
            {{item.role.role_tester? 'tester/':''}}
            {{item.role.role_pg? 'PG/':''}}
            {{item.role.role_se? 'SE/':''}}
            {{item.role.role_bse? 'BSE/':''}}
            {{item.role.role_sl? 'sub-Leader/':''}}
            {{item.role.role_tl? 'TL/':''}}
            {{item.role.role_pmo? 'PMO/':''}}
            {{item.role.role_am? 'AM/':''}}
            {{item.role.role_pm? 'PM/':''}}
            {{item.role.role_arch? 'Architect/':''}}
            {{item.role.role_consul? 'consultant/':''}}
            
            </td>
        <td rowspan="2">{{item.face.phase_rd|maru}}</td>
        <td rowspan="2">{{item.face.phase_bd|maru}}</td>
        <td rowspan="2">{{item.face.phase_fd|maru}}</td>
        <td rowspan="2">{{item.face.phase_dd|maru}}</td>
        <td rowspan="2">{{item.face.phase_cd|maru}}</td>
        <td rowspan="2">{{item.face.phase_ut|maru}}</td>
        <td rowspan="2">{{item.face.phase_it|maru}}</td>
        <td rowspan="2">{{item.face.phase_st|maru}}</td>
        <td rowspan="2">{{item.face.phase_ot|maru}}</td>
    </tr>
     <tr :key="index+'sub'">
         <td colspan="4" >{{item.work_contents}}</td>
     </tr >
     </template >
</table>
　

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
                myinfo:{
                    carears: []

                }
             }
           },
           created(){
               console.log(this.$store.state.myinfo)
                    if(this.showflg){
                         this.myinfo=this.$store.state.myinfo
                    }else{
                                    this.$http.getCarearInfo(this.$store.state.adminName).then(
                                    res => {
                                         console.log("carearinfo:----");
                                    console.log(res.data);
                                    this.myinfo.carears=res.data
                                    }

                                )

                    }
           },
           methods: {
            submitForm() {
                console.log(this.myinfo)
                this.$http.modifycarearinfo(this.myinfo)
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