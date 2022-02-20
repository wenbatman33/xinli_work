<template lang='pug'>
	section
		.gametab
			ul
				li
					router-link(:to="indexLink" :class='(getUrlID == "slot" || getUrlID == "fishing" || getUrlID == "board") ? "router-link-active" : ""' v-on:click.native='GA_game_platformmobile') 平台
				li
					router-link(:to="{ path:'/games/recommend'}" :class='(getUrlID == "recommend") ? "router-link-active" : ""' v-on:click.native='GA_game_hotplaymobile') 热门
				li
					a(@click='changeRouter("/games/collection", "game_collectplaymobile")' :class='(getUrlID == "collection") ? "router-link-active" : ""') 收藏
				li
					a(@click='changeRouter("/games/recently", "game_recentplaymobile")' :class='(getUrlID == "recently") ? "router-link-active" : ""') 玩过
				li
					//- router-link.blue_btn(:to='(userAgent.isAndroid) ? "seat" : "seatvr" ')
					router-link.blue_btn(:to='(userAgent.isAndroid) ? "/seat" : "/seatvr" ')
						|包台
						el-badge.tip(value="new")
						//- span New
</template>
<script>
import router from '@/router/router';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      searchForm: {
        GameName: '',
      },
    };
  },
  computed: {
    ...mapState('index', [
      'gameProvider',
      'gameProviderIndexName',
      'slotProviderIndexName',
      'fishingProviderIndexName',
      'boardProviderIndexName',
      'userAgent',
    ]),
    ...mapState('game', [
      'currentGroupId',
      'currentGameType',
      'currentGameTypeName',
    ]),
    indexLink() {
      let indexName;
      if (this.currentGameTypeName === 'slot') {
        indexName = `/games/${this.currentGameTypeName}?game=${this.slotProviderIndexName}`;
      } else if (this.currentGameTypeName === 'fishing') {
        indexName = `/games/${this.currentGameTypeName}?game=${this.fishingProviderIndexName}`;
      } else if (this.currentGameTypeName === 'board') {
        indexName = `/games/${this.currentGameTypeName}?game=${this.boardProviderIndexName}`;
      } else {
        indexName = `/games/slot?game=${this.slotProviderIndexName}`;
      }
      return indexName;
    },
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[2];
      return parHash;
    },
    getMemberLogined() {
      return this.$store.state.member.MemberLogined;
    },
  },
  methods: {
    changeRouter(url, GAlabel) {
      this.GA_game_collectplaymobile(GAlabel);
      this.GA_home_inboxmobile(this.MemberLogined);
      if (this.getMemberLogined !== true) {
        router.push('/login');
      } else {
        router.push(url);
      }
    },
  },
};
</script>
<style lang="scss">
	.gametab{
		ul{
			li{
				width: 20%;
				.router-link-active{
					color: rgba(0,80,179,1);
					border-bottom: 4px solid rgba(0,80,179,1);
				};
				span {
					display: block;
					padding: 2px 5px;
					background: #dc3545;
					color: #FFF;
					font-size: 15px;
					border-radius: 100px;
					position: absolute;
					top: 10px;
					right: 15px;
				};
			}
		};
		.blue_btn {
			position: relative;
			sup {
				top: -12px;
				right: 4px;
			}
		// 	margin: 10px 0;
		// 	padding: 10px 0;
		// 	background: rgba(25,115,230,1);
		// 	color: rgba(255,255,255,1);
		// 	border-radius: 50px;
		// 	border-bottom: 4px solid rgba(0,80,179,1);
		};
	};
	@media screen and (max-width: 750px) {
		.gametab {
			ul {
				li {
					span {
						padding: 0.27vw 0.67vw;
						font-size: 2vw;
						top: 1.33vw;
						right: 2vw;
					};
				}
			};
		};
	}
</style>
