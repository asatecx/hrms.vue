<template>
  <div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="sidemenu">
      <el-row class>
        <el-form-item prop="userNameDisp">
          <el-input v-model="xxxxx" placeholder="フリーキーワード"></el-input>
        </el-form-item>
      </el-row>
      <el-row class>
        <div class="sub-title">所属</div>
        <el-form-item prop="userNameDisp">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="自社"></el-checkbox>
            <br />
            <el-checkbox label="協力"></el-checkbox>
            <br />
            <el-checkbox label="フリーランス"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-row>
      <el-row class>
        <div class="sub-title">現在の状況</div>
        <el-form-item prop="userNameDisp">
          <el-checkbox-group v-model="checkList">
            <el-checkbox label="すぐ稼働可能です"></el-checkbox>
            <br />
            <el-checkbox label="今後稼働が空く予定です"></el-checkbox>
            <br />
            <el-checkbox label="案件によります"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-row>
      <el-row class>
        <div class="sub-title">参画可能期間</div>
        <el-col>
          <el-form-item prop>
            <el-date-picker v-model="value1" type="date" placeholder="から" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <el-col>
          <el-form-item prop>
            <el-date-picker v-model="value2" type="date" placeholder="まで" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class>
        <div class="sub-title">性別</div>
        <el-form-item prop>
          <el-select v-model="val_gender" placeholder="未選択">
            <el-option
              v-for="item in opt_gender"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <el-row class>
        <div class="sub-title">国籍</div>
        <el-form-item prop>
          <el-select v-model="val_country" placeholder="未選択">
            <el-option
              v-for="item in opt_country"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-row>
      <div class="bottom clearfix">
        <el-button type="primary" @click="submitForm('ruleForm')">検索</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "sidemenu",
  data() {
    return {
      checkList: [],
      opt_gender: [
        {
          value: "0",
          label: "未選択"
        },
        {
          value: "1",
          label: "男"
        },
        {
          value: "2",
          label: "女"
        }],
        val_gender: '',

        opt_country: [
        {
          value: "0",
          label: "未選択"
        },
        {
          value: "1",
          label: "日本"
        },
        {
          value: "2",
          label: "日本以外"
        }],
        val_country: '',
    };
  },
  methods: {}
};
</script>

<style  scoped>
.sidemenu {
  text-align: center;
  padding: 20px 20px 20px 20px;
}
.sub-title {
  text-align: left;
  line-height: 20px;
  margin: 5px 0px 5px 0px;
}
</style>