<template>
  <div>
    <div style="width:700px;margin: 0px auto;">
      <movie :whoseVideo="userid"></movie>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: this.$route.params.personId,
      videouploadUrl:
        this.$store.state.globalSettings.apiUrl +
        "/video?username=" +
        this.$store.state.adminName,
      fileList: []
    };
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      this.buttonDialogVisible = true;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>