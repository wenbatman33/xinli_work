<template lang="pug">
  .container-fluid
    .d-flex.justify-content-around
      el-date-picker(
        v-model="timeRange",
        type="daterange",
        value-format="yyyy-MM-dd",
        :clearable="false",
        @change="getData()",
        style="min-width: 300px"
      )
      el-select.ml-3(v-model="status", @input="getData()", style="min-width: 140px")
        el-option(value="all", label="不限状态")
        el-option(:value="0", label="备货中")
        el-option(:value="1", label="已完成")
      el-input.ml-3(v-model="orderId", placeholder="请输入订单号", @input="debounceGetData()")
      el-input.ml-3(v-model="account", placeholder="请输入会员帐号", @input="debounceGetData()")
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
      el-table(:data="tableData", border, stripe, height="75vh")
        el-table-column(label="订单时间", prop="createdAt", align="center", width="180")
        el-table-column(label="会员帐号", align="center")
          template(slot-scope="{ row }")
            member-display(
              :memberName="row.memberAccount",
              :memberId="row.memberId",
              :groups="row.memberGroup"
            )
        el-table-column(label="订单号" align="center")
          el-link.text-primary(slot-scope="{ row }", @click="openDetail(row.orderId)") {{ row.orderId }}
        el-table-column(label="完成时间", prop="successAt", align="center", width="180")
        el-table-column(label="订单状态", prop="orderStatus.display", align="center", width="100")
        el-table-column(label="内部备注", prop="note", align="center", show-overflow-tooltip)
        el-table-column(label="操作", align="center", width="140")
          template(slot-scope="{ row }")
            el-link.mx-1.text-primary(v-if="row.orderStatus.value === 0", @click="openDetail(row.orderId)") 出货
            el-link.mx-1.text-primary(@click="editNote(row)") 内部备注
    //- detail dialog
    el-dialog(:visible.sync="dialogVisible", top="5vh")
      detail(v-if="dialogVisible", :orderId="dialogOrderId", canShip, @ship="orderShipped")
    //- note dialog
    el-dialog(:visible.sync="noteDialogVisible", title="填写订单内部备注")
      el-input(v-model="noteDialogData", @keyup.enter.native="handleEditNote")
      .text-right.mt-3
        el-button(@click="noteDialogVisible = false") 取消
        el-button(type="primary", @click="handleEditNote") 确认
</template>

<script>
import debounce from 'lodash/debounce';
import { getOrdersAPI, editOrderAPI } from '@/api/dreamCity/order';
import detail from '../order/_detail.vue';

export default {
  components: { detail },
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      account: '',
      timeRange: [],
      status: 'all',
      orderId: '',
      dialogVisible: false,
      dialogOrderId: '',
      noteDialogVisible: false,
      noteDialogid: '',
      noteDialogData: '',
    }
  },
  created() {
    const now = new Date();
    const endDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    now.setDate(now.getDate() - 30);
    const startDate = `${now.getFullYear()}-${now.getMonth() + 1 < 10 ? '0' + (now.getMonth() + 1 ): now.getMonth() + 1}-${now.getDate() < 10 ? '0' + now.getDate() : now.getDate()}`;
    this.timeRange = [startDate, endDate];

    this.getData();
    this.debounceGetData = debounce(this.getData, 500);
  },
  methods: {
    getData() {
      const params = {}
      const paramsTemp = {
        per_page: this.pageSize,
        page: this.currentPage,
        sdate: this.timeRange[0],
        edate: this.timeRange[1],
        account: this.account,
        order_id: this.orderId,
        status: this.status
      }

      Object.keys(paramsTemp).map(key => {
        if (paramsTemp[key] === 'all') return;
        if (paramsTemp[key] === 0 || paramsTemp[key]) {
          params[key] = paramsTemp[key];
        }
      })

      getOrdersAPI(params)
      .then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    openDetail(orderId) {
      this.dialogOrderId = orderId;
      this.dialogVisible = true;
    },
    editNote({ orderId, note }) {
      this.noteDialogId = orderId;
      this.noteDialogData = note;
      this.noteDialogVisible = true;
    },
    handleEditNote() {
      editOrderAPI(this.noteDialogId, { note: this.noteDialogData }).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(order => order.id === response.data.data[0].id),
          response.data.data[0]
        )

        this.$message({
          message: '内部备注更新成功',
          type: 'success'
        });

        this.noteDialogVisible = false;
      });
    },
    orderShipped(shippedOrder) {
      this.$set(this.tableData, this.tableData.findIndex(order => order.id === shippedOrder.id), shippedOrder)
    }
  }
}
</script>
