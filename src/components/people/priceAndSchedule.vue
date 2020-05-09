<template>
    <div class="shadow kuandu">
      {{message}}
        <div style="height:100px"></div>
        <price
          v-model="tankainfo.PRICE_MIN"
            :type="`comma`"
           :disabled="tankaflg"
        ></price>

 <div class="block" style="margin-top:50px">
    <span class="demonstration">稼働可開始日:</span>
    <el-date-picker
      v-model="tankainfo.SCHEDUALSTART"
      type="date"
      placeholder="选择日期"
      :disabled="startflg"
      >
    </el-date-picker>
  </div>
   <div class="block" style="margin-top:50px">
    <span class="demonstration">稼働可終了日:</span>
    <el-date-picker
      v-model="tankainfo.SCHEDUALEND"
      type="date"
      placeholder="选择日期"
      :disabled="endflg"
      >
    </el-date-picker>
  </div>
    <div style="height:100px"></div>
 <el-button type="success" @click="modifytanka" v-show="registFlg">登録</el-button>
  <el-button type="success" @click="changestatus" v-show="modifyFlg">編集</el-button>
    </div>
</template>

<script>
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
                      PRICE_MIN: '',
                      SCHEDUALSTART:"",
                      SCHEDUALEND:"",
                  }
                };
         },
         created(){

           this.$http.getTanka(this.$store.state.adminName).then(
            res => {
              console.log(res);
              this.tankainfo=res.data;

             }

           )

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
             this.$http.modifytanka(this.$qs.stringify(this.tankainfo))
             this.message="登録しました"
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