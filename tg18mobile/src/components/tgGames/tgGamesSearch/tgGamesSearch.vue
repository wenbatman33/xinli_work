<template lang='pug'>
	.content
		section
			.gamelist_favor(v-if='gameSearchList.length > 0')
				.searchResult 搜寻结果
				ul
					li(v-for='(game , key) in gameSearchList' @click='ShowDialog(key)')
						tgGamesCard(:gameData='game' :GameName='game.GameName' :Popular='game.Popular')
			.nonResult(v-else) 未搜寻到符合结果

			el-dialog.gamepopup_dialog(:title='dialogTitle', :visible.sync='dialogShow', width='100%')
				.content
				tgGamesPopup(:gameData='picGameData')
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
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
  components: {
    tgGamesCard,
    tgGamesPopup,
  },
  computed: {
    ...mapState('game', [
      'gameSearchList',
    ]),
  },
  methods: {
    closeSearch() {
      this.$store.dispatch('game/CloseSearching', '');
    },
    ShowDialog(key) {
      this.picGameData = this.gameSearchList[key];
      this.dialogShow = !this.dialogShow;
    },
  },
};
</script>
<style lang="scss" scoped>
	.searchResult{
		font-size: 8vw;
	}
	.nonResult{
		text-align: center;
		padding: 20vw;
		font-size: 7vw;
		color: #a9a99f;
	}
	.closeSearch{
		font-size: 24px;
		cursor: pointer;
	}
</style>
