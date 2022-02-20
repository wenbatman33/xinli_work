<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", :filterShow="filterShow" @change="getData()")
    //- 分页 表格上方
    .justify-content-end
      el-pagination(
        :background="true",
        :hide-on-single-page="true",
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
      el-table(:data="tableData", height="75vh", border, stripe)
        el-table-column(v-if="fieldPerms.transDepBCOrderId", prop="transDepBCOrderId", label="单号", align="center", width="160", fixed)
        el-table-column(v-if="fieldPerms.transDepBCCreatedAt", prop="transDepBCCreatedAt", label="存款时间", align="center", width="160")
        el-table-column(v-if="fieldPerms.transDepBCBankInfo", label="银行代码+收款户名", align="center", prop="transDepBCBankInfo", width="160")
        el-table-column(v-if="fieldPerms.transDepBCBankCardNo", align="center", prop="transDepBCBankCardNo", label="银行卡号", width="180")
          template(slot-scope="{ row }")
            span {{ row.transDepBCBankCardNo }}
            span(v-if="row.transDepBCBankCardVirtualNo") <br> ({{ row.transDepBCBankCardVirtualNo }})
        el-table-column(v-if="fieldPerms.transDepBCAccount", prop="transDepBCAccount.display", label="代理帐号", align="center", width="100")
        el-table-column(v-if="fieldPerms.transDepBCRealName", prop="transDepBCRealName", label="代理姓名", align="center", width="80")
        el-table-column(v-if="fieldPerms.transDepBCAmount", label="存款金额", align="center", width="140")
          span(slot-scope="{ row }") {{ row.transDepBCAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.transDepBCDepositFee", label="存款手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.transDepBCDepositFee | formatMoney }}
        el-table-column(v-if="fieldPerms.transDepBCFee", label="三方手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.transDepBCFee | formatMoney }}
        el-table-column(v-if="fieldPerms.transDepBCRemark", prop="transDepBCRemark", label="附言", align="center", width="160")
        el-table-column(v-if="fieldPerms.transDepBCNote", prop="transDepBCNote", label="备注", align="center", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.transDepBCStatus", label="状态", align="center", width="90")
          template(slot-scope="{ row }")
            el-tag(type="success", v-if="row.transDepBCStatus.value === 3") {{ row.transDepBCStatus.display }}
            el-tag(type="danger", v-else-if="row.transDepBCStatus.value === 2") {{ row.transDepBCStatus.display }}
            el-tag(v-else) {{ row.transDepBCStatus.display }}
        el-table-column(v-if="fieldPerms.transDepBCSuccessTime", prop="transDepBCSuccessTime", label="完成时间", align="center", width="160")
        el-table-column(v-if="fieldPerms.transDepBCEditor", prop="transDepBCEditor", label="执行人", align="center", width="100")

        el-table-column(v-if="fieldPerms.transDepBCStatus", label="管理", width="140", align="center", fixed="right")
          template(slot-scope="{ row }")
            template(v-if="row.transDepBCStatus.value === 1")
              el-link.text-primary.m-2(v-if="buttonPerms.agencyFinishedDDepositOrder", @click="finish(row)") 完成
              el-link.text-primary.m-2(v-if="buttonPerms.agencyFailDDepositOrder", @click="fail(row)") 失败
            el-link.text-primary.m-2(v-if="buttonPerms.agencyShowDDepositOrderLog", @click="showLog(row)") 查看记录
            el-link.text-primary.m-2(v-if="buttonPerms.agencyAddDDepositOrderNote", @click="addNote(row)") 备注
    //- log 抽屉
    el-drawer(:title="log.title", :visible.sync="log.visible", direction="rtl")
      el-timeline(v-if="log.data.length")
        el-timeline-item(
          v-for="log in log.data",
          :key="log.id",
          :timestamp="`${log.editor_user} ${log.updated_at}`"
        ) {{ log.status }}
          span(v-if="log.error_msg") - {{ log.error_msg }}
      .mx-3(v-else) 无记录
    //- 修改備註 dialog
    el-dialog(:visible.sync="addNoteDialogVisible", title="修改备注")
      el-form(:model="addNoteDialogFormData")
        el-form-item
          el-input(type="textarea", v-model="addNoteDialogFormData.note", :autosize="{ minRows: 6, maxRows: 10}")
        el-form-item
          el-button(@click="handleAddNote()") 储存
</template>

<script>
import {
  getDepositOrdersAPI,
  getDepositOrdersLogAPI,
  finishedDepositOrdersAPI,
  failDepositOrdersAPI,
  editDepositOrderAPI
} from '@/api/agencyCapitalFlow';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      addNoteDialogVisible: false,
      addNoteDialogFormData: {
        id: 0,
        note: ''
      },
      filterList: [
        {
          label: '单号',
          model: 'order_id',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '代理帐号',
          model: 'account',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '代理姓名',
          model: 'realname',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '存款金额',
          model: 'amount',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '收款户名',
          model: 'bank_card_holder',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '银行代码',
          model: 'bank_code',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '银行卡号',
          model: 'bank_card_no',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '附言',
          model: 'remark',
          component: 'filterInput',
          props: { type: 'text' }
        },
        { label: '完成時間', model: 'successTime', component: 'filterDatePicker', props: { type: 'datetimerange' } }
      ],
      filterShow: [
        { label: '存款時間', model: 'time', component: 'filterDatePicker', props: { type: 'datetimerange' } }
      ],
      log: {
        title: '',
        visible: false,
        data: []
      }
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  mounted() {
    // 需要预设带入今日日期
    const today = new Date();
    const todayString = new Date(today.getTime() - (today.getTimezoneOffset() * 60000 )).toISOString().split('T')[0];
    this.$set(this.$refs.dataFilter.filterData, 'time', [`${todayString} 00:00:00`, `${todayString} 23:59:59`]);

    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        order_type: 'D'
      }

      Object.assign(APIParams, this.$refs.dataFilter.getFilterData());

      if (APIParams.time) {
        APIParams.sdate = APIParams.time[0];
        APIParams.edate = APIParams.time[1];
        delete APIParams.time;
      }

      if (APIParams.successTime) {
        APIParams.succeed_sdate = APIParams.successTime[0];
        APIParams.succeed_edate = APIParams.successTime[1];
        delete APIParams.successTime;
      }

      getDepositOrdersAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    showLog(order) {
      getDepositOrdersLogAPI({ order_id: order.transDepBCOrderId }).then(response => {
        this.log.data = response.data.data;
        this.log.title = order.transDepBCOrderId + ' 记录';
        this.log.visible = true;
      });
    },
    finish(order) {
      this.$swal({
        title: '是否完成此订单',
        html: `
          帐号: ${order.transDepBCAccount && order.transDepBCAccount.display} <br>
          姓名: ${order.transDepBCRealName}<br>
          单号： ${order.transDepBCOrderId}<br><br>
          存款金额: ${this.$options.filters.formatMoney(order.transDepBCAmount)}<br>
          存款手续费: ${order.transDepBCDepositFee}<br>
          <b>实际上分金额: ${this.$options.filters.formatMoney(order.transDepBCAmount - order.transDepBCDepositFee)}</b>
        `,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '完成',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          return finishedDepositOrdersAPI(order.id, { order_type: 'D' });
        }

        return Promise.reject();
      })
      .then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(tableOrder => tableOrder.id === response.data.data[0].id),
          response.data.data[0]
        )
        this.$swal('成功！', '此订单已完成', 'success');
      }).catch(() => {
        this.$swal('未完成', '此订单未完成', 'error');
      })
    },
    fail(order) {
      this.$swal({
        title: '系统提示',
        text: '是否将此订单设为失败',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认失败退回',
        cancelButtonText: '取消',
        reverseButtons: true,
        input: 'textarea',
        inputValidator: remark => ! remark && '必须填写退回原因'
      }).then(({ value: remark }) => {
        if (remark) {
          return failDepositOrdersAPI(order.id, { remark, order_type: 'D' });
        }

        return Promise.reject();
      }).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(tableOrder => tableOrder.id === response.data.data[0].id),
          response.data.data[0]
        );
        this.$swal('成功！', '此订单已完成退回', 'success');
      }).catch(() => {
        this.$swal('未提交失败', '', 'info');
      })
    },
    addNote(order) {
      this.addNoteDialogFormData.id = order.id;
      this.addNoteDialogFormData.note = order.transDepBCNote;
      this.addNoteDialogVisible = true;
    },
    handleAddNote() {
      editDepositOrderAPI(
        this.addNoteDialogFormData.id,
        { remark: this.addNoteDialogFormData.note, order_type: 'D' }
      ).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(order => order.id === response.data.data[0].id),
          response.data.data[0]
        );
        this.addNoteDialogVisible = false;
        this.$message.success('修改备注成功');
      })
    }
  }
}
</script>
