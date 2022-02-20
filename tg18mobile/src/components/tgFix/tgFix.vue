<template lang='pug'>
	.fix
		ul
			li
				a(:class='(getUrlID1 == "") ? "fix_active" : ""' @click='goHome')
					.icon_index
					span 首頁
			li
				el-badge(v-if='MemberLogined && unReadedMailLength > 0' :value='unReadedMailLength' :max="99" class="item")
					a(:class='(getUrlID2 == "inbox" || getUrlID2 == "inboxdetail") ? "fix_active" : ""' @click="inboxInit()")
						.icon_comment
						span 站內信
				a(v-else :class='(getUrlID2 == "inbox" || getUrlID2 == "inboxdetail") ? "fix_active" : ""' @click="inboxInit()")
						.icon_comment
						span 站內信
			li
				a(:class='(getUrlID2 == "overview") ? "fix_active" : ""' @click='changeRouter("/member/overview", "home_walletmobile")')
					.icon_pocket
					span 中心钱包
			li
				a(:class='(getUrlID2 == "cashier" || getUrlID2 == "cashieraddbank") ? "fix_active" : ""' @click='changeRouter("/member/cashier/1", "home_cashiermobile")')
					.icon_bank
					span 存转提
			li
				a(:class='(getUrlID1 == "login" || (getUrlID1 == "member" && getUrlID2 == undefined) ) ? "fix_active" : ""' @click='changeRouter("/member", "home_membermobile")')
					.icon_user
					span 个人中心
</template>
<script>
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    getUrlID1() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
    getUrlID2() {
      const path = this.$route.path.split('/');
      const parHash = path[2];
      return parHash;
    },
    getMemberLogined() {
      return this.$store.state.member.MemberLogined;
    },
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberInboxList',
      'MemberLogined',
    ]),
    unReadedMailLength() {
      let unReadedMailLength = 0;
      try {
        const unReadedMail = this.MemberInboxList.data_list.filter(mail => mail.Status === '0');
        unReadedMailLength = unReadedMail.length ? unReadedMail.length : '0';
      } catch (e) {
        return e;
      }
      return unReadedMailLength;
    },
  },
  methods: {
    goHome() {
      this.$store.state.game.Searching = false;
      this.$store.state.index.searchBar = false;
      this.searchData = '';
      router.push('/');
    },
    inboxInit() {
      if (this.getMemberLogined !== true) {
        router.push('/login');
        this.GA_home_inboxmobile(this.MemberLogined);
      } else {
        this.$store.state.member.MemberInboxShowMore = false;
        router.push('/member/inbox');
        this.GA_home_inboxmobile(this.MemberLogined);
      }
    },
    changeRouter(url, GAlabel) {
      this.GA_home_walletmobile(GAlabel);
      if (this.getMemberLogined !== true) {
        router.push('/login');
      } else {
        router.push(url);
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.fix_active{
	div{
		background: rgba(0,80,179,1);
	}
	span{
		color:#0050b3;
	}
}
</style>
