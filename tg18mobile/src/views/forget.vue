<template lang="pug">
  .container-fluid
    tgSmNavi
    tgForget
    tgFooter
    tgFix
</template>
<script>
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgForget from '@/components/tgForget/tgForget.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgFix from '@/components/tgFix/tgFix.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    tgSmNavi,
    tgForget,
    tgFooter,
    tgFix,
  },
};
</script>
<style lang="scss" scoped>
  .container-fluid{
    width: 100%;
  }
</style>
