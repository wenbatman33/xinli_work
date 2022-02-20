<template lang="pug">
  .gamaPage.d-flex.flex-column
    tgGameNavi
    iframe(:src='PlayUrl')
</template>

<script>
import tgGameNavi from '@/components/tgNavi/tgGameNavi.vue';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';

export default {
  name: 'im',
  data() {
    return {
      PlayUrl: '',
    };
  },
  components: {
    tgGameNavi,
  },
  mounted() {
    this.PlayUrl = this.$route.query.PlayUrl;
    // this.$store.dispatch('member/MemberLoginStatus');
    // if (this.MemberLogined) {
    //   this.$store.dispatch('member/MemberGetDetilData');
    // };
  },
};
</script>
<style scoped>
.gamaPage{
  width: 100%;
  height: 100%;
}
iframe{
  border: none;
  width: 100%;
  height: 100%;
}
</style>

