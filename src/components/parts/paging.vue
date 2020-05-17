<template>
  <div class="block">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagetotal">
    </el-pagination>
  </div>
</template>

<script>
//https://hafilog.com/vue-emit-listeners
  export default {
    props: {pagetotal:{
            default: 0,
            required: true
          },
    },
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