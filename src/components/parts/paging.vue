<template>
  <div class="block">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
</template>

<script>
//https://hafilog.com/vue-emit-listeners
  export default {
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.$emit('sizeChange', val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.$emit('currentChange', val)
      }
    },
    data() {
      return {
        currentPage: 1
      };
    }
  }
</script>