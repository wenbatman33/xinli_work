<template lang="pug">
	.container-fluid
		tgFix
		tgSmNavi
		.content
			tgNews
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgNews from '@/components/tgNews/tgNews.vue';
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
    tgNews,
    tgFooter,
  },
  mounted() {
    const payload = {};
    payload.NowTime = 1;
    const payloadGroup = {};
    payloadGroup.Status = 1;
    payloadGroup.NowTime = 1;
    this.$store.dispatch('news/NewsList', payload);
    this.$store.dispatch('news/NewsGroup', payloadGroup);
  },
};
</script>
<style lang="scss" scoped>
  .container-fluid{
    width: 100%;
  }
</style>
