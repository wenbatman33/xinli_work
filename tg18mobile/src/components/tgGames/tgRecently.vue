<template lang='pug'>
	.content
		section
			.gamelist_favor
				ul(v-if="gamesRecently.length > 0")
					li(v-for='(game , key) in gamesRecently' @click='ShowDialog(key)')
						tgGamesCard(:gameData='game' :GameName='game.GameName' :Popular='game.Popular')
				tgNoRecord(v-else)
			el-dialog.gamepopup_dialog(:title='dialogTitle', :visible.sync='dialogShow', width='100%')
				.content
					tgGamesPopup(:gameData='picGameData')
</template>
<script>
import tgNoRecord from '@/components/tgError/tgNoRecord.vue';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import tgGamesPopup from '@/components/tgGames/tgGamesPopup/tgGamesPopup.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      dialogTitle: '',
      dialogMessage: '',
      dialogShow: false,
      picGameData: '',
    };
  },
  methods: {
    ShowDialog(key) {
      this.picGameData = this.gamesRecently[key];
      this.dialogShow = !this.dialogShow;
    },
    init() {
      const payload = {};
      payload.UserId = this.UserId;
      payload.Type = 2;
      this.$store.dispatch('game/API_GamesRecentlyList', payload);
    },
  },
  components: {
    tgGamesCard,
    tgGamesPopup,
    tgNoRecord,
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
    ]),
    ...mapState('game', [
      'gamesRecently',
    ]),
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss">
	.filterpopup_dialog, .gamepopup_dialog {
		.el-dialog {
			float: left;
			margin: 0 !important;
			border-radius: 0 !important;
			box-shadow: 0 !important;
		}
		.el-dialog__header {
			padding: 0;
		}
		.el-dialog__body {
			width: 100%;
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
		}
	}
	.tgBanners {
		width: 100%;
		height: 64vw;
		background: #000;
		overflow: hidden;
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.filterpopup_dialog, .gamepopup_dialog {
			.el-dialog__headerbtn {
				width: 6.4vw;
				height: 6.4vw;
			}
		}
	}
</style>
