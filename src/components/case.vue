<template>
    <div>
         
        <div v-html="caseDetail"></div>
         <el-button type="info" @click="apply">応募</el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                caseDetail:""
            }
        },
        methods:{
            getCaseDetail(){
                console.log("i am  selecting casedetail")
                let selectID = this.$route.params.id;
                this.$axios.get('http://localhost:8080/niucaocao/getCaseDetail', {
                    params: {
                        // ここにクエリパラメータを指定する
                        id:selectID ,
                    }
                }).then((res) => {
                this.caseDetail = res.data.content;
                }).catch(function(error) {
                    // error 処理
                });
            },
 
            apply(){
                
            }
        },
        created(){
            this.getCaseDetail();
        }
    }
</script>

<style lang="scss" scoped>

</style>