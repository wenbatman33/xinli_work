<template lang='pug'>
	.container-fluid
		tgFix
		tgSmNavi
		.content
			router-view
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgAccount1 from '@/components/tgMember/tgAccount1.vue';
import tgAccount2 from '@/components/tgMember/tgAccount2.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgFix,
    tgSmNavi,
    tgAccount1,
    tgAccount2,
    tgFooter,
  },
  data() {
    return {
      activeName: '',
    };
  },
  computed: {
    getUrlID: {
      get() {
        const path = this.$route.path.split('/');
        const parHash = path[3];
        return parHash;
      },
    },
  },
  methods: {
    handleClick(tab, event) {
      const path = this.activeName;
      router.push(`/member/account/${path}`);
    },
  },
  mounted() {
    this.activeName = this.getUrlID;
  },
};
</script>
<style lang="scss">
	.el-tabs__content{
		min-height: 600px;
		margin: 0;
	}
</style>
<style lang="scss" scoped>
	.tgDeposit{
		min-height: 600px;
	}
	.tgDepositMain {
		min-height: 600px;
		border-radius: 4px;
		background-color: #ffffff;
		border: solid 1px #d9d9d9;
	}
</style>
