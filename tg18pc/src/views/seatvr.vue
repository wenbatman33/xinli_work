<template lang="pug">
  .container-fluid(v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)")
    .VRHeader(v-if='stage==1')
      .VRHead_deco
      .VRHead_bg
      .VRHeadInfo.d-none.d-sm-block.d-none.d-md-block 欢迎光临 老虎城游戏包台大厅
      .HeaderBack_float
        el-button.mx-2.mt-3.btn_red(round='', icon='el-icon-arrow-left' @click='backtoIndex_step1') 回首页
        router-link(to="/seat")
          el-button.float-right.mx-2.mt-3.btn_red(round='') 网页版
      el-dialog(:width='isMobile? "90%" : "40%"',title="温馨提示：", center, :visible.sync='back_index_dialogShow', append-to-body='' )
        div.my-2.text-center
          p 离开包台大厅後，将离开游戏及包台座位。
        div.my-2.text-center
          el-button.my-2(@click='back_index_dialogShow=false') 取 消
          el-button.my-2(type='primary' @click='backtoIndex_step2') 离开，并将余额转回中心钱包
    .VRHeader(v-if='stage==2')
      .VRHead_deco
      .VRHead_bg
      .row.no-gutters
        .col-xs-3.col-sm-2.col-md-2.col-lg-5.HeaderBack
          el-button.mx-2.mt-3.btn_red(round='', icon='el-icon-arrow-left', @click='gotoStage1') 返回包台大厅
        .p-1.col-xs-9.col-sm-10.col-md-10.col-lg-7
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
    .floating(v-if='stage==1')
      div
        span.cashMsg.py-2.px-3(v-if='roomShow') {{currentRoom.UserCashMsg}}
      el-button.btn_blue(v-if='roomShow && currentRoom.UserCashReal>=currentRoom.UserCash', round='', type='primary', @click='gotoStage2') 进入{{currentRoom.GameName}}大厅
      el-button.btn_gray(v-if='roomShow && currentRoom.UserCashReal<currentRoom.UserCash',round='', type='info') 进入本厅钱包总余额需{{currentRoom.UserCash}}元以上
    .floating(v-if='stage==2')
      el-button.btn_gray(v-if='currentTableStatus', round='', type='info')
        span(v-if='currentTableStatus.UserId==UserId') 您已遊玩 {{currentTablePlayedTimeFormat}}
        span(v-else='') 其他玩家已占用 {{currentTablePlayedTimeFormat}}
      el-button.btn_blue(v-if='playBottonShow && !currentTableStatus', round='', type='primary', @click='playGame') 第 {{Number(currentSlotIndex)+1}} 号机台 立即开始
    a-scene
      a-assets(timeout='3000')
        img#slotMC(crossorigin='anonymous', src='/static/img/vr/slot_machine.png')
        img#casinoRoom(crossorigin='anonymous', src='/static/img/vr/CASINO_wide_OK.jpg')
        img#lobby(crossorigin='anonymous', src='/static/img/vr/lobby_wide_OK.jpg')
        img#icons(crossorigin='anonymous', src='/static/img/vr/slotIcons.png')
        img#door(crossorigin='anonymous', src='/static/img/vr/door.png')
        img#slotMCtop(crossorigin='anonymous', src='/static/img/vr/slot_top.png')
        img#bigwin_1(crossorigin='anonymous', src='/static/img/vr/slot_top_bigwin_1.png')
        img#bigwin_2(crossorigin='anonymous', src='/static/img/vr/slot_top_bigwin_2.png')
        img#arrow_left(crossorigin='anonymous', src='/static/img/vr/arrow_left.png')
        img#arrow_right(crossorigin='anonymous', src='/static/img/vr/arrow_right.png')
        img(v-for='(item, index) in gameList', crossorigin='anonymous', :id='"R"+index', :src='item.Images')
        img(v-for='(item, index) in gameList', crossorigin='anonymous', :id='"S"+index', :src='item.Images2')
      a-sky#image-360(v-if='loaded', radius='60', :src='stageBackground')
      a-entity#stage_1(v-if='loaded && stage==1', position='0 -3 0')
        a-entity(v-for='(item, index) in gameList', :id='index', :key='index', :position='doorPosition[Number(index)]', :rotation='doorRotation[Number(index)]', roomclick='')
          a-plane.door(src='#door', width='6', height='8.3', position='6.2 2.5 0', transparent='true')
          a-plane.slot(:src='"#R"+index', rotation='0 0 0', width='5', height='6.2', position='6.2 1.5 -0.2')
          //- a-text(position='6 5.55 0.2', rotation='0 0 0', color='#FADB14', width='10', align='center', :value='"Jackpot: "+item.SumBonus')
          a-plane.background(color='#000', width='5', height='8', position='6.2 2.5 -0.3')
        a-plane.arrow_left(src='#arrow_left', width='2', height='1',rotation='0 -45 0', position='7.9 3 -8.31', transparent='true')
        a-plane.arrow_right(src='#arrow_right', width='2', height='1',rotation='0 -125 0',  position='7.9 3 8', transparent='true')
        a-plane.arrow_right(src='#arrow_right', width='2', height='1',rotation='0 45 0',  position='-10.8 3 -8.31', transparent='true')
        a-plane.arrow_left(src='#arrow_left', width='2', height='1',rotation='0 125 0', position='-10.8 3 8.14', transparent='true')
      a-entity#stage_2(v-if='loaded && stage==2', position='0 -3 0')
        a-entity(v-for='(item, index) in slotMachineList', :key='index', :id='index', :sn='item.Sn', position='0 -1 0', :rotation='"0 "+(0-(Number(index)*30))+" 0"', slotclick='', shadow='')
          a-plane(src='#slotMC', rotation='0 0 0', width='3.2', height='7.5', position='0 3.51 -13.36', transparent='true', shadow='')
          a-text(position='0 0.5 -12', rotation='0 0 0', color='#CB9F79', width='8', align='center', :value='"NO."+(Number(index)+1)')
          a-entity
            a-sphere(color='#FFF', radius='0.05', geometry='radius:0.04', shader='flat', position='0 7.140000000000001 -13.23')
              a-animation(attribute='material.color', from='white', to='#FFD700', dur='800', repeat='indefinite')
            a-sphere(color='#FFF', radius='0.05', geometry='radius:0.04', shader='flat', position='0.9447359630867279 6.777035919299608 -13.23')
              a-animation(attribute='material.color', from='white', to='#FF1493', dur='900', delay='230', repeat='indefinite')
            a-sphere(color='#FFF', radius='0.05', geometry='radius:0.04', shader='flat', position='1.3873052115820417 5.874660209860172 -13.23')
              a-animation(attribute='material.color', from='white', to='#FFE4C4', dur='600', delay='150', repeat='indefinite')
            a-sphere(color='#FFF', radius='0.05', geometry='radius:0.04', shader='flat', position='-0.9494853803859007 6.781161535283683 -13.279527810275223')
              a-animation(attribute='material.color', from='white', to='#7FFF00', dur='600', delay='200', repeat='indefinite')
            a-sphere(color='#FFF', radius='0.05', geometry='radius:0.04', shader='flat', position='-1.3951836916017213 5.8695539105783805 -13.279527810275223')
              a-animation(attribute='material.color', from='white', to='#EE82EE', dur='700', delay='100', repeat='indefinite')
          a-plane.slot(:src='"#S"+currentRoomIndex', rotation='0 0 0', width='3.03', height='1', position='0 2.56 -13.34', transparent='true', shadow='')
          a-plane.background(v-if='tableStatusList[item.Sn].Bonus>0', width='2', height='1.1', position='0 6.2 -13.35', transparent='true')
            a-animation(attribute='material.color', from='#fff', to='#FFFC00', dur='300', repeat='indefinite')
          a-plane.slot(v-if='tableStatusList[item.Sn].Bonus>0', src='#bigwin_1', rotation='0 0 0', width='2.6', height='1.3', position='0 6.45 -13.32', transparent='true', shadow='')
          a-plane.slot(v-else='', src='#slotMCtop', rotation='0 0 0', width='2.6', height='1.3', position='0 6.4 -13.32', transparent='true', shadow='')
          a-entity(position='-.74 4.7 -13.5', rotation='0 0 0', v-if='tableStatusList[item.Sn].Played')
            a-cylinder(position='0 0 0', rotation='0 0 90', radius='.68', height='.75', src='#icons')
              a-animation(easing='linear', attribute='rotation', dur='700', to='360 0 90', repeat='indefinite')
            a-cylinder(position='.75 0 0', rotation='0 0 90', radius='.68', height='.75', src='#icons')
              a-animation(easing='linear', attribute='rotation', dur='530', to='360 0 90', repeat='indefinite')
            a-cylinder(position='1.5 0 0', rotation='0 0 90', radius='.68', height='.75', src='#icons')
              a-animation(easing='linear', attribute='rotation', dur='800', to='360 0 90', repeat='indefinite')
          a-entity(position='-.74 4.7 -13.5', rotation='0 0 0', v-else='')
            a-cylinder(position='0 0 0', rotation='0 0 90', radius='.68', height='.75', src='#icons')
            a-cylinder(position='.75 0 0', rotation='0 0 90', radius='.68', height='.75', src='#icons')
            a-cylinder(position='1.5 0 0', rotation='0 0 90', radius='.68', height='.75', src='#icons')
      a-entity(light='type:hemisphere;color:#fff6d8;groundColor:#8b745a;intensity:0.9', position='0 8 0')
      a-light(light='type:point;color:#f2ffb5;angle:360', intensity='0.2', position='-3.91 6 -16.12')
      a-light(light='type:point;color:#ffe9cd;angle:360', intensity='0.2', position='3.9 6 16.3')
      a-light(light='intensity:0.06;type:ambient;color:#fff;angle:360', intensity='0.1', position='0 1 0')
      a-entity#cameraCursor(v-if='loaded', camera='', look-controls='', touch-controls)
        a-cursor(v-if='playBottonShow', material='color: springgreen')
        a-cursor(v-else='', material='color: black')
    el-dialog(:visible.sync='cashierDialog_3', width='40%', append-to-body)
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
      fullscreenLoading: false,
      cashierDialog_3: false,
      propsWallet: [],
      transType: 1,
      stage: 1,
      isMobile: false,
      stageBackground: '#lobby',
      loaded: false,
      back_index_dialogShow: false,
      doorPosition: [
        '-3 0.95 10.509',
        '-15 1.042 -10.99',
        '4 0.95 10.509',
        '-8 1.042 -10.99',
        '11 0.95 10.509',
        '-1 1.042 -10.99',
      ],
      doorRotation: [
        '0 180 0',
        '0 0 0',
        '0 180 0',
        '0 0 0',
        '0 180 0',
        '0 0 0',
      ],
      gameList: [],
      tableList: [],
      tableStatusList: [],
      slotMachineList: [],
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
    if (this.checkIsMobile()) {
      this.isMobile = true;
    }
  },
  methods: {
    cashierDialog_3_Hide() {
      this.cashierDialog_3 = false;
      this.getVTGameWallet();
    },
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    login() {
      socketForSeat.emit('login', this.UserId);
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
      this.WalletTransferAll(this.currentRoom.GameGroupId, 'VT');
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
    gotoStage1() {
      this.stage = 1;
      this.stageBackground = '#lobby';
      this.playBottonShow = false;
      this.roomShow = false;
      this.heroBoard = [];
      this.loopIsRun = false;
      clearInterval(loop);
    },
    gotoStage2() {
      const vm = this;
      vm.fullscreenLoading = true;
      setTimeout(() => {
        vm.fullscreenLoading = false;
      }, 2000);
      this.stage = 2;
      this.playBottonShow = false;
      this.roomShow = false;
      this.stageBackground = '#casinoRoom';
      this.currentRoom = this.gameList[this.currentRoomIndex];
      // GameMachineWin
      
      const payload = {};
      payload.GameSn = this.currentRoom.GameSn;
      // /上線前要移除
      // payload.StartTime = '20181001';
      // payload.EndTime = '20181210';
      // /上線前要移除
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
    },
    rooms_EnterEvent(index) {
      this.currentRoomIndex = index.target.parentNode.getAttribute('id');
      this.currentRoom = this.gameList[this.currentRoomIndex];
      this.slotMachineList = this.gameList[this.currentRoomIndex].Machine;
      this.roomShow = true;
      this.playBottonShow = true;
      // console.log(index);
    },
    rooms_LeaveEvent(index) {
      this.currentRoomIndex = null;
      // this.currentRoom = null;
      this.slotMachineList = null;
      this.roomShow = false;
      this.playBottonShow = false;
      // console.log(index);
    },
    rooms_ClickEvent(index) {},
    setTableStatusList(arr) {
      const vm = this;
      this.tableList = [];
      this.tableStatusList = [];
      for (let i = 0; i < 200; i += 1) { 
        if (arr.Data[i]) {
          vm.tableStatusList[i] = { Played: true, Bonus: arr.Data[i].Bonus };
        } else {
          vm.tableStatusList[i] = { Played: false, Bonus: 0 };
        }
      }
      this.tableList = arr.Data;
      this.checkStatus();
    },
    checkStatus() {
      this.currentTableStatus = this.tableList[this.currentSlotSn];
      if (this.currentTableStatus) {
        this.currentTablePlayedTime = this.tableList[this.currentSlotSn].TimeStamp;
        if (this.stage === 2 & this.loopIsRun === false) {
          this.loopIsRun = true;
          loop = setInterval(this.checkPlayedTime, 1000);
        }
      }
      this.playBottonShow = true;
    },
    checkPlayedTime() {
      const totolSec = Math.floor((new Date().getTime() - this.currentTablePlayedTime) / 1000);
      const sec = ((totolSec % 60) >= 10) ? totolSec % 60 : `0${(totolSec % 60)}`;
      const min = (Math.floor(totolSec / 60)) >= 10 ? Math.floor((totolSec / 60) % 60) : `0${Math.floor((totolSec / 60) % 60)}`;
      const hour = (Math.floor(totolSec / 3600)) >= 10 ? Math.floor(totolSec / 3600) : `0${Math.floor(totolSec / 3600)}`;
      this.currentTablePlayedTimeFormat = `${hour}:${min}:${sec}`;
    },
    slots_EnterEvent(index, Sn) {
      // / data 資料index /////////////////
      this.currentSlotIndex = index;
      // / 返回的 Sn 當作資料的index /////////////////
      this.currentSlotSn = Sn;
      this.checkStatus();
    },
    slots_LeaveEvent(id) {
      this.currentSlotIndex = null;
      this.currentSlotSn = null;
      this.currentTableStatus = '';
      this.playBottonShow = false;
      // console.log(index);
    },
    slots_ClickEvent(id) {},
    playGame() {
      if (this.VTGAMEBalance <= 0) {
        const Wallet_1 = {
          gameId: 'center',
          gameName: '中心钱包',
          CompanyName: '中心钱包',
          Cash: this.MemberWallet.Cash,
          gameImage: '/static/img/18logo.png',
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
    AFRAMEinit() {
      const vm = this;
      document.querySelector('a-assets').addEventListener('loaded', () => {
        vm.loaded = true;
      });
      document.querySelector('a-scene').addEventListener('loaded', () => {
        vm.loaded = true;
        vm.login();
        vm.init();
        const cameraCursor = document.querySelector('#cameraCursor');
        setTimeout(() => {
          cameraCursor.setAttribute('camera', 'active', true);
        }, 500);
      });
    },
    init() {
      this.fullscreenLoading = false;
      const vm = this;
      window.AFRAME.registerComponent('slotclick', {
        init() {
          this.el.addEventListener('mouseenter', (e) => {
            vm.slots_EnterEvent(this.el.id, this.el.getAttribute('Sn'));
          });
          this.el.addEventListener('mouseleave', vm.slots_LeaveEvent);
          this.el.addEventListener('click', vm.slots_ClickEvent);
        },
        remove() {
          this.el.removeEventListener('mouseenter', vm.slots_EnterEvent);
          this.el.removeEventListener('mouseleave', vm.slots_LeaveEvent);
          this.el.removeEventListener('click', vm.slots_ClickEvent);
        },
      });
      window.AFRAME.registerComponent('roomclick', {
        init() {
          this.el.addEventListener('mouseenter', vm.rooms_EnterEvent);
          this.el.addEventListener('mouseleave', vm.rooms_LeaveEvent);
          this.el.addEventListener('click', vm.rooms_ClickEvent);
        },
        remove() {
          this.el.removeEventListener('mouseenter', vm.rooms_EnterEvent);
          this.el.removeEventListener('mouseleave', vm.rooms_LeaveEvent);
          this.el.removeEventListener('click', vm.rooms_ClickEvent);
        },
      });
      window.document.body.className = '';
      window.document.documentElement.className = '';
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
  },
  beforeDestroy() {
    clearInterval(loop);
  },
  mounted() {
    const vm = this;
    socketForSeat.on('connect', () => {
    });
    socketForSeat.on('tableStatus', (val) => {
      vm.setTableStatusList(val);
    });
    this.fullscreenLoading = true;
    if (this.VRGameViewed) {
      this.$router.go(0);
    } else {
      this.$store.commit('game/setVRGameViewed', true);
    }
    const payload = {};
    payload.Status = 1;
    this.AFRAMEinit();
    this.getVTGameWallet();
    if (this.UserId) {
      let UserPayload = { UserId: this.UserId };
      UserPayload = { Status: 1 };
      this.$store.dispatch('game/API_GameGroup', UserPayload);
    }
    axios.post(`${process.env.VUE_APP_APIHOST}/Web/GameMachine/`, payload)
      .then((res) => {
        vm.gameList = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    window.document.body.className = '';
    window.document.documentElement.className = '';
  },
};
</script>
<style lang='scss' scoped>
.VRHeader{
  position: absolute;
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
    line-height: 1;
    font-size: 12px;
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
.VRHead_bg{
  position: absolute;
  width: 100%;
  height: 20px;
  top: 0;
  z-index: 1;
  background: rgba(0,0,0,.5);
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
  line-height: 60px;
  bottom: 0;
  z-index: 10;
  text-align: center;
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
.carousel{
  height: 80px;
}
.cashMsg {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  color: #fff;
  font-size: 12px;
  user-select: none;
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
<style>
.a-enter-vr{
  display: none ;
}
</style>
