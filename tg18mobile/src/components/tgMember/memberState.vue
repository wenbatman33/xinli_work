<template lang='pug'>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState('member', [
      'UserId',
    ]),
  },
  methods: {
    init() {
      if (this.UserId) {
        let payload;
        payload = { UserId: this.UserId, Status: '0' };
        this.$store.dispatch('member/MemberUserWalletInfo', payload);
        payload = { UserId: this.UserId };
        this.$store.dispatch('member/MemberGetGameWallet', payload);
      }
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
</style>
