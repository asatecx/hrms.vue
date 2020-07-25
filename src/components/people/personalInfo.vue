<template>
      <el-form
      ref="form"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
        
      >
    
            <el-form-item label="姓名" prop="name_privacy">
                                   <el-radio-group v-model="ruleForm.name_privacy" @change="commit">
                                    <el-radio-button label="0"> <span class="iconfont icon-password"></span>自分のみ</el-radio-button>
                                    <el-radio-button label="1"><span class="iconfont icon-Customermanagement"></span>一般公開</el-radio-button>
                                    </el-radio-group>
             </el-form-item>
            <el-form-item label="電話" prop="tel_privacy">
                                   <el-radio-group v-model="ruleForm.tel_privacy" @change="commit">
                                    <el-radio-button label="0"> <span class="iconfont icon-password"></span>自分のみ</el-radio-button>
                                    <el-radio-button label="1"><span class="iconfont icon-Customermanagement"></span>一般公開</el-radio-button>
                                    </el-radio-group>
             </el-form-item>
            <el-form-item label="メール" prop="mail_privacy">
                                   <el-radio-group v-model="ruleForm.mail_privacy" @change="commit">
                                    <el-radio-button label="0"> <span class="iconfont icon-password"></span>自分のみ</el-radio-button>
                                    <el-radio-button label="1"><span class="iconfont icon-Customermanagement"></span>一般公開</el-radio-button>
                                    </el-radio-group>
             </el-form-item>
            <el-form-item label="生年月日" prop="birthday_privacy">
                                   <el-radio-group v-model="ruleForm.birthday_privacy" @change="commit">
                                    <el-radio-button label="0"> <span class="iconfont icon-password"></span>自分のみ</el-radio-button>
                                    <el-radio-button label="1"><span class="iconfont icon-Customermanagement"></span>一般公開</el-radio-button>
                                    </el-radio-group>
             </el-form-item>
            <el-form-item label="会社" prop="company_privacy">
                                   <el-radio-group v-model="ruleForm.company_privacy" @change="commit">
                                    <el-radio-button label="0"> <span class="iconfont icon-password"></span>自分のみ</el-radio-button>
                                    <el-radio-button label="1"><span class="iconfont icon-Customermanagement"></span>一般公開</el-radio-button>
                                    </el-radio-group>
             </el-form-item>
              <el-form-item label="パスワード" prop="company_privacy">
                  <el-button type="primary" style="width:190px" @click="changePassword">変更</el-button>
             </el-form-item>

      </el-form>
</template>

<script>
import { Loading } from 'element-ui';
 export default {
    data() {
      return {
         ruleForm:{
          name_privacy:"",
          tel_privacy:"",
          mail_privacy:"",
          birthday_privacy:"",
          company_privacy:"",
          } 
      }
    },
      created() {
         let loadingInstance = Loading.service();
           this.$http.getBaseInfo(this.$store.state.adminName).then(
            res => {
              console.log(res.data);
           
              this.ruleForm=res.data
                this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });
             }

           ).catch(err => {
          console.log(err);
             this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                  loadingInstance.close();
                });
            this.$router.push("/errpage");
        });
        
  },
    methods: {
        changePassword(){

            this.$router.push("/passwordChangeComfirm");
        },
        commit(){
          ///baseinfoP
          console.log("XXXXXXXXXXXXXXXXXXXXx");
            console.log(this.ruleForm.name_privacy);
                              this.$http.modifybaseinfoP(this.$qs.stringify(this.ruleForm)).catch(err => {
                                        console.log(err);
                                            this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                                                loadingInstance.close();
                                                });
                                            this.$router.push("/errpage");
                                        });
        }

    }
  }
</script>

<style lang="scss" scoped>

</style>