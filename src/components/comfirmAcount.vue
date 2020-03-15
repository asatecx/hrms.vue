<template>
    <div>
          <table border="1" style="border-color:gray">
              <tr >
                  <td>名前</td>
                  <td style="width:100px">{{userinfo.name}}</td>
              </tr>
              <tr>
                  <td>フリカナ</td>
                  <td>{{userinfo.furikana}}</td>
              </tr>
              <tr>
                  <td>Eメール</td>
                  <td>{{userinfo.email}}</td>
              </tr>
          </table>
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
                this.$router.push("/interviewList");
            }
           }
    }
</script>

<style lang="scss" scoped>

</style>