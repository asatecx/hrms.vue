<template>
  <div>
   &nbsp;&nbsp;&nbsp;単価:&nbsp;<input
      class="textlines"
      type="text"
      ref="input"
      :value="innerValue"
      :disabled="showflg"
      @input="validateInput($event.target.value)"
    >円
    
  


  </div>
</template>

<script>
export default {

  props: ['value', 'type','disabled'],
  computed: {
    innerValue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$refs.input.value = val; // 見た目に反映するため
        this.$emit('input', val);
      },
    },
        showflg: {
      get() {
        return this.disabled;
      }
    },
  },
  methods: {
    validateInput(val) {
      switch (this.type) {
        case 'integer':
          this.innerValue = this.validateInteger(val);
          break;
        case 'comma':
          //Number(val).toLocaleString()
          this.innerValue = Number(this.validateInteger(val)).toLocaleString();
          break;
        case 'decimal':
          this.innerValue = this.validateDecimal(val);
          break;
        default:
          this.innerValue = val;
          break;
      }
    },
    validateInteger(val) {
      // 数字以外を消す
      return val.replace(/\D/g, '');
    },
    validateDecimal(val) {
      // 小数のフォーマットに一致する部分を切り出して一致している部分のみで上書き
      // 末尾ドットは入力途中の過程で必要だから許可する ※1
      const result = val.match(/^(\d+)(\.\d*)?/u);
      return result ? result[0] : '';
    },
  },
  mounted() {
    this.validateInput(this.innerValue);
  },
};
</script>
<style scoped>
 .textlines {
    border: 2px solid #0a0;  /* 枠線 */
    border-radius: 0.67em;   /* 角丸 */
    padding: 0.5em;          /* 内側の余白量 */
    background-color: snow;  /* 背景色 */
    width: 10em;             /* 横幅 */
    height: 30px;           /* 高さ */
    font-size: 2.5em;          /* 文字サイズ */
    line-height: 1.2;        /* 行の高さ */
}
</style>