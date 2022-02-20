<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .container-fluid.bg
    .container.py-5
      .row.no-gutters.d-flex.justify-content-center
        .col-12.mt-3.pt-3.mt-md-5.pt-md-5.whiteTableHeader
          .whiteTableTitle
            img(src='/static/ev181207/title_1.png')
      .row.no-gutters.d-flex.justify-content-center
        .col-12.p-4.text-center
          p.heavy 万元锦标赛，谁才是真正的捕鱼王？
          p 2018/12/7 ~ 2018/12/14 活动期间每日捕鱼除了有机会捕到「 幸运锦鲤 」外，赢利最高 
            span.impot 前 5 名 
            |还可获得锦标赛丰厚奖励 ！
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.p-md-5
        .col-12.text-center
          img(src='/static/ev181207/subtitle-1.png')
        .col-12.my-4.datalist
          ul.row.d-flex.justify-content-between.text-center.th
            li.col-3.p-2 条件
            li.col-3.p-2 红利
            li.col-3.p-2 每日名额
            li.col-3.p-2 提款有效流水限制
          ul.row.d-flex.justify-content-between.text-center
            li.col-3.p-2 捕鱼流水达到 200 以上
            li.col-3.p-2 1,888
            li.col-3.p-2 1
            li.col-3.p-2 捕鱼流水 10 倍
        .col-12.text-center
          p.impot ＊＊＊＊ 投注流水愈多，捕获幸运锦鲤的机会愈大哦 ～ ！ ＊＊＊＊
        .col-12.text-center
          .row.my-2.d-flex.justify-content-center
            .col-lg-4.col-md-5.col-12.my-2.mx-3
              a.btn_style(@click.prevent='gotoP1("bet")') 查看流水排行榜
        .col-12.text-center
          img(src='/static/ev181207/subtitle-2.png')
        .col-12.my-4.datalist
          ul.row.d-flex.justify-content-between.text-center.th
            li.col-4.p-2 条件
            li.col-4.p-2 红利
            li.col-4.p-2 提款有效流水限制
          ul.row.d-flex.justify-content-between.text-center
            li.col-4.p-2 活动期间总赢利第一名
            li.col-4.p-2 2,888
            li.col-4.p-2 捕鱼流水 10 倍
          ul.row.d-flex.justify-content-between.text-center
            li.col-4.p-2 当日赢利第一名
            li.col-4.p-2 888
            li.col-4.p-2 捕鱼流水 10 倍
          ul.row.d-flex.justify-content-between.text-center
            li.col-4.p-2 当日赢利第二名
            li.col-4.p-2 588
            li.col-4.p-2 捕鱼流水 10 倍
          ul.row.d-flex.justify-content-between.text-center
            li.col-4.p-2 当日赢利第三名
            li.col-4.p-2 388
            li.col-4.p-2 捕鱼流水 10 倍
          ul.row.d-flex.justify-content-between.text-center
            li.col-4.p-2 当日赢利第 四 ~ 五 名
            li.col-4.p-2 188
            li.col-4.p-2 捕鱼流水 10 倍
        .col-12.text-center
          .row.my-2.d-flex.justify-content-center
            .col-lg-4.col-md-5.col-12.my-2.mx-3
              a.btn_style(@click.prevent='gotoP1("win")') 查看嬴利排行榜
      .row.no-gutters.d-flex.justify-content-center
        .col-12.py-4.whiteTableHeader
          .whiteTableTitle
            img(src='/static/ev181207/title_2.png')
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.p-md-5
        .col-12
          div.text-center
            a.btn_playDay(v-for='(item, index) in 8' v-bind:class="{btn_playDay_act:(clickNum01===index)}" @click='clickNum01 = index, Type2 = "bet", getFishingRankData(index)') {{loginDay(index)}}
        .col-12.my-4.winnerList
          .winnerList_title.text-center
            img(src='/static/ev181207/img-goldenfish.png', alt="alt")
          .winnerList_content.text-center(v-if='BetData.length != 0')
            .wlc_w
              span 恭喜
              span.heavy {{BetData[0].UserName}}
            .wlc_w
              span 流水
              span.heavy {{BetData[0].BetAmount}}
            .wlc_w
              span 获得红利
              span.heavy 1,888
          .winnerList_content.text-center.px-4(v-else)
            span 亲～时间还没到！还来得及快加把劲！
      .row.no-gutters.d-flex.justify-content-center
        .col-12.py-4.whiteTableHeader
          .whiteTableTitle
            img(src='/static/ev181207/title_3.png')
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.p-md-5
        .col-12
          div.text-center
            a.btn_playDay(v-for='(item, index) in 8' v-bind:class="{btn_playDay_act:(clickNum02===index)}" @click='clickNum02 = index, Type2 = "win", getFishingRankData(index)') {{loginDay(index)}}
        .col-12.my-4.datalist(v-if='WinData.length != 0')
          ul.row.d-flex.justify-content-between.text-center.th
            li.col-4.p-2 条件
            li.col-4.p-2 帳號
            li.col-4.p-2 赢利
          ul.row.d-flex.justify-content-between.text-center(v-for='(item, index) in WinData')
            li.col-4.p-2 {{RankWord[index]}}
            li.col-4.p-2 {{item.UserName}}
            li.col-4.p-2 {{item.WinAmount}}
        .col-12.my-4.datalist(v-else)
          ul.row.d-flex.justify-content-between.text-center.th
            li.col-4.p-2 条件
            li.col-4.p-2 帳號
            li.col-4.p-2 赢利
          ul.row.d-flex.justify-content-between.text-center
            li.col-12.py-5.d-flex.flex-column.align-items-center
              span 亲～时间还没到！还来得及快加把劲！
              .row.pt-4.d-flex.justify-content-center
                .col-12
                  a.btn_style(@click.prevent='gotoP1("win")') 查看嬴利排行榜
        .col-12.my-4.datalist(v-if='FishingKingData.length != 0')
          ul.row.d-flex.justify-content-between.text-center.th
            li.col-4.p-2 条件
            li.col-4.p-2 帳號
            li.col-4.p-2 赢利
          ul.row.d-flex.justify-content-between.text-center
            li.col-4.p-2 活动期间总赢利第一名
            li.col-4.p-2 {{FishingKingData.UserName}}
            li.col-4.p-2 {{FishingKingData.WinAmount}}
      .row.no-gutters.d-flex.justify-content-center
        .col-12.py-4.whiteTableHeader
          .whiteTableTitle
            img(src='/static/ev181207/title_4.png')
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.p-md-5
        .col-12.text-left
          div.depiction.p-2.p-md-0
            p.my-2 1、活动期间内符合活动条件资格的会员将于隔日中午 12 点后显示于『 
              a.link_blue(:href='siteHost+"/member/bonus/3"') 领奖中心 
              | 』，请会员于 3 日内（最迟红利领取时间）至『 
              a.link_blue(:href='siteHost+"/member/bonus/3"') 领奖中心 
              | 』，申请，一旦申请即无法取消，逾期未申请将视同放弃。
            p.my-2.impot_orange 2、该红利提款有效流水仅计算MWG、GG平台下的捕鱼游戏并以获得红利后的流水开始做计算。
            p.my-2 3、每位会员每日只能享有一次优惠，且同一住址、电话号码﹑电子邮箱地址、IP（例如网吧，其他公共用计算机）﹑支付方式(相同借记卡/银行帐户姓名及号码)仅适用一次活动优惠，若会员有重复申请（如关联账号）之行为，18老虎城将保留或取消会员优惠红利的权利。
            p.my-2 4、任何会员[个人/团体/组织]以不诚实的方式参与活动，包括对赌、冒充、伪造身份、合谋作弊等参与活动，一经核实将自动取消获奖资格，并不需事先作任何通知。
            p.my-2 5、18老虎城禁止未达18周岁未成年于本网站进行任何投注或兑奖，同时有权收回所有彩金、红利及账户。
            p.my-2 6、18老虎城官方有权在不事先通知会员的情况下，延长，缩短，终止或修改该活动，对本活动拥有最终解释权。
            p.my-2 7、更多18老虎城优惠请随时咨询「在线客服」或查看「 
              a.link_blue(:href='siteHost+"/news"') 18老虎城 
              | 」公告。
  tgFooter
  el-dialog(:visible.sync='loginDialogShow', width='500px', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import tgHeader from '@/views/ev181207/components/tgHeader.vue';
import tgBanner from '@/views/ev181207/components/tgBanner.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/views/ev181207/components/tgFooter.vue';
import router from '../router/router';
import { mapState } from 'vuex';

export default {
  components: {
    tgHeader,
    tgBanner,
    tgFooter,
    tgLogin,
  },
  data() {
    const today = new Date();
    const y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    if (d < 7) {
      d = 7;
    }
    if (m < 10) {
      m = `0${m}`;
    }
    if (d < 10) {
      d = `0${d}`;
    }
    const date_s = `${y}-${m}-${d}`;
    return {
      loginDialogShow: false,
      BetData: [],
      WinData: [],
      FishingKingData: [],
      UpdateAt: '',
      Date: date_s,
      Type1: 'record',
      Type2: 'all',
      RankWord: ['第一名', '第二名', '第三名', '第四名', '第五名', '第六名', '第七名', '第八名', '第九名', '第十名'],
      clickNum01: 0,
      clickNum02: 0,
    };
  },
  mounted() {
    if (this.MemberLogined) {
      this.getFishingRankData();
    }
  },
  watch: {
    MemberLogined(value) {
      console.log(value);
      if (value) {
        this.getFishingRankData();
      }
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
  filters: {
    timeFormat(value) {
      return moment(value).format('YYYY-MM-DD');
    },
  },
  methods: {
    login() {
      this.Logined = true;
    },
    loginDialogHide() {
      console.log('loginDialogHide');
      this.loginDialogShow = false;
    },
    gotoP1(value) {
      if (this.MemberLogined) {
        router.push({ path: '/p1', query: { Type2: value } });
      } else {
        this.loginDialogShow = true;
      }
    },
    loginDay(value, str = ' / ') {
      let time = ''; 
      if (value + 7 < 10) {
        time = `2018-12-0${value + 7}`;
      } else {
        time = `2018-12-${value + 7}`;
      }
      return moment(time).format(`MM${str}DD`);
    },
    getFishingRankData(date = null) {
      if (this.MemberLogined === false) {
        this.loginDialogShow = true;
      } else {
        this.loginDialogShow = false;
      }
      const paylod = {};
      const vm = this;
      paylod.Type1 = 'record';
      paylod.Type2 = this.Type2;
      if (date >= 0) {
        const date1 = `2018-${this.loginDay(date, '-')}`;
        paylod.Date = date1;
      } else {
        paylod.Date = this.Date;
      }
      axios.post(`${process.env.VUE_APP_APIHOST}/Event/GetFishingRank/`, paylod)
        .then((res) => {
          console.log(res);
          vm.UpdateAt = res.data.UpdateAt;
          if (typeof res.data.Bet !== 'undefined') {
            vm.BetData = res.data.Bet;
          }
          if (typeof res.data.Win !== 'undefined') {
            vm.WinData = res.data.Win;
          }
          if (typeof res.data.FishingKing !== 'undefined') {
            vm.FishingKingData = res.data.FishingKing;
          } else {
            vm.FishingKingData = [];
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
  },
};
</script>
<style lang="scss" scoped>

</style>

