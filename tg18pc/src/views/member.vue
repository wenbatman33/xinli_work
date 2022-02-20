<template lang="pug">
  .container-fluid
    tgNavi
    VIPStatus
    //- memberStatus
    .memberPage.mt-5.mb-5
      .container
        .row
          .col-2
            sidebar(:porpsActive='childPath_1')
          .col-10
            router-view
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import memberStatus from '@/components/tgMember/memberStatus.vue';
import VIPStatus from '@/components/tgMember/tgVIP/VIPStatus.vue';
import sidebar from '@/components/tgMember/sidebar.vue';
import tgOverview from '@/components/tgMember/tgOverview.vue';
import tgCashier from '@/components/tgMember/tgCashier.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';

export default {
  data() {
    return {
    };
  },
  computed: {
    childPath_1() {
      const path = this.$route.path.split('/');
      const parHash_1 = path[2];
      return parHash_1;
    },
    childPath_2() {
      const path = this.$route.path.split('/');
      const parHash_2 = path[3];
      return parHash_2;
    },
  },
  components: {
    tgNavi,
    tgOverview,
    tgCashier,
    tgFooter,
    memberStatus,
    VIPStatus,
    sidebar,
  },
};
</script>
<style lang="scss" scoped>
.memberPage{
  min-height: 600px;
}
</style>
