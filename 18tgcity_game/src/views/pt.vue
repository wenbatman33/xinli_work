<template lang="pug">
  .gamaPage.d-flex.flex-column
    tgGameNavi
    iframe(:src='PlayUrl')
</template>

<script>
import tgGameNavi from '@/components/tgNavi/tgGameNavi.vue';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';

export default {
  name: 'pt',
  data() {
    return {
      PlayUrl: '',
      GameAccount: '',
      Password: '',
      PlayFree: false,
    };
  },
  components: {
    tgGameNavi,
  },
  mounted() {
    this.PlayUrl = this.$route.query.PlayUrl;
    this.PlayFree = this.$route.query.PlayFree;
    window.PTID = this.$route.query.PTID;
    window.PTPASSWORD = this.$route.query.PTPASSWORD;
    window.PTURL = this.$route.query.PlayUrl;
    if (!this.PlayFree) {
      window.login();
    }
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

