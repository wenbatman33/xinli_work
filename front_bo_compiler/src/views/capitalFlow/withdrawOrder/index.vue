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
        el-table-column(v-if="fieldPerms.TransWDAllOrderId", prop="TransWDAllOrderId", label="单号", align="center", width="200", fixed)
        el-table-column(v-if="fieldPerms.TransWDAllStatus", label="状态", align="center", width="120")
          template(slot-scope="{ row }")
            b {{ row.TransWDAllStatus.display }}
            span(
              v-if="fieldPerms.TransWDAllRickCheck && row.TransWDAllRickCheck.value !== 0"
            ) <br>风控{{ row.TransWDAllRickCheck.display }}
        el-table-column(v-if="fieldPerms.TransWDAllCreatedAt", prop="TransWDAllCreatedAt", label="提款申请时间", align="center", width="200")
        el-table-column(v-if="fieldPerms.TransWDAllAccount", label="会员帐号", align="center", width="140")
          template(slot-scope="{ row }")
            member-display(
              :memberName="row.TransWDAllAccount",
              :memberId="row.TransWDAllMemberId",
              :groups="row.TransWDAllMemberGroup"
            )
        el-table-column(v-if="fieldPerms.TransWDAllRealName", prop="TransWDAllRealName", label="会员姓名", align="center", width="140")
        el-table-column(v-if="fieldPerms.TransWDAllBankNo", prop="TransWDAllBankNo", label="银行帐号", align="center", width="200")
        el-table-column(v-if="fieldPerms.TransWDAllBankName", prop="TransWDAllBankName", label="银行", align="center", width="120")
        el-table-column(v-if="fieldPerms.TransWDAllAmount", label="提款金额", align="center", width="120")
          template(slot-scope="{ row }")
            span {{ row.TransWDAllAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.TransWDAllRickCheck", label="风控审核", align="center", width="120")
          template(slot-scope="{ row }")
            span {{ row.TransWDAllRickCheck.display }}
        el-table-column(v-if="fieldPerms.TransWDAllNote", prop="TransWDAllNote", label="备注", align="center", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.TransWDAllEditor", prop="TransWDAllEditor", label="执行人", align="center", width="120")
        el-table-column(v-if="fieldPerms.TransWDAllUpdatedAt", prop="TransWDAllUpdatedAt", label="更新时间", align="center", width="200")
        el-table-column(v-if="fieldPerms.TransWDAllStatus", label="管理", width="200", align="center", fixed="right")
          template(slot-scope="{ row }")
            el-link(v-if="buttonPerms.checkWithdrawOrder && row.TransWDAllAccount")
              router-link.links.mx-1(
                :to="{ path:'checkWithdrawOrder', query: { title: `提款单 - ${row.TransWDAllOrderId}`, id: row.id } }"
              ) {{ row.TransWDAllStatus.value === 1 ? '审核' : '查看' }}
            el-link.text-primary.m-1(v-if="buttonPerms.showWithdrawOrderLog", @click="showLog(row)") 查看记录
            el-link.text-primary.m-1(v-if="buttonPerms.addWithdrawOrderNote", @click="addNote(row)") 备注
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
  getWithdrawOrdersAPI,
  getWithdrawOrderLogAPI,
  editWithdrawOrderAPI
} from '@/api/capitalFlow/withdrawOrder';

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
          label: '会员帐号',
          model: 'account',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '会员姓名',
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
        },
        {
          label: '风控审核',
          model: 'risk_check',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '否', 1: '是' },
          },
        },
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
        APIParams.created_at_from = APIParams.time[0];
        APIParams.created_at_to = APIParams.time[1];
        delete APIParams.time;
      }

      if (APIParams.successTime) {
        APIParams.succeed_sdate = APIParams.successTime[0];
        APIParams.succeed_edate = APIParams.successTime[1];
        delete APIParams.successTime;
      }

      getWithdrawOrdersAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    showLog(order) {
      getWithdrawOrderLogAPI({ order_id: order.TransWDAllOrderId }).then(response => {
        this.log.data = response.data.data;
        this.log.title = order.TransWDAllOrderId + ' 记录';
        this.log.visible = true;
      });
    },
    addNote(order) {
      this.addNoteDialogFormData.id = order.id;
      this.addNoteDialogFormData.note = order.TransWDAllNote;
      this.addNoteDialogVisible = true;
    },
    handleAddNote() {
      editWithdrawOrderAPI(this.addNoteDialogFormData.id, { remark: this.addNoteDialogFormData.note }).then(response => {
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
