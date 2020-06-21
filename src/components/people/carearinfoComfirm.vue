<template>
  <div style="margin-top:40px;margin-bottom:30px;">
        <el-row  >
        <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                <div>&nbsp;</div>
        </el-col>  
        <el-col  :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
           <div style="text-align: left;">
■ 職務履歴
<table ref="print" border="1" style="border-spacing:0px;height:10px;border:1px solid #CCCCCC;border-collapse:collapse;">
    <tr style="height:10px;background-color:#F3F4F7;" class="gudingTitle1">
        <td rowspan="2">No</td>
        <td rowspan="2">開発期間</td>
        <td rowspan="2">勤務地</td>
        <td rowspan="2" colspan="4" >プロジェクト名及び作業内容</td>
        <td rowspan="2">OS/DB</td>
        <td rowspan="2">言語</td>
        <td rowspan="2">役割</td>
        <td colspan="9">開発フェーズ</td>
 
    </tr>
    <tr  style="height:10px;background-color:#F3F4F7;" class="gudingTitle2">
     
  
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
　
           </div>

         </el-col> 

 
         </el-row  >

          <!-- <el-row  >
        <el-col :xs="0" :sm="8" :md="8" :lg="8" :xl="8" >
                <div>&nbsp;</div>
        </el-col>  
        <el-col  :xs="24" :sm="8" :md="8" :lg="8" :xl="8"> -->
              
           <!-- <el-button type="primary" @click="submitForm()">ok</el-button> -->
            <div  v-show="showflg" class="dingwei" ref="botton">
                <el-button type="primary" @click="submitForm()" size="large">提出</el-button>
                <el-button type="primary" @click="back" size="large">戻る</el-button>
            </div>

         <!-- </el-col>  
         </el-row  > -->

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
                myinfo:{
                    carears: []

                }
             }
           },
           
            beforeMount() {
            // 　　window.addEventListener('orientationchange', () => {
            //         this.$router.push("/blankpage");
            // 　　})
            },
 mounted(){
//mounted()的钩子函数则是在dom完全渲染后才开始渲染数据，所以在mounted()中操作dom基本不会存在渲染问题。

//https://www.jianshu.com/p/9c3264f4a405
//   var width = document.documentElement.clientWidth;
//   var height =  document.documentElement.clientHeight;
//   if( width < height ){
//       console.log(width + " " + height);
//       let  $print =  this.$refs.print; 
      
//       console.log( $print);
//       $print.style.width=height;
//       $print.style.height=width;
//       $print.style.top= (height-width)/2 ;
//       $print.style.left=0-(height-width)/2 ;
//       $print.style.transform='rotate(90deg)';
//       $print.style.transformOrigin='50% 50%';
// } 
 var evt = "onorientationchange" in window ? "orientationchange" : "resize";
       let  $botton =  this.$refs.botton; 
    window.addEventListener(evt, function() {
            var width = document.documentElement.clientWidth;
            var height =  document.documentElement.clientHeight;
            if( width < height ){
               // console.log("phone"+width);
               
                $botton.style.marginLeft=(width/2)-60+"px";


            } else{
               // console.log("pc"+width);
                $botton.style.marginLeft=(width/2)-60+"px";
            }

 }, false);


},

           created(){
//created()中使用的方法时，dom还没有渲染，如果此时在该钩子函数中进行dom赋值数据（或者其它dom操作）时无异于徒劳，所以，此时this.$nextTick()就会被大量使用，


               console.log(this.$store.state.myinfo)
                    if(this.showflg){
                         this.myinfo=this.$store.state.myinfo
                    }else{
                         let loadingInstance = Loading.service();
                                    this.$http.getCarearInfo(this.$store.state.adminName).then(
                                    res => {
                                    this.myinfo.carears=res.data

                                        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                                        loadingInstance.close();
                                        });
                                    }

                                ).catch(err => {
                                        console.log(err);
                                            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                                                loadingInstance.close();
                                                });
                                            this.$router.push("/errpage");
                                        });

                    }
           },
           methods: {
            submitForm() {
                console.log(this.myinfo)
                this.$http.modifycarearinfo(this.myinfo)
                this.$router.push("/interviewList");
            },
             back: function() {
                this.$router.go(-1); //返回
             },
           },
       
    }
</script>

<style lang="scss" scoped>
@media screen and (orientation: portrait) {
      html{
         width : 100% ;
         height : 100% ;
          background-color: white ;
          overflow : hidden;
      }
      body{
          width : 100% ;
         height : 100% ;
         background-color: red ;
          overflow : hidden;
      }
      #print{
         position : absolute ;
         background-color: yellow ;
      }
} 
@media screen and (orientation: landscape) {
       html{
         width : 100% ;
         height : 100% ;
         background-color: white ;
      } 
       body{
          width : 100% ;
         height : 100% ;
         background-color: white ;
      }
           #print{
            position : absolute ;
            top : 0 ; 
            left : 0 ;
            width : 100% ;
            height : 100% ;
            background-color: yellow ;
         }
}
#print p{
        margin: auto ;
        margin-top : 20px ;
        text-align: center;
      }
.dingwei{
   margin-top:5px;
position: absolute;
margin-left:45%


}

</style>