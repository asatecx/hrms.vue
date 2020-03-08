<template>
    <div>
        <div class="center">
            <el-container>
                <el-header>Header</el-header>
                    <el-main> 
                        <img src=../../assets/hrm.jpg><img><br>
                        <el-button type="info" @click="doLogin('個人')">個人</el-button>
                        <el-button type="info" @click="doLogin('会社')">会社</el-button>
                    </el-main>
                  <el-footer>Footer</el-footer>
            </el-container>
        </div>
        
    </div>
</template>

<script>
    export default {
        name:"Home",
            methods: {
                 doLogin(title) {
                    this.$router.push({ name: 'Login', params:{title}});
                 }   
            },
    }
</script>

<style  scoped>
.center{
    text-align: center;
}
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
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