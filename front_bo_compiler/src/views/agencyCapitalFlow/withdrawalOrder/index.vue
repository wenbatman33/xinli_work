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
        el-table-column(v-if="fieldPerms.transPayAllOrderId", prop="transPayAllOrderId", label="单号", align="center", width="160", fixed)
        el-table-column(v-if="fieldPerms.transPayAllOrderStatus", prop="transPayAllOrderStatus", label="状态", align="center", width="90")
        el-table-column(v-if="fieldPerms.transPayAllCheckedAt", prop="transPayAllCheckedAt", label="申请时间", align="center", width="160")
        el-table-column(v-if="fieldPerms.transPayAllAmount", label="出款金额", align="center", width="120")
          template(slot-scope="{ row }")
            span {{ row.transPayAllAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.transPayAllFee", prop="transPayAllFee", label="手续费", align="center", width="70")
        el-table-column(v-if="fieldPerms.transPayAllSplitList", prop="transPayAllSplitList", align="center", width="140")
          span(slot="header") 已完成出款/<br>总出款单数
        el-table-column(v-if="fieldPerms.transPayAllAccount", prop="transPayAllAccount.display", label="代理帐号", align="center", width="140")
        el-table-column(v-if="fieldPerms.transPayAllBankCardHolder", prop="transPayAllBankCardHolder", label="代理姓名", align="center", width="120")
        el-table-column(v-if="fieldPerms.transPayAllBankCardNo", prop="transPayAllBankCardNo", label="银行帐号", align="center", width="160")
        el-table-column(v-if="fieldPerms.transPayAllBankName", prop="transPayAllBankName", label="银行", align="center", width="120")
        el-table-column(v-if="fieldPerms.transPayAllNote", prop="transPayAllNote", label="备注", align="center", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.transPayAllEditor", prop="transPayAllEditor.display", label="操作人", align="center", width="120")
        el-table-column(v-if="fieldPerms.transPayAllUpdatedAt", prop="transPayAllUpdatedAt", label="更新时间", align="center", width="160")
        el-table-column(v-if="fieldPerms.TransWDAllStatus", label="管理", width="200", align="center", fixed="right")
          template(slot-scope="{ row }")
            el-link(v-if="buttonPerms.agencyCheckWithdrawalOrder")
              //- MARK: 状态仅有繁体字串可判断 应要有状态码可供判别
              router-link.links.mx-1(
                :to="{ path:'checkAgencyWithdrawalOrder', query: { title: `出款单 - ${row.transPayAllOrderId}`, id: row.id } }"
              ) {{ row.transPayAllOrderStatus === '完成' || row.transPayAllOrderStatus === '失败' ? '查看' : '出款' }}
            el-link.text-primary.m-1(v-if="buttonPerms.agencyShowWithdrawalOrderLog", @click="showLog(row)") 查看记录
            el-link.text-primary.m-1(v-if="buttonPerms.agencyAddWithdrawalOrderNote", @click="addNote(row)") 备注
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
import { getWithdrawOrderLogAPI, getWithdrawalOrdersAPI, editWithdrawalOrderAPI } from '@/api/agencyCapitalFlow';

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
          model: 'account_name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '提款金额',
          model: 'amount',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '银行',
          model: 'bank_name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '银行帐号',
          model: 'bank_card_no',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ],
      filterShow: [
        { label: '提款時間', model: 'time', component: 'filterDatePicker', props: { type: 'datetimerange' } }
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
        sort_field: 'created_at',
        sort_by: 'DESC'
      }

      Object.assign(APIParams, this.$refs.dataFilter.getFilterData());

      if (APIParams.time) {
        APIParams.checked_at_from = APIParams.time[0];
        APIParams.checked_at_to = APIParams.time[1];
        delete APIParams.time;
      }

      if (APIParams.successTime) {
        APIParams.succeed_sdate = APIParams.successTime[0];
        APIParams.succeed_edate = APIParams.successTime[1];
        delete APIParams.successTime;
      }

      getWithdrawalOrdersAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    showLog(order) {
      getWithdrawOrderLogAPI({ order_id: order.transPayAllOrderId }).then(response => {
        this.log.data = response.data.data;
        this.log.title = order.transPayAllOrderId + ' 记录';
        this.log.visible = true;
      });
    },
    addNote(order) {
      this.addNoteDialogFormData.id = order.id;
      this.addNoteDialogFormData.note = order.transPayAllNote;
      this.addNoteDialogVisible = true;
    },
    handleAddNote() {
      editWithdrawalOrderAPI(this.addNoteDialogFormData.id, { note: this.addNoteDialogFormData.note }).then(response => {
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
