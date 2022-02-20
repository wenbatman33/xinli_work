<template lang='pug'>
section
	.gamebrands
		ul(v-if='currentGameType == 1 && slotProvider.length > 0')
			li(v-for="item in slotProvider", v-if='item.Status != 0')
				router-link(:to='"/games/"+currentGameTypeName+"?game="+item.GroupName' 
										v-on:click.native='GA_home_platformobile' 
										:class='{ "provideActive": query===item.GroupName}')
					.gamebrand_img.gamebrands_pt(:style='{"background":item.ColorCode, "box-shadow":"0 0 8px 0 "+item.ColorCode}')
						img(:src='item.Images')
					span {{item.CompanyName}}
					//- span {{item.GroupName}}
		ul(v-if='currentGameType == 3 && boardProvider.length > 0')
			li(v-for="item in boardProvider", v-if='item.Status != 0')
				router-link(:to='"/games/"+currentGameTypeName+"?game="+item.GroupName' 
										v-on:click.native='GA_home_platforboardmobile' 
										:class='{ "provideActive": query===item.GroupName}')
					.gamebrand_img.gamebrands_pt(:style='{background:item.ColorCode, "box-shadow":"0 0 8px 0 "+item.ColorCode}')
						img(:src='item.Images')
					span {{item.CompanyName}}
					//- span {{item.GroupName}}
		ul(v-if='currentGameType == 2 && fishingProvider.length > 0')
			li(v-for="item in fishingProvider", v-if='item.Status != 0')
				router-link(:to='"/games/"+currentGameTypeName+"?game="+item.GroupName' 
										v-on:click.native='GA_home_platformfishmobile' 
										:class='{ "provideActive": query===item.GroupName}')
					.gamebrand_img.gamebrands_pt(:style='{background:item.ColorCode, "box-shadow":"0 0 8px 0 "+item.ColorCode}')
						img(:src='item.Images')
					span {{item.CompanyName}}
					//- span {{item.GroupName}}
</template>
<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      query: '',
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
      this.query = this.$route.query.game.toUpperCase();
    },
  },
  mounted() {
    this.query = this.$route.query.game.toUpperCase();
  },
};
</script>
<style lang="scss" scoped>
.provideActive{
	width: 100%;
  height: 100%;
  border-radius: 24px;
  border: solid 1px #1890ff;
  background: rgba(24, 144, 255, 0.12);
}
ul{
	li{
		.router-link-active{
			color: rgba(24,144,255,1);
		}
	}
}
/*-- Mobile --*/
@media screen and (max-width: 750px) {
	.provideActive{
		border-radius: 3.2vw;
		border: solid 1px rgba(24,144,255,1) !important;
	}
}
</style>
