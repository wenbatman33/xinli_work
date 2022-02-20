<template lang="pug">
  el-button(@click="test") test
</template>

<script>
export default {
  methods: {
    test() {
      const finger = window.localStorage.Finger;
      const token = window.localStorage.JWT_TOKEN;
      this.$router.push(`/forapp?finger=${finger}&token=${token}&mode=dark`);
    }
  },
  created() {
    console.log(this.$route.query.token);
  }
}
</script>