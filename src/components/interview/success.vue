<template>
  <div>
      <span>予約できました</span>
      <div class="bottom clearfix">
        <el-button type="primary" @click="back" size="large">戻る</el-button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  methods: {
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    back(){
        this.$router.push("/interview/interviewlist");
    },
  }
};
</script>

<style lang="scss" scoped>
.sub-title {
  height: 30px;
  line-height: 30px;
  padding-left: 100px;
  text-align: left;
}
</style>