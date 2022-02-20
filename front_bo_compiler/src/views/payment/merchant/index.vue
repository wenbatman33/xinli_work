<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
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
      el-table(:data="tableData", height="75vh")
        el-table-column(v-if="fieldPerms.merchantName", prop="merchantName", label="商户名称", align="center", width="120")
        el-table-column(v-if="fieldPerms.merchantSn", prop="merchantSn", label="商户编号", align="center", width="160")
        el-table-column(
          v-if="fieldPerms.merchantSettlTimeStartTime || fieldPerms.merchantSettlTimeEndTime",
          label="日切时间",
          align="center",
          width="300"
        )
          template(slot-scope="{ row }")
            span {{ row.merchantSettleTimeString }}
        el-table-column(v-if="fieldPerms.merchantHasAgentPay", prop="merchantHasAgentPay", label="是否代付", align="center")
        el-table-column(v-if="fieldPerms.merchantFrozenAmount", label="冻结金额", align="center", width="100")
          template(slot-scope="{ row }")
            span {{ row.merchantFrozenAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.merchantRemainAmount", label="馀额", align="center", width="100")
          template(slot-scope="{ row }")
            span {{ row.merchantRemainAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.merchantRemark", prop="merchantRemark", label="备注", align="center", show-overflow-tooltip)
        el-table-column(v-if="buttonPerms.editMerchant || buttonPerms.settleMerchant", label="管理", width="120", align="center")
          template(slot-scope="{ row }")
            el-link.text-primary.mx-2(v-if="buttonPerms.showMerchantDetail", type="primary")
              router-link(
                :to="{ path:'merchantLog', query: { title: `商户 - ${row.merchantName}`, id: row.id } }"
              ) 明細
            el-link.text-primary.mx-2(v-if="buttonPerms.editMerchant", type="primary")
              router-link(
                :to="{ path:'merchantEdit', query: { title: `商户 - ${row.merchantName}`, id: row.id } }"
              ) 编辑
            template(v-if="buttonPerms.settleMerchant")
              el-link.text-primary.mx-2(
                v-if="row.merchantHasSettle === 'Y'",
                type="primary",
                @click="settle(row)"
              ) 结算
    //- dialog
    el-dialog(:visible.sync="dialogVisible", title="结算", @closed="dialogClose", top="5vh")
      el-form(:model="formData", ref="form", label-width="100px", :rules="rules")
        el-card.mb-4(shadow="always")
          div(slot="header") 结算商户
          el-col(:span="3", align="right")
            p 商户名称:
            p 商户编号:
            p 可用资金:
          el-col(:offset="1", :span="20", align="left")
            p {{ merchantDetail.name }}
            p {{ merchantDetail.sn }}
            p {{ merchantDetail.remainAmount }}
        el-form-item(label="结算至")
          el-autocomplete(
            placeholder="请输入卡号",
            v-model="bankCardNo",
            :fetch-suggestions="querySearchAsync",
            @select="handleSelectBankCard"
          )
        template(v-if="settleTargetDetail")
          el-card.mb-3(shadow="always")
            el-col(:span="3", align="right")
              p 银行名称:
              p 户&emsp;&emsp;名:
              p 金流群组:
            el-col(:offset="1", :span="20", align="left")
              p {{ settleTargetDetail.BCardName }}
              p {{ settleTargetDetail.BCardHolder }}
              p {{ settleTargetDetail.BCardGroupName && settleTargetDetail.BCardGroupName.display }}
          el-form-item(label="结帐金额", prop="amount")
            el-input(type="number", v-model="formData.amount", :min="0")
          el-form-item(v-if="fee !== -1", size="mini", label="手續費")
            span {{ fee | formatMoney }} (此金额为试算 正确金额以系统为主)
          el-form-item(label="三方单号", prop="third_order_id")
            el-input(v-model="formData.third_order_id")
          el-form-item(label="备注")
            el-input(type="textarea", v-model="formData.reason", :autosize="{ minRows: 2, maxRows: 6}")
        el-form-item
          el-button(@click="handleSettle()") 储存
</template>

<script>
import { getMerchantsAPI, settleMerchantAPI } from '@/api/payment/merchant';
import { getBankCardsAPI } from '@/api/payment/bankCard';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      dialogVisible: false,
      bankCardNo: '',
      filterList: [
        {
          label: '商户编号',
          model: 'merchant_sn',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '商户名称',
          model: 'name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '是否代付',
          model: 'has_ap',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '否', 1: '是' },
          },
        },
        { label: '日切起始时间', model: 'settle_stime', component: 'filterTimePicker', props: { format: 'HH:mm' } },
        { label: '日切结束时间', model: 'settle_etime', component: 'filterTimePicker', props: { format: 'HH:mm' } }
      ],
      formData: {
        amount: '',
        third_order_id: '',
        reason: '',
        bank_card_id: 0
      },
      rules: {
        amount: [
          { required: true, message: '結算金額為必填' }
        ],
        third_order_id: [
          { required: true, message: '三方單號為必填' }
        ]
      },
      merchantDetail: {},
      settleTargetDetail: null
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
  },
  computed: {
    fee() {
      if (this.formData.amount && this.settleTargetDetail && this.merchantDetail.feeType) {
        if (this.merchantDetail.feeType.value) {
          return this.merchantDetail.fee;
        }

        return this.formData.amount / 1000 * this.merchantDetail.fee
      } else {
        return -1;
      }
    }
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

      getMerchantsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    dialogClose() {
      this.settleTargetDetail = null;
      this.bankCardNo = '';
      this.formData.amount = '';
      this.formData.third_order_id = '';
      this.formData.reason = '';
    },
    settle(merchant) {
      this.merchantDetail.name = merchant.merchantName;
      this.merchantDetail.sn = merchant.merchantSn;
      this.merchantDetail.remainAmount = merchant.merchantRemainAmount;
      this.merchantDetail.feeType = merchant.merchantSettleFeeType;
      this.merchantDetail.fee = merchant.merchantSettleFee;
      this.merchantDetail.id = merchant.id;
      this.dialogVisible = true;
    },
    querySearchAsync(keyword, callback) {
      if (keyword.length === 0 || (this.settleTargetDetail && keyword === this.settleTargetDetail.BCardNo)) {
        callback([]);
      } else {
        getBankCardsAPI({ bank_card_no: keyword }).then(response => {
          callback(
            response.data.data.map(bankcard => {
              return {
                value: bankcard.BCardNo,
                data: bankcard
              }
            })
          );
        });
      }
    },
    handleSelectBankCard({ data }) {
      this.formData.bank_card_id = data.id;
      this.settleTargetDetail = data;
    },
    handleSettle() {
      this.$refs.form.validate(valid => {
        if (valid) {
          settleMerchantAPI(this.merchantDetail.id, this.formData).then(() => {
            this.$message.success('结算成功');
            this.getData();
          });
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.el-autocomplete {
  display: block;
}
</style>
