<template lang='pug'>
	section
		.game
			ul
				li
					.provider_from
						.game_provide
							span 老虎机游戏
								.type Slot Games
							.game_provide_btn
								router-link(v-for="(item, key) in slotProvider.slice(0, 3)",v-if='item.Status != 0' :to='"/games/slot?game="+item.GroupName' v-on:click.native='GA_home_platformobile(item.GroupId)') {{item.CompanyName}}
								//- router-link(v-for="(item, key) in slotProvider.slice(0, 3)",v-if='item.Status != 0' :to='"/games/slot?game="+item.GroupName' v-on:click.native='GA_home_platformobile(item.GroupId)') {{item.GroupName}}
								router-link(:to='"/games/slot?game="+slotProvider[0].GroupName' v-on:click.native='GA_home_platformobile(slotProvider[0].GroupId)') 更多
						router-link(:to='"/games/slot?game="+slotProvider[0].GroupName' v-on:click.native='GA_home_platformobile(slotProvider[0].GroupId)')
							img(src="/static/img/pic-provider-slotgame.jpg")
				li
					.provider_from
						.game_provide
							span 棋牌游戏
								.type Board Games
							.game_provide_btn
								router-link(v-for="(item, key) in boardProvider.slice(0, 3)",v-if='item.Status != 0' :to='"/games/board?game="+item.GroupName' v-on:click.native='GA_home_platforboardmobile(item.GroupId)') {{item.CompanyName}}
								//- router-link(v-for="(item, key) in boardProvider.slice(0, 3)",v-if='item.Status != 0' :to='"/games/board?game="+item.GroupName' v-on:click.native='GA_home_platforboardmobile(item.GroupId)') {{item.GroupName}}
								router-link(:to='"/games/board?game="+boardProvider[0].GroupName' v-on:click.native='GA_home_platforboardmobile(boardProvider[0].GroupId)') 更多
						router-link(:to='"/games/board?game="+boardProvider[0].GroupName' v-on:click.native='GA_home_platforboardmobile(boardProvider[0].GroupId)')
							img(src="/static/img/pic-provider-boardgame.jpg")
				li
					.provider_from
						.game_provide
							span 捕鱼游戏
								.type Fishing Games
							.game_provide_btn
								router-link(v-for="(item, key) in fishingProvider.slice(0, 3)",v-if='item.Status != 0' :to='"/games/fishing?game="+item.GroupName' v-on:click.native='GA_home_platformfishmobile(item.GroupId)') {{item.CompanyName}}
								//- router-link(v-for="(item, key) in fishingProvider.slice(0, 3)",v-if='item.Status != 0' :to='"/games/fishing?game="+item.GroupName' v-on:click.native='GA_home_platformfishmobile(item.GroupId)') {{item.GroupName}}
								//- router-link(:to='"/games/fishing?game="+fishingProvider[0].GroupName' v-on:click.native='GA_home_platformfishmobile(fishingProvider[0].GroupId)') 更多
						router-link(:to='"/games/fishing?game="+fishingProvider[0].GroupName' v-on:click.native='GA_home_platformfishmobile(fishingProvider[0].GroupId)')
							img(src="/static/img/pic-provider-fishgame.jpg")
</template>
<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState('index', [
      'slotProvider',
      'boardProvider',
      'fishingProvider',
    ]),
    ...mapState('game', [
      'currentGameTypeName',
      'currentGameType',
    ]),
    getProvider() {
      return this.$store.state.index.gameProvider;
    },
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[3];
      return parHash;
    },
  },
  watch: {
    $route(to, from) {
      this.query = this.$route.query.game;
    },
  },
  mounted() {
    this.$store.dispatch('index/API_Provider');
    // console.log(this.boardProvider);
    // console.log(this.GA_home_platformobile);
    // console.log(this.GA_home_platforboardmobile);
    // console.log(this.GA_home_platformfishmobile);
  },
};
</script>
<style lang="scss" scoped>

</style>
