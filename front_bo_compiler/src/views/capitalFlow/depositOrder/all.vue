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
        el-table-column(v-if="fieldPerms.transDepAllOrderId", prop="transDepAllOrderId", label="单号", align="center", width="200", fixed)
        el-table-column(v-if="fieldPerms.transDepAllCreatedAt", prop="transDepAllCreatedAt", label="存款时间", align="center", width="200")
        el-table-column(v-if="fieldPerms.transDepAllPayTypeBankCode", align="center", prop="transDepAllPayTypeBankCode", width="200")
          template(slot="header")
            span 存款方式 / <br>
            span 银行代码+收款户名
        el-table-column(v-if="fieldPerms.transDepAllChannelBankCard", align="center", label="存款通道 / 银行卡号", width="200")
          template(slot-scope="{ row }")
            span {{ row.transDepAllChannelBankCard }}
            span(v-if="row.transDepAllOrderId[0] === 'D' && row.transDepAllBankCardVirtualNo") <br>({{ row.transDepAllBankCardVirtualNo }})
        el-table-column(v-if="fieldPerms.transDepAllAccount", label="会员帐号", align="center", width="140")
          template(slot-scope="{ row }")
            member-display(
              :memberName="row.transDepAllAccount.display",
              :memberId="row.transDepAllAccount.value",
              :groups="row.transDepGroups"
            )
        el-table-column(v-if="fieldPerms.transDepAllRealName", prop="transDepAllRealName", label="会员姓名", align="center", width="140")
        el-table-column(v-if="fieldPerms.transDepAllAmount", label="存款金额", align="center", width="140")
          span(slot-scope="{ row }") {{ row.transDepAllAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.transDepAllDepositFee", label="存款手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.transDepAllDepositFee | formatMoney }}
        el-table-column(v-if="fieldPerms.transDepAllFee", label="三方手续费", align="center", width="90")
          span(slot-scope="{ row }") {{ row.transDepAllFee | formatMoney }}
        el-table-column(
          v-if="fieldPerms.transDepAllThirdRemark",
          prop="transDepAllThirdRemark",
          label="三方单号 / 附言",
          align="center",
          width="180"
        )
        el-table-column(v-if="fieldPerms.transDepAllNote", prop="transDepAllNote", label="备注", align="center", show-overflow-tooltip)
        el-table-column(v-if="fieldPerms.transDepAllStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(type="success", v-if="row.transDepAllStatus.value === 3") {{ row.transDepAllStatus.display }}
            el-tag(type="danger", v-else-if="row.transDepAllStatus.value === 2") {{ row.transDepAllStatus.display }}
            el-tag(v-else) {{ row.transDepAllStatus.display }}
        el-table-column(v-if="fieldPerms.transDepAllSuccessTime", prop="transDepAllSuccessTime", label="完成时间", align="center", width="200")
        el-table-column(v-if="fieldPerms.transDepAllEditor", prop="transDepAllEditor", label="执行人", align="center", width="120")

        el-table-column(v-if="fieldPerms.transDepAllStatus", label="管理", width="140", align="center", fixed="right")
          template(slot-scope="{ row }")
            template(v-if="row.transDepAllStatus.value === 1")
              el-link.text-primary.m-2(v-if="buttonPerms.finishedAllDepositOrder", @click="finish(row)") 完成
              el-link.text-primary.m-2(v-if="buttonPerms.failAllDepositOrder", @click="fail(row)") 失败
            el-link.text-primary.m-2(v-if="buttonPerms.showAllDepositOrderLog", @click="showLog(row)") 查看记录
            el-link.text-primary.m-2(v-if="buttonPerms.addAllDepositOrderNote", @click="addNote(row)") 备注
            el-link.text-primary.m-2(v-if="row.transDepAllStatus.value !== 2 && row.transDepAllStatus.value !== 3 && row.transDepAllOrderId[0] === 'D' &&buttonPerms.changeAllDepositOrder", @click="change(row)") 连结异动单
            el-link.text-primary.m-2(v-if="buttonPerms.adjustAllDepositOrder && row.transDepAllStatus.value === 3", @click="addAdjust(row)") 存单错误
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
    //- 连结异动单 dialog
    el-dialog(:visible.sync="changeDialog.visible", :title="changeDialog.title", @closed="changeDialogClose", top="5vh")
      el-form(:model="linkChangeData", ref="changeForm", label-width="100px")
        el-card.mb-4(shadow="always")
          div(slot="header") 存单资讯
          el-col(:span="3", align="right")
            p 玩家帐号:
            p 存款时间:
            p 存款金额:
            p 存款银行:
            p 存款帐号:
          el-col(:offset="1", :span="20", align="left")
            p {{ orderDetail.account || '-' }}
            p {{ orderDetail.createdAt || '-' }}
            p {{ orderDetail.amount || 0}}
            p {{ orderDetail.bankCard || '-' }}
            p {{ orderDetail.bankCardNo || '-' }}
        el-form-item(label="连结异动单")
          el-input(placeholder="请输入异动单号", v-model.trim="changeNo")
            el-button(slot="append", :disabled="! changeNo.length", @click="fetchChange") 读取
        template(v-if="linkChange")
          el-card.mb-3(shadow="always")
            el-col(:span="5", align="right")
              p 异动单时间:
              p 银&emsp;&emsp;&emsp;行:
              p 卡&emsp;&emsp;&emsp;号:
              p 科&emsp;&emsp;&emsp;目:
            el-col(:offset="1", :span="18", align="left")
              p {{ linkChange.updated_at }}
              p {{ `${linkChange.bank_code} ${linkChange.bank_name} ${linkChange.bank_cardholder}` }}
              p {{ linkChange.bank_card_no }}
                span(v-if="linkChange.bank_card_virtual_no") ({{linkChange.bank_card_virtual_no }})
              p {{ linkChange.account_title_type }} / {{ linkChange.account_title_name }}
          el-form-item(label="说明", prop="remark", :rules="[{ required: true, message: '说明为必填' }]")
            el-input(type="textarea", v-model="linkChangeData.remark", :autosize="{ minRows: 2, maxRows: 6}")
          el-form-item
            el-button(@click="handleLinkChange()") 储存
    //- 资金调整 dialog
    el-dialog(
      title="玩家资金调整",
      :visible.sync="adjustDialog.visible"
    )
      el-form(:model="adjustDialog.data", ref="adjustForm", label-width="auto", :rules="adjustRules")
        el-form-item(label="帐号")
          span {{ adjustDialog.account }}
        el-form-item(label="类型", required)
          span 存单错误
        el-form-item(label="扣分或上分", required)
          el-radio-group(v-model="adjustDialog.data.sign_type")
            el-radio(:label="0") 扣分
            el-radio(:label="1") 上分
          .bg-danger.text-light.px-2(v-if="adjustDialog.data.sign_type === 0") 不足金额将留存在冻结金额内，当玩家有资金进入时，将优先补足冻结金额缺口
        el-form-item(label="调整金额", prop="amount")
          el-input(type="number",v-model.number="adjustDialog.data.amount", step="0.01", min="0.01")
        el-form-item(label="流水限制")
          span 1倍
        el-form-item(label="备注内容", prop="note")
          el-input(type="textarea", v-model="adjustDialog.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
        el-form-item
          el-button(@click="confirmAdjust()") 确认
    //- 确认资金调整 dialog
    el-dialog(title="系统提示", :visible.sync="confirmAdjustDialogVisible", center)
      h3.text-center 新增玩家资金调整 是否送出？
      .bg-light.col-10.offset-1.mt-4.p-3
        .p-1 玩家帐号: {{ adjustDialog.account }}
        .p-1 类型: 存单错误
        .p-1.text-danger(v-if="adjustDialog.data.sign_type === 0") 调整金额: {{ adjustDialog.data.amount * -1 }}
        .p-1(v-else) 调整金额: {{ adjustDialog.data.amount }}
        .p-1 流水限制: 1倍
        .p-1 备注: {{ adjustDialog.data.note }}
      .text-center.mt-4
        el-button(@click="confirmAdjustDialogVisible = false") 取消
        el-button(type="primary", @click="handleAdjust()") 送出审核
</template>

<script>
import {
  getDepositOrdersAPI,
  getDepositOrdersLogAPI,
  finishedDepositOrdersAPI,
  failDepositOrdersAPI,
  editDepositOrderAPI,
  depositOrderLinkChangeAPI
} from '@/api/capitalFlow/depositOrder';
import { getChangeAPI } from '@/api/payment/bankCard';
import { searchChannelsAPI } from '@/api/payment/payChannel';
import { addDepositAdjustAPI } from '@/api/member/cashAdjust.js';

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
      changeDialog: {
        title: '',
        visible: false
      },
      linkChangeData: {
        remark: ''
      },
      changeNo: '',
      linkChange: null,
      changeRemark: '',
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
              'all': '全部',
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
      },
      adjustDialog: {
        visible: false,
        account: '',
        data: {
          order_id: '',
          sign_type: 0,
          amount: '',
          note: ''
        }
      },
      confirmAdjustDialogVisible: false,
      adjustRules: {
        amount: [
          { required: true, min: 0.01, type: 'number', message: '金额必须大于0.01' }
        ],
        note: [{ required: true, message: '备注为必填' }]
      },
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
        page: this.currentPage
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
      getDepositOrdersLogAPI({ order_id: order.transDepAllOrderId }).then(response => {
        this.log.data = response.data.data;
        this.log.title = order.transDepAllOrderId + ' 记录';
        this.log.visible = true;
      });
    },
    finish(order) {
      this.$swal({
        title: '是否完成此订单',
        html: `
          帐号: ${order.transDepAllAccount && order.transDepAllAccount.display} <br>
          姓名: ${order.transDepAllRealName}<br>
          单号： ${order.transDepAllOrderId}<br><br>
          存款金额: ${this.$options.filters.formatMoney(order.transDepAllAmount)}<br>
          存款手续费: ${order.transDepAllDepositFee}<br>
          <b>实际上分金额: ${this.$options.filters.formatMoney(order.transDepAllAmount - order.transDepAllDepositFee)}</b>
        `,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '完成',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          return finishedDepositOrdersAPI(order.id);
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
          return failDepositOrdersAPI(order.id, { remark });
        }

        return Promise.reject();
      }).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(tableOrder => tableOrder.id === response.data.data[0].id),
          response.data.data[0]
        )
        this.$swal('成功！', '此订单已完成退回', 'success');
      }).catch(() => {
        this.$swal('未提交失败', '', 'info');
      })
    },
    addNote(order) {
      this.addNoteDialogFormData.id = order.id;
      this.addNoteDialogFormData.note = order.transDepAllNote;
      this.addNoteDialogVisible = true;
    },
    handleAddNote() {
      editDepositOrderAPI(this.addNoteDialogFormData.id, { remark: this.addNoteDialogFormData.note }).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(order => order.id === response.data.data[0].id),
          response.data.data[0]
        );
        this.addNoteDialogVisible = false;
        this.$message.success('修改备注成功');
      })
    },
    change(order) {
      this.orderDetail.id = order.id;
      this.orderDetail.account = order.transDepAllRealName;
      this.orderDetail.createdAt = order.transDepAllCreatedAt;
      this.orderDetail.amount = order.transDepAllAmount;
      this.orderDetail.bankCard = `${order.transDepAllBankCardName} ${order.transDepAllBankCardHolder}`;
      this.orderDetail.bankCardNo = order.transDepAllChannelBankCard;
      this.changeDialog.title = order.transDepAllOrderId + ' 连结异动单';
      this.changeDialog.visible = true;
    },
    changeDialogClose() {
      this.linkChange = null;
      this.changeNo = '';
      this.linkChangeData.remark = '';
    },
    fetchChange() {
      getChangeAPI(this.changeNo)
      .then(response => {
        // 注意！目前 API 若查无资料是回传空字串！所以这样写判断
        // 感谢您的注意
        if (response.data.data) {
          this.linkChange = response.data.data[0];
        } else {
          return Promise.reject();
        }
      })
      .catch(() => {
        this.$message.error('查无此异动单！');
      });
    },
    handleLinkChange() {
      this.$refs.changeForm.validate(valid => {
        if (valid) {
          const data = {
            log_id: this.linkChange.id,
            remark: this.linkChangeData.remark
          }

          depositOrderLinkChangeAPI(this.orderDetail.id, data)
          .then(() => {
            this.$message.success('连结异动单成功！');
            this.changeDialog.visible = false;
            this.getData();
          });
        }
      });
    },
    addAdjust(order) {
      this.adjustDialog.account = order.transDepAllAccount && order.transDepAllAccount.display;
      this.adjustDialog.data.order_id = order.transDepAllOrderId;
      this.adjustDialog.data.sign_type = 0;
      this.adjustDialog.data.amount = '';
      this.adjustDialog.data.note = '';
      this.adjustDialog.visible = true;
      this.$nextTick(() => {
        this.$refs.adjustForm.resetFields();
      });
    },
    confirmAdjust() {
      this.$refs.adjustForm.validate(valid => {
        if (valid) this.confirmAdjustDialogVisible = true;
      });
    },
    handleAdjust() {
      addDepositAdjustAPI(this.adjustDialog.data).then(() => {
        this.adjustDialog.visible = false;
        this.confirmAdjustDialogVisible = false;
        this.$message.success('存单错误申请已成功送出');
      })
    },
  }
}
</script>
