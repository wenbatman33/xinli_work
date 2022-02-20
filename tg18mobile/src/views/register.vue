<template lang="pug">
  .container-fluid
    tgNavi
    .content
      tgRegister
    tgFooter
    tgFix
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgRegister from '@/components/tgRegister/tgRegister.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgFix from '@/components/tgFix/tgFix.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    tgNavi,
    tgRegister,
    tgFooter,
    tgFix,
  },
};
</script>
<style lang="scss" scoped>
  .gradientBg {
    width: 100%;
    height: 330px;
    background-image: linear-gradient(to right, #002766, #001332);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
  }
  .overlapping{
    margin-top: -330px
  }
</style>
