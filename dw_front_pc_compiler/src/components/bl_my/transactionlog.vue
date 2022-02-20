<template lang="pug">
.BLOCK.CENTER.d-flex
  .wrap
    .content.p-4
      .row.no-gutters(v-if='transactionLogStatusList.length!==0')
        el-button(round, :type='(!transactionLogCurrentType)?"primary":""', @click='changeType(null, "全部")') 全部
        el-button(v-for='(item,index) in transactionLogTypeList', :key='index', round, :type='(transactionLogCurrentType===item)?"primary":""', @click='changeType(item, index)') {{index}}
      .row.no-gutters.my-3
        .col-8(v-if='transactionLogStatusList.length!==0')
          //- 全部只顯示成功
          el-select(v-if='!type', v-model="status" placeholder="请选择", @change='selectChange')
            el-option(v-for="(item, index) in transactionLogStatusListForAll", :key="index", :label="index",:value="item")
          //- 其他的話顯示transactionLogStatusList
          el-select(v-else, v-model="status" placeholder="请选择", @change='selectChange')
            el-option(v-for="(item, index) in transactionLogStatusList", :key="index", :label="index",:value="item")
          span.mx-3
            el-date-picker(
              v-model='transactionTime', 
              type='datetimerange', 
              :picker-options='transactionTimeOptions',
              range-separator='-', 
              start-placeholder='开始日期', 
              end-placeholder='结束日期', 
              value-format="yyyy-MM-dd HH:mm:ss",
              :default-time='["00:00:00", "23:59:59"]',
              align='right',
              @change='dateChange')
        .col-4(v-if='transactionLogTotal>0')
          el-pagination.float-right(background='', layout='prev, pager, next', :pager-count='5', :total='transactionLogTotal', @current-change="changePage")
      .row.no-gutters(v-if='transactionLog.length<=0')
        .col-12.d-flex.justify-content-center.align-items-center.nullData
            .text-center
              img(:src='nullPoromotion')
              p 暂无纪录
      .row.no-gutters(v-if='transactionLog.length>0')
        el-table(:data='transactionLog', style='width: 100%')
          el-table-column(prop='createdAt', label='时间', width='180')
          el-table-column(prop='orderId', label='交易单号', width='200')
          el-table-column(prop='type.display', label='交易类型')
          el-table-column(prop='amount', label='交易金额')
            template(slot-scope="scope")
              span ￥{{scope.row.amount | commaFormat }}
          //- el-table-column(prop='depositFee', label='存款手续费')
          //-   template(slot-scope="scope")
          //-     span ￥{{scope.row.depositFee  |commaFormat}}
          //-     //- span ￥{{scope.row.deposit_fee | commaFormat }}
          el-table-column(prop='oldCash', label='交易前')
            template(slot-scope="scope")
              span ￥{{scope.row.oldCash | commaFormat }}
          el-table-column(prop='newCash', label='交易后')
            template(slot-scope="scope")
              span ￥{{scope.row.newCash | commaFormat }}
          el-table-column(width='100')
            template(slot-scope='scope') 
              el-button(type='primary', size='mini', @click='transactionLogDetail(scope.row)') 查看
      .row.no-gutters
        .col-12(v-if='transactionLogTotal>0')
          el-pagination.float-right.my-2(background='', layout='prev, pager, next', :pager-count='5', :total='transactionLogTotal', @current-change="changePage")
</template>

<script>
import dayjs from 'dayjs';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      nullPoromotion: `${window.CDN_ASSETS}/static/img/nullPoromotion.png`,
      // 返回资料表-----
      tableData: [],
      typeList: [],
      // 返回资料表-----
      transactionTime: [],
      transactionLogStatusListForAll: { '成功': 3 },
      type: '',
      status: 3,
      page: 1,
      per_page: 10,
      transactionTimeOptions: {
        shortcuts: [{
          text: '最近14天',
          onClick(picker) {
            const end = dayjs().format('YYYY-MM-DD 00:00:00');
            const start = dayjs(Date.now() - (3600 * 1000 * 24 * 14)).format('YYYY-MM-DD 00:00:00');
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = dayjs().format('YYYY-MM-DD 00:00:00');
            const start = dayjs(Date.now() - (3600 * 1000 * 24 * 30)).format('YYYY-MM-DD 00:00:00');
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近90天',
          onClick(picker) {
            const end = dayjs().format('YYYY-MM-DD 00:00:00');
            const start = dayjs(Date.now() - (3600 * 1000 * 24 * 90)).format('YYYY-MM-DD 00:00:00');
            picker.$emit('pick', [start, end]);
          },
        }],
      },
    };
  },
  computed: {
    ...mapState('wallet', [
      'transactionLog',
      'transactionLogTotal',
      'transactionLogTypeList',
      'transactionLogStatusList',
      'transactionLogCurrentType',
    ]),
    start_time() {
      let time = '';
      if (this.transactionTime[0]) {
        time = this.transactionTime[0];
      } else {
        time = '';
      }
      return time;
    },
    end_time() {
      let time = '';
      if (this.transactionTime[1]) {
        time = this.transactionTime[1];
      } else {
        time = '';
      }
      return time;
    },
  },
  watch: {
    $route(to, from) {
      this.chageUrl();
    },
  },
  methods: {
    init() {
      const vm = this;
      vm.getTransactionLog();
      vm.getTransactionLogTypeList();
      vm.getTransactionLogStatusList();
    },
    selectChange(status) {
      const vm = this;
      // 页数恢复预设值
      this.page = 1;
      this.per_page = 10;
      vm.status = status;
      vm.getTransactionLog();
    },
    dateChange() {
      const vm = this;
      // 页数恢复预设值
      this.page = 1;
      this.per_page = 10;
      vm.getTransactionLog();
      this.$matomo_my_transactionLogTime();
    },
    changeType(type, name) {
      this.$matomo_my_transactionLogType(name);
      const vm = this;
      // 页数恢复预设值
      this.page = 1;
      this.per_page = 10;
      vm.type = type || '';
      vm.status = (type) ? vm.status : 3;
      this.$store.commit('wallet/setTransactionLogCurrentType', type, { root: true });
      vm.getTransactionLog();
    },
    changePage(val) {
      const vm = this;
      this.page = val;
      this.per_page = 10;
      vm.getTransactionLog();
    },
    getTransactionLog() {
      const vm = this;
      const payload = {};
      payload.type = vm.type;
      payload.status = vm.status;
      payload.page = vm.page;
      payload.per_page = vm.per_page;
      payload.start_time = vm.start_time;
      payload.end_time = vm.end_time;
      this.$store.dispatch('wallet/getTransactionLog', payload);
    },
    getTransactionLogTypeList() {
      const vm = this;
      this.$store.dispatch('wallet/getTransactionLogTypeList');
    },
    getTransactionLogStatusList() {
      const vm = this;
      this.$store.dispatch('wallet/getTransactionLogStatusList');
    },
    transactionLogDetail(row) {
      const vm = this;
      const payload = {};
      payload.type = row.type.value;
      payload.orderId = row.orderId;
      this.$store.dispatch('wallet/getTransactionLogDetail', payload)
        .then((res) => {
          this.$store.dispatch('dialog/openCommandDialog', { component: 'bl_TransactionLogDetail' });
        });
    },
    chageUrl() {
      this.type = (this.$route.query.currentType) ? this.$route.query.currentType : '';
      this.status = (this.$route.query.status) ? this.$route.query.status : 3;
      if (this.$route.query.currentType) {
        this.$store.commit('wallet/changeTransactionLogCurrentType', Number(this.$route.query.currentType), { root: true });
      }
      if (this.$route.query.status) {
        this.status = Number(this.$route.query.status);
      }
    },
  },
  destroyed() {
    this.$store.commit('wallet/changeTransactionLogCurrentType', 0, { root: true });
  },
  created() {
    this.chageUrl();
  },
  mounted() {
    const startDate = this.$dayjs(Date.now() - (24 * 60 * 60 * 1000)).format('YYYY-MM-DD 00:00:00');
    const endDate = this.$dayjs().format('YYYY-MM-DD 23:59:59');
    this.transactionTime = [startDate, endDate];
    this.init();
  },
};
</script>
