<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .container-fluid.bg
    .container.pt-5.px-2
      .row.no-gutters.d-flex.justify-content-center.text-center.my-3
        .col-4.d-flex.justify-content-end
          .btn_style01.mr-1
            a.btn_info(href="##eventTime") 活动时间
        .col-4.d-flex.justify-content-center
          .btn_style01.mx-1
            a.btn_info(href="##eventDescription") 活动说明
        .col-4.d-flex.justify-content-start
          .btn_style01.ml-1
            a.btn_info(href="##eventAward") 活动奖项
    .roulette_frame#roulette_frame
      .roulette_cont
        //- .Debug
          span boxAngle: {{ boxAngle }}
          span loopNum: {{ loopNum }}
          span sin: {{ sin }}
          span targetAngle: {{ targetAngle }}
          span
            button(@click='stop') stop
          span
            button(@click='reset') reset
        .roulette_no
          span 剩余次数 {{ initData.active }}
        .roulette_cover
          .roulette_play(@click='getLotteryRoll')
            img(v-if='playSwitch' src='/static/ev181224/roulette_play.png', alt="play")
            img(v-else src='/static/ev181224/roulette_playNo.png', alt="play")
          .roulette
            img(:style="'transform: rotate(' + boxAngle + 'deg)'" src='/static/ev181224/roulette.png', alt="roulette")
            //- img.rotate0(src='/static/ev181224/roulette.png', alt="roulette")
    .container.pb-5.px-2
      .row.no-gutters.d-flex.justify-content-center.text-center
        .col-12.col-md-6.pr-md-2.mb-4.mb-md-0
          .infoWrap.d-flex.flex-column.justify-content-center.align-items-center
            img(src='/static/ev181224/Bell-item-L.png')
            .infoWrap_title 总抽奖次数
            .infoWrap_content
              p 存款金额 ≥ 100：
                span.impot_yellow {{ initData.deposit }} 
                |次
              p 流水达 3,888：
                span.impot_yellow {{ initData.betamount }} 
                |次
              p 投注5元达100次：
                span.impot_yellow {{ initData.betting }} 
                |次
            .btn_style02
              a.btn_info(@click='recordShow') 抽奖纪录
        .col-12.col-md-6.pl-md-2
          .infoWrap
            img(src='/static/ev181224/Bell-item-R.png')
            .infoWrap_title 得奖名单
            .infoWrap_content
              swiper(ref='mySwiper'  :options='swiperOption')
                swiper-slide
                  ul(v-if='recordData.length > 0')
                    li(v-for='(item, index) in recordData.slice(0,5)') 恭喜 
                      span.impot_yellow {{ item.UserName }} 
                      |抽中 
                      span.impot_yellow {{ item.Bonus }}
                swiper-slide(v-if='recordData.length > 5')
                  ul(v-if='recordData.length > 0')
                    li(v-for='(item, index) in recordData.slice(5,10)') 恭喜 
                      span.impot_yellow {{ item.UserName }} 
                      |抽中 
                      span.impot_yellow {{ item.Bonus }}
                //- .swiper-pagination(slot="pagination")
      .row.no-gutters.d-flex.justify-content-center#eventTime
        a(name="#eventTime")
        .col-12.py-4.whiteTableHeader
          .whiteTableTitle
            img(src='/static/ev181224/title-1.png')
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.px-md-5
        .col-12.text-center
          div.depiction.p-2.p-md-0
            p 2018/12/24 11:18~2019/01/04 23:59 (GMT+8)
      .row.no-gutters.d-flex.justify-content-center#eventDescription
        a(name="#eventDescription")
        .col-12.py-4.whiteTableHeader
          .whiteTableTitle
            img(src='/static/ev181224/title-2.png')
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.px-md-5
        .col-12.text-left
          div.depiction.p-2.p-md-0
            p ◆ 活动期间内每笔存款 ≥ 100 以上，每 100 送抽奖 1 次（若存款 888，即赠抽奖 8 次）每日存款最高可获得抽奖次数上限为 10 次（存款计算时间以到帐时间为主）
            p ◆ 活动期间内当日流水达 3888 送抽奖 1 次，每日最多可获得抽奖次数 1 次
            p ◆ 活动期间内当日投注 5元 以上达 100 次送抽奖1次，每日最多可获得抽奖次数 1 次
            p.impot_yellow ＊抽奖次数资料更新为非即时，以完成资格条件当日计算为主，而抽奖次数使用期限为 2019 / 01 / 05 23:59 前
      .row.no-gutters.d-flex.justify-content-center#eventAward
        a(name="#eventAward")
        .col-12.py-4.whiteTableHeader
          .whiteTableTitle
            img(src='/static/ev181224/title-3.png')
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.px-md-5
        .col-12.text-center
          div.depiction.p-2.p-md-0
            p 现金 
              span.impot_yellow 8 
              span ~ 
              span.impot_yellow 8,888 
              span 元
            p 每日首存 
              span.impot_yellow 100%回馈，持续365天
            p
              span.impot_yellow 小米平衡车 
              span 兩台
            p
              span.impot_yellow Apple iPad平板电脑9.7英寸WiFi版128G 
              span 乙台
            p
              span.impot_yellow 联想智能空净器 
              span 乙台
      .row.no-gutters.d-flex.justify-content-center
        .col-12.py-4.whiteTableHeader
          .whiteTableTitle
            img(src='/static/ev181224/title-4.png')
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.px-md-5
        .col-12.text-left
          div.depiction.p-2.p-md-0
            p 1、现金奖项得奖者将于20分钟内显示于『 
              a.link_blue(:href='siteHost+"/member/bonus/3"') 领奖中心 
              | 』，请会员于3日内（最迟红利领取时间）至『 
              a.link_blue(:href='siteHost+"/member/bonus/3"') 领奖中心 
              | 』申请，一旦申请即无法取消，逾期未申请将视同放弃。
            p.impot_yellow 2、现金奖项得奖后1倍流水即可提款，提款有效流水计算仅限于老虎机台游戏(非开放中游戏、非老虎机类游戏、多旋转老虎机、老虎机奖金翻倍投注将不计算在内)。
            p 3、实体奖项得奖者请于于2019/1/7前联系『在线客服』告知客服人员详细信息包含『收货者完整姓名』、『收货者地址』与『收货者电话』，以便快递人员第一时间尽快为您送达，逾期将不受理申请。
            p 4、每位会员每日只能享有一次优惠，且同一住址、电话号码﹑电子邮箱地址、IP（例如网吧，其他公共用计算机）﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请（如关联账号）之行为，18老虎城将保留或取消会员优惠的权利。
            p 5、任何会员[个人/团体/组织]以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，并不需事先作任何通知。
            p 6、18老虎城禁止未达18周岁未成年于本网站进行任何投注或兑奖，同时有权收回所有彩金、红利及账户。
            p 7、18老虎城官方有权在不事先通知会员的情况下，延长，缩短，终止或修改该活动，对本活动拥有最终解释权。
            p 8、更多18老虎城优惠请随时咨询「在线客服」或查看「 
              a.link_blue(:href='siteHost+"/news"') 18老虎城 
              | 」公告。
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', width='90%', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
  el-dialog.recordDialog(:visible.sync='recordDialogShow', width='90%', append-to-body)
    tgRecord(@recordDialogHide='recordDialogHide' :UserData = "this.UserData")
</template>
<script>
import axios from 'axios';
import tgHeader from '@/views/ev181224/components/tgHeader.vue';
import tgBanner from '@/views/ev181224/components/tgBanner.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgRecord from '@/views/ev181224/pages/tgRecord.vue';
import tgFooter from '@/views/ev181224/components/tgFooter.vue';
import router from '../router/router';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import { mapState } from 'vuex';

const { Swiper } = window;
export default {
  name: 'roulette_frame',
  components: {
    tgHeader,
    tgBanner,
    tgFooter,
    tgLogin,
    tgRecord,
    swiper,
    swiperSlide,
  },
  data() {
    return {
      recordData: [],
      UserData: [],
      initData: {
        active: 0,
        deposit: 0,
        betamount: 0,
        betting: 0,
      },
      loginDialogShow: false,
      recordDialogShow: false,
      // Play Roulette
      interval: '',
      boxAngle: 0,
      sin: 1,
      loopNum: 1,
      targetAngle: 45,
      itemGift: {
        1: [1, 90, 180, 270],
        2: [67.5, 157.5, 247.5, 157.5],
        3: [22.5, 202.5, 22.5, 202.5],
        4: [112.5, 112.5, 112.5, 112.5],
      },
      playSwitch: true,
      // Swiper
      swiperOption: {
        notNextTick: true,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        paginationClickable: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
      },
    };
  },
  mounted() {
    if (this.MemberLogined) {
      this.getLotteryInit();
    }
    this.getLotteryRecord();
    this.getLotteryRecordAll();
    this.gotoHash(this.$route);
    // console.log(this)
    // console.log(this.$route)
  },
  watch: {
    MemberLogined(value) {
      console.log(value);
      if (value) {
        this.getLotteryInit();
      }
    },
    $route(value) {
      // console.log('route')
      // console.log(value)
      this.gotoHash(value);
    },
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
    ...mapState('index', [
      'siteHost',
    ]),
  },
  methods: {
    login() {
      this.Logined = true;
    },
    gotoHash(value) {
      // console.log(value)
      const path = value.hash.split('#');
      const Hash = path[1];
      this.titleHash = Hash;
      if (Hash) window.scrollTo(0, (document.getElementById(Hash).offsetTop + 400));
    },
    loginDialogHide() {
      // console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    recordDialogHide() {
      // console.log('recordDialogHide');
      this.recordDialogShow = false;
    },
    recordShow() {
      if (this.MemberLogined) {
        this.recordDialogShow = true;
        this.getLotteryRecord();
      } else {
        this.loginDialogShow = true;
      }
    },
    getLotteryRoll() {
      if (this.MemberLogined === false) {
        this.loginDialogShow = true;
        return false;
      } 
      this.loginDialogShow = false;
      if (this.playSwitch === false) {
        return false;
      }
      this.playSwitch = false;
      const paylod = {};
      const vm = this;
      paylod.UserId = this.UserId;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Event/Lottery_Roll/`, paylod)
        .then((res) => {
          console.log(res);
          if (res.data.status === 0) {
            vm.errorMessage(res.data.error_message);
            vm.playSwitch = true;
          }
          if (res.data.status === 1) {
            vm.play(res.data.data.Bonus);
            vm.initData.active = res.data.other.Active;
            vm.getLotteryInit();
            console.log(res);
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
          vm.playSwitch = true;
        });
    },
    errorMessage(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
      });
    },
    getLotteryRecord() {
      const paylod = {};
      const vm = this;
      if (this.UserId) {
        paylod.UserId = this.UserId;
      }
      axios.post(`${process.env.VUE_APP_APIHOST}/Event/Lottery_Record/`, paylod)
        .then((res) => {
          vm.UserData = res.data.data;
          // console.log(res);
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    getLotteryRecordAll() {
      const paylod = {};
      const vm = this;
      axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/Lottery_Record/`, paylod)
        .then((res) => {
          vm.recordData = res.data.data;
          // console.log(res);
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    getLotteryInit() {
      const paylod = {};
      const vm = this;
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event/Lottery_Init/`, paylod)
        .then((res) => {
          vm.initData = res.data.data;
          // console.log(res);
          // console.log(vm.initData.active);
          // if(vm.initData.active === 0) {
          //   this.playSwitch = false;
          // };
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    // Play Roulette
    play(value) {
      // console.log('play');
      this.sin = 1;
      this.loopNum = 1;
      this.interval = setInterval(this.rotateBox, 100);
      this.targetAngle = this.itemGift[value][Math.floor((Math.random() * 4))];
    },
    stop() {
      clearInterval(this.interval);
    },
    reset() {
      clearInterval(this.interval);
      this.boxAngle = 0;
      this.sin = 1;
      this.loopNum = 1;
    },
    rotateBox() {
      this.loopNum += 0.05;
      if (this.sin < 1) {
        // this.gotoTargetAngle();
        if (Math.abs(this.boxAngle - this.targetAngle) <= 3) {
          clearInterval(this.interval);
          this.playSwitch = true;
        } else {
          this.sin = 0.5;
        }
        this.boxAngle = (this.boxAngle + (this.sin * 9)) % 360;
      } else {
        this.sin = 1.5 * (this.loopNum * Math.sin(this.loopNum));
        this.boxAngle = (this.boxAngle + (this.sin * 9)) % 360;
      }
    },
    gotoTargetAngle() {},
  },
  beforeDestroy() {
    clearInterval(this.interval);
    if (this.swiper) {
      this.swiper.destroy();
      delete this.swiper;
    }
  },
};
</script>
<style lang="scss">
@import '~swiper/dist/css/swiper.css';
// .Debug {
//   width: 90%;
//   margin: 0 auto;
//   padding: 20px;
//   background: rgba(0,0,0,0.75);
//   color: rgba(255,255,255,1);
//   text-align: left;
//   border-radius: 10px;
//   box-sizing: border-box;
//   position: absolute;
//   top: 80px;
//   left: 0;
//   right: 0;
//   z-index: 500;
//   span {
//     display: block;
//     width: 100%;
//     padding: 5px;
//     button {
//       width: 150px;
//       padding: 5px;
//       background: rgba(255,255,255,1);
//       border-radius: 10px;
//     };
//   };
// }
.recordDialog {
  .el-dialog {
    background: url('/static/ev181224/light.png') 50% -8px no-repeat, rgba(74,128,0,1) padding-box;
    color: rgba(255,255,255,1);
    border: 10px solid rgba(147,255,0,0.3);
    border-radius: 50px;
    box-shadow: inset 0 0 20px 10px rgba(255,255,255,0.3);
  };
  .el-dialog__header {
    padding: 0;
  };
  .el-dialog__headerbtn {
    font-size: 30px;
    top: 10px;
    right: 15px;
    .el-dialog__close {
      color: rgba(223,182,97,1);
    };
  };
}
</style>
