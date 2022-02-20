<template lang='pug'>
	section(v-loading="loading")
		.gamelist
			.filter.filter_btn(v-if='currentGameType == 1' @click='ShowFilter') 进阶筛选游戏
			.filter.filter_btn_no(v-else)
			ul
				div(v-if='openAllSwitch === false')
					li(v-for='(game , key) in getGameFilterResult.slice(0, 10)' @click='ShowDialog(key)')
						tgGamesCard(:gameData='game' :GameName='game.GameName' :Popular='game.Popular')
				div(v-else)
					li(v-for='(game , key) in getGameFilterResult' @click='ShowDialog(key)')
						tgGamesCard(:gameData='game' :GameName='game.GameName' :Popular='game.Popular')
				.col-12(v-if='getGameFilterResult.length===0')
					.cardItemNull.d-flex.justify-content-center.align-items-center
						h2.text-center 未符合筛选条件
			.gamelist_btn(v-if="openAllSwitch === false" @click="openAll") 载入更多
		el-dialog.filterpopup_dialog(:title='filterTitle', :visible.sync='getGameFilterShow', width='100%')
			.content
				tgGamesFilter
		el-dialog.gamepopup_dialog(:title='dialogTitle', :visible.sync='dialogShow', width='100%')
			.content
				tgGamesPopup(:gameData='picGameData')
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import tgGamesFilter from '@/components/tgGames/tgGamesFilter/tgGamesFilter.vue';
import tgGamesPopup from '@/components/tgGames/tgGamesPopup/tgGamesPopup.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      activeID: '1',
      filterTitle: '',
      dialogTitle: '',
      dialogMessage: '',
      dialogShow: false,
      filteredTagsArray: [],
      showDetails: false,
      picGameData: '',
      openAllSwitch: false,
    };
  },
  components: {
    tgGamesCard,
    tgGamesFilter,
    tgGamesPopup,
  },
  computed: {
    ...mapState('game', [
      'currentGroupId',
      'currentGameType',
      'currentGameTypeName',
      'gameFilterResult',
    ]),
    getGameTagList() {
      return this.$store.state.game.gameTagList;
    },
    getGameFilterResult() {
      return this.$store.state.game.gameFilterResult.filter((item, index, array) => {
        if (item.GameMode === '0' || item.GameMode === '2') {
          return true;
        }
        return false;
      });
    },
    getGameFilterShow: {
      get() {
        return this.$store.state.game.gameFilterShow;
      },
      set() {
        this.$store.state.game.gameFilterShow = false;
      },
    },
  },
  watch: {
    $route(to, from) {
      this.init();
    },
    getGameFilterResult(val) {
      if (val.length <= 10) {
        this.openAllSwitch = true;
      } else {
        this.openAllSwitch = false;
      }
    },
  },
  methods: {
    ShowDialog(key) {
      this.picGameData = this.getGameFilterResult[key];
      this.dialogShow = !this.dialogShow;
    },
    ShowFilter() {
      this.$store.state.game.gameFilterShow = !this.$store.state.game.gameFilterShow;
    },
    openAll() {
      this.openAllSwitch = true;
    },
    getData() {
      this.loading = true;
      this.activeID = '1';
      const path = this.$route.query.game;
      const parHash = path[3];
      const gameProvider = '';
      const payload = {};
      payload.GroupId = this.currentGroupId;
      payload.GameType = this.currentGameType;
      const gameTagListPayload = {};
      gameTagListPayload.Status = 1;
      this.$store.dispatch('game/API_GameList', payload)
        .then((res) => {
          this.loading = false;
        });
      this.$store.dispatch('game/API_GameTagList', gameTagListPayload);
    },
    init() {
      this.openAllSwitch = false;
      const query = this.$route.query.game;
      const payload = {};
      payload.GroupName = query;
      this.$store.dispatch('game/API_getCurrentGroupId', payload)
        .then((res) => {
          this.getData();
        });
    },
  },
  mounted() {
    this.init();
  },
};
</script>
<style lang="scss" scoped>
</style>
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
