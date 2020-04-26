<template>
    <div>
          <el-row>
                    <el-col :span="8">
                        <div class="demo-basic--circle">
                            <div class="block" v-for="size in sizeList" :key="size">
                            <el-avatar shape="square" :size="200" :src="`${squareUrl+'?'+now}`" v-if="isShow"></el-avatar>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="8">
                    </el-col>
           </el-row>             
           <el-button type="primary" @click="submitForm()">ok</el-button>
    </div>
</template>

<script>
    export default {
                data(){
            return{
                userinfo:''
             }
           },
           created(){
               console.log("userinfo"+this.$store.state.userinfo)
               this.userinfo=this.$store.state.userinfo
           },
           methods: {
            submitForm() {
                this.$axios.post('http://localhost:8080/niucaocao/makeAcount',this.$qs.stringify(this.userinfo))
                this.$router.push("/people");
            }
           }
    }
</script>

<style lang="scss" scoped>

</style>