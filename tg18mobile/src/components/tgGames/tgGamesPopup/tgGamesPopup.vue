<template lang='pug'>
	section
		.gamepopup
			.popup_close
			.gamepopup_caption(v-if='MemberLogined') {{ gameData.GroupName }} 钱包余额 ：
				span ¥ {{ getGameCash }}
			.gamepopup_info
				.gamepopup_img
					.icon_AllProvider
						img(:src='filterProviderImg(gameData.GroupName)')
					.imgBox
						img.gameImg(:src="gameData.Images")
			.gamepopup_name {{gameData.GameName}}
			.gamepopup_favor
					span.like(v-if="gameData.Collection != 0") {{gameData.Popular}}
					span.unlike(v-if="gameData.Collection == 0") {{gameData.Popular}}
			div(v-if='gameData.GamePlayUrl')
				.gamepopup_btn(@click='played(1)') 立即开始
			div(v-if='gameData.GamePlayTestUrl')
				.gamepopup_btn(v-if='gameData.GroupId != 1 && gameData.GroupId != 3' @click='playFree(0)') 免费试玩
			div
				.gamepopup_btn(v-if="gameData.Collection == 0" @click='collectGame') 收藏游戏
				.gamepopup_btn(v-if="gameData.Collection != 0" @click='collectGame') 取消收藏
</template>
<script>
import axios from 'axios';
import jwt from 'jwt-simple';
import jwtDecode from 'jwt-decode';
import router from '@/router/router';
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
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
      'MemberGameWallet',
      'MemberWallet',
    ]),
    ...mapState('game', [
      'loginDialogShow',
      'gamesCollection',
    ]),
    getGameCash() {
      let returnData = '';
      const vm = this;
      Object.keys(vm.MemberGameWallet).some((key) => {
        if (vm.MemberGameWallet[key][0] === vm.gameData.GroupName) {
          const temp = vm.MemberGameWallet[key][1];
          returnData = temp;
        }
        return returnData;
        // console.log(vm.MemberGameWallet[key]);
      });
      // for (const key in this.MemberGameWallet) {
      //   if (this.MemberGameWallet[key][0] === this.gameData.GroupName) {
      //     const temp = this.MemberGameWallet[key][1];
      //     returnData = temp;
      //   }
      // }
      return returnData;
    },
  },
  methods: {
    filterProviderImg(value) {
      const result = this.AllProvider.filter(item => item.GroupName === value);
      return result[0].Images;
    },
    collectGame() {
      if (!this.MemberLogined) {
        const vm = this;
        this.$message({
          message: '请先登入',
          type: 'error',
          duration: 1500,
          center: true,
          onClose() {
            vm.$store.state.index.loginBackUrl = vm.$route.path;
            router.push('/login');
          },
        });
      }
      if (this.gameData.Collection === 0 || this.gameData.Collection === '0') {
        const vm = this;
        const payload = {};
        payload.UserId = this.UserId;
        payload.GameId = this.gameData.Sn;
        payload.Type = 1;
        axios.post(`${process.env.VUE_APP_APIHOST}/Web/GameRecordManage/Add`, payload)
          .then((res) => {
            vm.gameData.Collection = 1;
            vm.gameData.Popular = Number(vm.gameData.Popular) + 1;
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
        payload.Sn = this.gameData.Collection;
        // ///////////////////////////////////
        payload.GameId = this.gameData.Sn;
        payload.Type = 1;
        axios.post(`${process.env.VUE_APP_APIHOST}/Web/GameRecordManage/Delete`, payload)
          .then((res) => {
            let key = '';
            const findAgeThan5 = vm.$store.state.game.gamesCollection.find((item, index, array) => {
              key = index;
              return item.Sn === vm.gameData.Sn;
            });
            vm.$store.state.game.gamesCollection.splice(key, 1);
            vm.gameData.Collection = 0;
            vm.gameData.Popular = Number(vm.gameData.Popular) - 1;
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.reNewCollect();
    },
    playFree(type) {
      this.playGame(type);
    },
    played(type) {
      if (this.MemberLogined) {
        this.playGame(type);
      } else { // 跳登入
        const vm = this;
        this.$message({
          message: '请先登入',
          type: 'error',
          duration: 1500,
          center: true,
          onClose() {
            vm.$store.state.index.loginBackUrl = vm.$route.path;
            router.push('/login');
          },
        });
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
        const newPage = window.open('', payload.GroupId);
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
              newPage.close();
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
    reNewCollect() {
      const payload = {};
      payload.UserId = this.UserId;
      payload.Type = 1;
      this.$store.dispatch('game/API_GamesCollectionList', payload);
    },
  },
  mounted() {
    // console.log(this.gameData)
  },
};
</script>
<style lang="scss" scoped>
	.gamepopup {
		background: url("/static/img/popup_bg.png") 50% 100% no-repeat, linear-gradient( 180deg, rgba(0,39,102,1), rgba(0,19,50,1), rgba(0,0,0,1));
		background-size: cover;
		.gamepopup_favor {
			.like{
			background: url("/static/img/icon-heartfull.png") 100% 50% no-repeat;
			background-size: contain;
			}
			.unlike{
			background: url("/static/img/icon-heart.png") 100% 50% no-repeat;
			background-size: contain;
			}
		}
		.gamepopup_img{
			width: 42vw;
			height: 42vw;
			.imgBox{
				display: inline-block;
				position: relative;
				left: 50%;
				height: 100%;
				.gameImg{
					display: block;
					height: 100%;
					width: unset;
					border: inherit !important;
					margin-left: -50%;
				}
			}
		}
		
	}
</style>
