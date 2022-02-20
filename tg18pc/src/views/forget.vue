<template lang="pug">
  .container-fluid
    tgNavi
    tgForget
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgForget from '@/components/tgForget/tgForget.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    tgNavi,
    tgForget,
    tgFooter,
  },
};
</script>
<style lang="scss" scoped>
  .container-fluid{
    width: 100%;
  }
</style>
