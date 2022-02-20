<template lang='pug'>
.container-fluid
  .container
    .row.no-gutters.d-flex.justify-content-center
      .col-12.mt-4.mb-2.datalist
        ul.row.d-flex.justify-content-between.text-center.th
          li.col-5.py-2.px-1 日期
          li.col-3.py-2.px-1 时间
          li.col-4.py-2.px-1 奖项
        ul.row.d-flex.justify-content-between.text-center(v-for='(item, index) in UserData')
          li.col-5.py-2.px-1 {{ item.Date }}
          li.col-3.py-2.px-1 {{ item.Time }}
          li.col-4.py-2.px-1 {{ item.Bonus }}
</template>
<script>
import axios from 'axios';
import { mapState } from 'vuex';

export default {
  props: ['UserData'],
  data() {
    return {
      Logined: false,
      // recordData: [],
    };
  },
  // mounted() {
  //   if (this.MemberLogined) {
  //     this.getLotteryRecord();
  //   }
  // },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberLogined',
    ]),
  },
  methods: {
    login() {
      this.Logined = true;
    },
    // getLotteryRecord() {
    //   const paylod = {};
    //   const vm = this;
    //   paylod.UserId = this.UserId;
    //   axios.post(`${process.env.VUE_APP_APIHOST}/Event/Lottery_Record/`, paylod)
    //     .then((res) => {
    //       vm.recordData = res.data.data
    //       console.log(res);
    //     })
    //     .catch((error) => {
    //       vm.$message.error('很抱歉，系統出錯，請聯絡客服人員協助');
    //     });
    // },
  },
};
</script>
<style lang="scss" scoped>
</style>
