<template lang='pug'>
	header
		//Hder
		#hder
			#logo
				a(@click='goHome')
					img(src="/static/img/logo.png")
			ul#nav
				li
					router-link(to="/news" v-on:click.native='GA_home_newsmobile') 公告
					.notify(v-if='newsNotify')
				li
					router-link(to="/promotion" v-on:click.native='GA_home_eventmobile') 优惠
				li
					a(@click='changeRouter("/member/bonus/1")') 领奖
						el-badge(v-if='MemberLogined && MemberBonusNumber.totalCnt > 0' :value="MemberBonusNumber.totalCnt" :max="99" class="item")
				#search_icon(@click.prevent="searchBar")
					a(href="javascript:void(0)")
			#nav_icon(@click.prevent="showSmNav")
				a(href="javascript:void(0)")
		//Search Wrap
		#search-wrap(v-if='this.$store.state.index.searchBar')
			.slinput
				i.fa-search
				i.fa-search-btn(@click="searchGame") 搜寻
				input(v-model='searchData' type='search' placeholder="请输入游戏名称")
			a.slcancel(@click.prevent="cancelSearch") 取消
		//Nav Wrap
		nav#nav-wrap(v-if='this.$store.state.index.showSmNav')
			ul#nav_s
				li
					router-link(to="/news" v-on:click.native='GA_home_newsmobile') 公告
					.notify_s(v-if='newsNotify')
				li
					router-link(to="/promotion" v-on:click.native='GA_home_eventmobile') 优惠
				li
					a(@click='changeRouter("/member/bonus/1")') 领奖
						el-badge(v-if='MemberLogined && MemberBonusNumber.totalCnt > 0' :value="MemberBonusNumber.totalCnt" :max="99" class="item")
				li.slinput
					i.fa-search
					i.fa-search-btn(@click="searchGameForSm") 搜寻
					input(v-model='searchData' type='search' placeholder="请输入游戏名称")
		.header_hr
</template>
<script>
import router from '@/router/router';
import moment from 'moment';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

let loop = '';
export default {
  data() {
    return {
      searchData: '',
    };
  },
  computed: {
    ...mapState('news', [
      'newsNotify',
    ]),
    ...mapState('member', [
      'MemberLogined',
      'MemberBonusNumber',
    ]),
    getMemberLogined() {
      return this.$store.state.member.MemberLogined;
    },
  },
  methods: { 
    searchBar() {
      if (this.$store.state.index.searchBar === false) {
        this.$store.state.index.searchBar = true;
      } else {
        this.$store.state.game.Searching = false;
        this.$store.state.index.searchBar = false;
      }
    },
    showSmNav() {
      if (this.$store.state.index.showSmNav === false) {
        this.$store.state.index.showSmNav = true;
      } else {
        this.$store.state.index.showSmNav = false;
      }
    },
    changeRouter(url) {
      if (this.getMemberLogined !== true) {
        router.push('/login');
        this.GA_home_bonusmobile();
      } else {
        router.push(url);
        this.GA_home_bonusmobile();
      }
    },
    searchGame() {
      this.$store.state.game.Searching = true;
      const payload = {};
      payload.GameName = this.searchData;
      this.$store.dispatch('game/API_GameSearch', payload);
    },
    searchGameForSm() {
      this.$store.state.game.Searching = true;
      const payload = {};
      payload.GameName = this.searchData;
      this.$store.dispatch('game/API_GameSearch', payload);
      this.$store.state.index.showSmNav = false;
    },
    cancelSearch() {
      this.$store.state.game.Searching = false;
      this.$store.state.index.searchBar = false;
      this.searchData = '';
    },
    goHome() {
      this.$store.state.game.Searching = false;
      this.$store.state.index.searchBar = false;
      this.searchData = '';
      router.push('/');
    },
  },
  beforeDestroy() {
    cancelAnimationFrame(loop);
  },
  mounted() {
    this.$store.state.index.searchBar = false;
    this.$store.state.index.showSmNav = false;
		
    const vm = this;
    const d = new Date();
    const timezone = d.getTimezoneOffset() / -60;
    function nowTime() {
      vm.now = `GMT+${timezone} ${moment().utc(timezone).format('YYYY-MM-DD HH:mm:ss')}`;
      loop = requestAnimationFrame(nowTime);
    }
    nowTime();
    const payload = {};
    payload.NowTime = 1;
    vm.$store.dispatch('news/NewsList', payload);
    this.$store.dispatch('news/CheckLastNewsTime');
  },
};
</script>
<style lang="scss">
#search_icon a {
	background: url("/static/img/search_icon.svg") 0 0 no-repeat;
	background-size: contain;
}
#nav_icon a {
	background: url("/static/img/menu_icon.png") 0 0 no-repeat;
}
#nav_icon a:hover {
	background: url("/static/img/menu_icon.png") 0 -30px no-repeat;
}
</style>
