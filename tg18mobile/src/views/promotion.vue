<template lang="pug">
	.container-fluid
		tgFix
		tgSmNavi
		.content
			tgPromotion
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
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
    tgFix,
    tgSmNavi,
    tgPromotion,
    tgFooter,
  },
  mounted() {
    const payload = {};
    payload.GroupId = '';
    payload.Status = 1;
    payload.NowTime = 1;
    this.$store.dispatch('promotion/PromotionsList', payload);
    this.$store.dispatch('promotion/PromotionsGroup', payload);
  },
};
</script>
<style lang="scss" scoped>
	.container-fluid{
		width: 100%;
	}
</style>
