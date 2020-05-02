<template>
    <div class="sample">



            <div class="shadow bgc" style="width:800px;height:800px;margin: 0 auto;">
                  <div >
                      &nbsp;
                 </div>
                 <div class="shadow regist " @click="goPeoplepage">
                    <span class="zhiti" >人材を探す</span>
                 </div>
                <div class="shadow regist"  @click="goCompanypage">
                       <span class="zhiti">  案件を探す</span>
                 </div>

            </div>   
</div>
</template>

<script>
    export default {
          methods: {
              goPeoplepage(){
                this.$router.push("/myinfo");
              },
               goCompanypage(){
                this.$router.push("/company.regist");
              }
          }
    }
</script>

<style lang="scss" scoped>
/**https://fonts.google.com/# */
.sample {
color: #000000;
background-color:white;
background-image: url("../../assets/xiaofan.png")
}
.shadow {
  box-shadow: 0 0 8px gray;


}
.bgc {
 
  background-color:white;

}
.regist{

width:500px;
height:150px;
margin:150px;
background:#909399;
  text-align:center;
line-height:150px; height:150px;

}
@font-face {
   font-family: KosugiMaru;
   src: url('../../assets/font/KosugiMaru-Regular.ttf') format("truetype");
}
.zhiti{
  font-family: 'KosugiMaru', cursive;
  font-weight:normal;
  font-size: 50px;

}
</style>