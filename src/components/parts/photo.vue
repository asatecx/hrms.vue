<template>
  <div>
    <div class="demo-basic--circle">
      <div class="block" v-for="size in sizeList" :key="size">
        <el-avatar shape="square" :size="200" :src="`${squareUrl+'?'+now}`" >

          <img src="../../assets/default.png"/>
        </el-avatar>
   
      </div>
    </div>
    <div class="sub-title">プロフィール写真</div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      sizeList: ["large"],
      squareUrl:
        this.$store.state.globalSettings.apiUrl +
        "/home/hrms/photos/" +
        this.$store.state.adminName +
        ".jpg"
    };
  },
  computed: {
    now: function() {
         console.log("liucaocacc");
      return Math.random();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>