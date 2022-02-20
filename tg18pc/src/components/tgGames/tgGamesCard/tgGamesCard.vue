<template lang='pug'>
  .tgGamesCard(@mouseover="touch=true" @mouseleave="touch=false")
    .floating
      img(:src='filterProviderImg(gameData.GroupName)')
    .option.d-flex.flex-column.justify-content-center.align-items-center(v-if="touch")
      div.text-center.m-1(v-if='gameData.GamePlayUrl')
        .btn.btn-outline-warning(@click='played(1)') 立即开始
      div.text-center.m-1(v-if='gameData.GamePlayTestUrl')
        .btn.btn-outline-warning(@click='playFree(0)') 免费试玩
    .loading.el-icon-loading(v-if='showImgLoading')
    img.gameImg.img-fluid(:src="gameData.Images" @load='imgLoaded')
    .info.d-flex.justify-content-between.p-1
      .name.flex-grow-1 {{gameData.GameName}}
      .favorite.flex-grow-1(@click='collectGameHandle') {{Popular}} 
        img.favIcon(v-if='Collection == 0' src="/static/img/icon-heartborder.png")
        img.favIcon(v-else src="/static/img/icon-heartfull.png")
    el-dialog(:visible.sync='loginDialogShow', width='500px')
      tgLogin(@loginDialogHide='loginDialogHide')
    el-dialog(:visible.sync='gameErrorShow', width='30%')
      tgError
</template>
<script>
import axios from 'axios';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgError from '@/components/tgError/tgError.vue';
import { mapState } from 'vuex';

export default {
  components: {
    tgLogin,
    tgError,
  },
  props: [
    'gameData',
    'GAcategory',
    'GAlabel',
  ],
  data() {
    return {
      showImgLoading: true,
      loginDialogShow: false,
      gameErrorShow: false,
      touch: false,
      Collection: this.gameData.Collection,
      Popular: Number(this.gameData.Popular),
    };
  },
  watch: {
    gameData: {
      handler(value) {
        this.Collection = value.Collection;
        this.Popular = Number(value.Popular);
      },
      deep: true,
    },
  },
  computed: {
    ...mapState('index', [
      'AllProvider',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
    getRoutePath() {
      return this.$route.path;
    },
  },
  methods: {
    filterProviderImg(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      return result[0].Images;
    },
    imgLoaded() {
      this.showImgLoading = false;
    },
    collectGameHandle() {
      if (this.MemberLogined) {
        this.collectGame();
      } else {
        this.loginDialogShow = true;
      }
    },
    collectGame() {
      if (this.Collection === 0 || this.Collection === '0') {
        const vm = this;
        const payload = {};
        payload.UserId = this.UserId;
        payload.GameId = this.gameData.Sn;
        payload.Type = 1;
        axios.post(`${process.env.VUE_APP_APIHOST}/Web/GameRecordManage/Add`, payload)
          .then((res) => {
            if (res.data.status === 1) {
              vm.Collection = 1;
              vm.Popular += 1;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        const vm = this;
        const payload = {};
        payload.UserId = this.UserId;
        // ///////////////////////////////////
        // 請用this.Collection 去刪除
        payload.Sn = this.Collection;
        // ///////////////////////////////////
        payload.GameId = this.gameData.Sn;
        payload.Type = 1;
        axios.post(`${process.env.VUE_APP_APIHOST}/Web/GameRecordManage/Delete`, payload)
          .then((res) => {
            if (res.data.status === 1) {
              vm.Collection = 0;
              vm.Popular -= 1;
              vm.$emit('cancelCollection', vm.gameData.Sn);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    playFree(type) {
      this.playGame(type);
    },
    played(type) {
      if (this.MemberLogined) {
        this.playGame(type);
      } else {
        this.loginDialogShow = true;
      }
    },
    playGame(type) {
      const token = jwtDecode(window.localStorage.JWT_TOKEN);
      const payload = {};
      const vm = this;
      payload.GameId = this.gameData.Sn;
      payload.UserId = token.userid;
      payload.GamePlay = type;
      payload.GroupId = this.gameData.GroupId;
      // Game maintenance
      if (this.gameData.Status === 2 || this.gameData.Status === '2' || this.gameData.GroupStatus === 2 || this.gameData.GroupStatus === '2') {
        vm.$message({ message: '游戏维护中', type: 'error' });
      } else {
        let newPage = window.open('', payload.GroupId);
        this.$store.dispatch('index/JwtExpireCheck')
          .then((res) => {
            if (res.data.status === 1) {
              newPage.location.href = `${process.env.VUE_APP_GAMEPAGEHOST}/loading.html?token=${window.localStorage.JWT_TOKEN}&GameId=${this.gameData.Sn}&UserId=${token.userid}&GamePlay=${type}&GroupId=${this.gameData.GroupId}&GroupName=${this.gameData.GroupName}&H5Game=${this.gameData.H5Game}`;
              this.addGameRecord();
              // / GA setting
              let GAaction = '';
              if (type === 0) {
                GAaction = 'freeplay';
              } else {
                GAaction = 'play';
              }    
              this.GA_game_play(this.GAcategory, GAaction, `${this.getRoutePath}_${this.GAlabel}`, this.gameData.Sn);
            } else {
              newPage = window.open('', payload.GroupId).window.close();
            }
          });
      }
    },
    addGameRecord() {
      const vm = this;
      const payload = {};
      payload.UserId = this.UserId;
      payload.GameId = this.gameData.Sn;
      payload.Type = 2;
      axios.post(`${process.env.VUE_APP_APIHOST}/Web/GameRecordManage/Add`, payload)
        .then((res) => {
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loginDialogHide() {
      this.loginDialogShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
  .floating{
    position:absolute;
    width: 40px;
    height: 40px;
    top:2px;
    right: 2px;
    border-radius: 12px;
    background: rgba(0,0,0,.6);
    img{
      width: 40px;
      height: 40px;
    }
  }
  .tgGamesCard{
    position: relative;
    width: 100%;
    height: 160px;
    background: #00173C;
    background-image: url('/static/img/hotgame_000.png');
    background-repeat: no-repeat;
    background-position: center center; 
    overflow: hidden;
    .option{
      position: absolute;
      padding-bottom: 36px;
      width: 100%;
      height:100%;
      opacity: 1;
      background-color: rgba(0,39,102,.8);
      z-index: 1;
      transition: opacity 1s linear;
    }
    .gameImg{
      width: 100%;
    }
    .info{
      position: absolute;
      width: 100%;
      height: 36px;
      bottom: 0;
      background: rgba(0,0,0,.8);
      z-index:2;
      line-height: 32px;
      .name{
        overflow : hidden;
        text-overflow : ellipsis;
        white-space : nowrap;
        font-size:13px;
        color:#fff;
      }
      .favorite{
        text-align: right;
        min-width: 50px;
        cursor: pointer;
        font-size:13px;
        color:#fff;
      }
    }
  }
  .loading{
    position: absolute;
    top: 40%;
    left: 45%;
    font-size: 30px;
    color: #001b47;
  }
</style>
