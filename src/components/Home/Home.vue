<template>
    <div>
        <div class="center">
    
                        <img src=../../assets/hrm.jpg><img><br>
                        <el-button type="info" @click="doLogin('個人')">個人</el-button>
                        <el-button type="info" @click="doLogin('会社')">会社</el-button>
                        <el-button type="info" @click="doLoginPeople()">会社</el-button>
         
        </div>
        
    </div>
</template>

<script>
    export default {
        name:"Home",
            methods: {
                 doLogin(title) {
                    this.$router.push({ name: 'Login', params:{title}});
                 }   ,
                doLoginPeople() {
                   this.$router.push("/people");
                 }   
            },
    }
</script>

<style  scoped>
.center{
    text-align: center;
}
 
</style>