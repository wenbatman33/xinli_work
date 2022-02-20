<template lang="pug">
  .container-fluid
    tgNavi
    tgPromotion
    tgFooter
</template>
<script>
import tgNavi from '@/components/tgNavi/tgNavi.vue';
import tgPromotion from '@/components/tgPromotion/tgPromotion.vue';
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
    tgPromotion,
    tgFooter,
  },
  mounted() {
    const payload = {};
    payload.GroupId = '';
    payload.Status = 1;
    payload.NowTime = 1;
    this.$store.dispatch('promotion/PromotionsList', payload)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    this.$store.dispatch('promotion/PromotionsGroup', payload);
  },
};
</script>
<style lang="scss" scoped>
  .container-fluid{
    width: 100%;
  }
</style>
