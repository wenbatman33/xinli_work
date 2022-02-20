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
import { mapState } from 'vuex';

export default {
  name: 'pt',
  data() {
    return {
      PlayUrl: '',
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
      'MemberData',
      'MemberBankList',
      'MemberInboxList',
    ]),
  },
  components: {
    tgGameNavi,
  },
  mounted() {
    this.PlayUrl = this.$route.query.PlayUrl;
    if (window.localStorage.JWT_TOKEN_Overdue) {
      window.localStorage.removeItem('JWT_TOKEN_Overdue');
      window.location = `${process.env.VUE_APP_tgHOST}/login`;
    }
    if (window.localStorage.JWT_TOKEN) {
      const vm = this;
      const p1 = this.$store.dispatch('index/API_SlotProvider');
      const p2 = this.$store.dispatch('index/API_FishingProvider');
      const p3 = this.$store.dispatch('index/API_BoardProvider');
      Promise.all([p1, p2, p3]).then((values) => { 
        this.$store.commit('index/setAllProvider');
        this.AllProviderLoaded = true;
      });
      this.$store.dispatch('member/MemberLoginStatus');
      if (this.MemberLogined) {
        this.$store.dispatch('member/MemberGetDetilData');
      }
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

