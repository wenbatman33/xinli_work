<template lang="pug">
  .container-fluid
    .d-flex.justify-content-end(v-if="order.TransWDAllFinanceCheck")
      template(v-if="order.TransWDAllFinanceCheck.value === 1")
        el-button(v-if="buttonPerms.checkAgencyAgencyWithdrawOrderFail", type="danger", @click="fail()") 退回
        el-button.ml-2(v-if="buttonPerms.checkAgencyWithdrawOrderSuccess", @click="success()") 通过
      span(v-else) {{ order.TransWDAllFinanceCheck.display }}

    el-card.my-2(shadow="always", v-if="buttonPerms.checkAgencyWithdrawOrderDetailBlock")
      div(slot="header") 提款单内容
      .d-flex
        .w-25.mb-1 提款单号： {{ order.TransWDAllOrderId }}
        .w-25.mb-1 申请时间： {{ order.TransWDAllCreatedAt }}
        .w-25.mb-1 状态： {{ order.TransWDAllStatus ? order.TransWDAllStatus.display : '--' }}
        .w-25.mb-1 执行人： {{ order.TransWDAllEditor }}
      .d-flex
        .w-25.mb-1 提款金额： {{ order.TransWDAllAmount | formatMoney }}
        .w-25.mb-1 银行帐户： {{ order.TransWDAllBankNo }}
        .w-25.mb-1 户名： {{ order.TransWDAllRealName }} <!-- MARK:API只有回傳這個 後端表示先用這個 -->
        .w-25.mb-1 银行： {{ order.TransWDAllBankName }}
      .d-flex
        .w-25.mb-1 代理帐号： {{ order.TransWDAllAccount }}
        .w-75 提单备注： {{ order.TransWDAllNote }}
          i.el-icon-edit.ml-1.c-pointer(
            v-if="buttonPerms.checkAgencyWithdrawOrderEditNote", @click="editNote()" style="line-height: unset"
          )

    el-card.my-2(shadow="always", v-if="Object.keys(info).length && buttonPerms.checkAgencyWithdrawOrderCheckBlock")
      div(slot="header") 提款审核
      .row.mb-2
        //- MARK: 系统建议有流水判断。 代理目前无流水 基本上都会判定退回！
        .col-4 系统建议：
          el-tag(v-if="info.systemSuggest", type="success", size="mini") 通过
          el-tag(v-else, type="danger", size="mini") 退回
        .col-4 提款限额：
          i.el-icon-circle-check.ml-1.text-success(v-if="info.withdrawFlag")
          i.el-icon-circle-close.ml-1.text-danger(v-else)
      .row
        .col-4 提款限制： {{ info.withdrawLimit | formatMoney }}
        .col-4 单笔提款限额： {{ info.singleMin | formatMoney }} ~ {{ info.singleMax | formatMoney}}
        .col-4 单日提款上限： {{ info.dayMax | formatMoney }}
    el-card.my-2(shadow="always", v-if="buttonPerms.checkAgencyWithdrawOrderCashLog")
      div(slot="header") 资金记录 ({{ info.searchStartTime }} ~ {{ info.searchEndTime }})
      el-table(:data="cashLog", border, stripe)
        el-table-column(v-if="fieldPerms.paymentOrderUpdatedAt", label="日期", prop="paymentOrderUpdatedAt", align="center", width="160")
        el-table-column(v-if="fieldPerms.paymentOrderType", label="交易类型", prop="paymentOrderType.display", align="center")
        el-table-column(v-if="fieldPerms.paymentCashOld", label="交易前", align="center")
          span(slot-scope="{ row }") {{ row.paymentCashOld | formatMoney }}
        el-table-column(v-if="fieldPerms.paymentCashNew", label="交易后", align="center")
          span(slot-scope="{ row }") {{ row.paymentCashNew | formatMoney }}
        el-table-column(v-if="fieldPerms.paymentAmount", label="交易金额", align="center")
          span(slot-scope="{ row }") {{ row.paymentAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.paymentOrderId", label="交易单号", prop="paymentOrderId", align="center")
        el-table-column(v-if="fieldPerms.TransWDAllNote", label="备注", prop="TransWDAllNote", align="center", show-overflow-tooltip)
      el-pagination(small,
        layout="prev, pager, next",
        :page-size="pageSize",
        :total="dataTotal",
        :current-page.sync="currentPage",
        @current-change="getCashLog"
      )
    //- 代理备注
    el-card.my-2(shadow="always", v-if="buttonPerms.checkAgencyWithdrawOrderMemberNoteBlock")
      div(slot="header") 代理备注
        el-button.mx-2(v-if="buttonPerms.checkAgencyWithdrawOrderAddNote", size="mini", @click="addAgencyNote") 新增财务备注
      .member--note.mb-2(v-for="note in displayAgencyNotes", :key="note.id")
        .member--note--type.mr-2(v-if="fieldPerms.agencyNoteType") {{ note.agencyNoteType.display[0] }}
        .member--note--content
          .member--note--datetime(v-if="fieldPerms.agencyNoteCreatedAt") {{ note.agencyNoteCreatedAt }}
          line-clamp(v-if="fieldPerms.agencyNoteNote", :content="note.agencyNoteNote")
      template(v-if="agencyNotes && agencyNotes.length > 10")
        el-link.text-primary(v-if="! expandNote", @click="expandNote = true") 查看所有备注
        el-link.text-primary(v-else, @click="expandNote = false") 收回 👆🏽
    //- 修改備註 dialog
    el-dialog(:visible.sync="editNoteDialogVisible", title="修改备注")
      el-input(type="textarea", v-model="editNoteData", :autosize="{ minRows: 6, maxRows: 10 }")
      el-button.mt-2(@click="handleEditNote()") 储存
    //- 代理备注 dialog
    el-dialog(:visible.sync="agencyNoteDialog.visible", title="新增财务备注")
      el-input(type="textarea", v-model="agencyNoteDialog.note", :autosize="{ minRows: 6, maxRows: 10 }", ref="agencyNoteInput")
      el-button.mt-2(@click="handleAddAgencyNote()") 储存
</template>

<script>
import {
  getWithdrawOrderAPI,
  editWithdrawOrderAPI,
  handleWithdrawOrderAPI,
  getWithdrawOrderInfoAPI
} from '@/api/agencyCapitalFlow';
import { getAgencyCashLogsAPI } from '@/api/agency/cashLog';
import { getAgencyNoteAPI, addAgencyNoteAPI } from '@/api/agency/note';

export default {
  data() {
    return {
      order: {},
      info: {},
      cashLog: [],
      pageSize: 5,
      dataTotal: 0,
      currentPage: 1,
      editNoteDialogVisible: false,
      editNoteData: {
        id: 0,
        note: ''
      },
      agencyNotes: [],
      agencyNoteDialog: {
        visible: false,
        note: ''
      },
      expandNote: false,
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  computed: {
    displayAgencyNotes() {
      if (this.agencyNotes) {
        if (this.agencyNotes.length > 10 && ! this.expandNote) {
          return this.agencyNotes.slice(0, 10);
        }

        return this.agencyNotes;
      }

      return [];
    },
    dateFormat() {
      if (this.info && this.info.searchStartTime && this.info.searchEndTime) {
        return [
          this.info.searchStartTime.split(' ')[0],
          this.info.searchEndTime.split(' ')[0]
        ]
      }

      return [];
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getOrder().then(() => {
        this.getInfo();
        this.getAgencyNote();
      });
    }
  },
  methods: {
    getOrder() {
      return getWithdrawOrderAPI(this.$route.query.id).then(response => {
        this.order = response.data.data[0];
      });
    },
    getInfo() {
      getWithdrawOrderInfoAPI(this.order.TransWDAllOrderId).then(response => {
        this.info = response.data.data;
        this.getCashLog();
      });
    },
    getCashLog() {
      getAgencyCashLogsAPI({
        member_id: this.order.TransWDAllMemberId,
        start_time: this.info.searchStartTime,
        end_time: this.info.searchEndTime,
        per_page: this.pageSize,
        page: this.currentPage,
      })
      .then(response => {
        this.cashLog = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    editNote() {
      this.editNoteData = this.order.TransWDAllNote;
      this.editNoteDialogVisible = true;
    },
    handleEditNote() {
      if (! this.editNoteData.trim()) {
        return this.$message.error('備註不得為空');
      }

      editWithdrawOrderAPI(this.order.id, { remark: this.editNoteData.trim() }).then(response => {
        this.order.TransWDAllNote = response.data.data[0].TransWDAllNote;
        this.editNoteDialogVisible = false;
        this.$message.success('修改备注成功');
      })
    },
    getAgencyNote() {
      getAgencyNoteAPI(this.order.TransWDAllMemberId).then(response => {
        this.agencyNotes = response.data.data;
      });
    },
    addAgencyNote() {
      this.agencyNoteDialog.note = '';
      this.agencyNoteDialog.visible = true;
      this.$nextTick(() => {
        this.$refs.agencyNoteInput.focus();
      });
    },
    handleAddAgencyNote() {
      if (! this.agencyNoteDialog.note.trim()) {
        return this.$message.error('财务備註不得為空');
      }

      addAgencyNoteAPI({
        member_id: this.order.TransWDAllMemberId,
        type: 'FINANCE',
        note: this.agencyNoteDialog.note
      })
      .then(() => {
        this.$message.success('备注新增成功');
        this.getAgencyNote();
        this.agencyNoteDialog.visible = false;
      });
    },
    success() {
      this.$swal({
        title: '系统提示',
        text: '是否通过此提款单',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '通过',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          return handleWithdrawOrderAPI.success(this.order.id);
        }

        return Promise.reject();
      })
      .then(response => {
        this.order = response.data.data[0];
        this.$swal('成功！', '此提款单已通过', 'success');
      }).catch(() => {})
    },
    fail() {
      this.$swal({
        title: '系统提示',
        text: '是否退回此提款单',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '退回',
        cancelButtonText: '取消',
        reverseButtons: true,
        input: 'select',
        inputOptions: this.$store.state.common.withdrawalFailReason,
        inputValidator: remark => ! remark && '必须填写退回原因'
      }).then(({ value: remark }) => {
        if (typeof remark !== 'undefined') {
          remark = this.$store.state.common.withdrawalFailReason[remark];
          return handleWithdrawOrderAPI.fail(this.order.id, { remark });
        }

        return Promise.reject();
      }).then(response => {
        this.order = response.data.data[0];
        this.$swal('成功！', '此提款单已退回', 'success');
      }).catch(() => {});
    },
  }
}
</script>
