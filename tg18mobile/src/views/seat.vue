<template lang="pug">
  .lobby.container-fluid(v-loading="loading")
    .stage1(v-if='stage==1')
    .stage2(v-if='stage==2')
    .VRHeader(v-if='stage==1')
      .VRHead_deco
      .VRHead_bg
      .VRHeadInfo.d-none.d-sm-block.d-none.d-md-block 欢迎光临 老虎城游戏包台大厅
      .HeaderBack_float
        el-button.mx-2.mt-3.btn_red(round='', icon='el-icon-arrow-left' @click='backtoIndex_step1') 回首页
        router-link(to="/seatvr")
          el-button.float-right.mx-2.mt-3.btn_red(round='') 3D版
      el-dialog(:width='isMobile? "90%" : "40%"',title="温馨提示：", center, :visible.sync='back_index_dialogShow', append-to-body='' )
        div.my-2.text-center
          p 离开包台大厅後，将离开游戏及包台座位。
        div.my-2.text-center
          el-button.my-2(@click='back_index_dialogShow=false') 取 消
          el-button.my-2(type='primary' @click='backtoIndex_step2') 离开，并将余额转回中心钱包
    .VRHeaderStage2(v-if='stage==2')
      .VRHead_deco
      .VRHead_bg
      .row.no-gutters
        .col-xs-3.col-sm-3.col-md-3.col-lg-5.HeaderBack
          el-button.mx-2.mt-3.btn_red(round='', icon='el-icon-arrow-left', @click='gotoStage1') 返回包台大厅
        .p-1.col-xs-9.col-sm-9.col-md-9.col-lg-7
          .VRHead
            .VRHeadContent
              .row.no-gutters.p-2
                .col-6.col-xs-6.col-sm-4.col-md-4.col-lg-3
                  .slotGameInfo
                    img.slotImg(:src='currentRoom.Images2')
                    .gameName {{currentRoom.GameName}}
                .col-6.col-xs-6.col-sm-8.col-md-8.col-lg-9
                  el-carousel.w-100(height='50px', indicator-position='none', arrow='never')
                    el-carousel-item(v-for='item in Math.ceil(heroBoard.length/2)', :key='item')
                      p.heroBoard.m-1 {{heroBoard[((item-1)*2)]}}
                      p.heroBoard.m-1 {{heroBoard[((item-1)*2)+1]}}
    .container-fluid.main(v-if='stage==1')
      //-  小螢幕
      el-carousel.carousel.w-100(v-if='gameList.length>0 && device.width<720', indicator-position='none', :height='device.height+"px"', arrow='always',:autoplay='false', :interval="999999")
        el-carousel-item(v-for='item in Math.ceil(gameList.length/1)', :key='item')
          .wrapper.d-flex.flex-row.justify-content-center.align-items-center
            .room(@click="gotoStage2(loopNum(item,1,0))")
              .door
                img.doorImg(src='/static/img/vr2d/door.png')
                img.gameImg(v-if='gameList[loopNum(item,1,0)].Images',:src='gameList[loopNum(item,1,0)].Images')
              .info.my-2 {{gameList[loopNum(item,1,0)].UserCashMsg}} {{gameList[loopNum(item,1,0)].UserLevelMsg}}
              el-button.btn_blue.my-2(round='', type='primary', @click='gotoStage2(loopNum(item,1,0))') 进入{{gameList[loopNum(item,1,0)].GameName}}大厅
      //-  大螢幕
      el-carousel.carousel.w-100(v-if='gameList.length>0 && device.width>=720', indicator-position='none', height='800px', arrow='always',:autoplay='false', :interval="999999")
        el-carousel-item(v-for='item in Math.ceil(gameList.length/2)', :key='item')
          .wrapper.d-flex.flex-row.justify-content-center.align-items-center
            .room.m-4(@click="gotoStage2(loopNum(item,2,0))")
              .door
                img.doorImg(src='/static/img/vr2d/door.png')
                img.gameImg(v-if='gameList[loopNum(item,2,0)].Images',:src='gameList[loopNum(item,2,0)].Images')
              .info.my-2 {{gameList[loopNum(item,2,0)].UserCashMsg}} {{gameList[loopNum(item,2,0)].UserLevelMsg}}
              el-button.btn_blue.my-2(round='', type='primary', @click='gotoStage2(loopNum(item,2,0))') 进入{{gameList[loopNum(item,2,0)].GameName}}大厅
            .room.m-4(@click="gotoStage2(loopNum(item,2,1))")
              .door
                img.doorImg(src='/static/img/vr2d/door.png')
                img.gameImg(v-if='gameList[loopNum(item,2,1)].Images',:src='gameList[loopNum(item,2,1)].Images')
              .info.my-2 {{gameList[loopNum(item,2,1)].UserCashMsg}} {{gameList[loopNum(item,2,1)].UserLevelMsg}}
              el-button.btn_blue.my-2(round='', type='primary', @click='gotoStage2(loopNum(item,2,1))') 进入{{gameList[loopNum(item,2,1)].GameName}}大厅
    .container-fluid.stage2Main(v-if='stage==2')
      .stage2Warp.p-3
        .row
          .col-6(v-for='(item, index) in slotMachineList')
            .slot.text-center
              .slotMC
                img.brand(:src='currentRoom.Images2')
                img(v-if='tableStatusList[item.Sn].Bonus>0' src='/static/img/vr2d/slot_machine_type3.png')
                img(v-if='tableStatusList[item.Sn].Played' src='/static/img/vr2d/slot_machine_type2.png')
                img(v-else, src='/static/img/vr2d/slot_machine_type1.png')
              .info.my-2 第 {{index+1}}号机台
              el-button.btn_gray(v-if='tableStatusList[item.Sn].Played==true', round='', type='info')
                span(v-if='tableStatusList[item.Sn].UserId==UserId') {{timestampList[index]}}
                span(v-else='') {{timestampList[index]}}
              el-button.btn_blue(v-if='tableStatusList[item.Sn].Played==false', round='', type='primary',@click='playGame(index)') 
                span 立即开始
    el-dialog.transfer_dialog(:visible.sync='cashierDialog_3', width='100%', append-to-body)
      tgCashier4(:propsWallet.sync='propsWallet',:transType.sync='transType' @cashierDialog_3_Hide='cashierDialog_3_Hide')
</template>
<script>
import Vue from 'vue';
import axios from 'axios';
import router from '@/router/router';
import jwtDecode from 'jwt-decode';
import { mapState } from 'vuex';
import tgCashier4 from '@/components/tgMember/tgCashier4.vue';
import tgError from '@/components/tgError/tgError.vue';
import io from 'socket.io-client';

const socketForSeat = io.connect(process.env.VUE_APP_SOCKETHOST);
let loop;
export default {
  components: {
    tgCashier4,
    tgError,
  },
  data() {
    return {
      device: {
        width: 0,
        height: 0,
      },
      loading: false,
      cashierDialog_3: false,
      propsWallet: [],
      transType: 1,
      stage: 1,
      isMobile: false,
      stageBackground: '#lobby',
      loaded: false,
      back_index_dialogShow: false,
      gameList: [],
      tableList: [],
      tableStatusList: [],
      slotMachineList: [],
      timestampList: [],
      heroBoard: [],
      heroBoardDefaultMsg: [
        '随意选择你的幸运号码机台',
        '每个机台同时只能一人游戏，请进快入座',
        '守住机台的派彩率，下一个大奖得主就是你',
      ],
      currentRoomIndex: '',
      currentRoom: null,
      currentSlotSn: '',
      currentSlotIndex: '',
      playBottonShow: false,
      roomShow: false,
      currentTableStatus: '',
      currentTablePlayedTime: '',
      currentTablePlayedTimeFormat: '',
      loopIsRun: false,
      VTGAMEBalance: 0,
    };
  },
  computed: {
    ...mapState('index', [
      'AllProvider',
    ]),
    ...mapState('game', [
      'gameGroup',
      'VRGameViewed',
    ]),
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberWallet',
      'MemberGameWalletCommon',
      'MemberGameWalletNormal',
    ]),
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeDestroy() {
    clearInterval(loop);
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    handleResize() {
      this.device.width = window.innerWidth;
      this.device.height = window.innerHeight;
    },
    // 閃入中心錢包
    WalletTransferAll(GroupId, GroupName) {
      // vm.submitLoading = true;
      const payload = { UserId: this.UserId, GameGroupId: GroupId };
      const vm = this;
      vm.fullscreenLoading = true;
      axios.post(`${process.env.VUE_APP_APIHOST}/WalletAll/WalletTransferAll`, payload)
        .then((res) => {
          if (res.data.status === 1) {
            vm.$message({ message: '已收回中心钱包', type: 'success' });
            vm.transferFinish();
          } else {
            vm.$message({ message: res.data.error_message, type: 'error' });
            vm.transferFinish();
          }
          vm.submitLoading = false;
          vm.fullscreenLoading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getVTGameWallet() {
      axios.post(`${process.env.VUE_APP_GAMEHOST}/Game/GameApi/GetBalance_Api/${this.UserId}/22`)
        .then((res) => {
          this.VTGAMEBalance = res.data.data.Balance;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    cashierDialog_3_Hide() {
      this.cashierDialog_3 = false;
      this.getVTGameWallet();
    },
    backtoIndex_step1() {
      if (this.VTGAMEBalance <= 0) {
        this.routerToIndex();
      } else {
        this.back_index_dialogShow = true;
      }
    },
    backtoIndex_step2() {
      // 回首頁閃提 22 VT 錢包

      this.WalletTransferAll(this.gameList[0].GameGroundId, 'VT');
    },
    transferFinish() {
      if (this.UserId) {
        const payload = { UserId: this.UserId, Status: '0' };
        this.$store.dispatch('member/MemberUserWalletInfo', payload);
        this.$store.dispatch('member/MemberGetGameWallet', payload);
      }
      this.routerToIndex();
    },
    routerToIndex() {
      router.push('/');
      this.$router.go(0);
    },
    loopNum(item, part, j) {
      // 計算房間 除於3的迴圈
      return Number(((item - 1) * part) + j);
    },
    gotoStage1() {
      // 進入場景1
      this.stage = 1;
      clearInterval(loop);
    },
    gotoStage2(index) {
      // 進入場景2
      this.currentRoomIndex = index;
      this.currentRoom = this.gameList[this.currentRoomIndex];
      this.stage = 2;
      this.slotMachineList = this.gameList[this.currentRoomIndex].Machine;
      // console.log(index);
      const vm = this;
      const payload = {};
      payload.GameSn = this.currentRoom.GameSn;
      axios.post(`${process.env.VUE_APP_APIHOST}/Web/GameMachineWin`, payload)
        .then((res) => {
          if (res.data.data.length <= 0) {
            vm.heroBoard = vm.heroBoardDefaultMsg;
          } else {
            vm.heroBoard = res.data.data;
          }
        })
        .catch((error) => {
          console.log(error);
        });
      this.checkPlayedTime();
    },
    checkPlayedTime(time) {
      const vm = this;
      loop = setInterval(() => {
        const temp = [];
        for (let i = 0; i < vm.slotMachineList.length; i += 1) { 
          if (vm.tableStatusList[vm.slotMachineList[i].Sn].TimeStamp) {
            const t = vm.tableStatusList[vm.slotMachineList[i].Sn].TimeStamp;
            temp[i] = vm.PlayedTimeFormat(t);
          } else {
            temp[i] = '';
          }
          // console.log(vm.PlayedTimeFormat(vm.tableStatusList[vm.slotMachineList[i].Sn].TimeStamp))
        }
        vm.timestampList = temp;
      }, 1000);
    },
    PlayedTimeFormat(time) {
      const vm = this;
      const totolSec = Math.floor((new Date().getTime() - time) / 1000);
      const sec = ((totolSec % 60) >= 10) ? totolSec % 60 : `0${(totolSec % 60)}`;
      const min = (Math.floor(totolSec / 60)) >= 10 ? Math.floor((totolSec / 60) % 60) : `0${Math.floor((totolSec / 60) % 60)}`;
      const hour = (Math.floor(totolSec / 3600)) >= 10 ? Math.floor(totolSec / 3600) : `0${Math.floor(totolSec / 3600)}`;
      return `${hour}:${min}:${sec}`;
    },
    setTableStatusList(arr) {
      const vm = this;
      this.tableList = [];
      this.tableStatusList = [];
      this.tableList = arr.Data;
      console.log(arr);
      for (let i = 0; i < 200; i += 1) { 
        if (arr.Data[i]) {
          vm.tableStatusList[i] = {
            Played: true, Bonus: arr.Data[i].Bonus, TimeStamp: arr.Data[i].TimeStamp, UserId: arr.Data[i].UserId, 
          };
        } else {
          vm.tableStatusList[i] = {
            Played: false, Bonus: 0, TimeStamp: '', UserId: '', 
          };
        }
      }
    },
    playGame(index) {
      this.currentSlotIndex = index;
      if (this.VTGAMEBalance <= 0) {
        const Wallet_1 = {
          gameId: 'center',
          gameName: '中心钱包',
          CompanyName: '中心钱包',
          Cash: this.MemberWallet.Cash,
          gameImage: '/static/img/18-tiger.svg',
          gameColor: '#002766',
        };
        const Wallet_2 = {
          gameId: this.currentRoom.GameGroupId,
          gameName: this.currentRoom.GameName,
          CompanyName: this.currentRoom.GameName,
          Cash: 0,
          gameImage: this.currentRoom.GameImages,
          gameColor: '#fff',
        };
        this.propsWallet = [Wallet_1, Wallet_2];
        this.cashierDialog_3 = true;
      } else {
        this.playGame_step2();
      }
    },
    playGame_step2() {
      const token = jwtDecode(window.localStorage.JWT_TOKEN);
      const slotMc = this.slotMachineList[this.currentSlotIndex];
      const gameItem = this.gameList[this.currentRoomIndex];
      const type = 1;
      const newPage = window.open('', gameItem.GameGroupId);
      this.$store.dispatch('index/JwtExpireCheck')
        .then((res) => {
          if (res.data.status === 1) {
            newPage.location.href = `${process.env.VUE_APP_GAMEPAGEHOST}/loading.html?token=${window.localStorage.JWT_TOKEN}&GameId=${gameItem.GameSn}&UserId=${token.userid}&GamePlay=${type}&GroupId=${gameItem.GameGroupId}&GroupName=${gameItem.GroupName}&H5Game=${gameItem.H5Game}&Machine=${slotMc.Sn}`;
          } else {
            newPage.close();
          }
        });
    },
  },
  mounted() {
    const vm = this;
    socketForSeat.on('connect', () => {
    });
    socketForSeat.on('tableStatus', (val) => {
      vm.setTableStatusList(val);
    });
    const payload = {};
    payload.Status = 1;
    this.getVTGameWallet();
    axios.post(`${process.env.VUE_APP_APIHOST}/Web/GameMachine/`, payload)
      .then((res) => {
        vm.gameList = res.data.data;
        // soket登入
        vm.$socket.emit('login', this.UserId);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>
<style lang='scss' scoped>
.lobby{
  position: relative;
  user-select: none;
  width: 100%;
  height: 100vh;
  // min-height: 720px;
  // overflow: hidden;
}
.carousel{
  height: 100%;
}
.VRHeader{
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 82px;
  top: 0;
  z-index: 10;
  // background: rgba(0,0,0,.5);
}
.VRHeaderStage2{
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 82px;
  top: 0;
  z-index: 10;
  // background: rgba(0,0,0,.5);
}
.VRHeadInfo{
  position: relative;
  z-index: 3;
  text-align: center;
  line-height: 82px;
  color: #FADB14;
  width: 330px;
  margin: 0 auto;
  background: url('/static/img/vr/jackpot_bg.png');
}
.VRHead{
  position: relative;
  z-index: 3;
  color: #FADB14;
  width: 100%;
  border-radius: 16px;
  background-image: linear-gradient(0deg, #E88D08 0%, #FFD200 56%, #FFE04F 100%);
  padding: 4px;
  .VRHeadContent{
    color: #FADB14;
    border-radius: 16px;
    background: #000;
    .jackpotWarp{
      p{
        font-size: 14px;
        width: 100%;
      }
    }
  }
  .heroBoard{
    color: #fff;
    line-height: 1.5;
    font-size: 14px;
  }
}
.HeaderBack{
  position: relative;
  z-index: 3;
}
.HeaderBack_float{
  position: absolute;
  width: 100%;
  top: 0;
  z-index: 3;
}
.VRHead_deco{
  position: absolute;
  width: 100%;
  height: 66px;
  top: 20px;
  z-index: 1;
  background: url('/static/img/vr/naviHeaderBg.png');
}

.main{
  position: relative;
  z-index: 1;
  overflow: hidden;
  height: 100%;
}
.stage2Main{
  position: relative;
  z-index: 1;
  overflow: hidden;
  margin-top: 180px;
  overflow-y: scroll;
}
.stage1{
  position: absolute;
  z-index: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: url('/static/img/vr2d/stage1.png');
  background-position: center center;
  background-repeat: no-repeat;
}
.stage2{
  position: fixed;
  z-index: 0;
  width: 100%;
  height: 100%;
  top: 0;
  overflow: hidden;
  background: url('/static/img/vr2d/stage2.png');
  background-position: center center;
  background-repeat: no-repeat;
}
.stage2Warp{
  height: auto;
  overflow-y: auto;
}
.slot{
  height: auto;
}
.floatingHeader{
  position: absolute;
  width: 100%;
  height: 60px;
  line-height: 60px;
  top: 0;
  z-index: 10;
  text-align: left;
}
.floating{
  position: absolute;
  width: 100%;
  height: 60px;
  line-height: 60px;
  bottom: 0;
  z-index: 10;
  text-align: center;
}
.wrapper{
  width: 100%;
  height: 100vh;
}
.room{
  position: relative;
  float: left;
  text-align: center;
  cursor: pointer;
  width: 260px;
  .door{
    position: relative;
    .doorImg{
      position: absolute;
      z-index: 1;
      left: 0;
    }
  }
  .gameImg{
    position: relative;
    margin-top: 90px;
    margin-left: 0px;
    width: 203px;
    height: 240px;
  }
}
.info{
  font-size: 12px;
  padding: 8px;
  border-radius: 8px;
  color: #fff;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
}
.btn_blue{
  color: #fff;
  border: 2px solid #0060D5;
  background: linear-gradient(-180deg, #00B0FF 0%, #67CEFE 9%, #0E91ED 44%, #0084E8 57%, #0060D5 100%) !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)!important;
}
.btn_red{
  color: #fff;
  border: 3px solid #F1A905;
  font-weight: bold;
  background: linear-gradient(270deg, #FF8200 0%, #FF5900 25%, #B50000 57%, #610000 100%) !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)!important;
}
.btn_gray{
  color: #fff;
  border: 2px solid #5D5D5D;
  background: linear-gradient(-180deg, #D4D4D4 0%, #E4E4E4 9%, #ACACAC 43%, #919191 56%, #5D5D5D 98%) !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)!important;
}
.slotMC{
  position: relative;
  display: inline-block;
  .brand{
    position: absolute;
    left: 7px;
    top: 132px;
    width: 93px;
  }
}
.slotGameInfo{
  position: relative;
  width: 100%;
  height: 100%;
  .slotImg{
    width: 150px;
  }
  .gameName{
    position: absolute;
    bottom: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    color:#fff;
    font-size: 13px;
    z-index: 1;
  }
}
</style>
<style lang="scss">
	.transfer_dialog {
		background: rgba(255,255,255,1) !important;
		.el-dialog {
			float: left !important;
			margin: 0 !important;
			border-radius: 0 !important;
			box-shadow: none !important;
		}
		.el-dialog__body {
			width: 100%;
		}
		.el-dialog__title {
			display: none;
		}
		.el-dialog__headerbtn {
			display: block;
			float: right;
			width: 48px;
			height: 48px;
			background: url("/static/img/close.png") 0 0 no-repeat;
			background-size: contain;
			top: 8vw;
			right: 8vw;
			z-index: 100;
		}
		.el-dialog__close {
			display: none;
		}
		.el-dialog__body {
			float: left;
			padding: 0;
		}
		ul {
			margin: 0 auto !important;
			border: 0 !important;
			box-shadow: none !important;
			li:last-child {
				border-right: 2px solid rgba(217,217,217,1) !important;
			}
		}
	}
	/*-- Mobile --*/
	@media screen and (max-width: 750px) {
		.transfer_dialog {
			.el-dialog__headerbtn {
				width: 6.4vw !important;
				height: 6.4vw !important;
			}
			ul {
				li {
					border: 0.26vw solid rgba(217,217,217,1) !important;
				}
				li:last-child {
					border-right: 0.26vw solid rgba(217,217,217,1) !important;
				}
			}
		}
	}
	@media screen and (max-width: 450px) {
		.transfer_dialog {
			ul {
				li {
					border: 1px solid rgba(217,217,217,1) !important;
				}
				li:last-child {
					border-right: 1px solid rgba(217,217,217,1) !important;
				}
			}
		}
	}
  .carousel{
    .el-carousel__container{
      height: 100%;
    }
  }
</style>

