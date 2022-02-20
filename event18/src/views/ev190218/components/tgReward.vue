<template lang='pug'>
  .container-fluid
    .row.no-gutters.d-flex.justify-content-center
      .evTask
        .evDate
          .rewardLuck(v-if='propsData.Type == 1')
            img(src='/static/ev190218/logo_18Luck.png')
          .rewardTiger(v-else-if='propsData.Type == 2')
            img(src='/static/ev190218/logo_18Tiger.png')
          .rewardMax(v-else)
            img(src='/static/ev190218/logo_LuckTiger.png')
      .col-12.rewardTitle 任务内容
      .col-12(v-if='propsData.Type == 1 || propsData.Type == 2')
        span {{ propsData.Task }}
      .col-12(v-else)
        p {{ propsData.Task.MaxTask }}
        p {{ propsData.Task.Tiger }}
        p {{ propsData.Task.LuckTask }}
      .col-12.rewardTitle 达成奖励
      //- 18老虎城达成奖励
      .col-12.datalist(v-if='propsData.Tiger != 2')
        ul.row.d-flex.justify-content-between.text-left
          li.col-12 [18老虎城]
        ul.row.d-flex.justify-content-between.text-center.th
          li.col-4 累计有效流水
          li.col-4 回馈红利
          li.col-4 提款要求流水
        ul.row.d-flex.justify-content-between.text-center
          li.col-4 达 {{ propsData.Tiger[0] }}
          li.col-4 {{ propsData.Tiger[1] }}
          li.col-4 {{ propsData.Tiger[2] }} 倍
      .col-12
        br
      //- 18新利达成奖励
      .col-12.datalist(v-if='propsData.Luck != 1')
        ul.row.d-flex.justify-content-between.text-left
          li.col-12 [18新利]
        ul.row.d-flex.justify-content-between.text-center.th
          li.col-4 累计有效流水
          li.col-4 回馈红利
          li.col-4 提款要求流水
        ul.row.d-flex.justify-content-between.text-center(v-for='(item, index) in propsData.Luck')
          li.col-4 达 {{ item[0] }}
          li.col-4 {{ item[1] }}
          li.col-4 {{ item[2] }} 倍

      .col-12.d-flex.justify-content-center(v-if='MemberLogined && (propsData.Type == 1)')
        .btn.my-4.mx-3(v-if='propsData.Target[0] == 0' @click.prevent='goLuckTaskSite') 前往 18新利 进行任务
        .btn.my-4.mx-3(v-else-if='propsData.Target[0] == 1' @click.prevent='goLuckAwardSite') 18新利 领奖

      .col-12.d-flex.justify-content-center(v-if='MemberLogined && (propsData.Type == 2)')
        .btn.my-4.mx-3(v-if='propsData.Target[1] == 0' @click.prevent='goTigerTaskSite') 前往 18老虎城 进行任务
        .btn.my-4.mx-3(v-else-if='propsData.Target[1] == 1' @click.prevent='goTigerAwardSite') 18老虎城 领奖

      .col-12.row.d-flex.justify-content-center(v-if='MemberLogined && (propsData.Type == 3)')
        .btn.col-md-7.mt-4.my-md-4.mx-1(v-if='propsData.Target[0] == 0' @click.prevent='goLuckTaskSite') 前往 18新利 进行任务
        .btn.col-md-4.mt-4.my-md-4.mx-1(v-else-if='propsData.Target[0] == 1' @click.prevent='goLuckAwardSite') 18新利 领奖
        .btn.col-md-7.mt-4.my-md-4.mx-1(v-if='propsData.Target[1] == 0' @click.prevent='goTigerTaskSite') 前往 18老虎城 进行任务
        .btn.col-md-4.mt-4.my-md-4.mx-1(v-else-if='propsData.Target[1] == 1' @click.prevent='goTigerAwardSite') 18老虎城 领奖

      //- .col-12.d-flex.justify-content-center
        button.btn.my-3(@click='viewLog') viewLog
</template>

<script>
import axios from 'axios';
import router from '../router/router';
import { mapState } from 'vuex';

export default {
  props: ['propsData'],
  data() {
    return {
      isMobile: false,
    };
  },
  mounted() {
    // console.log(this.propsData);
    // console.log(this.propsData.Status);
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
    checkIsMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
      return flag;
    },
    // Tiger 任務
    goTigerTaskSite() {
      if (this.propsData.Status === 0) {
        this.$emit('rewardDialogHide');
      } else {
        // 原視窗開
        // window.location.href = this.propsData.TaskSite;
        // 另開視窗
        window.open(this.propsData.TaskSite);
      }
    },
    // Tiger 領獎
    goTigerAwardSite() {
      if (this.propsData.Status === 0) {
        this.$emit('rewardDialogHide');
      } else {
        window.open(`${this.siteHost}/member/bonus/3`);
      }
    },
    // Luck 任務
    goLuckTaskSite() {
      if (this.propsData.Status === 0) {
        this.$emit('rewardDialogHide');
      } else if (this.isMobile) {
        window.open('https://m.xl18.org/');
      } else {
        window.open('https://www.xl18.org/zh-cn/');
      }
    },
    // Luck 領獎
    goLuckAwardSite() {
      if (this.propsData.Status === 0) {
        this.$emit('rewardDialogHide');
      } else {
        window.open(this.propsData.AwardSite);
      }
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
