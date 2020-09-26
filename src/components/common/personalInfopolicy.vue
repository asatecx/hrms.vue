<template>
    <div>
<el-input
  type="textarea"
  :rows="2"
  placeholder="请输入内容"
  v-model="textarea"
  disabled="true">
</el-input>
    </div>
</template>

<script>
    export default {
            data() {
                return {
                textarea: '個人情報保護方針'
                }
            }
    }
</script>

<style lang="scss" scoped>

</style>