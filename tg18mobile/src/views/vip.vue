<template lang="pug">
  .container-fluid
    tgFix
    tgNavi
    tgVIP
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgVIP from '@/components/tgMember/tgVIP/tgVIP.vue';
import tgFix from '@/components/tgFix/tgFix.vue';

export default {
  components: {
    tgNavi,
    tgFooter,
    tgVIP,
    tgFix,
  },
  
};
</script>
<style lang="scss" scoped>
</style>
