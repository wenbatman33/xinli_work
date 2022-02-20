<template lang='pug'>
	.tgGamesCard
		// .gl_tgy(v-if="gameData.Sn % 3 == 2") NEW
		// .gl_tgr(v-if="gameData.GameTag.indexOf(14) > -1") Hot
		.icon_AllProvider
			img(:src='filterProviderImg(gameData.GroupName)')
		.imgBox
			img.gameImg(:src="gameData.Images")
		span &nbsp;{{gameData.GameName}}&nbsp;
</template>
<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  props: [
    'gameData',
  ],
  data() {
    return {
    };
  },
  computed: {
    ...mapState('index', [
      'AllProvider',
    ]),
    getGamePopularGameList() {
      return this.$store.state.game.gamePopularGameList;
    },
  },
  methods: {
    filterProviderImg(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      return result[0].Images;
    },
  },
};
</script>
<style lang="scss" scoped>
	.tgGamesCard {
		display: block;
		float:  left;
		width: 42.4vw;
		height: auto;
		background: rgba(0,0,0,1);
		border: inherit !important;
		border-radius: 8px;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		.imgBox {
			display: flex;
			flex-direction: column;
			align-items: center;
			float: left;
			width: 100%;
			background: url("/static/img/imgBox.png") 50% 50% no-repeat, #00173c;
			.gameImg {
				display: block;
				min-width: 138px;
				min-height: 86px;
				width: 100%;
				height: 100%;
				border: none !important;
			}
		}
	}
</style>
