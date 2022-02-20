<template lang='pug'>
	.container-fluid
		tgFix
		tgSmNavi
		.content
			section
				.memberdeposit
					.membertab_b
						ul
							li
								router-link(to="/member/cashier/1" :class='[(getUrlID === "1") ?"membertab_b_active" : ""]' v-on:click.native='GA_cashier_savemobile') 存款
							li
								router-link(to="/member/overview" :class='[(getUrlID === "3") ?"membertab_b_active" : ""]' v-on:click.native='GA_cashier_transfermobile') 转账
								//- router-link(to="/member/cashier/3" :class='[(getUrlID === "3") ?"membertab_b_active" : ""]' v-on:click.native='GA_cashier_transfermobile') 转账
							li
								router-link(to="/member/cashier/2" :class='[(getUrlID === "2") ?"membertab_b_active" : ""]' v-on:click.native='GA_cashier_withdrawmobile') 提款
				memberState
				router-view
			.invisible {{getUrlID}}
		tgFooter
</template>
<script>
import tgFix from '@/components/tgFix/tgFix.vue';
import tgSmNavi from '@/components/tgSmNavi/tgSmNavi.vue';
import tgCashier1 from '@/components/tgMember/tgCashier1.vue';
import tgCashier2 from '@/components/tgMember/tgCashier2.vue';
import tgCashier3 from '@/components/tgMember/tgCashier3.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import memberState from '@/components/tgMember/memberState.vue';
import router from '@/router/router';
import { mapGetters, mapActions } from 'vuex';

export default {
  components: {
    tgFix,
    tgSmNavi,
    tgCashier1,
    tgCashier2,
    tgCashier3,
    tgFooter,
    memberState,
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
      router.push(`/member/cashier/${path}`);
    },
  },
  mounted() {
    this.activeName = this.getUrlID;
  },
};
</script>
<style lang="scss">
.invisible{
	display: none;
}
</style>
