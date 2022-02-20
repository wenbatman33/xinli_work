<template lang='pug'>
.container-fluid
  tgHeader
  tgBanner
  tgMenu
  .row.no-gutters.content.py-3
    .col.px-lg-5.py-md-5.px-2.py-2
      .row.no-gutters.eventpage.px-3.py-3.d-flex.flex-column.justify-content-center.text-center
        .col-12.eventtitl.py-md-5.py-3
          ||
          span.px-3 吃机金清单
          ||
        .col-12.eventcaption.pt-md-0.pt-2
          p {{UserName}} 您好，您可申请吃机金清单 ：
        .col-12.eventcontent.py-md-4.py-2
          .row.no-gutters.d-flex.justify-content-center
            .col-md-7.col-12.datalist
              el-table.userTable(:data='tableData', border='', style='width: 100%; background-color:transparent !important; color:#fff;')
                el-table-column(prop='Create_At', label='日期', align='center')
                el-table-column(prop='UserName', label='受邀者', align='center')
                el-table-column(prop='Bonus', label='吃机金', align='center')
            .col-md-7.col-12.my-2.text-right
              el-pagination(@size-change='getList'
                            @current-change='getList'
                            :current-page.sync='Page'
                            :page-size='PageLimit'
                            :total='total_rows'
                            layout='total, prev, pager, next')
        .col-12.pb-md-5.py-3
          a(:href='siteHost+"/member/bonus/1"')
            button.btn.px-4.py-2(type='button') 确认领奖状态
  .row.no-gutters.notes.py-md-5.py-2.px-3.d-flex.flex-column.justify-content-center.text-center
    .col-12.py-5
      span.notestitle 温馨小贴士
    .col-md-8.offset-md-2.col-12.pb-4.pl-3.text-left
      ol
        li 请于 2018/10/1 前确认您的可申请清单并进行申请，申请后将于1小时内自动派发到用户中心钱包。一旦申请即无法取消，逾期未申请将视同放弃。
        li 每位受邀好友用户仅可申请一次活动吃机金，但邀请者可获得不同受邀好友的活动吃机金回馈。
  tgFooter
</template>
<script>
import axios from 'axios';
import router from '../router/router';
import tgHeader from '@/views/moon18/components/tgHeader.vue';
import tgBanner from '@/views/moon18/components/tgBanner.vue';
import tgMenu from '@/views/moon18/components/tgMenu.vue';
import tgFooter from '@/views/moon18/components/tgFooter.vue';
import { mapState } from 'vuex';

export default {
  components: {
    tgHeader,
    tgBanner,
    tgMenu,
    tgFooter,
  },
  data() {
    return {
      Logined: false,
      InviteCode: '',
      tableData: [],
      Page: 1,
      PageLimit: 30,
      total_rows: 0,
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
      if (value === true) {
        this.getList();
      }
    },
  },
  methods: {
    getList() {
      console.log('getList');
      const paylod = {};
      const vm = this;
      paylod.Page = this.Page;
      paylod.PageLimit = this.PageLimit;
      paylod.UserId = this.UserId;
      axios.post(`${process.env.VUE_APP_APIHOST}/Event001/GetFriendList`, paylod)
        .then((res) => {
          vm.tableData = res.data.data.data_list;
          vm.total_rows = Number(res.data.data.total_rows);
          console.log(res);
        })
        .catch((error) => {
          vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
        });
    },
  },
  mounted() {
    if (this.MemberLogined === true) {
      this.getList();
    }
  },
};
</script>
<style lang='scss'>
.el-table tr,
.el-table th,
.cell {
  background-color: transparent !important;
}
.el-table th{
  color: #fff;
  background: rgba(217, 217, 217, 0.1) !important;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
  background-color: transparent !important;
}
.el-pagination__total{
  color: #fff !important;
}
.el-pagination button{
  background-color: transparent !important;
}
.el-pager li {
  color: #fff !important;
  background-color: transparent !important;
}
</style>

