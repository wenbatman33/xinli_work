<template lang='pug'>
.container-fluid.gamesPageTab
  .container
    div.d-flex.justify-content-between
      ul
        li(v-if='gameProvider')
          router-link(:to="indexLink" v-bind:class="[routerActive ? 'router-link-active': '']" v-on:click.native='GA_game_platform') 游戏平台
        li
          router-link(:to="{ path:'recommend'}"  v-on:click.native='GA_game_recommend') 热门推荐
        li(@click='collection' v-bind:class="[getUrlID==='collection' ? 'router-link-active': '']" v-on:click.native='GA_game_collection') 收藏清单
        li(@click='recently' v-bind:class="[getUrlID==='recently'  ? 'router-link-active': '']" v-on:click.native='GA_game_recently') 最近玩过
        li
          router-link.tip(:to="{ path:'seatvr'}") 
            el-badge(value="new")
              span 包台大厅
      ul.searchUL.text-right
        li.m-0
          .demo-input-suffix
            el-form(:model="searchForm" ref="searchForm" @submit.native.prevent='searchFormSubmit')
              el-input(placeholder='请输入游戏名称' size="small"  v-model='searchForm.GameName')
                i.el-input__icon.el-icon-search(slot='suffix' @click='searchFormSubmit')
    el-dialog(:visible.sync='loginDialogShow', width='500px')
      tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import router from '@/router/router';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      searchForm: {
        GameName: '',
      },
      loginDialogShow: false,
      
    };
  },
  components: {
    tgLogin,
  },
  computed: {
    ...mapState('index', [
      'gameProvider',
      'gameProviderIndexName',
      'slotProviderIndexName',
      'fishingProviderIndexName',
      'boardProviderIndexName',
      'arcadeProviderIndexName',
    ]),
    ...mapState('game', [
      'currentGroupId',
      'currentGameType',
      'currentGameTypeName',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberData',
      'MemberLogined',
    ]),
    getUrlID() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      return parHash;
    },
    indexLink() {
      const path = this.$route.path.split('/');
      const parHash = path[1];
      let indexName;
      if (parHash === 'slot') {
        indexName = `/${this.currentGameTypeName}?game=${this.slotProviderIndexName}`; 
      } else if (parHash === 'fishing') {
        indexName = `/${this.currentGameTypeName}?game=${this.fishingProviderIndexName}`;
      } else if (parHash === 'board') {
        indexName = `/${this.currentGameTypeName}?game=${this.boardProviderIndexName}`;
      } else if (parHash === 'arcade') {
        indexName = `/${this.currentGameTypeName}?game=${this.arcadeProviderIndexName}`;
      } else {
        indexName = `/slot?game=${this.slotProviderIndexName}`;
      }
      return indexName; 
    },
    routerActive() {
      if (this.getUrlID === 'pt' || this.getUrlID === 'pg' || this.getUrlID === 'pp') {
        return true;
      }
      return false;
    },
  },
  methods: {
    collection() {
      if (this.MemberLogined === true) {
        router.push('/collection');
      } else {
        this.loginDialogShow = true;
      }
    },
    recently() {
      if (this.MemberLogined === true) {
        router.push('/recently');
      } else {
        this.loginDialogShow = true;
      }
    },
    loginDialogHide() {
      this.loginDialogShow = false;
    },
    searchFormSubmit() {
      const vm = this;
      this.$store.dispatch('game/API_GameSearch', this.searchForm)
        .then((res) => {

        });
      // console.log('searchFormSubmit')
    },
  },
};
</script>
<style lang="scss" scoped>
.gamesPageTab{
    height:45px;
    line-height:45px;
    background:#fff;
    border-bottom: 1px solid #e8e8e8;
  }
  ul{
    li{
      display: inline-block;
      cursor: pointer;
      line-height:41px;
      margin-right: 20px;
      font-size: 14px;
      color: #595959;
      text-decoration: none;
      border-bottom: 2px solid rgba(255,255,255,0);
      a{
        display: block;
        line-height:41px;
        color: #595959;
        padding: 0 10px;
        text-decoration: none;
        &:hover{
          color: #faad14;
          border-bottom: 2px solid #faad14;
        }
      }
      .router-link-active{
        color: #faad14;
        border-bottom: 2px solid #faad14;
      }
    }
  }
  .router-link-active{
    color: #faad14;
    border-bottom: 2px solid #faad14;
  }
  .searchUL{
    line-height: 40px;
  }
  .tip{
    .el-badge {
      position: relative;
      vertical-align: top;
      display: inline-block;
    }
    .el-badge__content.is-fixed{
      top: 8px !important;
    }
  }
</style>
