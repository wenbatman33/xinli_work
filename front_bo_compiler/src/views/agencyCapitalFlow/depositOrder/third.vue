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
        el-table-column(v-if="fieldPerms.transDepThirdOrderId", prop="transDepThirdOrderId", label="单号", align="center", width="160", fixed)
        el-table-column(v-if="fieldPerms.transDepThirdCreatedAt", prop="transDepThirdCreatedAt", label="存款时间", align="center", width="160")
        el-table-column(v-if="fieldPerms.transDepThirdPayType", align="center", prop="transDepThirdPayType", label="存款方式", width="120")
        el-table-column(
          v-if="fieldPerms.transDepThirdChannel",
          align="center",
          prop="transDepThirdChannel",
          label="存款通道"
          width="200"
        )
        el-table-column(v-if="fieldPerms.transDepThirdAccount", label="代理帐号", prop="transDepThirdEditor", align="center", width="120")
        el-table-column(v-if="fieldPerms.transDepThirdRealName", prop="transDepThirdRealName", label="代理姓名", align="center", width="100")
        el-table-column(v-if="fieldPerms.transDepThirdAmount", label="存款金额", align="center", width="140")
          span(slot-scope="{ row }")  {{ row.transDepThirdAmount | formatMoney}}
        el-table-column(v-if="fieldPerms.transDepThirdDepositFee", label="存款手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.transDepThirdDepositFee | formatMoney }}
        el-table-column(v-if="fieldPerms.transDepThirdFee", label="三方手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.transDepThirdFee | formatMoney }}
        el-table-column(
          v-if="fieldPerms.transDepThirdOrderId",
          prop="transDepThirdOrderId",
          label="三方单号",
          align="center",
          width="180"
        )
        el-table-column(v-if="fieldPerms.transDepThirdNote", prop="transDepThirdNote", label="备注", align="center", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.transDepThirdStatus", label="状态", align="center", width="90")
          template(slot-scope="{ row }")
            el-tag(type="success", v-if="row.transDepThirdStatus.value === 3") {{ row.transDepThirdStatus.display }}
            el-tag(type="danger", v-else-if="row.transDepThirdStatus.value === 2") {{ row.transDepThirdStatus.display }}
            el-tag(v-else) {{ row.transDepThirdStatus.display }}
        el-table-column(v-if="fieldPerms.transDepThirdSuccessTime", prop="transDepThirdSuccessTime", label="完成时间", align="center", width="160")
        el-table-column(v-if="fieldPerms.transDepThirdEditor", prop="transDepThirdEditor", label="执行人", align="center", width="120")

        el-table-column(v-if="fieldPerms.transDepThirdStatus", label="管理", width="140", align="center", fixed="right")
          template(slot-scope="{ row }")
            template(v-if="row.transDepThirdStatus.value === 1")
              el-link.text-primary.m-2(v-if="buttonPerms.agencyFinishedTDepositOrder", @click="finish(row)") 完成
              el-link.text-primary.m-2(v-if="buttonPerms.agencyFailTDepositOrder", @click="fail(row)") 失败
            el-link.text-primary.m-2(v-if="buttonPerms.agencyShowTDepositOrderLog", @click="showLog(row)") 查看记录
            el-link.text-primary.m-2(v-if="buttonPerms.agencyAddTDepositOrderNote", @click="addNote(row)") 备注
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
import { searchChannelsAPI } from '@/api/payment/payChannel';

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
      orderDetail: {},
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
          label: '存款方式',
          model: 'service_code',
          component: 'filterSelect',
          props: {
            options: {
              'Third': '全部',
              'GW': '網關',
              'SP': '快捷',
              'AG': '代付',
              'BCS': '銀聯掃碼',
              'QQ': 'QQ掃碼',
              'WX': '微信掃碼',
              'WXM': '微信支付',
              'ALI': '支付寶',
              'TBC': '三方銀行卡',
              'LBC': '銀行卡',
              'ST': '三方结算',
              'TD': '三方充值',
              'AA': '支转支',
              'AB': '支转银',
              'YSF': '雲闪付',
              'JD': '京东支付',
            },
          },
        },
        {
          label: '存款通道',
          model: 'merchant_name',
          component: 'filterSelect',
          props: { options: {} }
        },
        {
          label: '三方单号',
          model: 'third_order_id',
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
  created() {
    searchChannelsAPI().then(response => {
      this.filterList.find(filter => filter.model === 'merchant_name').props.options = response.data.data.reduce((result, merchant) => {
        result[merchant.id] = merchant.gateName;
        return result;
      }, {});
    })
  },
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
        order_type: 'T'
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
      getDepositOrdersLogAPI({ order_id: order.transDepThirdOrderId }).then(response => {
        this.log.data = response.data.data;
        this.log.title = order.transDepThirdOrderId + ' 记录';
        this.log.visible = true;
      });
    },
    finish(order) {
      this.$swal({
        title: '是否完成此订单',
        html: `
          帐号: ${order.transDepThirdAccount && order.transDepThirdAccount.display} <br>
          姓名: ${order.transDepThirdRealName}<br>
          单号： ${order.transDepThirdOrderId}<br><br>
          存款金额: ${this.$options.filters.formatMoney(order.transDepThirdAmount)}<br>
          存款手续费: ${order.transDepThirdDepositFee}<br>
          <b>实际上分金额: ${this.$options.filters.formatMoney(order.transDepThirdAmount - order.transDepThirdDepositFee)}</b>
        `,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '完成',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          return finishedDepositOrdersAPI(order.id, { order_type: 'T' });
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
          return failDepositOrdersAPI(order.id, { remark, order_type: 'T'});
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
      this.addNoteDialogFormData.note = order.transDepThirdNote;
      this.addNoteDialogVisible = true;
    },
    handleAddNote() {
      editDepositOrderAPI(
        this.addNoteDialogFormData.id,
        { remark: this.addNoteDialogFormData.note, order_type: 'T'}
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
