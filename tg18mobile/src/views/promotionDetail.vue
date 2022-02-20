<template lang="pug">
	.container-fluid
		tgFix
		tgSmNavi
		.content
			tgPromotionsDetail
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
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
    tgFix,
    tgSmNavi,
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
