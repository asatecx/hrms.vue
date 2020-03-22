<template>
<div>
会社名：<el-input v-model="selectkey.companyName" placeholder="会社名を入力" style="width:10%"></el-input>
面接時間：<el-input v-model="selectkey.time" placeholder="面接時間を入力" style="width:10%"></el-input>
面接場所：<el-input v-model="selectkey.place" placeholder="面接場所を入力" style="width:10%"></el-input>
{{select}}<!--ここ書かないとcomputedがきかない-->
<el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
    prop="companyName"
    label="会社名"
    width="180">
    </el-table-column>
    <el-table-column
    prop="time"
    label="面接時間"
    width="180">
    </el-table-column>
    <el-table-column
    prop="interviewPlace"
    label="面接場所">
    </el-table-column>
</el-table>
</div>
</template>

<script>
export default {
    data() {

       // {"companyName":"NEC","time":"2020-10-20 17:00",
      // "notes":"please wear your suits",
      // "interviewPlace":"tamachi",
      // "interviewMeetingPlace":"tamachi Station",
      //"interviewstatus":"ok",
      //"comment":"you are very good",
      //"firstDaynotes":"take your notebook",
      //"firstDayPlace":"tamachi",
      //"firstDayTime":"2020-11-01 9:00"},
      
        return {
            selectkey:{companyName:"",time:"",place:""},
            tableData:[]
        }
    },
     methods:{
         getlist(){
             console.log("i am  selecting")
            let comName = this.selectkey.companyName
            this.$axios.get('http://localhost:8080/niucaocao/interviewList', {
                params: {
                    // ここにクエリパラメータを指定する
                    companyName:comName ,
                    //interviewTime:time,
                   // interviewPlace:place,
                }
            }).then((res) => {
            this.tableData = res.data;
            }).catch(function(error) {
                // error 処理
            });
         }

     }
    ,created(){
            this.getlist()

    },
    computed: {
        select: function() {
                this.getlist()
                return ""
        }

    }
}
</script>