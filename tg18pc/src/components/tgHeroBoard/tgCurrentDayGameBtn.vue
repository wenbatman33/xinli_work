<template lang='pug'>
.HeroBoardItem
  .pic
    img(:src="gameData.Images" @click='played(1)')
  .info
    p
      span.channel 派彩金额
      span.bonus ￥{{gameData.WinAmount | commaFormat}}
      .gameWhere(@click='played(1)')
        | 在 {{GameName}}
    el-dialog(:visible.sync='loginDialogShow', width='500px')
      tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import axios from 'axios';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  props: [
    'gameData',
    'GAlabel',
  ],
  components: {
    tgLogin,
  },
  data() {
    return {
      loginDialogShow: false,
      GameName: this.gameData.GameName,
      Sn: this.gameData.Sn,
      GameCode: this.gameData.GameCode,
      GroupName: this.gameData.GroupName,
      H5Game: this.gameData.H5Game,
      GamePlay: this.gameData.GamePlay,
      GroupId: this.gameData.GroupId,
      GamePlayUrl: this.gameData.GamePlayUrl,
      GamePlayTestUrl: this.gameData.GamePlayTestUrl,
      GroupStatus: this.gameData.GroupStatus,
      Status: this.gameData.Status,
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    loginDialogHide() {
      this.loginDialogShow = false;
    },
    played(type) {
      if (this.MemberLogined) {
        this.playGame(type);
      } else {
        this.loginDialogShow = true;
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
    playGame(type) {
      const token = jwtDecode(window.localStorage.JWT_TOKEN);
      const payload = {};
      const vm = this;
      payload.GameId = this.gameData.Sn;
      payload.UserId = token.userid;
      payload.GamePlay = type;
      payload.GroupId = this.gameData.GroupId;
      // Game maintenance
      if (this.Status === 2 || this.Status === '2' || this.GroupStatus === 0 || this.GroupStatus === '0') {
        vm.$message({ message: '游戏维护中', type: 'error' });
      } else {
        const newPage = window.open('', payload.GroupId);
        this.$store.dispatch('index/JwtExpireCheck')
          .then((res) => {
            if (res.data.status === 1) {
              newPage.location.href = `${process.env.VUE_APP_GAMEPAGEHOST}/loading.html?token=${window.localStorage.JWT_TOKEN}&GameId=${this.gameData.Sn}&UserId=${token.userid}&GamePlay=${type}&GroupId=${this.gameData.GroupId}&GroupName=${this.gameData.GroupName}&H5Game=${this.gameData.H5Game}`;
              this.addGameRecord();
              this.GA_game_play('排行榜', 'click', this.GAlabel, this.Sn);
            } else {
              newPage.close();
            }
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.playBtn{
  cursor: pointer;
}
.HeroBoardItem{
  display: flex;
  border-bottom: #d9d9d9 1px solid;
  .pic{
    cursor: pointer;
    width: 60px;
    height: 60px;
    margin: 20px 0;
    overflow: hidden;
    display:flex;
    align-items: center;
    justify-content: center;
    border-radius:50%;
    img{
      height: 60px;
      width: auto;
    }
  }
  .info{
    flex: 1;
    flex-direction:column;
    display:flex;
    justify-content: center;
    padding: 0 10px;

    .channel{
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1;
      letter-spacing: normal;
      text-align: left;
      color: #8c8c8c;
    }
    .bonus{
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: left;
      color: #faad14;
    }
    .gameWhere{
      cursor: pointer;
      font-size: 14px;
      font-weight: normal;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
      letter-spacing: normal;
      text-align: left;
      color: #001b47;
    }
  }
}
</style>
