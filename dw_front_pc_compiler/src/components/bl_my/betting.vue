<template lang="pug">
.BLOCK.CENTER.d-flex.bettingWrap
  .wrap(v-if='dataIsReady')
    .content.p-4
      .row.no-gutters
        .col-8
          el-cascader.mr-2(:props="props", v-model='betGameGroup', @change='getBetLog',:placeholder='placeholder', separator=' / ')
          span.mx-2
            el-date-picker.datePicker(
              v-model='betLogDataTime', 
              type='datetimerange', 
              :picker-options='betLogDataTimeOptions',
              range-separator='-', 
              start-placeholder='开始日期', 
              end-placeholder='结束日期', 
              value-format="yyyy-MM-dd HH:mm:ss",
              align='right',
              :default-time='["00:00:00", "23:59:59"]',
              @change='dateChange')
        .col-4
          el-pagination.float-right(background='', layout='prev, pager, next', :pager-count='5', :total='betLogTotal', @current-change='changePage')
      .row.no-gutters.my-3
        el-table(:data='betLogData', style='width: 100%')
          el-table-column(type='expand')
            template(slot-scope='props')
              p(v-if='! props.row.betNote') 暂无资料      
              p(v-else, v-for='item in props.row.betNote') {{item}}    
          el-table-column(prop='betTime', label='时间')
          el-table-column(prop='betId', label='注单号')
          el-table-column(prop='betContent', label='投注内容')
          el-table-column(prop='betLogSatus' label='状态')
            template(slot-scope='scope')
              span.warningText(v-if='scope.row.betLogSatus.value==0') {{scope.row.betLogSatus.display }}
              span.successText(v-if='scope.row.betLogSatus.value==1') {{scope.row.betLogSatus.display }}
              span.errorText(v-if='scope.row.betLogSatus.value==2 || scope.row.betLogSatus.value==3') {{scope.row.betLogSatus.display }}
          el-table-column(prop='betTotalAmount', label='投注金额')
            template(slot-scope='scope')
              span {{scope.row.betTotalAmount | commaFormat}}
          el-table-column(prop='betWinAmount', label='输赢金额')
            template(slot-scope='scope')
              span {{scope.row.betWinAmount | commaFormat}}
          el-table-column(prop='betAmount', label='有效流水')
            template(slot-scope='scope')
              span {{scope.row.betAmount | commaFormat}}
          //- el-table-column(prop='betNote', label='备注')
      .row.no-gutters
        .col-12
          el-pagination.float-right.my-2(background='', layout='prev, pager, next', :pager-count='5', :total='betLogTotal', @current-change='changePage')

</template>

<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex';

let game_type = [];
export default {
  computed: {
    ...mapState('game', [
      'gameTypeData',
    ]),
  },
  data() {
    return {
      dataIsReady: false,
      defaultGameType: 0,
      betGameGroup: '',
      placeholder: '',
      selectBetLogData: [],
      betLogData: [],
      betLogTotal: 0,
      page: 1,
      per_page: 10,
      betLogDataTime: [],
      betLogDataTimeOptions: {
        shortcuts: [{
          text: '最近14天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 14));
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 30));
            picker.$emit('pick', [start, end]);
          },
        }, {
          text: '最近90天',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - (3600 * 1000 * 24 * 90));
            picker.$emit('pick', [start, end]);
          },
        }],
      },
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          const { level } = node;
          if (level === 0) {
            const nodes = game_type.map(item => ({
              value: item.id,
              label: item.gameTypeName_Pc,
              leaf: level >= 1,
            }));
            resolve(nodes);
          } else if (level === 1) {
            axios.get(`api/Member/Bet/GameGroup?game_type=${node.path[0]}`) 
              .then((res) => {
                const nodes = res.data.data.map(item => ({
                  value: item.company_tag,
                  label: item.name,
                  leaf: level >= 1,
                }));
                resolve(nodes);
              });
          }
        },
      },
    };
  },
  methods: {
    init() {
      const vm = this;
      vm.dataIsReady = true;
      vm.getBetGameGroup(vm.defaultGameType);
    },
    getBetGameGroup(num) {
      const vm = this;
      const data = [];
      this.$matomo_my_bettingGameType(game_type[num].gameTypeName_Pc);
      this.$store.dispatch('member/MemberGetBetGameGroup', game_type[num].id)
        .then((res) => {
          vm.placeholder = `${game_type[num].gameTypeName_Pc} / ${res.data.data[0].name}`;
          vm.selectBetLogData = [game_type[num].id, res.data.data[0].company_tag];
          vm.getBetLog(vm.selectBetLogData);
        });
    },
    changePage(val) {
      const vm = this;
      this.page = val;
      vm.getBetLog(vm.selectBetLogData);
    },
    getBetLog(value) {
      // vm.selectBetLogData = [value[0], value[1]];
      this.$matomo_my_bettingCompanyType(value[1]);
      const vm = this;
      const payload = {
        game_type: value[0],
        company_tag: value[1],
        time_start: vm.betLogDataTime[0],
        time_end: vm.betLogDataTime[1],
        page: vm.page,
        per_page: vm.per_page,
      };
      vm.selectBetLogData = [value[0], value[1]];
      this.$store.dispatch('member/MemberGetBetLog', payload)
        .then((res) => {
          vm.betLogTotal = res.data.meta.pagination.total;
          vm.betLogData = res.data.data;
        });
    },
    dateChange() {
      const vm = this;
      vm.getBetLog(vm.selectBetLogData);
    },
  },
  watch: {
    gameTypeData(newData, oldData) {
      if (newData !== null) {
        game_type = newData;
        this.init();
      }
    },
  },
  mounted() {
    const startDate = this.$dayjs(new Date() - (3600 * 1000 * 24 * 1)).format('YYYY-MM-DD HH:mm:ss');
    const endDate = this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
    this.betLogDataTime = [startDate, endDate];
    if (this.gameTypeData.length > 0) {
      game_type = this.gameTypeData;
      this.init();
    }
  },
};
</script>
<style lang="scss" scoped>
.bettingWrap{
  .datePicker{
    width: 360px;
  }
  .successText{
    color: $DW_greenMiddle;
  }
  .errorText{
    color: $DW_orange;
  }
  .warningText{
    color: $DW_yellow;
  }
}
</style>

<style lang="scss">
.MAIN_LIGHT{
  .bettingWrap{
    .successText{color: $L_DW_greenMiddle;}
    .errorText{color: $L_DW_orange;}
    .warningText{color: $L_DW_yellow;}
  }
}
</style>
