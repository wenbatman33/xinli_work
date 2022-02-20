<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  .container-fluid.bg
    .container.py-5
      .row.no-gutters.d-flex.justify-content-center
        .col-12.mt-3.pt-3.mt-md-5.pt-md-5.whiteTableHeader
          .whiteTableTitle(v-if="Type2 == 'bet'")
            img(src='/static/ev181207/subtitle-3.png')
          .whiteTableTitle(v-if="Type2 == 'win'")
            img(src='/static/ev181207/subtitle-4.png')
      .row.no-gutters.d-flex.justify-content-center.mainWrap.p-3.p-md-5
        .col-12.my-4.datalist
          ul.row.d-flex.justify-content-between.text-center.th
            li.col-4.p-2 排名
            li.col-4.p-2 帳號
            li.col-4.p-2(v-if="Type2 == 'bet'") 目前流水
            li.col-4.p-2(v-if="Type2 == 'win'") 目前赢利
          ul.row.d-flex.justify-content-between.text-center(v-if="Type2 == 'bet'" v-for="(item, index) in BetData")
            li.col-4.p-2
              .row.no-gutters
                .col-12.col-md-4.col-lg-5.text-center.text-md-right
                  img(v-if="index == 0" src='/static/ev181207/img-crown-1.png')
                  img(v-else-if="index == 1" src='/static/ev181207/img-crown-2.png')
                  img(v-else-if="index == 2" src='/static/ev181207/img-crown-3.png')
                  img(v-else-if="index == 3" src='/static/ev181207/img-crown-4.png')
                  img(v-else-if="index == 4" src='/static/ev181207/img-crown-5.png')
                .col-12.col-md-8.col-lg-7.text-center.text-md-left
                  span.px-md-3 {{RankWord[index]}}
            li.col-4.p-2 {{item.UserName}}
            li.col-4.p-2 {{item.BetAmount}}
          ul.row.d-flex.justify-content-between.text-center(v-if="Type2 == 'win'" v-for="(item, index) in WinData")
            li.col-4.p-2
              .row.no-gutters
                .col
                  img(v-if="index == 0" src='/static/ev181207/img-crown-1.png')
                  img(v-else-if="index == 1" src='/static/ev181207/img-crown-2.png')
                  img(v-else-if="index == 2" src='/static/ev181207/img-crown-3.png')
                  img(v-else-if="index == 3" src='/static/ev181207/img-crown-4.png')
                  img(v-else-if="index == 4" src='/static/ev181207/img-crown-5.png')
                  span.ml-3 {{RankWord[index]}}
            li.col-4.p-2 {{item.UserName}}
            li.col-4.p-2 {{item.WinAmount}}
        .col-12.text-center
          p.impot ＊＊＊＊ 資料更新時間：{{UpdateAt}} ＊＊＊＊
        .col-12.text-center
          .row.my-2.d-flex.justify-content-center
            .col-lg-4.col-md-5.col-12.my-2.mx-3
              router-link.btn_style(to="/") 回活动首页
  tgFooter
</el-input>
</template>
<script>
import axios from 'axios';
import moment from 'moment';
import router from '../router/router';
import tgHeader from '@/views/ev181207/components/tgHeader.vue';
import tgBanner from '@/views/ev181207/components/tgBanner.vue';
import tgLogin from '@/components/tgLogin/tgLogin.vue';
import tgFooter from '@/views/ev181207/components/tgFooter.vue';
import { mapState } from 'vuex';

export default {
  components: {
    tgHeader,
    tgBanner,
    tgFooter,
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
      Logined: false,
      BetData: '',
      WinData: '',
      UpdateAt: '',
      Date: date_s,
      Type2: '',
      RankWord: ['当前第一名', '当前第二名', '当前第三名', '当前第四名', '当前第五名', '当前第六名', '当前第七名', '当前第八名', '当前第九名', '当前第十名'],
    };
  },
  mounted() {
    if (this.MemberLogined) {
      this.Type2 = this.$route.query.Type2;
      this.getFishingRankData();
    }
  },
  computed: {
    ...mapState('member', [
      'MemberLogined',
    ]),
    // ...mapState('index', [
    //   'siteHost',
    // ]),
  },
  watch: {
    MemberLogined(value) {
      if (value) {
        this.getFishingRankData();
      }
    },
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
    getFishingRankData() {
      const paylod = {};
      const vm = this;
      paylod.Date = this.Date;
      paylod.Type1 = 'search';
      paylod.Type2 = this.Type2;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event/GetFishingRank/`, paylod)
        .then((res) => {
          vm.UpdateAt = res.data.UpdateAt;
          vm.BetData = res.data.Bet;
          vm.WinData = res.data.Win;
          console.log(res);
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

