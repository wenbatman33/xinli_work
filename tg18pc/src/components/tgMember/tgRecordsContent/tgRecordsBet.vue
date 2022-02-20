<template lang='pug'>
.col-12
  .row.no-gutters
    .col-12.my-2
      span.my-2(v-if='step===2')
        el-button(icon='el-icon-arrow-left' @click='backStep1') 返回
      span.my-2.float-right(v-if='step===2') 日期：{{StartDate}} 至 {{EndDate}}
      span.my-2(v-if='step===1')
        el-date-picker.DatePicker.float-right(v-if='DateRange.length>0'
                        v-model='DateRange'
                        type='daterange'
                        range-separator='至'
                        start-placeholder='开始日期'
                        end-placeholder='结束日期'
                        value-format='yyyy-MM-dd'
                        :picker-options='pickerOptions'
                        @change='(value) => changeHandler(value)')
  .row.no-gutters
    .col-12(v-if='step===1')
      el-table(:data='MemberRecords.UserBetReport.data' border style='width: 100%' @row-click='clickHandler')
        el-table-column.cursor(label='游戏平台' prop='GroupName' width='180' )
          template(slot-scope='scope') 
            div.cursor {{scope.row.GroupName}}
        el-table-column.cursor(label='投注次数' width='250' prop='BetCount')
          template(slot-scope='scope')
            div.cursor.counter  {{scope.row.BetCount}}
        el-table-column.cursor(label='總流水' prop='BetAmount')
          template(slot-scope='scope')
            div.cursor  ￥{{scope.row.BetAmount | commaFormat }}
        el-table-column.cursor(label='有效流水' prop='ActiveBetAmount')
          template(slot-scope='scope')
            div.cursor ￥{{scope.row.ActiveBetAmount | commaFormat }}
            //- div.cursor(v-if='scope.row.ActiveBetAmount>0')  ￥{{scope.row.ActiveBetAmount | commaFormat }}
            //- div.cursor(v-else) ￥0
        el-table-column.cursor(label='輸贏金額' prop='BalanceAmount')
          template(slot-scope='scope')
            div.cursor ￥{{scope.row.BalanceAmount | commaFormat }}
  .row.no-gutters
    .col-12(v-if='step===2')
      //- p {{MemberRecords.UserGameBetReport.data.data_list}}
      el-table(:data='MemberRecords.UserGameBetReport.data.data_list' border style='width: 100%')
        el-table-column(label='游戏名称' prop='GameName' width='180' )
          template(slot-scope='scope') {{scope.row.GameName}}
        el-table-column(label='投注次数' width='250' prop='BetCount')
          template(slot-scope='scope')
            span {{scope.row.BetCount}}
        el-table-column(label='流水金额' prop='BetAmount')
          template(slot-scope='scope')
            span ￥{{scope.row.BetAmount | commaFormat }}
        el-table-column(label='有效流水' prop='ActiveBetAmount')
          template(slot-scope='scope')
            div.cursor ￥{{scope.row.ActiveBetAmount | commaFormat }}
            //- span(v-if='scope.row.ActiveBetAmount>0') ￥{{scope.row.ActiveBetAmount | commaFormat }}
            //- span(v-else) ￥0
        el-table-column(label='輸贏金額' prop='BalanceAmount')
          template(slot-scope='scope')
            span ￥{{scope.row.BalanceAmount | commaFormat }}
      div.mt-1.mb-1.text-right(v-if='getTotalPages>0')
    .col-12.text-right(v-if='step===2')
      //- p {{getTotalPages}}
      el-pagination(@current-change="handleCurrentChange"  :current-page.sync="currentPages" background="" layout="prev, pager, next" :total="getTotalPages" :page-size='30')

</template>
<script>
import moment from 'moment';
import tgError from '@/components/tgError/tgError.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
import router from '@/router/router';

export default {
  components: {
    tgError,
  },
  data() {
    return {
      step: 1,
      clickGroupId: '',
      currentPages: 1,
      EndDate: '',
      StartDate: '',
      DateRange: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() + (30 * 24 * 60 * 60 * 1000) || time.getTime() < (Date.now() - (90 * 24 * 60 * 60 * 1000));
        },
      },
    };
  },
  computed: {
    ...mapState('member', [
      'UserName',
      'UserId',
      'MemberRecords',
    ]),
    getTotalPages() {
      return Number(this.MemberRecords.UserGameBetReport.data.total_rows);
    },
  },
  methods: {
    changeHandler(value) {
      this.currentPages = 1;
      this.getAPI();
    },
    clickHandler(row) {
      this.clickGroupId = row.GroupId;
      this.getAPIDetail();
    },
    backStep1() {
      this.currentPages = 1;
      this.step = 1;
    },
    getAPI() {
      if (this.UserId) {
        const payload = {
          UserId: this.UserId,
          PageLimit: 30,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
        };
        console.log(payload);
        this.$store.dispatch('member/MemberGetUserBetReport', payload);
      }
    },
    handleCurrentChange(val) {
      this.currentPages = val;
      this.getAPIDetail();
    },
    getAPIDetail() {
      const vm = this;
      if (this.UserId) {
        const payload = {
          Page: this.currentPages,
          PageLimit: 30,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          GameGroupId: this.clickGroupId,
        };
        this.$store.dispatch('member/MemberGetUserGameBetReport', payload)
          .then((res) => {
            vm.step = 2;
          });
      }
    },
  },
  mounted() {
    const EndDateFormated = moment().format('YYYY-MM-DD');
    const StartDateFormated = moment().subtract(30, 'days').format('YYYY-MM-DD');
    this.EndDate = EndDateFormated;
    this.StartDate = StartDateFormated;
    this.DateRange[0] = StartDateFormated;
    this.DateRange[1] = EndDateFormated;
    this.getAPI();
  },
};
</script>
<style lang='scss' scoped>
.cursor{
  cursor: pointer;
}
.counter{
  color:#409EFF;
  text-decoration: underline;
}
</style>
