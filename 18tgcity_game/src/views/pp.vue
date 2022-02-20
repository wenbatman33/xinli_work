<template lang='pug'>
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
  name: 'pt',
  data() {
    return {
      PlayUrl: '',
      SelectedLanguage: '',
      S: '',
      cookie: '',
    };
  },
  components: {
    tgGameNavi,
  },
  mounted() {
    this.PlayUrl = this.$route.query.PlayUrl;
    this.S = this.$route.query.S;
    this.SelectedLanguage = this.$route.query.SelectedLanguage;
    // window.setCookie(this.S, this.SelectedLanguage);
    // this.cookie = window.document.cookie;
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

