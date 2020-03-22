<template>
  <div id="app">
    <div class="container">
      <el-container>
        <el-header>
          <logout v-if="isShow"></logout>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </div>
  </div>
</template>

<script>
import Home from "@/components/Home/Home";
export default {
  name: "App",
  provide: function() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    reload() {
      this.isShow = false;
      this.$nextTick(() => (this.isShow = true));
    }
  },
  components: {}
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
