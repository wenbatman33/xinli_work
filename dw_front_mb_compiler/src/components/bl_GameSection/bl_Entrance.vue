<template lang="pug">
.entrance
	.entrance__block.d-flex.overflow-auto.px-2.pb-2
		.entrance__block__inner.d-flex
			img.gameImg.pr-2(v-for="(game, key) in gameGroup" :key="game.id" :src="game.gameVi_Before" @click="playGame(game)")
</template>

<script>
export default {
  props: ['gameType', 'gameGroup'],
  data() {
    return {
      loginForm: {
        params: {
          device: 2,
          game_group_id: 0,
          game_id: 0,
          force_login: 0,
        },
      },
    };
  },
  methods: {
    playGame(game) {
      const payload = {};
      payload.gameType = this.gameType;
      payload.gameInfo = game;
      payload.gameName = game.gameGroupName;
      this.loginForm.params.game_group_id = game.id;
      payload.loginForm = this.loginForm;
      this.$store.dispatch('games/GameLogin', payload);
    },
  },
};
</script>

<style lang="scss" scoped>
.entrance {
	position: relative;
  ::-webkit-scrollbar {
    width: 0 !important;
  }

	&__block {
		position: relative;
		border-radius: 10px;
		background-color: $navy_dark;
		&__inner{
			position: relative;
			left: 1800px;
			animation: myfirst 1s;
			animation-delay: 2s;
			animation-fill-mode: forwards;
		}
  }

  .title {
    color: $theme;
    .color-black {
      color: black;
    }
  }

  .gameImg {
    height: 100px;
  }
}
@keyframes myfirst {
  0%   {left: -2000px;}
  100% {left:  0px;}
}
</style>
