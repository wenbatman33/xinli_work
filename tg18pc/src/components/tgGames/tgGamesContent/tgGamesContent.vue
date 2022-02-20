<template lang='pug'>
  .container-fluid.tgGamesContainer(v-loading="loading")
    .container.pt-3.pb-5
      .row.filter.mt-3.mb-3
        .col-lg-12(v-if='currentGameType==1', :class='[showDetails ? "" : "showDetail"]')
          div.showDetailBtn
            span(@click='clearFilteredTagsArray') 重置条件 |
            span(@click='showDetails =!showDetails')  展开
              i(:class='[showDetails ? "el-icon-caret-bottom" : "el-icon-caret-top" ]')
          ul(v-for='(group, groupIndex) in gameTagGroup')
            li.title {{group.GroupName}}:
            li(v-for='(game, index) in gameTagList' v-if='game.GroupId == group.GroupId' @click="filteredTags(game.GroupId, game.Sn)" :class="filterActive(game.GroupId, game.Sn) === true ? 'active' : ''") {{ game.TagName }}
      .row
        //- P {{gameFilterResult}}
        .col-3.mt-2.mb-2(v-for='game in gameFilterResult' v-if='game.GameMode ==0 | game.GameMode ==1')
          //- P {{game}}
          tgGamesCard(:gameData='game') 
        .col-12(v-if='gameFilterResult.length<=0 && filterHandle==true')
          .cardItemNull.d-flex.justify-content-center.align-items-center
            h2.text-center 未符合筛选条件
</template>
<script>
import _ from 'lodash';
import axios from 'axios';
import tgGamesCard from '@/components/tgGames/tgGamesCard/tgGamesCard.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';
import router from '@/router/router';

export default {
  data() {
    return {
      loading: true,
      filteredTagsArray: [],
      showDetails: false,
      filterHandle: false,
      gameFilterResultInit: false,
    };
  },
  props: ['currentGroupId', 'currentGameType'],
  components: {
    tgGamesCard,
  },
  computed: {
    ...mapState('game', [
      'gameTagGroup',
      'gameTagList',
      'gameFilterResult',
    ]),
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
  },
  watch: {
    $route(to, from) {
      this.filteredTagsArray.length = 0;
      this.showDetails = false;
      this.gameFilterResultInit = false;
      this.init();
    },
  },
  methods: {
    filteredTagsArrayInit() {
      const vm = this;
      this.gameFilterResultInit = true;
      this.filteredTagsArray = [];
      _.forEach(this.gameTagGroup, (value, index) => {
        const newObject = {};
        newObject.GroupID = value.GroupId;
        newObject.FilterCondition = [];
        vm.filteredTagsArray.push(newObject);
      });
    },
    filteredTags(GroupId, Sn) {
      this.filterHandle = true;
      const index = Number(GroupId) - 1;
      if (this.gameFilterResultInit === false) {
        this.filteredTagsArrayInit();
      }
      if (_.includes(this.filteredTagsArray[index].FilterCondition, Sn)) {
        const temp = this.filteredTagsArray[index].FilterCondition.indexOf(Sn);
        if (temp !== -1) this.filteredTagsArray[index].FilterCondition.splice(temp, 1);
      } else {
        this.filteredTagsArray[index].FilterCondition.push(Sn);
      }
      this.$store.commit('game/setFilteredTags', this.filteredTagsArray);
    },
    filterActive(GroupId, Sn) {
      if (this.gameFilterResultInit === false) {
        this.filteredTagsArrayInit();
      }
      const index = Number(GroupId) - 1;
      if (this.filteredTagsArray[index].FilterCondition.indexOf(Sn) >= 0) {
        return true;
      }
      return false;
    },
    clearFilteredTagsArray() {
      this.filterHandle = false;
      this.filteredTagsArrayInit();
      this.$store.commit('game/setFilteredTags', this.filteredTagsArray);
    },
    getData() {
      this.loading = true;
      const payload = {};
      payload.Status = 1;
      payload.GroupId = this.currentGroupId;
      payload.GameType = this.currentGameType;
      const tagGroupPayload = {};
      tagGroupPayload.TagType = '0';
      tagGroupPayload.Status = 1;
      const gameTagListPayload = {};
      gameTagListPayload.Status = 1;
      this.$store.dispatch('game/API_GameList', payload)
        .then((res) => {
          this.loading = false;
        });
      this.$store.dispatch('game/API_GameTagGroup', tagGroupPayload);
      this.$store.dispatch('game/API_GameTagList', gameTagListPayload);
    },
    init() {
      const query = this.$route.query.game;
      const path = this.$route.path.split('/');
      const payload = {};
      payload.GroupName = query;
      if (path[1] === 'slot') {
        payload.GameType = 1;
      } else if (path[1] === 'fishing') {
        payload.GameType = 2;
      } else if (path[1] === 'board') {
        payload.GameType = 3;
      } else if (path[1] === 'arcade') {
        payload.GameType = 4;
      }
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
  .debug{
    position:absolute;
    background: rgba(0, 0, 0,.8);
    color: #fff;
    right: 0;
    bottom: -1500;
    line-height: 2;
    z-index: 30;
  }
  .tgGames{
    width: 100%;
  }
  .tgGamesContainer{
    padding-top: 30px 0;
    background: #f5f5f5;
  }
  .el-row{
    padding: 10px;
  }
  .gameCard{
    padding: 5px;
    overflow: hidden;
  }
  .filter{
    margin:10px 0;
    border-radius: 32px;
    background-color: #ffffff;
  }
  ul{
      display: block;
      margin: 10px 10px;
      li{
        display: inline-block;
        background: #fff;
        border-radius: 4px;
        padding:6px;
        margin: 0 2px;
        cursor: pointer;
      }
      li.title{
        cursor: default;
        width: 100px;
      }
      li.active{
        color:#fff;
        background: #0050b3;
        border-radius: 4px;
        padding:6px;
      }
    }
    .cardItemNull{
      height: 300px;
    }
    .showDetail{
      height: 60px;
      overflow: hidden;
    }
    .showDetailBtn{
      cursor: pointer;
      position: absolute;
      top: 15px;
      right:30px;
    }
  .fade-in {
    opacity: 0;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-delay: .3s;
    animation-duration: .3s;
    animation-fill-mode: forwards;
  }
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
