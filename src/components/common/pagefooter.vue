<template>
  <div>
    i am footer
  </div>
</template>

<script>
export default {
  name: "pagefooter",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {};
  },
  methods: {
  },
  mounted() {},
  computed: {}
};
</script>

<style lang="scss" scoped>
</style>