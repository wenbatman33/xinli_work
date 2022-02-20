<template lang="pug">
  .container-fluid
    data-filter.commission--filter(ref="dataFilter", :filterList="filterList", :filterShow="filterShow", @change="getData()")
      transition(name="fade")
        .commission--batch.d-flex.justify-content-around.align-items-center(v-if="selection.length")
          el-button(v-if="buttonPerms.commissionPass", @click="batch(2)") 批次通过
          el-button(v-if="buttonPerms.commissionFail", @click="batch(3)") 批次拒绝
          el-button(v-if="buttonPerms.commissionPay", @click="batch(4)") 批次派发
    .justify-content-end
      el-pagination(
        :background="true",
        :pager-count="5",
        layout="sizes, prev, pager, next, jumper, total",
        :page-sizes="[20, 50, 100, 200, 300, 400, 500]",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getData",
        @size-change="size => { pageSize = size; getData() }"
      )
    .row
      el-table(:data="tableData", border, stripe, height="70vh", @sort-change="sortChange", @selection-change="handleSelectionChange")
        el-table-column(v-if="canBatch", type="selection", align="center", fixed="left")
        el-table-column(v-if="fieldPerms.agencyCommRepLogDate", label="日期", prop="agencyCommRepLogDate", align="center")
        el-table-column(v-if="fieldPerms.agencyCommRepAccount", label="代理帐号", prop="agencyCommRepAccount", align="center")
        el-table-column(v-if="fieldPerms.agencyCommRepName", label="代理名称", prop="agencyCommRepName", align="center")
        el-table-column(v-if="fieldPerms.agencyCommRepActiveMemberCount", label="活跃人数", prop="active_member_count", align="center", width="100", sortable="custom")
          span(slot-scope="{ row }") {{ row.agencyCommRepActiveMemberCount }}
        el-table-column(v-if="fieldPerms.agencyCommRepProfitAmount", label="平台盈利", prop="profit_amount", align="center", width="100", sortable="custom")
          span(slot-scope="{ row }") {{ row.agencyCommRepProfitAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepBetAmount", label="总流水", prop="bet_amount", align="center", width="100", sortable="custom")
          span(slot-scope="{ row }") {{ row.agencyCommRepBetAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepReturnAmount", label="总返水", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommRepReturnAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepBonusAmount", label="总红利", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommRepBonusAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepSportBetAmount", label="体育流水", align="center", width="120")
          span(slot-scope="{ row }") {{ row.agencyCommRepSportBetAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepSportBetLevel", label="体育流水等级", align="center", width="100")
          span(slot-scope="{ row }") {{ row.agencyCommRepSportBetLevel | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepSportReturnAmount", label="体育返水", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommRepSportReturnAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepLotteryBetAmount", label="彩票流水", align="center", width="120")
          span(slot-scope="{ row }") {{ row.agencyCommRepLotteryBetAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepLotteryBetLevel", label="彩票流水等级", align="center", width="100")
          span(slot-scope="{ row }") {{ row.agencyCommRepLotteryBetLevel | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepLotteryReturnAmount", label="彩票返水", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommRepLotteryReturnAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepBoardBetAmount", label="棋牌流水", align="center", width="120")
          span(slot-scope="{ row }") {{ row.agencyCommRepBoardBetAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepBoardBetLevel", label="棋牌流水等级", align="center", width="100")
          span(slot-scope="{ row }") {{ row.agencyCommRepBoardBetLevel | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepBoardReturnAmount", label="棋牌返水", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommRepBoardReturnAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepLiveBetAmount", label="真人流水", align="center", width="120")
          span(slot-scope="{ row }") {{ row.agencyCommRepLiveBetAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepLiveBetLevel", label="真人流水等级", align="center", width="100")
          span(slot-scope="{ row }") {{ row.agencyCommRepLiveBetLevel | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepLiveReturnAmount", label="真人返水", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommRepLiveReturnAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepDepositFeeAmount", label="存款手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.agencyCommRepDepositFeeAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepWithdrawFeeAmount", label="提款手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.agencyCommRepWithdrawFeeAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepProductFeeAmount", label="平台费", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommRepProductFeeAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepDeferredAmount", label="上月递延", align="center")
          span(slot-scope="{ row }") {{ row.agencyCommRepDeferredAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepNetProfitAmount", label="平台净盈利", prop="net_profit_amount", align="center", width="120", sortable="custom")
          span(slot-scope="{ row }") {{ row.agencyCommRepNetProfitAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepCommissionLevel", label="佣金等级", prop="commission_level", align="center", width="100", sortable="custom")
          span(slot-scope="{ row }") {{ row.agencyCommRepCommissionLevel }}
        //- MARK: agencyCommRepCommissionSubotal 后端错字 先不改动
        el-table-column(v-if="fieldPerms.agencyCommRepCommissionSubotal", label="本月佣金小计", align="center", width="120")
          span(slot-scope="{ row }") {{ row.agencyCommRepCommissionSubotal | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepSpLoReturnAmount", label="本月返水小计", align="center", width="120")
          span(slot-scope="{ row }") {{ row.agencyCommRepSpLoReturnAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepSecondaryAgencyBonus", label="下级代理红利", align="center", width="120")
          span(slot-scope="{ row }") {{ row.agencyCommRepSecondaryAgencyBonus | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepSecondaryAgencyCommissionAdjustment", label="下级代理调整佣金", align="center", width="130")
          span(slot-scope="{ row }") {{ row.agencyCommRepSecondaryAgencyCommissionAdjustment | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepReturnDeferredAmount", label="上月递延返水", prop="commission_total", align="center", width="130", sortable="custom")
          span(slot-scope="{ row }") {{ row.agencyCommRepReturnDeferredAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepCommissionTotal", label="本月佣金总计", prop="commission_total", align="center", width="130", sortable="custom")
          span(slot-scope="{ row }") {{ row.agencyCommRepCommissionTotal | formatMoney }}
        el-table-column(v-if="fieldPerms.agencyCommRepStatus", label="状态", align="center")
          el-tag(slot-scope="{ row }", :type="tagColor[row.agencyCommRepStatus]") {{ filterList[0].props.options[row.agencyCommRepStatus] }}
        el-table-column(v-if="fieldPerms.agencyCommRepStatus && canBatch", label="操作", align="center")
          template(slot-scope="{ row }")
            el-link.mx-1.text-primary(
              v-if="buttonPerms.commissionPass && (row.agencyCommRepStatus === 1 || row.agencyCommRepStatus === 3)",
              @click="editStatus(row, 2)"
            ) 通过
            el-link.mx-1.text-primary(
              v-if="buttonPerms.commissionFail && (row.agencyCommRepStatus === 1 || row.agencyCommRepStatus === 2)",
              @click="editStatus(row, 3)"
            ) 拒绝
            el-link.mx-1.text-primary(
              v-if="buttonPerms.commissionPay && row.agencyCommRepStatus === 2",
              @click="pay(row)"
            ) 派发
</template>

<script>
import { getCommissionRecordAPI, editCommissionStatusAPI, payCommissionAPI } from '@/api/agency/record.js';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '统计中', 1: '审核中', 2: '通过', 3: '拒绝', 4: '派发' },
          },
        },
        { label: '代理帐号', model: 'account', component: 'filterInput', props: { type: 'text' }},
      ],
      filterShow: [
        { label: '月份', model: 'log_date', component: 'filterMonthPicker' }
      ],
      tagColor: {
        0: 'info',
        1: 'warning',
        2: '',
        3: 'danger',
        4: 'success',
      },
      selection: [],
      canBatch: false,
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (this.buttonPerms.commissionPass || this.buttonPerms.commissionFail || this.buttonPerms.commissionPay) {
      this.canBatch = true;
    }
  },
  mounted() {
    const now = new Date();
    this.$set(
      this.$refs.dataFilter.filterData,
      'log_date',
      `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}`
    );

    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      if (APIParams.log_date) {
        APIParams.log_date += '-01';
      }

      if (this.dir) {
        APIParams.order = this.dir;
        APIParams.order_by = this.sortBy;
      }

      getCommissionRecordAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    sortChange({ prop, order }) {
      this.sortBy = prop;
      this.dir = { descending: 'desc', ascending: 'asc' }[order] || '';
      this.getData();
    },
    editStatus(row, status) {
      const commissionIdArr = Array.isArray(row) ? row.map(item => item.id) : [row.id];

      editCommissionStatusAPI({ status, commissionIdArr }).then(() => {
        this.getData();
        this.$message.success(`成功${{2: '通过', 3: '拒绝'}[status]}`);
      });
    },
    pay(row) {
      const commissionIdArr = Array.isArray(row) ? row.map(item => item.id) : [row.id];

      payCommissionAPI({ commissionIdArr }).then(() => {
        this.getData();
        this.$message.success('成功派发');
      })
    },
    handleSelectionChange(selection) {
      this.selection = selection;
    },
    batch(status) {
      const betchCondition = {
        2: item => item.agencyCommRepStatus === 1 || item.agencyCommRepStatus === 3,
        3: item => item.agencyCommRepStatus === 1 || item.agencyCommRepStatus === 2,
        4: item => item.agencyCommRepStatus === 2
      }
      const canBatch = this.selection.filter(betchCondition[status]);

      if (canBatch.length === 0) {
        this.$message.warning('无代理可执行此次操作, 请求未送出！');
      } else {
        status === 4 ?  this.pay(canBatch) : this.editStatus(canBatch, status);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.commission--filter {
  position: relative;
  z-index: 10;
}

.commission--batch {
  position: absolute;
  top: -30%;
  left: 0;
  width: 100%;
  bottom: -10%;
  z-index: 100;
  background-color: #f8f9fa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
