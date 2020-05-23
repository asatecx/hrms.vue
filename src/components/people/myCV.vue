<template>
    <div>
<baseinfo :showflg="bshowflg"></baseinfo>
<skillinfo :showflg="sshowflg"> </skillinfo>
<carearinfo :showflg="cshowflg"></carearinfo>

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
            }
        },
        components: { baseinfo,carearinfo, skillinfo}
    }
</script>

<style lang="scss" scoped>

</style>