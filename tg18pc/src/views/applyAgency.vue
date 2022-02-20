<template lang="pug">
  .container-fluid
    tgNavi
    tgAgency
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgAgency from '@/components/tgAgency/tgAgency.vue';

export default {
  components: {
    tgNavi,
    tgFooter,
    tgAgency,
  },
};
</script>
<style lang="scss" scoped>
</style>
