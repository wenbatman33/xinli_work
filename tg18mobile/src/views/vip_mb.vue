<template lang="pug">
  .container-fluid
    tgVIP
    tgFooter
</template>
<script>
import tgVIP from '@/components/tgMember/tgVIP/tgVIP.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgFix from '@/components/tgFix/tgFix.vue';

export default {
  components: {
    tgVIP,
    tgFooter,
    tgFix,
  },
};
</script>
<style lang="scss" scoped>
</style>
