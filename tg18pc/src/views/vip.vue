<template lang="pug">
  .container-fluid
    tgNavi
    tgVIP
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgVIP from '@/components/tgMember/tgVIP/tgVIP.vue';

export default {
  components: {
    tgNavi,
    tgFooter,
    tgVIP,
  },
  
};
</script>
<style lang="scss" scoped>
</style>
