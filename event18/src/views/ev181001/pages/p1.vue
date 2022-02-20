<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .container
    .row.mt-5.d-flex.justify-content-center
      .col-10.whiteTableHeader.text-center
        img.tiger(src='/static/ev181001/tiger.png')
    .row.py-5.px-2.mainWrap.d-flex.justify-content-center
      .col-12.text-center.my-3
        img.pb-3(src='/static/ev181001/title_4.png')
        p {{UserName}} 您好，2018/10/01 ～ 2018/10/10 期间打虎纪录 ：
      .col-12.text-center.my-2
        span(v-for='(item, index) in 10',)
          .btn.m-2(v-if='btnDisabled(index)', v-bind:class="{active:(clickNum===index), current:isCurrent(index)}", @click='getPlayData(YYYYMMDD(index),index)')
            span {{playDay(index)}}
          .btn.m-2.disabled(v-else)
            span {{playDay(index)}}
        p 目前打虎成就为 ：{{GameCnt}} 款游戏，可获得悬赏金 ${{Bonus}}
        p 
          span 资料最后更新计算时间为：{{updateTime}}
      .col-md-10.col-11.datalist.p-0
        ul.row.no-gutters.d-flex.justify-content-between.text-center.th
          li.col-3.py-2.px-1 日期
          li.col-3.py-2.px-1 投注游戏
          li.col-3.py-2.px-1 目前投注总流水
          li.col-3.py-2.px-1 到下阶段尚需流水
        ul.row.no-gutters.d-flex.justify-content-between.text-center(v-if='palyData.length<=0')
          li.col-12.py-2.px-1 尚无资料
        ul.row.no-gutters.d-flex.justify-content-between.text-center(v-else, v-for='(item, index) in palyData')
          li.col-3.py-2.px-1 {{item.Create_At | timeFormat}}
          li.col-3.py-2.px-1 {{item.GameName}}
          li.col-3.py-2.px-1 {{item.SumBet}}
          li.col-3.py-2.px-1 {{item.need}}
      p.my-5  (请特别注意记录资料非即时，最终活动资格达成判定以系统记录时间为主。）
      .col-12.text-center
        router-link.evbtn(to='/')
          img.m-2(src='/static/ev181001/btn_3.png')
        a(:href='siteHost+"/member/bonus/3"')
          img.m-2(src='/static/ev181001/btn_2.png')
    .row.mb-5.d-flex.justify-content-center
      .col-10.whiteTableFooter.text-center
  tgFooter
</el-input>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import router from '../router/router';
import tgHeader from '@/views/ev181001/components/tgHeader.vue';
import tgBanner from '@/views/ev181001/components/tgBanner.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/views/ev181001/components/tgFooter.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      Logined: false,
      palyData: [],
      startTime: moment().format('YYYY-MM-DD'),
      updateTime: '',
      GameCnt: '',
      Bonus: '',
      clickNum: null,
      clickTime: null,
    };
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
  watch: {
    MemberLogined(value) {
      if (value) {
        this.getPlayData(this.startTime);
      }
    },
  },
  filters: {
    timeFormat(value) {
      return moment(value).format('YYYY-MM-DD');
    },
  },
  components: {
    tgHeader,
    tgBanner,
    tgFooter,
  },
  methods: {
    login() {
      this.Logined = true;
    },
    YYYYMMDD(value) {
      let time = ''; 
      if (value < 9) {
        time = `2018-10-0${value + 1}`;
      } else {
        time = `2018-10-${value + 1}`;
      }
      return moment(time).format('YYYY-MM-DD');
    },
    playDay(value) {
      let time = ''; 
      if (value < 9) {
        time = `2018-10-0${value + 1}`;
      } else {
        time = `2018-10-${value + 1}`;
      }
      return moment(time).format('MM/DD');
    },
    isCurrent(value) {
      let time = ''; 
      let Class = ''; 
      if (value < 9) {
        time = `2018-10-0${value + 1}`;
      } else {
        time = `2018-10-${value + 1}`;
      }
      if (moment(time).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD')) {
        Class = 'current'; 
      } else {
        Class = '';
      }
      return Class;
    },
    btnDisabled(value) {
      let time = ''; 
      let Class = false; 
      if (value < 9) {
        time = `2018-10-0${value + 1}`;
      } else {
        time = `2018-10-${value + 1}`;
      }
      if (moment(time).format('YYYY-MM-DD') > moment().format('YYYY-MM-DD')) {
        Class = false; 
      } else {
        Class = true;
      }
      return Class;
    },
    getPlayData(time, index) {
      this.clickNum = index;
      const paylod = {};
      const vm = this;
      paylod.UserId = this.UserId;
      paylod.Date = time;
      this.clickTime = time;
      if (moment().format('YYYY-MM-DD') >= moment(time).format('YYYY-MM-DD')) {
        axios.post(`${process.env.VUE_APP_APIHOST}/Event/GetHitTigerAct/`, paylod)
          .then((res) => {
            vm.palyData = res.data.data.palyData;
            vm.GameCnt = res.data.data.actData.GameCnt;
            vm.Bonus = res.data.data.actData.Bonus;
            if (res.data.data.updateTime) {
              vm.updateTime = res.data.data.updateTime;
            } else {
              vm.updateTime = moment().format('YYYY-MM-DD');
            }
          })
          .catch((error) => {
            vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.InviteCode{
  font-size: 32px;
  color: #fff;
}
.copyBtn{
  color: white;
  font-size: 16px;
  background: #2a5298;
  border-radius: 20px;
}
.btn{
  color: #DE220C;
  font-size: 16px;
  line-height: 2;
  border-radius: 20px;
  background: #fff
}
.current{
  color: #fff;
  background: #DE220C
}
.active{
  color: #fff;
  background: #DE220C
}
.disabled {
  color: #ccc;
}
.heavy{
  font-weight: bold !important;;
  color: #2d2d2d !important;
}
</style>

