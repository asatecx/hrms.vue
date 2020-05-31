<template>
<div>   
  
   <el-row  :gutter="10">
                <el-col :xs="0" :sm="6" :md="6" :lg="6" :xl="6" >
                    <div>&nbsp;</div>
                  </el-col>  
      
<el-col  :xs="24" :sm="18" :md="12" :lg="12" :xl="12">
  <div style="margin: 0px auto;">
    <movie :whoseVideo="userid"></movie>

  </div>
      
    
  <div style="margin: 10px auto;">
      <el-upload
      class="upload-demo"
      :action="videouploadUrl"
      :on-change="handleChange"
      :file-list="fileList"
    >
    
      <el-button size="small" type="primary">アピール動画を更新</el-button>
      <div slot="tip" class="el-upload__tip">ファイルサイズ100M以下</div>
    </el-upload>
    </div>
      </el-col> 
  </el-row>       
</div>
</template>

<script>
export default {
data(){

    return{
      userid:this.$store.state.adminName,
      videouploadUrl:
        this.$store.state.globalSettings.apiUrl +
        "/video?username=" +
        this.$store.state.adminName,
          fileList: [],
    }
},
methods:{

        handleChange(file, fileList) {
      this.fileList = fileList.slice(-1);
      this.buttonDialogVisible = true;
    },
}


};
</script>

<style lang="scss" scoped>
</style>