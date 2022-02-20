<template lang="pug">
.gameCard(@mouseover="touch=true" @mouseleave="touch=false")
  .gameCardImage
    .option.d-flex.flex-column.justify-content-center.align-items-center(v-if="touch")
      .playBtn.my-2(@click='play(gameData.gamePlayUrl)')
        i.fab.fa-gratipay.mx-1
        span 立即游戏
    img(:src='gameData.images')
  .gameCardInfo.py-2.d-flex.flex-row.justify-content-between.align-content-center
    div.title {{gameData.gameName}}
    div.Favorite(v-if='memberLogined', :class='[(like)?"active":""]', @click='likeToggle(gameData.id)')
      .i.fab.fa-gratipay
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  props: [
    'gameData',
    'gameOpenMode',
  ],
  data() {
    return {
      touch: false,
      like: false,
    };
  },
  computed: {
    ...mapState('member', ['memberLogined']),
  },
  watch: {
    gameData() {
      this.setLikeStatus();
    },
  },
  methods: {
    play(url) {
      const payload = {};
      payload.item = {};
      payload.subItem = {};
      payload.subItem.id = this.gameData.gameGroupId;
      payload.subItem.gameOpenMode = this.gameOpenMode;
      payload.game_id = this.gameData.id;
      this.$matomo_game(this.gameData.gameGroupId, this.gameData.gameName);
      this.$store.dispatch('game/gameLogin', payload);
    },
    likeToggle(id) {
      // console.log(this.gameData.gameLikeId)
      const payload = {};
      payload.game_id = id;
      const vm = this;
      if (this.like) {
        this.$axios.delete(`/api/GameLikeRecord/${id}`)
          .then((res) => {
            vm.like = false;
            vm.$message({ message: '游戏取消收藏', type: 'success' });
          });
      } else {
        this.$axios.post('/api/GameLikeRecord', payload)
          .then((res) => {
            vm.like = true;
            vm.$message({ message: '游戏已收藏', type: 'success' });
          });
      }
    },
    setLikeStatus() {
      if (this.gameData.gameLikeId !== 0) {
        this.like = true;
      } else {
        this.like = false;
      }
    },
  },
  mounted() {
    this.setLikeStatus();
  },
};
</script>
<style lang="scss" scoped>
.gameCard{
  .gameCardImage{
    position: relative;
    width: 188px;
    height: 117px;
    border-radius: 10px;
    box-shadow: 0 2px 8px 0 $balckAlpha_20;
    overflow: hidden;
    img{
      width: 100%;
    }
    .option{
      position: absolute;
      width: 100%;
      height: 125px;
      opacity: 1;
      background-image: linear-gradient(to bottom, $DW_ColorAlpha_50, $DW_ColorDark);
      z-index: 1;
      transition: opacity 1s linear;
      color: white;
      .freePlay{
        font-size: 13px;
        margin: 0;
      }
    }
  }
  .gameCardInfo{
    .title{
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      width: 160px;
      color: $garyBlue_lightest;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .Favorite{
      width: 24px;
      cursor: pointer;
      text-align: right;
      float: right;
      color: white; 
    }
    .active{
      color: $DW_red;
    }
  }
  .playBtn{
    cursor: pointer;
    width: 98px;
    height: 28px;
    font-size: 13px;
    line-height: 28px;
    text-align: center;
    border-radius: 14px;
    box-shadow: 0 0 20px 0 $DW_skyLight_1;
    background-image: linear-gradient(to left, $DW_skyLight_2, $DW_skyLight_1);
  }
}

</style>

<style lang="scss">
.MAIN_LIGHT{
  .gameCard{

    .gameCardInfo{
      .title{
        color: $blueDark_light;
      }
      .Favorite{
        color: $garyBlue_default; 
      }
      .active{color: $L_DW_Color;}
      .playBtn{
        box-shadow: 0 0 20px 0 $L_DW_skyLight_1;
        background-image: linear-gradient(to left, $L_DW_skyLight_2, $L_DW_skyLight_1);
      }
    }
  }
}
</style>
