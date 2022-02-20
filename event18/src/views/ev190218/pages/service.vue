<template lang='pug'>
.container-fluid
  tgServiceHeader
  .row.no-gutters.p-2.p-md-5.search
    .col-12.search_title
      span 客服查詢 
      |/ 
      span 新利x老虎城联名巨献 新春任务送彩金
    .col-12.col-xl-2.pt-4
      el-radio-group.radio_btn(v-model='TigerRadio')
        el-radio-button(v-model="member18Form.UserName" label="Tiger") 18老虎城
        el-radio-button(v-model="memberLuckForm.LuckUserName" label="Luck") 18新利
    .col-12.col-xl-6.pt-4
      el-form.row.no-gutters(v-if='TigerRadio == "Tiger"' :model="member18Form" ref="member18Form" @keyup.enter.native='getEvRecord')
        el-form-item.col-12.col-md-8.my-md-0(prop="UserName")
          el-input(type="text" v-model="member18Form.UserName" auto-complete="off" placeholder="请输入18老虎城用户名")
        el-form-item.col-12.col-md-3.mx-md-3.my-md-0
          button.search_btn(@click.prevent="getEvRecord" type="button" size='medium')
            span 查 询
      el-form.row.no-gutters(v-else :model="memberLuckForm" ref="memberLuckForm" @keyup.enter.native='getEvRecord')
        el-form-item.con-12.col-md-8.my-md-0(prop="LuckUserName")
          el-input(type="LuckUserName" v-model="memberLuckForm.LuckUserName" auto-complete="off" placeholder="请输入18新利用户名")
        el-form-item.col-12.col-md-3.mx-md-3.my-md-0
          button.search_btn(@click.prevent="getEvRecord" type="button" size='medium')
            span 查 询
  tgMenuService
  .row.no-gutters.main
    //- 第一重
    .col-12.p-2.p-md-5.evPage01
      .row.no-gutters.evHeader.evHeaderBg
        .col-12.evTitle
          img(src='/static/ev190218/title_1.png')
      .evChapter01.text-center
        .evCaption.pt-4.px-2
          p 北京时间 02/18 00 : 00 ~ 02/24 23 : 59 活动期间内，登入会员帐号，完成第一周任务指定平台任务，即可获得红利 !
        .evTable01.pb-4
          ul
            li(v-for='(item, index) in recordData.daily.week1')
              .evComplete(v-if='item.target[0] != 0 || item.target[1] != 0')
                span(v-if='index != 6 && (item.target[0] == 1 || item.target[1] == 1)') 任务完成
                span(v-else-if='index != 6 && (item.target[0] == 2 || item.target[1] == 2)') 已领取奖励
                span(v-else-if='index == 6 && (item.target[0] == 1 && item.target[1] == 0)') 18新利 任务完成
                span(v-else-if='index == 6 && (item.target[0] == 0 && item.target[1] == 1)') 18老虎城 任务完成
                span(v-else-if='index == 6 && (item.target[0] == 1 && item.target[1] == 1)') 任务完成
                span(v-else-if='index == 6 && (item.target[0] == 2 && (item.target[1] == 0 || item.target[1] == 1))') 您已领取 18新利 奖励
                span(v-else-if='index == 6 && ((item.target[0] == 0 || item.target[0] == 1) && item.target[1] == 2)') 您已领取 18老虎城 奖励
                span(v-else-if='index == 6 && (item.target[0] == 2 && item.target[1] == 2)') 已领取奖励
                span(v-else) 任务已过期
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
                .evTaskWord01(v-if='new Date(recordToday).getTime() >= new Date(item.date).getTime()') 任务发布
                .evTaskWord02(v-else) 尚未发布
        .evCaption.py-4.px-2
          p ※ 期间内每日 23 : 59 前达成每日游戏条件，于次日中午 12 : 00 前即可领取相对应红利 ※
          p ※ 周日双任务仅需择一完成即可，若两个任务都完成，则两个平台红利皆可领取 ※
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
            li.col-12.col-lg-4.px-3(v-for='(item, index) in recordData.bonus.week1')
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
                .evComplete.d-flex.flex-column.justify-content-center(v-if='item[0] != 0 && item[1] != 0')
                  span(v-if='item[0] == 1 && item[1] == 1') 任务完成
                  span(v-else-if='item[0] == 2 && item[1] == 1') 已领取18新利奖励
                  span(v-else-if='item[0] == 1 && item[1] == 2') 已领取18老虎城奖励
                  span(v-else-if='item[0] == 2 && item[1] == 2') 已领取奖励
                  span(v-else) 已超过
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
        p 奖励将于次周一中午 12 点后可进行领取，新利18Luck 与 18老虎城皆会发放红利，请依各平台红利规则领取。
  tgFooter
</template>
<script>
import axios from 'axios';
import tgServiceHeader from '@/views/ev190218//components/tgServiceHeader.vue';
import tgMenuService from '@/views/ev190218/components/tgMenuService.vue';
import tgFooter from '@/components/tgFooter/tgFooter.vue';
import router from '../router/router';
import { mapState } from 'vuex';

export default {
  components: {
    tgServiceHeader,
    tgMenuService,
    tgFooter,
  },
  data() {
    return {
      isMobile: false,
      TigerRadio: 'Tiger',
      member18Form: {
        UserName: '',
      },
      memberLuckForm: {
        LuckUserName: '',
      },
      recordData: {
        daily: {
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
    };
  },
  mounted() {
    // this.getEvRecord();
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
    switchAccount() {
      this.recordData = {
        daily: {
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
      };
    },
    getEvRecord() {
      // console.log(this.TigerRadio);
      let payload = {};
      const vm = this;
      (this.TigerRadio === 'Tiger') ? payload = this.member18Form : payload = this.memberLuckForm;
      // console.log(payload);
      return axios.post(`${process.env.VUE_APP_APIHOST}/Web_Page/Event021_Record/`, payload)
        .then((res) => {
          // console.log(res);
          if (res.data.status === 0) {
            vm.errorMessage(res.data.error_message);
            this.switchAccount();
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
<style lang="scss">
.radio_btn {
  .el-radio-button__orig-radio:checked+.el-radio-button__inner {
    background: rgba(162,0,8,1);
    border-color: rgba(162,0,8,1);
    box-shadow: -1px 0 0 0 rgba(162,0,8,1);
  };
}
</style>
