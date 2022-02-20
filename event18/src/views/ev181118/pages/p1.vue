<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .container
    .row.my-md-5.my-4.d-flex.justify-content-center
      .col-md-10.col-11.whiteTableHeader.text-center
        .whiteTableTitle
          img.my-1(src='/static/ev181118/title_3.svg')
    .row.no-gutters.py-md-5.py-4.mainWrap.d-flex.justify-content-center
      .col-md-10.col-11
        .row.no-gutters.d-flex.justify-content-start.text-center
          .col-md-6.col-12.text-md-left.text-center.my-2
            p {{UserName}} 您好，您登录天数总计为 {{LoginCnt}} 天
          //- .col-md-6.col-12.my-2
            .row.no-gutters.d-flex.justify-content-end
              .col-md-9.col-12.text-md-right.text-center.pb-md-0.pb-3
                p 目前可补登的余额： ¥ {{Quota}}
              .col-md-3.col-12.pl-2.text-center
                a.btn_makeup(@click='makeUpLogin' v-if='LoginCnt < 17') 进行补登
                a.btn_nomakeup(v-else) 进行补登
      .col-md-10.col-11.my-3.datalist
        .row.no-gutters.d-flex.justify-content-start.text-center
          ul.col-md-2.col-3(v-for='(item, index) in 17')
            li.row.no-gutters
              .col-12.py-2.th {{loginDay(index)}}
              .col-12.py-2.px-2(v-if="loginStatus(index) == 0")
                img(src='/static/ev181118/pic-TigerDefault.svg')
              .col-12.py-2.px-2(v-else-if="loginStatus(index) == 1")
                img(src='/static/ev181118/pic-TigerGet.svg')
              .col-12.py-2.px-2(v-else-if="loginStatus(index) == 2")
                img(src='/static/ev181118/pic-Finish.svg')
              .col-12.py-2.px-2(v-else)
                img(src='/static/ev181118/pic-TigerDefault.svg')
          ul.col-md-2.col-3
            li.row.no-gutters
              .col-12.py-2.th 11 / 18
              .col-12.py-2.px-2
                div.d-flex.align-items-center(style='height:68px;')
                  img(src='/static/img/logo.svg')
      .col-12.text-center
        .row.no-gutters.my-3.d-flex.justify-content-center
          .col-lg-3.col-md-3.col-10.my-2.mx-3
            router-link.btn_style(to="/") 回活动说明页
          //- .col-lg-3.col-md-3.col-10.my-2.mx-3
            a.btn_style(:href='siteHost+"/member/cashier/1"') 立马前往存款
          .col-lg-3.col-md-3.col-10.my-2.mx-3
            a.btn_style(:href='siteHost+"/member/bonus/3"') 我要申请回馈
    .row.my-md-5.my-4.d-flex.justify-content-center
      .col-md-10.col-11.whiteTableHeader.text-center
        .whiteTableTitle
          img.my-1(src='/static/ev181118/title_4.svg')
    .row.no-gutters.py-md-5.py-4.mb-5.mainWrap.d-flex.justify-content-center
      .col-12.text-center.my-2
        p 2018/11/01 ～ 2018/11/17 期间登录纪录 ：
      .col-md-10.col-11.datalist.p-0
        ul.row.no-gutters.d-flex.justify-content-between.text-center.th
          li.col-3.py-2.px-1 编号
          li.col-9.py-2.px-1 登录时间
        ul.row.no-gutters.d-flex.justify-content-between.text-center(v-if='LoginList.length<=0')
          li.col-12.py-2.px-1 尚无资料
        ul.row.no-gutters.d-flex.justify-content-between.text-center(v-else, v-for='(time, index) in LoginList')
          li.col-3.py-2.px-1 {{index + 1}}
          li.col-9.py-2.px-1 {{time}}
  tgFooter
</el-input>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import router from '../router/router';
import tgHeader from '@/views/ev181118/components/tgHeader.vue';
import tgBanner from '@/views/ev181118/components/tgBanner.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/views/ev181118/components/tgFooter.vue';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      Logined: false,
      LoginList: '',
      ShowList: '',
      LoginCnt: '',
      Quota: '',
    };
  },
  mounted() {
    if (this.MemberLogined) {
      this.getLoginData();
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
  watch: {
    MemberLogined(value) {
      if (value) {
        this.getLoginData();
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
        time = `2018-11-0${value + 1}`;
      } else {
        time = `2018-11-${value + 1}`;
      }
      return moment(time).format('YYYY-MM-DD');
    },
    loginDay(value) {
      let time = ''; 
      if (value < 9) {
        time = `2018-11-0${value + 1}`;
      } else {
        time = `2018-11-${value + 1}`;
      }
      return moment(time).format('MM / DD');
    },
    loginStatus(value) {
      let time = ''; 
      if (value < 9) {
        time = `2018-11-0${value + 1}`;
      } else {
        time = `2018-11-${value + 1}`;
      }
      return this.ShowList[moment(time).format('YYYY-MM-DD')];
    },
    getLoginData() {
      const paylod = {};
      const vm = this;
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event/Get18HitTigerAct/`, paylod)
        .then((res) => {
          vm.LoginList = res.data.data.LoginList;
          vm.ShowList = res.data.data.ShowList;
          vm.LoginCnt = res.data.data.LoginCnt;
          vm.Quota = res.data.data.Quota;
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
    makeUpLogin() {
      const paylod = {};
      const vm = this;
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event/MakeUp18HitTiger/`, paylod)
        .then((res) => {
          if (res.data.status === 1) {
            this.getLoginData();
          } else {
            vm.$message.error(res.data.error_message);
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

