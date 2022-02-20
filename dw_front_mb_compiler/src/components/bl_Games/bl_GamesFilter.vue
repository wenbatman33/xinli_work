<template lang="pug">
  .filter
    .filter__header(:style="{'backgroundImage': 'url(' + (DarkMode ? bgImage_night : bgImage_light) + ')'}")
      i.fas.fa-times(@click="changeGamePageType(0)")
      | 进阶筛选
      el-button(type="text" @click="clean") 重置
    .filter__default
      .filter__default__block
        .filter__default__block--title 游戏分类
        .filter__default__block--items
          button.mr-2(v-for="item in gameTagList(1)" :key="item.id" @click="select(item.id, item.gameTagName)" :class="{'activeTag': tagActive(item.id)}") {{ item.gameTagName }}
      .filter__default__block
        .filter__default__block--title 游戏线数
        .filter__default__block--items
          button.mr-2(v-for="item in gameTagList(2)" :key="item.id" @click="select(item.id, item.gameTagName)" :class="{'activeTag': tagActive(item.id)}") {{ item.gameTagName }}
    .filter__main
      GameCard(v-for="item in filterGameList" :game="item" :key="item.id")
</template>

<script>
import { mapState } from 'vuex';
import GameCard from '@/components/bl_Games/bl_GameCard.vue';

export default {
  components: {
    GameCard,
  },
  data() {
    return {
      bgImage_light: `${window.CDN_ASSETS}/static/img/bluebg.png`,
      bgImage_night: `${window.CDN_ASSETS}/static/img/bluebg_night.png`,
      selectTag: [],
    };
  },
  methods: {
    changeGamePageType(value) {
      this.$store.commit('games/setGamePageType', value);
    },
    gameTagList(groupId) {
      return this.$store.state.games.IndexGameTagList.filter(item => item.gameTagGroupId === groupId);
    },
    select(id, name) {
      this.$matomo_gamefilter_filter(name);
      if (this.selectTag.some(ele => ele === id)) {
        const index = this.selectTag.indexOf(id);
        this.selectTag.splice(index, 1);
      } else {
        this.selectTag.push(id);
      }
    },
    tagActive(id) {
      return this.selectTag.some(item => item === id);
    },
    addLikeList(id) {
      this.$store.dispatch('games/API_AddGameLikeRecord', {
        game_id: id,
      }).then((res) => {
        console.log(res);
      });
    },
    clean() {
      this.$matomo_gamefilter_reset();
      this.selectTag = [];
    },
  },
  computed: {
    ...mapState('index', [
      'DarkMode',
    ]),
    ...mapState('games', [
      'IndexGameTagList',
      'IndexNewGameList',
    ]),
    filterGameList() {
      const temp = this.IndexNewGameList.filter((item) => {
        if (this.selectTag.length > 0) {
          return item.gameTag.some(r => this.selectTag.indexOf(Number(r)) >= 0);
        } 
        return item;
      });
      return temp;
    },
  },
  created() {
    this.$store.dispatch('games/API_IndexGameTagList');
    this.$store.dispatch('games/API_IndexNewGameList', {
      params: {
        device: 1,
        game_group_id: this.$route.query.groupid,
      },
    });
  },
};
</script>

<style lang="scss" scoped>
.filter {
  display: flex;
  flex-direction: column;
  height: 100vh;

  &__header {
    padding: $height-10 $width-24;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $text-20;
    color: white;

    button {
      font-size: $text-14;
      color: white;
    }
  }

  &__default {
    padding: $height-24 $width-24;

    &__block {
      &:first-child {
        margin-bottom: $height-20;
      }

      &--title {
        color: $navy_light;
        margin-bottom: $height-12;
        margin-left: $width-8;
      }

      &--items {
        overflow: auto;
        display: flex;

        button {
          background-color: $origin_light;
          border-radius: 20px;
          color: $origin_darkest;
          border: none;
          padding: $height-8 $width-12;
          white-space: nowrap;
        }
      }
    }
  }

  &__main {
    padding: 0 $width-24;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex: 1;
    overflow: auto;
  }

  &__card {
    width: 47.5%;
    height: 18.9vh;
    display: flex;
    flex-direction: column;
    margin-bottom: $height-16;

    &__img {
      height: 100%;
      background-color: red;
      border-radius: 4px;
    }

    &__title {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .activeTag {
    color: white !important;
    background-color: $theme !important;
    border: none !important;
  }
}

.active {
  color: red;
}
</style>
