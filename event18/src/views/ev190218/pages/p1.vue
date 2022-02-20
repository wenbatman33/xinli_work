<template lang='pug'>
.container-fluid
  tgBindMessage(v-if='MemberLogined && (bindData.status == 0)')
  tgHeader
  tgBanner
  tgMenu
  .row.no-gutters.main
    //- 第一重
    .col-12.p-2.p-md-5.evPage01
      .row.no-gutters.evHeader.evHeaderBg
        .col-12.evTitle
          img(src='/static/ev190218/title_1.png')
      .evChapter01.text-center
        .evCaption.pt-4.px-2
          p 北京时间 02/25 00 : 00 ~ 03/03 23 : 59 活动期间内，登入会员帐号，完成第一周任务指定平台任务，即可获得红利 !
        .evTable01.pb-4
          ul
            li(v-for='(item, index) in recordData.daily.week2')
              .evComplete(v-if='item.target[0] != 0 || item.target[1] != 0')
                span(v-if='index != 6 && (item.target[0] == 1 || item.target[1] == 1)') 任务完成
                span(v-else-if='index != 6 && (item.target[0] == 2 || item.target[1] == 2)') 您已领取奖励
                span(v-else-if='index == 6 && (item.target[0] == 1 && item.target[1] == 0)') 18新利 任务完成
                span(v-else-if='index == 6 && (item.target[0] == 0 && item.target[1] == 1)') 18老虎城 任务完成
                span(v-else-if='index == 6 && (item.target[0] == 1 && item.target[1] == 1)') 任务完成
                span(v-else-if='index == 6 && (item.target[0] == 2 && (item.target[1] == 0 || item.target[1] == 1))') 您已领取 18新利 奖励
                span(v-else-if='index == 6 && ((item.target[0] == 0 || item.target[0] == 1) && item.target[1] == 2)') 您已领取 18老虎城 奖励
                span(v-else-if='index == 6 && (item.target[0] == 2 && item.target[1] == 2)') 您已领取奖励
                span(v-else) 任务已过期
                button.evCompleteBtn02(v-if='item.target[0] == 3 || item.target[1] == 3' @click='viewRewards(item.type, index)') 查看
                button.evCompleteBtn02(v-else-if='index == 6 && (item.target[0] == 3 && item.target[1] == 3)' @click='viewRewards(item.type, index)') 查看
                button.evCompleteBtn02(v-else @click='viewRewards(item.type, index)') 查看获得奖励
              .evTask
                .evDate()
                  .evDateLuck(v-if='item.type == 1')
                    img(src='/static/ev190218/logo_18Luck.png')
                  .evDateTiger(v-else-if='item.type == 2')
                    img(src='/static/ev190218/logo_18Tiger.png')
                  .evDateMax(v-else)
                    img(src='/static/ev190218/logo_LuckTiger.png')
                  .evDateDay {{ getDate(item.date) }}
                .evBouns
                  .evBounsWord(v-if='item.type == 1') 最高红利
                  .evBounsWord(v-else) 红利
                  .evBounsNo(v-if='item.type == 1') ¥ 1,000
                  .evBounsNo(v-else-if='item.type == 2') ¥ 18
                  .evBounsNo(v-else) ¥ 108 + ¥ 1,000
                //- button.evTaskBtn01(@click='viewRewards(item.type, index)') 确认任务详情
                button.evTaskBtn01(v-if='new Date(recordToday).getTime() >= new Date(item.date).getTime()' @click='viewRewards(item.type, index)') 确认任务详情
                .evTaskWord02(v-else) 尚未发布
        .evCaption.py-4.px-2
          p ※ 期间内每日 23 : 59 前达成每日游戏条件，于次日中午 12 : 00 前即可领取相对应红利 ※
          p ※ 周日双任务仅需择一完成即可，若两个任务都完成，则两个平台红利皆可领取 ※
        button.btn.mb-4(v-if='MemberLogined && (bindData.status == 1)' @click.prevent='memberLoginAll') 您已登录绑定成功
        button.btn.mb-4(v-else @click.prevent='memberLoginAll') 登入查看任务进度
    //- 分隔線
    .col-12.evPageLine
      img(src='/static/ev190218/evPageLine.png')
    //- 第二重
    .col-12.p-2.p-md-5.evPage02
      .row.no-gutters.evHeader
        .col-12.evTitle
          img(v-if='isMobile' src='/static/ev190218/title_2s.png')
          img(v-else src='/static/ev190218/title_2.png')
      .evChapter02.text-center
        .evCaption.pt-4.px-2
          p 依据第一重每日任务达成数，按完成天数可获得下列相应奖励。
        .evTable02.pb-4
          ul.row.no-gutters
            li.col-12.col-lg-4.px-3(v-for='(item, index) in recordData.bonus.week2')
              .evCompleteDays(v-if='index == 5') 完成 
                span 5 
                |天任务
              .evCompleteDays(v-else-if='index == 6') 完成 
                span 6 
                |天任务
              .evCompleteDays(v-else) 完成 
                span 7 
                |天全部任务
              .evTable02Content
                .evComplete(v-if='item[0] != 0 && item[1] != 0')
                  //- span {{ item[0] }} {{ item[1] }}
                  span(v-if='item[0] == 1 && item[1] == 1') 任务完成
                  span(v-else-if='item[0] == 2 && item[1] == 1') 您已领取18新利奖励
                  span(v-else-if='item[0] == 1 && item[1] == 2') 您已领取18老虎城奖励
                  span(v-else-if='item[0] == 2 && item[1] == 2') 您已领取奖励
                  span(v-else) 已超过
                  a.evCompleteBtn02(v-if='item[1] == 1' :href='siteHost+"/member/bonus/3"') 18老虎城领奖
                  a.evCompleteBtn01(v-if='item[0] == 1' href='https://tiger-co-brand.18luckportal.biz/?eventid=78' target='_block') 18新利领奖
                .evTask
                  .evDate
                    .evDateTigerAll
                      img(src='/static/ev190218/logo_18Tiger.png')
                    .evDateLuckAll
                      img(src='/static/ev190218/logo_18Luck.png')
                  .evBouns
                    .evBounsNoAll(v-if='index == 5') ¥ 28 + ¥ 388
                    .evBounsNoAll(v-else-if='index == 6') ¥ 58 + ¥ 588
                    .evBounsNoAll(v-else) ¥ 108 + ¥ 888
                  .evTaskWord01(v-if='item[0] != 0 && item[1] != 0') 达标
                  .evTaskWord02(v-else) 未达标
      .evCaption.text-center.py-4.px-2
        p 此回馈计算时间为周一 00:00 至周日 23:59，依照当周达成任务天数(周日任务两个都完成也算一天)；
        p 奖励将于次周一中午 12 点后可进行领取，18新利Luck 与 18老虎城皆会发放红利，请依各平台红利规则领取。
        //- p ※第一重 ：每日任务计算时间为当天 00 : 00 ~ 23 : 59 截止，隔日将重新计算活动条件。
        //- p ※第一重 ：星期日任务仅需完成其中一种即算完成当天任务。
        //- p ※第二重 ：仅计算当周星期一 00 : 00 至 星期日 23 : 59期间完成之任务数，下个星期一 00 : 00将重新计算。
        //- p ※第二重 ：红利优惠会依照达成天数领取奖励；两个平台都会发放红利，请依各平台红利规则领取。
    //- 分隔線
    .col-12.evPageLine
      img(src='/static/ev190218/evPageLine.png')
    //- 活动条款
    tgNote
  tgFooter
  //- Tiger登入
  el-dialog(v-if='isMobile' :visible.sync='loginDialogShow', width='90%', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
  el-dialog(v-else :visible.sync='loginDialogShow', width='40%', append-to-body)
    tgLogin(@loginDialogHide='loginDialogHide')
  //- Luck綁定
  el-dialog(v-if='isMobile' :visible.sync='luckDialogShow', width='90%', append-to-body)
    tgBindLuck(@luckDialogHide='luckDialogHide', @getBindReback='getBindReback')
  el-dialog(v-else :visible.sync='luckDialogShow', width='40%', append-to-body)
    tgBindLuck(@luckDialogHide='luckDialogHide', @getBindReback='getBindReback')
  //- 任務完成內容
  el-dialog.rewardDialog(v-if='isMobile' :visible.sync='rewardDialogShow', width='90%', append-to-body)
    tgReward(@rewardDialogHide='rewardDialogHide' :propsData = "this.propsData")
  el-dialog.rewardDialog(v-else :visible.sync='rewardDialogShow', width='40%', append-to-body)
    tgReward(@rewardDialogHide='rewardDialogHide' :propsData = "this.propsData")
</template>
<script>
import axios from 'axios';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgBindLuck from '@/views/ev190218/components/tgBindLuck.vue';
import tgBindMessage from '@/views/ev190218/components/tgBindMessage.vue';
import tgHeader from '@/components/tgHeader/tgHeader.vue';
import tgBanner from '@/views/ev190218/components/tgBanner.vue';
import tgMenu from '@/views/ev190218/components/tgMenu.vue';
import tgNote from '@/views/ev190218/components/tgNote.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import tgReward from '@/views/ev190218/components/tgReward.vue';
import router from '../router/router';
import { mapState } from 'vuex';

export default {
  components: {
    tgLogin,
    tgBindLuck,
    tgBindMessage,
    tgHeader,
    tgBanner,
    tgMenu,
    tgNote,
    tgFooter,
    tgReward,
  },
  data() {
    return {
      isMobile: false,
      loginDialogShow: false,
      luckDialogShow: false,
      rewardDialogShow: false,
      bindData: [],
      recordData: {
        daily: {
          // week1: [
          //   { date: '2019-02-11', type: '1', target: ['0', '0'] },
          //   { date: '2019-02-12', type: '2', target: ['0', '0'] },
          //   { date: '2019-02-13', type: '1', target: ['0', '0'] },
          //   { date: '2019-02-14', type: '2', target: ['0', '0'] },
          //   { date: '2019-02-15', type: '1', target: ['0', '0'] },
          //   { date: '2019-02-16', type: '2', target: ['0', '0'] },
          //   { date: '2019-02-17', type: '3', target: ['0', '0'] },
          // ],
          week1: [
            { date: '2019-02-18', type: '1', target: ['0', '0'] },
            { date: '2019-02-19', type: '2', target: ['0', '0'] },
            { date: '2019-02-20', type: '1', target: ['0', '0'] },
            { date: '2019-02-21', type: '2', target: ['0', '0'] },
            { date: '2019-02-22', type: '1', target: ['0', '0'] },
            { date: '2019-02-23', type: '2', target: ['0', '0'] },
            { date: '2019-02-24', type: '3', target: ['0', '0'] },
          ],
          week2: [
            { date: '2019-02-25', type: '1', target: ['0', '0'] },
            { date: '2019-02-26', type: '2', target: ['0', '0'] },
            { date: '2019-02-27', type: '1', target: ['0', '0'] },
            { date: '2019-02-28', type: '2', target: ['0', '0'] },
            { date: '2019-03-01', type: '1', target: ['0', '0'] },
            { date: '2019-03-02', type: '2', target: ['0', '0'] },
            { date: '2019-03-03', type: '3', target: ['0', '0'] },
          ],
        },
        bonus: {
          week1: { 5: ['0', '0'], 6: ['0', '0'], 7: ['0', '0'] },
          week2: { 5: ['0', '0'], 6: ['0', '0'], 7: ['0', '0'] },
        },
      },
      recordToday: new Date(),
      propsData: {},
      rewardTaskWord: [
        '棋牌有效流水达10,000以上。(开元、乐游、VG、美天、双赢)', 
        '于PT平台玩湛蓝深海奖池版，且有效流水达10,000以上。', 
        '棋牌有效流水达10,000以上。(开元、乐游、VG、美天、双赢)', 
        '于PG平台玩横财来啦，且有效流水达10,000以上。', 
        '棋牌有效流水达10,000以上。(开元、乐游、VG、美天、双赢)', 
        '于MG平台玩幸运双星，且有效流水达10,000以上。', 
        {
          MaxTask: '平台任务择一完成。', 
          Tiger: '[18老虎城] 当天存款100(含)以上，并于任意老虎机打满20,000有效流水以上。', 
          LuckTask: '[18新利] 棋牌有效流水达10,000以上。(开元、乐游、VG、美天、双赢)。',
        },
      ],
      rewardTigerWord: [
        ['20,000', '108', '8'], 
        ['10,000', '18', '8'],
      ],
      rewardLuckWord: [
        ['100,000', '1,000', '3'], 
        ['50,000', '500', '3'], 
        ['10,000', '118', '3'],
      ],
      // 18Tiger任務
      taskSiteHost: [
        'https://www.18tiger.net/slot?game=PT', 
        'https://www.18tiger.net/slot?game=PG', 
        'https://www.18tiger.net/slot?game=MG', 
        'https://www.18tiger.net/',
      ],
      taskSiteHostMobile: [
        'https://m.18tiger.net/games/slot?game=PT', 
        'https://m.18tiger.net/games/slot?game=PG', 
        'https://m.18tiger.net/games/slot?game=MG', 
        'https://m.18tiger.net/',
      ],
      // 18Luck領獎
      awardSiteHostOne: [
        'https://tiger-co-brand.18luckportal.biz/?eventid=69', 
        'https://tiger-co-brand.18luckportal.biz/?eventid=70', 
        'https://tiger-co-brand.18luckportal.biz/?eventid=71', 
        'https://tiger-co-brand.18luckportal.biz/?eventid=72',
      ],
      awardSiteHostTwo: [
        'https://tiger-co-brand.18luckportal.biz/?eventid=73', 
        'https://tiger-co-brand.18luckportal.biz/?eventid=74', 
        'https://tiger-co-brand.18luckportal.biz/?eventid=75', 
        'https://tiger-co-brand.18luckportal.biz/?eventid=76',
      ],
    };
  },
  mounted() {
    if (this.MemberLogined) {
      this.getEvBind();
    }
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
    getDate(val) {
      let week;
      const DateNow = new Date(val);
      if (DateNow.getDay() === 0) {
        week = '星期日';
      } else if (DateNow.getDay() === 1) {
        week = '星期一';
      } else if (DateNow.getDay() === 2) {
        week = '星期二';
      } else if (DateNow.getDay() === 3) {
        week = '星期三';
      } else if (DateNow.getDay() === 4) {
        week = '星期四';
      } else if (DateNow.getDay() === 5) {
        week = '星期五';
      } else if (DateNow.getDay() === 6) {
        week = '星期六';
      }
      return `${DateNow.getMonth() + 1}/${DateNow.getDate()} ${week}`;
    },
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    loginDialogHide() {
      this.loginDialogShow = false;
    },
    luckDialogHide() {
      this.luckDialogShow = false;
    },
    rewardDialogHide() {
      if (this.bindData.status === 0) {
        this.rewardDialogShow = false;
        this.luckDialogShow = true;
      } else {
        this.rewardDialogShow = false;
      }
    },
    memberLoginAll() {
      if (this.MemberLogined) {
        if (this.bindData.status === 0) {
          this.luckDialogShow = true;
          // this.errorMessage(this.bindData.error_message);
        } else {
          this.luckDialogShow = false;
          this.message(this.bindData.message);
        }
      } else {
        this.loginDialogShow = true;
      }
    },
    viewRewards(Type, Num) {
      // console.log(Type);
      // console.log(Num);
      this.propsData = {
        Status: this.bindData.status,
        Target: this.recordData.daily.week2[Num].target,
        Type,
        Task: this.rewardTaskWord[Num],
      };
      if (Num % 2 === 0) {
        this.propsData.Luck = this.rewardLuckWord;
      } else {
        this.propsData.Luck = 1;
      }
      if (Num % 2 !== 0) {
        this.propsData.Tiger = this.rewardTigerWord[1];
      } else if (Num === 6) {
        this.propsData.Tiger = this.rewardTigerWord[0];
      } else {
        this.propsData.Tiger = 2;
      }
      if (Num === 1) {
        if (this.isMobile) {
          this.propsData.TaskSite = this.taskSiteHostMobile[0];
        } else {
          this.propsData.TaskSite = this.taskSiteHost[0];
        }
      } else if (Num === 3) {
        if (this.isMobile) {
          this.propsData.TaskSite = this.taskSiteHostMobile[1];
        } else {
          this.propsData.TaskSite = this.taskSiteHost[1];
        }
      } else if (Num === 5) {
        if (this.isMobile) {
          this.propsData.TaskSite = this.taskSiteHostMobile[2];
        } else {
          this.propsData.TaskSite = this.taskSiteHost[2];
        }
      } else if (Num === 6) {
        if (this.isMobile) {
          this.propsData.TaskSite = this.taskSiteHostMobile[3];
        } else {
          this.propsData.TaskSite = this.taskSiteHost[3];
        }
      }
      if (Num === 0) {
        this.propsData.AwardSite = this.awardSiteHostTwo[0];
      } else if (Num === 2) {
        this.propsData.AwardSite = this.awardSiteHostTwo[1];
      } else if (Num === 4) {
        this.propsData.AwardSite = this.awardSiteHostTwo[2];
      } else if (Num === 6) {
        this.propsData.AwardSite = this.awardSiteHostTwo[3];
      }
      // console.log(this.propsData.TaskSite);
      // console.log(this.propsData.AwardSite);
      this.rewardDialogShow = true;
    },
    getBindReback(success) {
      console.log(success);
      if (success) {
        this.bindData.status = 1;
        this.bindData.message = '帐号已绑定';
        this.getEvRecord();
      }
    },
    getEvBind() {
      const payload = {};
      const vm = this;
      payload.UserId = this.UserId;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Event/Event021_Bind/`, payload)
        .then((res) => {
          // console.log(res);
          if (res.data.status === 0) {
            vm.errorMessage(res.data.error_message);
            vm.bindData = res.data;
            // this.luckDialogShow = true;
          } else {
            // vm.message(res.data.message);
            vm.bindData = res.data;
            this.getEvRecord();
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    getEvRecord() {
      const payload = {};
      const vm = this;
      payload.UserId = this.UserId;
      return axios.post(`${process.env.VUE_APP_APIHOST}/Event/Event021_Record/`, payload)
        .then((res) => {
          // console.log(res);
          if (res.data.status === 0) {
            vm.errorMessage(res.data.error_message);
          } else {
            vm.recordData = res.data.data;
            vm.recordToday = res.data.other.Today;
          }
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    errorMessage(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'error',
      });
    },
    message(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'success',
      });
    },
  },
  created() {
    if (this.checkIsMobile()) {
      this.isMobile = true;
    }
  },
};
</script>
<style lang="scss" scoped>
</style>
