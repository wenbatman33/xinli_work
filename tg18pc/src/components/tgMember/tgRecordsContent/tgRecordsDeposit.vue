<template lang='pug'>
.col-12
  el-date-picker.DatePicker(v-if='DateRange.length>0'
                    v-model="DateRange"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions"
                    @change="(value) => changeHandler(value)")
  div(v-if='MemberRecords.MemberDepositLog.data_list')
    div.mt-1.mb-1.text-right(v-if='getTotalPages>0')
      el-pagination(@current-change="handleCurrentChange"  :current-page.sync="currentPages" background="" layout="prev, pager, next" :total="getTotalPages" :page-size='30')
    el-table(:data="MemberRecords.MemberDepositLog.data_list" border style="width: 100%" sortable='')
      el-table-column(label="日期(GMT＋8)" prop="Create_At" sortable='' width='180' )
        template(slot-scope="scope") {{scope.row.Create_At}}
      el-table-column(label="交易单号" width='250' prop="OrderId" sortable='')
      el-table-column(label="交易渠道" prop="ChannelName" sortable='')
      el-table-column(label="交易金额" prop="Amount" sortable='')
        template(slot-scope="scope")
          span ￥{{scope.row.Amount | commaFormat }}
      el-table-column(label="狀態" prop="StateCode" sortable='')
        template(slot-scope="scope")
          span.text-warning(v-if='scope.row.StateCode==0 || scope.row.StateCode==2') {{formatStatus(scope.row.StateCode)}}
          span.text-success(v-if='scope.row.StateCode==1') {{formatStatus(scope.row.StateCode)}}
          span.text-danger(v-if='scope.row.StateCode==3') {{formatStatus(scope.row.StateCode)}}
  tgError(v-else)
  div.mt-1.mb-1.text-right(v-if='getTotalPages>0')
    el-pagination(@current-change="handleCurrentChange"  :current-page.sync="currentPages" background="" layout="prev, pager, next" :total="getTotalPages" :page-size='30')
</template>
<script>
import moment from 'moment';
import tgError from '@/components/tgError/tgError.vue';
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  components: {
    tgError,
  },
  data() {
    return {
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
      return Number(this.MemberRecords.MemberDepositLog.total_rows);
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.currentPages = val;
      this.getAPI();
    },
    changeHandler(value) {
      this.currentPages = 1;
      this.getAPI();
    },
    formatStatus(value) {
      const target = this.MemberRecords.MemberDepositOther.StateCode;
      let Status = '';
      Object.keys(target).map((key, index) => {
        if (value === key) {
          Status = target[key];
        }
        return Status;
      });
      return Status;
    },
    getAPI() {
      if (this.UserId) {
        const payload = {
          UserId: this.UserId,
          Status: 0,
          Page: this.currentPages,
          PageLimit: 30,
          Date_S: this.DateRange[0],
          Date_E: this.DateRange[1],
          PayType: 1,
        };
        this.$store.dispatch('member/MemberGetCashLog_Deposit', payload);
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
<style lang="scss" scoped>
.DatePicker{
  position: absolute;
  top: -55px;
  right: 0;
}
.el-range__close-icon{
  position: absolute;
  top: -99999px
}
</style>
