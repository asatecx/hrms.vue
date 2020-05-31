<template>
    <div class="shadow kuandu">
       {{tankainfo.update_DATE_TIME}}
      {{message}}
        <div style="height:30px;"></div>
        最小単価：<price
          v-model="tankainfo.price_min"
            :type="`comma`"
           :disabled="tankaflg"
        ></price>
        
         最大単価：<price
          v-model="tankainfo.price_max"
            :type="`comma`"
           :disabled="tankaflg"
        ></price>

 <div class="block" style="margin-top:20px">
    <span class="demonstration">稼働可開始日:</span>
    <el-date-picker
      v-model="tankainfo.schedualstart"
      type="date"
      placeholder="选择日期"
      :disabled="startflg"
      >
    </el-date-picker>
  </div>
   <div class="block" style="margin-top:50px">
    <span class="demonstration">稼働可終了日:</span>
    <el-date-picker
      v-model="tankainfo.schedualend"
      type="date"
      placeholder="选择日期"
      :disabled="endflg"
      >
    </el-date-picker>
  </div>
    <div style="height:50px"></div>
   
 <el-button type="success" @click="modifytanka" v-show="registFlg">登録</el-button>
  <el-button type="success" @click="changestatus" v-show="modifyFlg">編集</el-button>
    </div>
</template>

<script>
import { Loading } from 'element-ui';
    export default {

         data() {
                return {
                  message:"　",
                  tankaflg:true,
                  startflg:true,
                  endflg:true,
                  modifyFlg:true,
                  registFlg:false,
                  tankainfo:{
                  // valDecimal: '',
                      PERSON_ID:this.$store.state.adminName,
                      price_min: 0,
                      price_max:0,
                      schedualstart:"",
                      schedualend:"",
                      update_DATE_TIME:"",
                  }
                };
         },
         created(){
            let loadingInstance = Loading.service();
           this.$http.getTanka(this.$store.state.adminName).then(
            res => {
              console.log(res);
              this.tankainfo=res.data;
              this.tankainfo.price_min= Number(this.tankainfo.price_min).toLocaleString();;
               this.tankainfo.price_max= Number(this.tankainfo.price_max).toLocaleString();;
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

         },
         methods:{
           changestatus(){
                  this.tankaflg=false;
                  this.startflg=false;
                  this.endflg=false;
                  this.modifyFlg=false;
                  this.registFlg=true;
             this.message="　";
           },
           modifytanka(){
                 this.modifyFlg=true;
                  this.registFlg=false;
                    this.tankaflg=true;
                  this.startflg=true;
                  this.endflg=true;
            var tempmin=this.tankainfo.price_min;
            var tempmax=this.tankainfo.price_max;
            this.tankainfo.price_min=this.tankainfo.price_min.replace(/\D/g, '')
            this.tankainfo.price_max=this.tankainfo.price_max.replace(/\D/g, '')
            this.tankainfo.UPDATE_DATE_TIME=this.$moment(this.tankainfo.update_DATE_TIME).utcOffset(540).format('YYYY-MM-DD HH:mm:ss.SSS')
             this.$http.modifytanka(this.$qs.stringify(this.tankainfo))
             this.message="登録しました"
            this.tankainfo.price_min=tempmin
            this.tankainfo.price_max=tempmax
           }

         }
    }
</script>

<style lang="scss" scoped>
 .shadow{
   box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
 }
  .kuandu{
   width:700px;
   height: 500px;
   margin: 0px auto;
   margin-top: 50px;
  text-align: center;
 }

</style>