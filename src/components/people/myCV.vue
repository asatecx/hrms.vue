<template>
    <div>
<baseinfo :showflg="bshowflg" ref="basemessage" @nickname="getnickname" v-if="isShow"></baseinfo>
<skillinfo :showflg="sshowflg" v-if="isShow"> </skillinfo>
<carearinfo :showflg="cshowflg" v-if="isShow"></carearinfo>

  <el-button type="primary" icon="el-icon-download" @click="showResume">職歴書</el-button>
    </div>
</template>

<script>
import baseinfo from '@/components/people/baseinfoComfirm'
import carearinfo from '@/components/people/carearinfoComfirm'
import skillinfo from '@/components/people/skillinfoComfirm'
    export default {
        data(){

            return{
                bshowflg:false,
                cshowflg:false,
                 sshowflg:false,
                 fnickname:"",
                 personDetail:{},
                 isShow:true,
            }
        },
        components: { baseinfo,carearinfo, skillinfo},
        created() {
          //  this.reload();
            var personId = this.$store.state.adminName;
            var url = this.$store.state.globalSettings.apiUrl + "/person/detail";
            this.$axios
            .post(url, { personId: personId })
            .then(res => {
                if (res.data.success) {
                // 登录成功
                // 进行视图跳转
                // this.$router.push("/interview/success");
                this.personDetail = res.data.data;
                }
            })
            .catch(err => {
                console.log(err);
            });
        },
        methods:{
                reload() {
      this.isShow = false;
      this.$nextTick(() => (this.isShow = true));
    },
            getnickname(nickname){
                console.log("nickname")
                  console.log(nickname)
                this.fnickname=nickname;
            },
            showResume() {
                // this.$router.push("/resume");
                var url = this.$store.state.globalSettings.apiUrl + "/resume";
                this.$axios
                    .post(url, this.personDetail, { responseType: "arraybuffer" })
                    .then(res => {
                    let blob = new Blob([res.data], {
                        type: "application/pdf;charset-UTF-8"
                    });
                    let objectUrl = URL.createObjectURL(blob); // 创建URL
                    // location.href = objectUrl;
                    // URL.revokeObjectURL(objectUrl);
                    let downEle = document.createElement("a");
                    let fname = `職歴書_` + this.fnickname+`.pdf`; //下载文件的名字
                    downEle.href = objectUrl;
                    downEle.setAttribute("download", fname);
                    document.body.appendChild(downEle);
                    downEle.click();
                    });
                },
        }
    }
</script>

<style lang="scss" scoped>

</style>