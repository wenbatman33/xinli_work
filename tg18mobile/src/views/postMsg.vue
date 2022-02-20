<template lang="pug">
    .postMessage
</template>
<script>
import { mapState } from 'vuex';

function postMessage(JWT_TOKEN) {
  window.parent.postMessage({ JWT_TOKEN }, '*');
}
if (window.localStorage.JWT_TOKEN) {
  postMessage(window.localStorage.JWT_TOKEN);
}
export default {
  name: 'postMessage',
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    getCampaignSiteToken(event) {
      if (event.data.JWT_TOKEN) {
        window.localStorage.setItem('JWT_TOKEN', event.data.JWT_TOKEN);
        this.$store.dispatch('member/MemberLoginStatus');
      }
    },
  },
  mounted() {
    window.addEventListener('message', this.getCampaignSiteToken, false);
  },
};
</script>
