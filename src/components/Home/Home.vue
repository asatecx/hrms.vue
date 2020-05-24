<template>
  <div>
    <!-- ======= Hero Section ======= -->
    <section id="hero" class>
      <div class="container">
        <div class style="float:left">
          <span style="font-size:60px;font-weight:bold">IT案件が見つかる</span>
          <br />
          <span style="font-size:60px;font-weight:bold">IT人材と出会える</span>
          <h2>We are trustworthy</h2>
          <div>
            <a
              href="javascript:void(0)"
              class="btn-get-started scrollto"
              @click="gotoPersonList()"
            >人材を探す</a>
          </div>
        </div>
<<<<<<< HEAD
        <div class="col-lg-6 order-1 order-lg-2 hero-img" style="float:left;">
          <img src="../../assets/img/hero-img.png" class="animated" alt="">
        </div>
    </div>

  </section><!-- End Hero -->
      <div class="block">


    <!-- <el-carousel :interval="3000" height="640px">
      <el-carousel-item v-for="item in lunboImgs" :key="item.id">
                 
          <a @click="displayCase($event,item.id)">

              <div :style="item.mystyle" class="tupian">
             <span class="zhiti"> {{item.content}}</span>
              </div>
          </a>
      </el-carousel-item>
    </el-carousel> 
    -->
  </div>
=======
        <div class="col-lg-6 order-1 order-lg-2 hero-img" style="float:left;margin-left:100px">
          <img src="../../assets/img/hero-img.png" class="animated" alt />
        </div>
      </div>
    </section>
    <!-- End Hero -->
    <div class="block" v-if="false">
      <el-carousel :interval="3000" height="640px">
        <el-carousel-item v-for="item in lunboImgs" :key="item.id">
          <!-- <img :src="item.imgSrc" alt=""> -->
          <a @click="displayCase($event,item.id)">
            <!-- <h3
              style="line-height:18px;text-align:center;padding:25px"
              class="medium"
              v-html="item.content"
            ></h3>-->
            <div :style="item.mystyle" class="tupian">
              <span class="zhiti">{{item.content}}</span>
            </div>
          </a>
        </el-carousel-item>
      </el-carousel>
    </div>
>>>>>>> develop
  </div>
</template>
<script src="../../assets/js/main.js"></script>
<script>
export default {
  name: "home",
  data() {
    return {
      lunboImgs: [
        {
          //https://developer.mozilla.org/ja/docs/Web/CSS/background-image
          id: 1,
          content: "IT人材が見つかる",
          mystyle: {
            backgroundImage:
              'url("' +
              this.$store.state.globalSettings.apiUrl +
              "/photos/" +
              "it1.jpg" +
              '") '
          }
        },
        {
          id: 2,
          content: "ふさわしい人材と出会える",
          mystyle: {
            backgroundImage:
              'url("' +
              this.$store.state.globalSettings.apiUrl +
              "/photos/" +
              "it2.jpg" +
              '")'
          }
        },
        {
          id: 3,
          content: "こちらへよこそ",
          mystyle: {
            backgroundImage:
              'url("' +
              this.$store.state.globalSettings.apiUrl +
              "/photos/" +
              "it3.jpg" +
              '")'
          }
        }
      ],
      keyword: "java",
      selectkey: { companyName: "", time: "", place: "" },
      tableData: []
    };
  },
  methods: {
    doLogin(title) {
      this.$router.push({ name: "Login", params: { title } });
    },
    doLoginPeople() {
      this.$router.push("/people");
    },
    gotoPersonList() {
      this.$router.push("/company");
    }
  }
};
</script>

<style  scoped>
@import "../../assets/css/style.css";
.center {
  text-align: center;
}
.tupian {
  padding: 0px;
  margin: 0px;
  text-align: center;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
  background-blend-mode: lighten;
  background-repeat: no-repeat;
  background-size: cover;
}
@font-face {
  font-family: KosugiMaru;
  src: url("../../assets/font/KosugiMaru-Regular.ttf") format("truetype");
}
.zhiti {
  font-family: "KosugiMaru", cursive;
  font-weight: normal;
  font-size: 200px;
}
</style>