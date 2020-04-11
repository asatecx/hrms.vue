<template>
  <div>
    <div class="center">
      <el-carousel :interval="3000" type="card" height="200px">
        <el-carousel-item v-for="item in lunboImgs" :key="item.id">
          <!-- <img :src="item.imgSrc" alt=""> -->
          <a @click="displayCase($event,item.id)">
            <h3
              style="line-height:18px;text-align:center;padding:25px"
              class="medium"
              v-html="item.content"
            ></h3>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      lunboImgs: [
        {
          id: 1,
          content: "広告1"
        },
        {
          id: 2,
          content: "広告2"
        },
        {
          id: 3,
          content: "広告3"
        },
        {
          id: 4,
          content: "広告4"
        }
      ],
      keyword: "java",
      selectkey:{companyName:"",time:"",place:""},
      tableData:[]
    };
  },
  methods: {
    doLogin(title) {
      this.$router.push({ name: "Login", params: { title } });
    },
    doLoginPeople() {
      this.$router.push("/people");
    }
  }
};
</script>

<style  scoped>
.center {
  text-align: center;
}
</style>