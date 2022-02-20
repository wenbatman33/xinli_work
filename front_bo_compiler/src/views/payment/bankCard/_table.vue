<template lang="pug">
  .container-fluid
    data-filter.mt-3(ref="dataFilter", :filterList="filterList", @change="getData()")
    .text-right
      el-link.mx-2(:underline="false")
        el-tooltip(content="点击更新资料", effect="light", @click.native="getData()")
          span
            i.el-icon-refresh 取得资料时间: {{ getDataAt }}
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
      el-table(:data="tableData", height="63vh")
        el-table-column(v-if="fieldPerms.BCardGroupName", label="金流群组", align="center", width="120")
          template(slot-scope="{ row }")
            el-tag {{ row.BCardGroupName.display }}
        el-table-column(v-if="fieldPerms.BCardNo || fieldPerms.BCardVirtualNo", label="卡号", align="center", width="180")
          template(slot-scope="{ row }")
            span(v-if="row.BCardNo") {{ row.BCardNo }}
            span(v-if="row.BCardVirtualNo") <br> ({{ row.BCardVirtualNo }})
        el-table-column(v-if="fieldPerms.BCardName", prop="BCardName", label="银行名称", align="center", width="140")
        el-table-column(v-if="fieldPerms.BCardHolder", prop="BCardHolder", label="户名", align="center", width="80")
        el-table-column(v-if="fieldPerms.BCardLimit", label="每日上限", align="center", width="120")
          template(slot-scope="{ row }")
            | {{ row.BCardLimit | formatMoney}}
        el-table-column(
          v-if="fieldPerms.BCardTransIn || fieldPerms.BCardTransOut",
          label="进/出",
          align="center",
          width="160"
        )
          template(slot-scope="{ row }")
            span(v-if="fieldPerms.BCardTransIn") {{ row.BCardTransIn }}
            span(v-else) --
            span &nbsp;/&nbsp;
            span(v-if="fieldPerms.BCardTransOut") {{ row.BCardTransOut }}
            span(v-else) --
        el-table-column(v-if="fieldPerms.BCardBalance", label="帐户馀额", align="center", width="80")
          template(slot-scope="{ row }")
            | {{ row.BCardBalance | formatMoney}}
        el-table-column(v-if="fieldPerms.BCardShow", label="上下架", align="center")
          template(slot-scope="{ row }")
            | {{ row.BCardShow.display }}
        el-table-column(v-if="fieldPerms.BCardStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            | {{ row.BCardStatus.display }}
        el-table-column(v-if="fieldPerms.BCardNote", label="备注", align="center")
          template(slot-scope="{ row }")
            line-clamp(:content="row.BCardNote")
        el-table-column(label="管理", width="180", align="center")
          template(slot-scope="{ row }")
            el-link.text-primary.mx-2(
              v-if="buttonPerms.transferBankCard && fieldPerms.BCardStatus && row.BCardStatus.value && fieldPerms.BCardFrozen && ! row.BCardFrozen.value",
              type="primary",
              @click="transfer(row)"
            ) 转帐
            el-link.text-primary.mx-2(v-if="buttonPerms.editBankCard", type="primary")
              router-link(
                :to="{ path:'bankCardDetail', query: { title: `银行卡 - ${row.BCardNo}`, id: row.id } }"
              ) 编辑
            el-link.text-primary.mx-2(
              v-if="buttonPerms.changeBankCard && fieldPerms.BCardStatus && row.BCardStatus.value && fieldPerms.BCardFrozen && ! row.BCardFrozen.value",
              type="primary",
              @click="change(row)"
            ) 异动
            el-link.text-primary.mx-2(v-if="buttonPerms.showBankCardDetail", type="primary")
              router-link(
                :to="{ path:'bankCardLog', query: { title: `银行卡明细 - ${row.BCardNo}`, id: row.id } }"
              ) 明细
            el-link.text-primary.mx-2(
              v-if="fieldPerms.BCardShow && buttonPerms.editBankCardShow",
              type="primary",
              @click="editShow(row)"
            ) {{ row.BCardShow.value ? '下架' : '上架' }}
            el-link.text-primary.mx-2(
              v-if="fieldPerms.BCardStatus && buttonPerms.editBankCardStatus",
              type="primary",
              @click="editStatus(row)"
            ) {{ row.BCardStatus.value ? '停用' : '启用' }}
            template(
              v-if="buttonPerms.frozenBankCard && fieldPerms.BCardStatus && fieldPerms.BCardFrozen && row.BCardStatus.value"
            )
              el-link.text-primary.mx-2(
                v-if="row.BCardFrozen.value",
                type="primary",
                @click="$message.warning('目前无法解除冻结')"
              ) 解除冻结
              el-link.text-primary.mx-2(
                v-else,
                type="primary",
                @click="frozen(row)"
              ) 冻结
    //- frozen dialog
    el-dialog(:visible.sync="frozenDialog.visible", title="冻结银行卡", @close="handleClose('frozenForm')")
      el-card.mb-4(shadow="always")
        div(slot="header") 银行卡资讯
        el-col(:span="3", align="right")
          p 户&emsp;&emsp;名:
          p 银行名称:
          p 卡&emsp;&emsp;号:
          p 目前馀额:
        el-col(:offset="1", :span="20", align="left")
          p {{ frozenDialog.bankCardDetail.holder }}
          p {{ frozenDialog.bankCardDetail.name }}
          p {{ frozenDialog.bankCardDetail.no }}
          p {{ frozenDialog.bankCardDetail.balance }}
      el-form(:model="frozenDialog", ref="frozenForm", label-width="95px")
        el-form-item(label="冻结金额:")
          el-input(disabled, :value="frozenDialog.bankCardDetail.balance")
        el-form-item(label="说明:", prop="description", :rules="[{ required: true, message: '必须填写说明' }]")
          el-input(type="textarea", v-model="frozenDialog.description", :autosize="{ minRows: 6, maxRows: 20}")
        el-form-item
          el-button(@click="handleFrozen()") 确认冻结
    //- change dialog
    el-dialog(:visible.sync="changeDialog.visible", title="新增异动", top="10vh", @close="handleClose('changeForm')")
      el-card.mb-4(shadow="always")
        div(slot="header") 银行卡资讯
        el-col(:span="3", align="right")
          p 户&emsp;&emsp;名:
          p 银行名称:
          p 卡&emsp;&emsp;号:
          p 目前馀额:
        el-col(:offset="1", :span="20", align="left")
          p {{ changeDialog.bankCardDetail.holder }}
          p {{ changeDialog.bankCardDetail.name }}
          p {{ changeDialog.bankCardDetail.no }}
          p {{ changeDialog.bankCardDetail.balance }}
      el-form(:model="changeDialog", ref="changeForm", label-width="95px")
        el-form-item(label="科目", prop="account", :rules="[{ required: true, message: '必须选择科目' }]")
          el-cascader(v-model="changeDialog.account", :options="account", :props="{ expandTrigger: 'hover' }", @change="handleChangeAccountTitle")
            template(slot-scope="{ data, node }")
              span {{ data.label }}
              span(v-if="! node.isLeaf") ({{ data.children.length }})
        el-form-item(label="异动金额:", prop="amount", :rules="[{ required: true, message: '必须填写异动金额' }]")
          el-input(type="number", v-model.number="changeDialog.amount", min="0")
        el-form-item(label="手续费:", prop="fee", :rules="[{ required: true, message: '必须填写手续费' }]")
          el-input(type="number", v-model.number="changeDialog.fee", min="0")
        el-form-item(label="说明:", prop="description", :rules="[{ required: changeNoteRequired, message: '必须填写说明' }]")
          el-input(type="textarea", v-model="changeDialog.description", :autosize="{ minRows: 6, maxRows: 20}")
        el-form-item
          el-button(@click="handleChange()") 确认异动
    //- transfer dialog
    el-dialog(:visible.sync="transferDialog.visible", title="新增转帐", top="5vh", @close="handleClose('transferForm')")
      el-card.mb-4(shadow="always")
        div(slot="header") 转出银行卡资讯
        .d-flex
          p.w-25 户名:
          p {{ transferDialog.bankCardDetail.holder }}
        .d-flex
          p.w-25 银行名称:
          p {{ transferDialog.bankCardDetail.name }}
        .d-flex
          p.w-25 卡号:
          p {{ transferDialog.bankCardDetail.no }}
      el-select.w-100.mb-3(v-model="transferType" placeholder="请选择")
        el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
      el-form(v-if="transferType === 1" :model="transferDialog", ref="transferForm", label-width="95px")
        el-card.mb-3(v-if="transferDialog.transferToDetail")
          .d-flex
            p.w-25 户名:
            p {{ transferDialog.transferToDetail.holder }}
          .d-flex
            p.w-25 银行名称:
            p {{ transferDialog.transferToDetail.name }}
          .d-flex
            p.w-25 尚可入帐额度:
            p {{ transferDialog.transferToDetail.canTransferLimit }}
        el-form-item(v-if="transferTo.length", label="转入银行卡", prop="bankCard", :rules="[{ required: true, message: '必须选择一个转出帐号' }]")
          el-cascader(
            v-model="transferDialog.bankCard",
            :options="transferTo",
            :props="{ expandTrigger: 'hover' }",
            @change="findTransferToCard"
          )
            template(slot-scope="{ data, node }")
              span {{ data.label }}
              span(v-if="! node.isLeaf") ({{ data.children.length }})
        el-form-item(v-else, label="转入银行卡", required)
          b.text-danger 无可转入银行卡
        el-form-item(label="转帐金额:", prop="amount", :rules="[{ required: true, message: '必须填写异动金额' }]")
          el-input(type="number", v-model.number="transferDialog.amount", min="0")
        el-form-item(label="手续费:", prop="fee", :rules="[{ required: true, message: '必须填写手续费' }]")
          el-input(type="number", v-model.number="transferDialog.fee", min="0")
        el-form-item(label="说明:", prop="description", :rules="[{ message: '必须填写说明' }]")
          el-input(type="textarea", v-model="transferDialog.description", :autosize="{ minRows: 6, maxRows: 20}")
        el-form-item(v-if="transferTo.length")
          el-button(@click="handleTransfer(1)") 确认转帐
        el-form-item(v-else)
          el-button(disabled)
            b.text-danger 无可转入银行卡
      el-form(v-else-if="transferType === 2", :model="merchantTransferDialog", ref="transferForm", label-width="95px")
        el-card.mb-3(v-if="merchantTransferDialog.merchantTransferToDetail")
          .d-flex
            p.w-25 商户编号:
            p {{ merchantTransferDialog.merchantTransferToDetail.number }}
          .d-flex
            p.w-25 可用余额:
            p {{ merchantTransferDialog.merchantTransferToDetail.remain }}
        el-form-item(v-if="canTransferMerchant.length", label="商户名称", prop="merchant", :rules="[{ required: true, message: '必须选择一个转出商戶' }]")
          el-select(v-model="merchantTransferDialog.merchant" placeholder="请选择" @change="findMerchantTransferToCard")
            el-option(v-for="item in canTransferMerchant" :key="item.id" :label="item.merchantName" :value="item.id")
        el-form-item(v-else, label="商户名称", required)
          b.text-danger 无可转入商戶
        el-form-item(label="转帐金额:", prop="amount", :rules="[{ required: true, message: '必须填写异动金额' }]")
          el-input(type="number", v-model.number="merchantTransferDialog.amount", min="0")
        el-form-item(label="三方单号:", prop="depositThird", :rules="[{ required: true, message: '必须填写三方单号' }]")
          el-input(type="number", v-model.number="merchantTransferDialog.depositThird", min="0")
        el-form-item(label="说明:", prop="description", :rules="[{ message: '必须填写说明' }]")
          el-input(type="textarea", v-model="merchantTransferDialog.description", :autosize="{ minRows: 6, maxRows: 20}")
        el-form-item
          el-button(@click="handleTransfer(2)") 确认转帐
</template>

<script>
import {
  getBankCardsAPI,
  editBankCardStatusAPI,
  editBankCardShowAPI,
  frozenBankCardAPI,
  changeBankCardAPI,
  transferBankCardAPI,
  depositThirdBankCardAPI,
  getCanTransferBankCardAPI,
  getBankCardAPI
} from '@/api/payment/bankCard';
import { getMerchantsAPI, getMerchantAPI } from '@/api/payment/merchant';

export default {
  data() {
    return {
      transferType: '',
      options: [{
        value: 1,
        label: '中转'
      }, {
        value: 2,
        label: '充值三方'
      }],
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      getDataAt: '',
      groupTypes: {
        SHOW_TYPE_DEPOSIT: 1,
        SHOW_TYPE_WITHDRAW: 2,
        SHOW_TYPE_TRANSFER: 3,
        SHOW_TYPE_THIRD: 4,
        SHOW_TYPE_REPOSIT: 5
      },
      frozenDialog: {
        visible: false,
        id: 0,
        description: '',
        bankCardDetail: {
          holder: '',
          name: '',
          no: '',
          balance: 0
        }
      },
      changeDialog: {
        visible: false,
        id: 0,
        description: '',
        account: [],
        amount: '',
        fee: 0,
        bankCardDetail: {
          holder: '',
          name: '',
          no: '',
        }
      },
      changeNoteRequired: false,
      // 中轉
      transferDialog: {
        visible: false,
        id: 0,
        description: '',
        bankCard: [],
        amount: '',
        fee: 0,
        bankCardDetail: {
          holder: '',
          name: '',
          no: '',
        },
        transferToDetail: null
      },
      canTransfer: [],
      // 充值三方
      merchantTransferDialog: {
        merchant: [],
        amount: '',
        depositThird: '',
        description: '',
        merchantTransferToDetail: null,
      },
      canTransferMerchant: [],
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '下架', 1: '上架' }
          }
        },
        {
          label: '上下架',
          model: 'show',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '隐藏', 1: '显示' }
          }
        },
        {
          label: '卡号',
          model: 'bank_card_no',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '银行名称',
          model: 'bank_name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '户名',
          model: 'bank_cardholder',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ]
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms', 'group', 'account', 'noteRequired'],
  computed: {
    transferTo() {
      return this.canTransfer.map(group => {
        return {
          value: group.id,
          label: group.name,
          children: group.bankCards.map(bankCard => {
            return {
              value: bankCard.id,
              label: bankCard.bank_card_no,
              disabled: ! (! bankCard.frozen && bankCard.status)
            }
          })
        }
      });
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
      }

      if (this.group !== 'all') {
        APIParams.category = this.groupTypes[this.group];
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getBankCardsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
        this.getDataAt = new Date().toLocaleString();
      });
    },
    editShow(bankCard) {
      editBankCardShowAPI(bankCard.id).then(response => {
        bankCard.BCardShow = response.data.data[0].BCardShow;
      });
    },
    editStatus(bankCard) {
      editBankCardStatusAPI(bankCard.id).then(response => {
        bankCard.BCardStatus = response.data.data[0].BCardStatus;
      });
    },
    frozen(bankCard) {
      this.frozenDialog.id = bankCard.id;
      this.frozenDialog.bankCardDetail.holder = bankCard.BCardHolder;
      this.frozenDialog.bankCardDetail.name = bankCard.BCardName;
      this.frozenDialog.bankCardDetail.no = bankCard.BCardNo;
      this.frozenDialog.bankCardDetail.balance = bankCard.BCardBalance;
      this.frozenDialog.description = '';
      this.frozenDialog.visible = true;
    },
    handleFrozen() {
      this.$refs.frozenForm.validate(valid => {
        if (valid) {
          frozenBankCardAPI(this.frozenDialog.id, { reason: this.frozenDialog.description }).then(response => {
            this.updateBankCard(response.data.data[0]);
            this.$message.success(`银行卡 - ${response.data.data[0].BCardNo} 冻结成功`);
            this.frozenDialog.visible = false;
          }).catch(({ response }) => {
            this.$message.error(response.data.message);
          });
        }
      })
    },
    change(bankCard) {
      this.changeDialog.id = bankCard.id;
      this.changeDialog.bankCardDetail.holder = bankCard.BCardHolder;
      this.changeDialog.bankCardDetail.name = bankCard.BCardName;
      this.changeDialog.bankCardDetail.no = bankCard.BCardNo;
      this.changeDialog.bankCardDetail.balance = bankCard.BCardBalance;
      this.changeDialog.account = [];
      this.changeDialog.amount = '';
      this.changeDialog.fee = 0;
      this.changeDialog.description = '';
      this.changeDialog.visible = true;
    },
    handleChange() {
      this.$refs.changeForm.validate(valid => {
        if (valid) {
          const data = {
            reason: this.changeDialog.description,
            amount: this.changeDialog.amount,
            fee: this.changeDialog.fee,
            acc_title_id: this.changeDialog.account[1]
          };

          changeBankCardAPI(this.changeDialog.id, data).then(response => {
            this.updateBankCard(response.data.data[0]);
            this.$message.success(`银行卡 - ${response.data.data[0].BCardNo} 异动成功`);
            this.changeDialog.visible = false;
          }).catch(({ response }) => {
            this.$message.error(response.data.message);
          });
        }
      })
    },
    transfer(bankCard) {
      this.transferDialog.id = bankCard.id;
      this.merchantTransferDialog.id = bankCard.id;
      this.transferDialog.bankCardDetail.holder = bankCard.BCardHolder;
      this.transferDialog.bankCardDetail.name = bankCard.BCardName;
      this.transferDialog.bankCardDetail.no = bankCard.BCardNo;
      this.transferDialog.bankCard = [];
      this.transferDialog.transferToDetail = null;
      this.transferDialog.amount = '';
      this.transferDialog.fee = 0;
      this.transferDialog.description = '';

      getCanTransferBankCardAPI(bankCard.BCardGroupName.value).then(response => {
        this.canTransfer = response.data.data;
        this.transferDialog.visible = true;
      });

      getMerchantsAPI().then(res => {
        this.canTransferMerchant = res.data.data;
      })
    },
    handleTransfer(type) {
      // type 1 中轉 type 2 三方轉
      this.$refs.transferForm.validate(valid => {
        if (valid) {
          if (type === 1) {
            const data = {
              reason: this.transferDialog.description,
              amount: this.transferDialog.amount,
              fee: this.transferDialog.fee,
              target_id: this.transferDialog.bankCard[1]
            };

            transferBankCardAPI(this.transferDialog.id, data).then(response => {
              this.updateBankCard(response.data.data[0]);
              this.$message.success(`银行卡 - ${response.data.data[0].BCardNo} 转帐成功`);
              this.transferDialog.visible = false;
            }).catch(({ response }) => {
              this.$message.error(response.data.message);
            });
          } else if (type === 2) {
            const data = {
              pay_channel_id: this.merchantTransferDialog.merchant,
              amount: this.merchantTransferDialog.amount,
              third_order_id: this.merchantTransferDialog.depositThird,
              reason: this.merchantTransferDialog.description,
            };
            depositThirdBankCardAPI(this.merchantTransferDialog.id, data).then(() => {
              this.$message.success('三方轉入成功');
            }).catch(() => {})
          }
        }
      })
    },
    findTransferToCard() {
      getBankCardAPI(this.transferDialog.bankCard[1]).then(response => {
        this.transferDialog.transferToDetail = {
          holder: response.data.data[0].BCardHolder,
          name: response.data.data[0].BCardName,
          canTransferLimit: this.$options.filters.formatMoney((response.data.data[0].BCardLimit - response.data.data[0].BCardTransIn))
        }
      })
    },
    findMerchantTransferToCard() {
      getMerchantAPI(this.merchantTransferDialog.merchant).then(res => {
        this.merchantTransferDialog.merchantTransferToDetail = {
          number: res.data.data[0].merchantSn,
          remain: res.data.data[0].merchantRemainAmount,
        }
      });
    },
    updateBankCard(bankCard) {
      this.$set(this.tableData, this.tableData.findIndex(oldBankCard => oldBankCard.id === bankCard.id), bankCard);
    },
    handleClose(ref) {
      this.$refs[ref] && this.$refs[ref].clearValidate();
    },
    handleChangeAccountTitle(value) {
      this.changeNoteRequired = this.noteRequired.includes(value[1]);
    }
  }
}
</script>

<style lang="scss">
.el-cascader {
  display: block;
}
</style>
