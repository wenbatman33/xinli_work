<template lang="pug">
.container-fluid.p-0.gamesPage
  .gamesPageBanner
    img(v-for='(item, index) in gameBanner', :src='item.bannerImagePc')
  .gameTabBar.p-5.d-flex.flex-row(v-if='gameTypeData.length>0')
    .gameTabBarBtn
      .btn.mx-3.mb-2(@click='newGameList',:class='{active: (currentNum===1)}')
        i.fas.fa-bolt
      span.gameTitle.mx-2 最新游戏
    .gameTabBarBtn
      .btn.mx-3.mb-2(@click='hotGameList',:class='{active: (currentNum===2)}')
        i.fas.fa-fire.icon
      span.gameTitle.mx-2 热门推荐
    .gameTabBarBtn
      .btn.mx-3.mb-2(@click='havePlayGameList',:class='{active: (currentNum===3)}')
        i.fas.fa-history
      span.gameTitle.mx-2 曾经游玩
    .gameTabBarBtn
      .btn.mx-3.mb-2(@click='likeGameList',:class='{active: (currentNum===4)}')
        i.fas.fa-grin-stars
      span.gameTitle.mx-2 我的最爱
    .searchForm.mr-4
      el-form(:model="searchForm" ref="searchForm" @submit.native.prevent='searchFormSubmit')
        el-input.searchFormInput(placeholder='请输入游戏名称' size="small"  v-model='searchForm.keyword')
          i.el-input__icon.el-icon-search(slot='suffix' @click='searchFormSubmit')
  .gamesPageContainer.row.no-gutters
    .col-10
      .gamesWarp.d-flex.flex-wrap
        gameCard.m-2(v-if='gameSelected.length>0', v-for='(game, index) in gameSelected', :gameData='game', :gameOpenMode='getGameOpenMode')
        .nullData.text-center.my-5(v-if='gameSelected.length<=0')
          img(:src='nullPoromotion')
          p 暂无纪录
    .col-2
      .funcBar.m-3.mr-0
        .funcBlock
          .title 游戏类型 
          el-checkbox-group(v-model='gameSelectedArray')
            .funcItem(v-for='(game, index) in gameTagList', v-if='game.gameTagGroupId===1')
              el-checkbox(:label='game.id', @change='gameTagGroupIdHandle(game.gameTagName)') {{game.gameTagName}}
        .funcBlock
          .title 游戏线数
          el-checkbox-group(v-model='gameSelectedArray')
            .funcItem(v-for='(game, index) in gameTagList', v-if='game.gameTagGroupId===2')
              el-checkbox(:label='game.id', @change='gameTagGroupIdHandle(game.gameTagName)') {{game.gameTagName}}
        .resetBtn(@click='clickGameSelectedArray') 重置条件
  bl_Footer
</template>

<script>
import router from '@/router';
import bl_Footer from '@/components/bl_Footer/bl_Footer.vue';
import gameCard from '@/components/bl_Games/gamesCard.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  name: 'games',
  components: {
    bl_Footer,
    gameCard,
  },
  data() {
    return {
      currentNum: 1,
      groupid: 0,
      txt: '',
      searchForm: {
        keyword: '',
      },
      brand: [],
      gameSelectedArray: [],
      nullPoromotion: `${window.CDN_ASSETS}/static/img/nullPoromotion.png`,
    };
  },
  computed: {
    ...mapState('member', ['memberLogined']),
    ...mapState('game', [
      'gameTypeData',
      'gameList',
      'gameTagList',
      'gameBanner',
    ]),
    gameSelected(val) {
      const vm = this;
      const temp = this.gameList.filter((game) => {
        if (vm.gameSelectedArray.length > 0) {
          return game.gameTag.some(r => vm.gameSelectedArray.indexOf(Number(r)) >= 0);
        } 
        return game;
      });
      return temp;
    },
    gameGroup(val) {
      const vm = this;
      const temp = this.gameTypeData.filter(game => Number(game.gameGroups.data.gameOpenMode) === Number(this.$route.query.group));
      return temp;
    },
    getGameOpenMode() {
      const getCurrentBrand = this.brand.filter(brandItem => Number(brandItem.id) === Number(this.groupid));
      return getCurrentBrand[0].gameOpenMode;
    },
  },
  watch: {
    gameTypeData(val) {
      this.getBrand();
    },
    $route(to, from) {
      this.groupid = to.query.groupid;
    },
  },
  methods: {
    gameTagGroupIdHandle(val) {
      this.$matomo_gameTagName(val);
    },
    newGameList() {
      this.currentNum = 1;
      this.setGameSelectedArray();
      this.$matomo_gameFilter_new();
      this.init();
    },
    hotGameList() {
      this.currentNum = 2;
      this.setGameSelectedArray();
      this.$matomo_gameFilter_hot();
      const payload = {};
      payload.id = this.groupid;
      this.$store.dispatch('game/getHotGameList', payload);
    },
    havePlayGameList() {
      if (this.memberLogined) {
        this.currentNum = 3;
        this.setGameSelectedArray();
        this.$matomo_gameFilter_havePlayGame();
        const payload = {};
        payload.id = this.groupid;
        this.$store.dispatch('game/getHavePlayGameList', payload);
      } else {
        this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
      }
    },
    likeGameList() {
      if (this.memberLogined) {
        this.currentNum = 4;
        this.setGameSelectedArray();
        this.$matomo_gameFilter_like();
        const payload = {};
        payload.id = this.groupid;
        this.$store.dispatch('game/getLikeGameList', payload);
      } else {
        this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_Login' });
      }
    },
    init() {
      const vm = this;
      vm.group = this.$route.query.group;
      vm.groupid = this.$route.query.groupid;
      vm.getGameList();
    },
  
    getGameList() {
      const vm = this;
      const payload = {};
      payload.id = this.groupid;
      this.$store.dispatch('game/getGameList', payload);
      this.$store.dispatch('game/getGameTagList');
      this.getBrand();
    },
    searchFormSubmit() {
      this.setGameSelectedArray();
      const vm = this;
      const payload = {};
      payload.id = this.groupid;
      payload.keyword = this.searchForm.keyword;
      this.$store.dispatch('game/getGameList', payload);
    },
    getBrand() {
      const vm = this;
      vm.gameTypeData.forEach((item) => {
        if (Object.values(item).indexOf(Number(vm.group)) > -1) {
          vm.brand = item.gameGroups.data;
        }
      });
    },
    setGameSelectedArray() {
      this.gameSelectedArray = [];
    },
    clickGameSelectedArray() {
      this.$matomo_gameTagReset();
      this.gameSelectedArray = [];
    },
  },
  mounted() {
    const payload = { banner_group_id: 3, device: 1 };
    this.$store.dispatch('game/API_GameBanner', payload);
    this.init();
  },
};
</script>
<style lang="scss" scoped>
.gamesPage {
  width: 100%    !important;
  height: auto   !important;
  min-width: 1024px;
  .gamesPageBanner{
    width: 100%;
    img{
      width: 100%;
      height: auto;
    }
  }
  .gameTabBar{
    width: 100%;
    height: 78px;
    .gameTitle{
      color: white;
    }
    .gameTabBarBtn{
      text-align: center;
      color: $DW_Color;
      font-size: $text-12;
      .btn{
        width: 50px;
        height: 50px;
        text-align: center;
        line-height: 50px;
        border-radius: 12px;
        box-shadow: 0 0 20px 0 $DW_ColorAlpha_40;
        background-color: $DW_ColorAlpha_20;
        color: $DW_Color;
        cursor: pointer;
        border: 1px $DW_Color solid;
        i{
          font-size: $text-16;
        }
      }
      .active{
        background: $DW_Color;
        color: white;
      }
    }
    
    .searchForm{
      text-align: right;
      margin-left: auto;
      height: 78px;
      line-height: 78px;
    }
  }
  .gamesPageContainer{
    min-height: 500px;
    padding: 40px;
    .content{
      padding: 0 20px;
    }
    .funcBar{
      right: 20px;
      width: 200px;
      min-width: 200px;
      max-width: 200px;
      .funcBlock{
        border-radius: 20px;
        overflow: hidden;
        background-color: white;
        margin-bottom: 20px;
        padding-bottom: 10px;
        border: solid 1px $DW_Color;
        background-color: $DW_ColorAlpha_20;
        .title{
          height: 56px;
          // text-align: center;
          padding: 0 40px;
          color: white;
          line-height: 56px;
          margin-bottom: 10px;
          background-image: linear-gradient(to right, $DW_Color, $DW_ColorDark);
        }
        .funcItem{
          height: 32px;
          // text-align: center;
          padding: 0 40px;
          color: white;
          line-height: 32px;
          font-size: 14px;
          span{
            color: white !important;
          }
          /deep/.el-checkbox__label{
            color: white!important;
          }
        }
        
        .clickBtn{
          cursor: pointer;
        }
      }
    }
  }
  .nullData{
    width: 100%;
    p{
      color: white;
    }
  }
}
.resetBtn{
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  text-align: center;
  padding: 16px 0;
  color: white;
  border-radius: 20px;
  box-shadow: 0 0 12px 0 $balckAlpha_10;
  background-color: $garyBlue_Dark;
}
.el-checkbox{
  margin: 0;
}
</style>
<style lang="scss">
.searchFormInput{
  line-height: 38px;
  width: 388px;
  height: 38px;
  .el-input__inner{
    line-height: 38px;
    width: 388px;
    height: 38px;
    border-radius: 20px;
    border: solid 1px $garyBlue_lightest;
  }
}
</style>

<style lang="scss" scoped>
.MAIN_LIGHT{
  .gamesPage{
    .gameTabBar{
      .gameTitle{
        color: $gray_333;
      }
      .gameTabBarBtn{
        text-align: center;
        color: $L_DW_Color;
        font-size: $text-12;
        .btn{
          box-shadow: 0 0 20px 0 $L_DW_ColorAlpha_40;
          background-color: $L_DW_ColorAlpha_20;
          color: $L_DW_Color;
          border: 1px $L_DW_Color solid;
          background: white;
        }
        .active{
          background: $L_DW_Color;
          color: white;
        }
      }
      
      .searchForm{
        text-align: right;
        margin-left: auto;
        height: 78px;
        line-height: 78px;
      }
    }
    .gamesPageContainer{
      .funcBar{
        .funcBlock{
          border-radius: 20px;
          overflow: hidden;
          background-color: white;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border: solid 1px $L_DW_Color;
          background-color: white;
          .title{
            background-image: linear-gradient(to right, $L_DW_Color, $L_DW_ColorDark);
          }
          .funcItem{
            height: 32px;
            // text-align: center;
            padding: 0 40px;
            color: white;
            line-height: 32px;
            font-size: 14px;
            span{
              color: white !important;
            }
            /deep/.el-checkbox__label{
              color: $gray_333!important;
            }
          }
          
          .clickBtn{
            cursor: pointer;
          }
        }
      }
    }
    .nullData{
      width: 100%;
      p{
        color: $gray_666;
      }
    }
    
  }
}
</style>
