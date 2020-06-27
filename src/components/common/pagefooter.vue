<template>
  <div class="layui-card">
      <p>Copyright © 2020.Company name All rights reserved.<a href="#" target="_blank" title="株式会社XXXXXX">株式会社XXXXXX</a></p>
    </div>
</template>

<script>
export default {
  name: "pagefooter",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {};
  },
  methods: {
  },
  mounted() {},
  computed: {}
};
</script>

<style lang="scss" scoped>

.layui-card {
    margin-bottom: 15px;
    border-radius: 2px;
    background-color: rgb(250, 243, 243);
    box-shadow: 5px 5px 5px 0 rgba(0, 0, 0, .05);
    -webkit-box-shadow: #d4d2d2 0px 0px 10px;
    -moz-box-shadow: #d4d2d2 0px 0px 10px;
    font-family: "Microsoft YaHei";
    font-size: 14px;
    color:#818080;
}
</style>