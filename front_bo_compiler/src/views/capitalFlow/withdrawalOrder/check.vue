<template lang="pug">
  .container-fluid
    .d-flex.justify-content-end(v-if="buttonPerms.checkWithdrawalOrderFailAll")
      el-button(v-if="order.TransWDAllStatus.value !== 2 && canFailAll", type="danger", @click="failAll") 失败
    //- 提款單內容
    el-card.my-2(shadow="always", v-if="buttonPerms.checkWithdrawalOrderDetailBlock")
      div(slot="header") 提款单内容
      .d-flex
        .w-25.mb-1 提款单号： {{ order.TransWDAllOrderId }}
        .w-25.mb-1 申请时间： {{ order.TransWDAllCreatedAt }}
        .w-25.mb-1 状态： {{ order.TransWDAllStatus ? order.TransWDAllStatus.display : '--' }}
        .w-25.mb-1 执行人： {{ order.TransWDAllEditor }}
      .d-flex
        .w-25.mb-1 提款金额： {{ order.TransWDAllAmount }}
        .w-25.mb-1 银行帐户： {{ order.TransWDAllBankNo }}
        .w-25.mb-1 户名： {{ order.TransWDAllRealName }} <!-- MARK:API只有回傳這個 後端表示先用這個 -->
        .w-25.mb-1 银行： {{ order.TransWDAllBankName }}
      .d-flex.mb-1 会员帐号：
        template(v-if="order.TransWDAllAccount")
          router-link(
            v-if="fieldPerms.TransWDAllMemberId",
            :to="{ path: '/memberDetail', query: { title: order.TransWDAllAccount, id: order.TransWDAllMemberId } }"
          ) {{ order.TransWDAllAccount }}
          span(v-else) {{ order.TransWDAllAccount }}
        span(v-else) 查无玩家
      .d-flex 提单备注： {{ order.TransWDAllNote }}

    //- 玩家资讯
    el-card.my-2(shadow="always", v-if="buttonPerms.checkWithdrawalOrderMemberBlock")
      div(slot="header") 玩家资讯
      .d-flex
        .w-25 姓名： {{ member.backendMemberRealname }}
        .w-25 单笔提款限额： {{ withdrawSingleLimit }}
        .w-25 单日提款上限： {{ withdrawDayLimit }}
        .w-25 存款限制： {{ depositLimit }}
      el-divider(content-position="left") 群组
      .d-flex.flex-wrap.align-items-center(v-for="(groupList, groupCategory) in member.backendMemberGroupList") {{ groupCategory }}:
        el-tag.m-1(v-for="group in groupList", :key="group.id", size="mini") {{ group.memberGroupGroupName }}
    //- 出款操作
    hr
    h4 出款操作
    p 出款总金额： {{ order && order.TransWDAllAmount && order.TransWDAllAmount | formatMoney }}
    el-card.mt-2(v-for="info in infoList", :key="info.transPayAllSplitId")
      .d-flex.justify-content-between
        div
          p 出款流水号：{{ info.transPayAllSplitId }}
          p 出款金额： {{ info.transPayAllSplitAmount }}
          template(v-if="info.transPayAllSplitStatus && info.transPayAllSplitStatus.value === 2")
            p 选择出款方式： {{ info.transPayAllSplitStatus.display }}
          template(v-else-if="info.transPayAllSplitStatus && info.transPayAllSplitStatus.value < 3")
            p 选择出款方式：
              el-select(v-model="info.target", @change="changeTarget(info)")
                el-option(value="T", label="三方商户代付")
                el-option(value="D", label="银行卡")
            .d-flex(v-if="info.target === 'D'")
              p(style="white-space: nowrap") 出款手续费：
              el-input(type="number", v-model="info.fee", size="mini")
          template(v-else)
            p 出款方式： {{ info.transPayAllSplitMethod }}
            p 出款手续费： {{ info.transPayAllSplitFee }}
            template(v-if="info.transPayAllSplitThirdOrderId")
              p 三方代付单号： {{ info.transPayAllSplitThirdOrderId }}
        div
          p 状态： {{ info.transPayAllSplitStatus && info.transPayAllSplitStatus.display }}
          p 更新时间： {{ info.transPayAllSplitUpdateAt }}
          template(v-if="info.transPayAllSplitStatus && info.transPayAllSplitStatus.value === 2")
            p 商户名称： {{ info.transPayAllSplitMer && info.transPayAllSplitMer.display }}
          template(v-else-if="info.transPayAllSplitStatus && info.transPayAllSplitStatus.value < 3")
            p(v-if="info.target === 'T'") 商户名称：
              el-select(v-model="info.target_id", @change="changeMerchant(info)")
                el-option(v-for="merchant in merchants", :key="merchant.id", :value="merchant.id", :label="merchant.gateName")
            p(v-else) 銀行卡：
              el-cascader(
                :options="bankCards",
                :show-all-levels="false",
                :style="{'width': '280px'}",
                @change="changeBankCard($event, info)"
              )
          template(v-else-if="info.transPayAllSplitBankCardNo.display")
            template(v-if="info.transPayAllSplitThirdOrderId")
              p 商户名称：
            template(v-else)
              p 出款群组： {{ info.transPayAllSplitBankCardGroup.display }}
              p 卡号： {{ info.transPayAllSplitBankCardNo.display }}
        div(v-if="info.detail")
          el-card.h-100(body-style="height: 100%")
            .h-100.d-flex.flex-column.justify-content-around
              template(v-if="info.target === 'T'")
                div {{ info.detail.gateName }}
                div 商户目前馀额： {{ info.detail.gateRemainAmount | formatMoney }}
              template(v-else)
                div {{ `${info.detail.bank_name} ${info.detail.bank_code}` }}
                div 戶名： {{ info.detail.bank_cardholder }}
                div 银行卡目前馀额： {{ info.detail.balance | formatMoney }}
        div(v-if="info.transPayAllSplitStatus && info.transPayAllSplitStatus.value > 2")
          el-card.h-100(v-if="info.transPayAllSplitThirdOrderId", body-style="height: 100%")
            .h-100.d-flex.flex-column.justify-content-around
              div {{ info.transPayAllSplitMer && info.transPayAllSplitMer.display }}
              div 单日额度： {{ info.transPayAllSplitMerDayLimit | formatMoney }}
              div 商户目前馀额： {{ info.transPayAllSplitMerRemain | formatMoney }}
          el-card.h-100(v-else-if="info.transPayAllSplitBankCardNo.display", body-style="height: 100%")
            .h-100.d-flex.flex-column.justify-content-around
              div {{ info.transPayAllSplitBankName }}
              div 戶名： {{ info.transPayAllSplitBankCardHolder }}
              div 银行卡目前馀额： {{ info.transPayAllSplitBankCardRemain | formatMoney }}
        div(style="width: 100px")
          template(v-if="info.transPayAllSplitStatus && info.transPayAllSplitStatus.value === 2")
            el-button.h-100(disabled) 处理中
          template(v-else-if="info.transPayAllSplitStatus && info.transPayAllSplitStatus.value < 3")
            el-button.h-75.mb-2.w-100(v-if="buttonPerms.checkWithdrawalOrderRun", @click="run(info)") 出款
            el-button.h-25.ml-0.w-100(v-if="buttonPerms.checkWithdrawalOrderFail", @click="fail(info)", :style="{ 'padding': 0 }") 失败
          template(v-else-if="info.transPayAllSplitStatus && info.transPayAllSplitStatus.value === 4")
            el-button.h-100(
              v-if="buttonPerms.checkWithdrawalOrderReRun && order.TransWDAllStatus.value !== 2",
              @click="reRun(info)"
            ) 重新出款
</template>

<script>
import {
  getWithdrawalOrderInfoAPI,
  runWithdrawalAPI,
  failWithdrawalAPI,
  getAgentPayMerchantAPI,
  failAllWithdrawalAPI
} from '@/api/capitalFlow/withdrawalOrder';
import { getWithdrawOrderAPI } from '@/api/capitalFlow/withdrawOrder';
import { getMemberAPI } from '@/api/member/member';
import { getBankCardGroupsAPI } from '@/api/payment/bankCardGroup';

export default {
  data() {
    return {
      order: {
        TransWDAllStatus: {}
      },
      member: {},
      infoList: [],
      merchants: [],
      bankCards: [],
      bankCardsMap: {}
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  computed: {
    depositLimit() {
      if (this.member && this.member.backendMemberLimitation) {
        return `${this.$options.filters.formatMoney(this.member.backendMemberLimitation.depMin)} ~ ${this.$options.filters.formatMoney(this.member.backendMemberLimitation.depMax)}`
      }

      return;
    },
    withdrawSingleLimit() {
      if (this.member && this.member.backendMemberLimitation) {
        return `${this.$options.filters.formatMoney(this.member.backendMemberLimitation.withSingleMin)} ~ ${this.$options.filters.formatMoney(this.member.backendMemberLimitation.withSingleMax)}`;
      }

      return;
    },
    withdrawDayLimit() {
      if (this.member && this.member.backendMemberLimitation) {
        return `${this.$options.filters.formatMoney(this.member.backendMemberLimitation.withDayMax)}`;
      }

      return;
    },
    canFailAll() {
      if (this.infoList.length === 0) return false;
      return ! this.infoList.some(info => {
        return info.transPayAllSplitStatus.value !== 4
      });
    }
  },
  created() {
    if (this.$route.query.id) {
      this.getOrder().then(() => {
        this.getMember();
        this.getInfo();
      });

      getAgentPayMerchantAPI().then(response => {
        this.merchants = response.data.data;
      });

      getBankCardGroupsAPI({ category: 2 }).then(response => {
        const result = [];
        response.data.data.map(group => {
          if (group.GroupBCards && group.GroupBCards.length) {
            result.push({
              value: group.id,
              label: group.GroupBCardName,
              children: group.GroupBCards.map(bankCard => {
                this.bankCardsMap[bankCard.id] = bankCard;
                return {
                  value: bankCard.id,
                  label: `${bankCard.bank_name}-${bankCard.bank_card_no}`
                }
              }),
            });
          }
        });

        this.bankCards = result;
      })
    }
  },
  methods: {
    getOrder() {
      return getWithdrawOrderAPI(this.$route.query.id).then(response => {
        this.order = response.data.data[0];
      });
    },
    getMember() {
      getMemberAPI(this.order.TransWDAllMemberId).then(response => {
        this.member = response.data.data[0];
      })
    },
    getInfo() {
      getWithdrawalOrderInfoAPI(this.order.TransWDAllOrderId).then(response => {
        this.infoList = response.data.data.map(info => {
          info['target'] = 'T';
          info['target_id'] = '';
          return info;
        });
      });
    },
    changeTarget(info) {
      info.target_id = '';
      this.$set(info, 'detail', null);
    },
    changeMerchant(info) {
      this.$set(info, 'detail', this.merchants.find(merchant => merchant.id === info.target_id));
    },
    changeBankCard(checked, info) {
      this.$set(info, 'detail', this.bankCardsMap[checked[1]]);
      this.$set(info, 'fee', '');
      info.target_id = checked[1];
    },
    run(order) {
      if (! order.target_id) {
        return this.$message.error({ T: '请选择出款商户', D: '请选择出款银行卡' }[order.target]);
      }

      if (order.target === 'D' && (order.fee === '' || order.fee === undefined)) {
        return this.$message.error('手续费为必填');
      }

      this.$swal({
        title: '系统提示',
        text: '确认执行出款？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        reverseButtons: true
      }).then(result => {
        if (result.value) {
          const APIData = order.target === 'T' ? {
            pay_channel_service_id: order.target_id
          } : {
            bank_card_id: order.target_id,
            fee: order.fee
          }

          return runWithdrawalAPI(order.transPayAllSplitId, APIData);
        }

        return Promise.reject();
      })
      .then(response => {
        this.$set(
          this.infoList,
          this.infoList.findIndex(order => order.transPayAllSplitId === response.data.data[0].transPayAllSplitId),
          response.data.data[0]
        )
        this.$swal('成功！', '此出款已完成', 'success');
      })
      .catch(() => {})
    },
    fail(order) {
      this.$swal({
        title: '系统提示',
        text: '是否将此出款单设为失败',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '失败',
        cancelButtonText: '取消',
        reverseButtons: true,
      })
      .then(({ value: remark }) => {
        if (remark) {
          return failWithdrawalAPI(order.transPayAllSplitId);
        }

        return Promise.reject();
      })
      .then(response => {
        this.$set(
          this.infoList,
          this.infoList.findIndex(order => order.transPayAllSplitId === response.data.data[0].transPayAllSplitId),
          response.data.data[0]
        )
        this.$swal('成功！', '此出款单已设为失败', 'success');
      })
      .catch(() => {})
    },
    failAll() {
      this.$swal({
        title: '系统提示',
        text: '是否将此出款设为失败',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        reverseButtons: true,
        input: 'select',
        inputOptions: this.$store.state.common.withdrawalFailReason,
        inputValidator: note => ! note && '必须填写提交原因'
      }).then(({ value: note }) => {
        if (typeof note !== 'undefined') {
          note = this.$store.state.common.withdrawalFailReason[note];
          return failAllWithdrawalAPI(this.order.TransWDAllOrderId, { note });
        }

        return Promise.reject();
      }).then(() => {
        this.getOrder().then(() => {
          this.getInfo();
          this.$swal('成功！', '此出款单已设为失败', 'success');
        });
      }).catch(() => {});
    },
    reRun(info) {
      info.transPayAllSplitStatus.value = 1;
    },
  }
}
</script>
