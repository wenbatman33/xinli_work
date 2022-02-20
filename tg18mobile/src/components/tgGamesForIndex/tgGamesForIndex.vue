<template lang='pug'>
	section
		.hotgame
			.hotgame_caption 推荐游戏
				br
				span 欢迎来到18老虎城！请试试我们的老虎机游戏，体验中奖不断的惊喜乐趣。
				ul
					li(v-for='(game , key) in getGamePopularGameList' @click='ShowDialog(key)' v-bind:class='[(key===2 | key===5) ? "fullCard" : ""]')
						tgGamesCard(:gameData='game' :GameName='game.GameName' :Popular='game.Popular' :GAlabel='"home_recommendplaymobile"')
				// form
					router-link.hotgame_btn(to="/games/group/pt") 显示全部游戏
		el-dialog.gamepopup_dialog(:title='dialogTitle', :visible.sync='dialogShow', width='100%')
			.content
				tgGamesPopup(:gameData='picGameData')
			// el-button(@click='dialogShow = false') 取 消
			// el-button(type='primary', @click='dialogShow = false') 确 定
</template>
<script>
import axios from 'axios';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import tgGamesPopup from '@/components/tgGames/tgGamesPopup/tgGamesPopup.vue';
import jwtDecode from 'jwt-decode';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
    ]),
    getGamePopularGameList() {
      return this.$store.state.game.gamePopularGameList;
    },
  },
  data() {
    return {
      activeID: '1',
      dialogTitle: '',
      dialogMessage: '',
      dialogShow: false,
      picGameData: '',
    };
  },
  components: {
    tgGamesCard,
    tgGamesPopup,
  },
  methods: {
    init() {
      const payload = { UserId: this.UserId };
      this.$store.dispatch('game/API_PopularGameList', payload);
    },
    ShowDialog(key) {
      this.picGameData = this.getGamePopularGameList[key];
      this.dialogShow = !this.dialogShow;
    },
  },
  filters: {
    unescape(html) {
      return html
        .replace(html ? /&(?!#?\w+;)/g : /&/g, '&amp;')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
	.fullCard{
		width: 88vw;
		.tgGamesCard{
			width: 88vw;
		}
	}
</style>
<style lang="scss">
	.gamepopup_dialog {
		.el-dialog {
			margin: 0 !important;
			border-radius: 0 !important;
			box-shadow: 0 !important;
		}
		.el-dialog__header {
			padding: 0;
		}
		.el-dialog__title {
			display: none;
		}
		.el-dialog__headerbtn {
			display: block;
			float: right;
			width: 48px;
			height: 48px;
			background: url("/static/img/close.png") 0 0 no-repeat;
			background-size: contain;
			top: 8vw;
			right: 8vw;
		}
		.el-dialog__close {
			display: none;
		}
		.el-dialog__body {
			float: left;
			padding: 0;
			width: 100%;
		}
		
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.gamepopup_dialog {
			.el-dialog__headerbtn {
				width: 6.4vw;
				height: 6.4vw;
			}
		}
	}
</style>
