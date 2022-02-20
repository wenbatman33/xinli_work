<template lang="pug">
  .container-fluid
    tgNavi
    tgPromotionsDetail
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgPromotionsDetail from '@/components/tgPromotion/tgPromotionsDetail.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';

export default {
  data() {
    return {
    };
  },
  computed: {
  },
  components: {
    tgNavi,
    tgPromotionsDetail,
    tgFooter,
  },
};
</script>
<style lang="scss" scoped>
  .container-fluid{
    width: 100%;
  }
</style>
