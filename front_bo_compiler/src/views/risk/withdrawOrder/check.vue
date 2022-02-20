<template lang="pug">
  .container-fluid
    .d-flex.justify-content-end(v-if="order.TransWDAllRickCheck")
      template(v-if="order.TransWDAllRickCheck.value === 1")
        el-button(v-if="buttonPerms.riskCheckWithdrawOrderFail", type="danger", @click="fail()") 退回
        el-button.ml-2(v-if="buttonPerms.riskCheckWithdrawOrderSuccess", @click="success()") 通过
      span(v-else) {{ order.TransWDAllRickCheck.display }}
    //- 提款單內容
    el-card.my-2(shadow="always", v-if="buttonPerms.riskCheckWithdrawOrderDetailBlock")
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
    el-card.my-2(shadow="always", v-if="buttonPerms.riskCheckWithdrawOrderMemberBlock")
      div(slot="header") 玩家资讯
      .d-flex
        .w-25 姓名： {{ member.backendMemberRealname }}
        .w-25 单笔提款限额： {{ withdrawSingleLimit }}
          i.el-icon-edit.ml-1.c-pointer(
            v-if="buttonPerms.riskCheckWithdrawOrderEditSingleLimit",
            @click="editWithSingle()",
            style="line-height: unset"
          )
        .w-25 单日提款上限： {{ withdrawDayLimit }}
          i.el-icon-edit.ml-1.c-pointer(
            v-if="buttonPerms.riskCheckWithdrawOrderEditDayLimit",
            @click="editWithDay()",
            style="line-height: unset"
          )
        .w-25 存款限制： {{ depositLimit }}

      el-divider(content-position="left") 群组
        template(v-if="buttonPerms.riskCheckWithdrawOrderAddMemberGroup")
          el-cascader.mx-1(
            v-if="addNewGroupVisible",
            size="mini",
            ref="addNewGroupCascader",
            @visible-change="handleAddNewGroupCascaderDropdownVisibleChange",
            :options="groups",
            @change="handleAddNewGroup"
          )
          el-tag.m-1.button-new-group.c-pointer.text-center(
            v-else,
            size="mini",
            type="info",
            @click="addNewGroup",
            :disable-transitions="true"
          ) +
      .d-flex.flex-wrap.align-items-center(v-for="(groupList, groupCategory) in member.backendMemberGroupList") {{ groupCategory }}:
        el-tag.m-1(
          v-for="group in groupList",
          :key="group.id",
          size="mini",
          :closable="Object.prototype.hasOwnProperty.call(buttonPerms, 'riskCheckWithdrawOrderRemoveMemberGroup')",
          @close="removeGroup(group)"
        ) {{ group.memberGroupGroupName }}
    //- 玩家備註
    el-card.my-2(shadow="always", v-if="buttonPerms.riskCheckWithdrawOrderMemberNoteBlock")
      div(slot="header") 玩家备注
        el-button.mx-2(v-if="buttonPerms.riskCheckWithdrawOrderAddNote", size="mini", @click="addMemberNote") 新增风控备注
      .member--note.mb-2(v-for="note in displayMemberNote", :key="note.id")
        .member--note--type.mr-2 {{ note.memberNoteType.display[0] }}
        .member--note--content
          .member--note--datetime {{ note.memberNoteCreatedAt }}
          line-clamp(:content="note.memberNoteNote")
      template(v-if="member.backendMemberMemberNote && member.backendMemberMemberNote.length > 10")
        el-link.text-primary(v-if="! expandNote", @click="expandNote = true") 查看所有备注
        el-link.text-primary(v-else, @click="expandNote = false") 收回 👆🏽
    //- 玩家資金
    el-card.mt-3(v-if="buttonPerms.riskCheckWithdrawOrderMemberWalletBlock && member.backentMemberWallet", shadow="always")
      div(slot="header") 玩家资金 (区间：{{ info.searchStartTime }} ~ {{ info.searchEndTime }})
        el-button.ml-2(
          v-if="buttonPerms.riskCheckWithdrawOrderGameLog", @click="gameLogdrawerVisible = true", type="mini"
        ) 查看遊戲紀錄
        el-button.ml-2(
          v-if="buttonPerms.riskCheckWithdrawOrderCashLog", @click="cashLogdrawerVisible = true", type="mini"
        ) 查看资金明细
      .d-flex
        .col-6 中心钱包：{{ member.backentMemberWallet.cash | formatMoney }}
        .col-3 总优惠：{{ member.backentMemberWallet.bonusAmount | formatMoney }}
        .col-3 冻结资金：{{ member.backentMemberWallet.lockCash | formatMoney }}
      .d-flex.mt-1
        .col-3 总输赢：{{ member.backentMemberWallet.winAmount | formatMoney }}
        .col-3 总流水：{{ member.backentMemberWallet.betAmount | formatMoney }}
        .col-3 总存款：{{ member.backentMemberWallet.depositAmount | formatMoney }}
        .col-3 总提款：{{ member.backentMemberWallet.withdrawAmount | formatMoney }}
      .d-flex.mt-1
        .col-3 存款 》最高金额：{{ member.backentMemberWallet.depMaxAmount | formatMoney }}
        .col-3 次数：{{ member.backentMemberWallet.depCount }}
        .col-3 平均金额：{{ member.backentMemberWallet.depAvgAmount | formatMoney }}
      .d-flex.mt-1
        .col-3 提款 》最高金额：{{ member.backentMemberWallet.witMaxAmount | formatMoney }}
        .col-3 次数：{{ member.backentMemberWallet.witCount }}
        .col-3 平均金额：{{ member.backentMemberWallet.witAvgAmount | formatMoney }}

    //- 修改單筆提款 dialog
    el-dialog(:visible.sync="editWithSingleDialog.visible", title="修改玩家单笔提款上限")
      el-form(label-width="100px")
        el-form-item(label="修改前：")
          span {{ withdrawSingleLimit }}
        el-form-item(label="修改后：")
          .row
            .col-5
              el-input(v-model="editWithSingleDialog.withSingleMin", type="number")
            .col-1.pl-2 ~
            .col-5
              el-input(
                v-model="editWithSingleDialog.withSingleMax",
                type="number",
                @keyup.enter.native="handleEditWithSingle()"
              )
        el-form-item
          el-button(@click="handleEditWithSingle()", size="mini") 储存
    //- 修改單日提款 dialog
    el-dialog(:visible.sync="editWithDayDialog.visible", title="修改玩家单笔提款上限")
      el-form(label-width="100px", @submit.native.prevent)
        el-form-item(label="修改前：")
          span {{ withdrawDayLimit }}
        el-form-item(label="修改后：")
          el-input(v-model="editWithDayDialog.limit", type="number", @keyup.enter.native="handleEditWithDay()")
        el-form-item
          el-button(@click="handleEditWithDay()", size="mini") 储存
    //- 会员备注 dialog
    el-dialog(:visible.sync="memberNoteDialog.visible", title="新增风控备注")
      el-input(type="textarea", v-model="memberNoteDialog.note", :autosize="{ minRows: 6, maxRows: 10 }")
      el-button.mt-2(@click="handleAddMemberNote()") 储存
    //- 遊戲紀錄 抽屜
    el-drawer(:visible.sync="gameLogdrawerVisible", size="90%" title="游戏纪录" direction="rtl")
      betRecord(
        :memberInfo="member",
        :fieldPerms="fieldPerms",
        :canShowBetRecordLog="Object.prototype.hasOwnProperty.call(buttonPerms, 'riskCheckWithdrawOrderGameLogDetail')",
        :date="dateFormat"
      )
    //- 资金纪录 抽屉
    el-drawer(:visible.sync="cashLogdrawerVisible", size="90%" title="资金纪录" direction="rtl")
      cashRecord(
        :memberInfo="member",
        :fieldPerms="fieldPerms",
        :buttonPerms="buttonPerms",
        :blockPerms="blockPerms",
        :date="dateFormat"
      )
</template>

<script>
import {
  getWithdrawOrderAPI,
  handleWithdrawOrderAPI,
  getWithdrawOrderInfoAPI,
  getWithdrawOrderCashLogAPI
} from '@/api/capitalFlow/withdrawOrder';
import { getMemberAPI, editMemberWithdrawLimitAPI } from '@/api/member/member';
import { addMemberNoteAPI } from '@/api/member/memberNote';
import betRecord from '@/components/Records/betRecord.vue';
import cashRecord from '@/components/Records/cashRecord.vue';
import {
  deleteMemberGroupMemberAPI,
  getMemeberGroupFullListAPI,
  addMemberGroupToMemberAPI
} from '@/api/member/memberGroup';

export default {
  components: { betRecord, cashRecord },
  data() {
    return {
      order: {},
      member: {},
      info: {},
      cashLog: [],
      editWithSingleDialog: {
        visible: false,
        withSingleMin: 0,
        withSingleMax: 0
      },
      editWithDayDialog: {
        visible: false,
        limit: 0,
      },
      memberNoteDialog: {
        visible: false,
        note: ''
      },
      expandNote: false,
      gameLogdrawerVisible: false,
      cashLogdrawerVisible: false,
      addNewGroupVisible: false,
      needFetchGroups: true,
      groups: [],
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  computed: {
    depositLimit() {
      if (this.member && this.member.backendMemberLimitation) {
        return `${this.$options.filters.formatMoney(this.member.backendMemberLimitation.depMin)} ~ ${this.$options.filters.formatMoney(this.member.backendMemberLimitation.depMax)}`;
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
    displayMemberNote() {
      if (this.member && this.member.backendMemberMemberNote) {
        if (this.member.backendMemberMemberNote.length > 10 && ! this.expandNote) {
          return this.member.backendMemberMemberNote.slice(0, 10);
        }

        return this.member.backendMemberMemberNote;
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
        this.getMember();
        this.getInfo();
      });
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
      getWithdrawOrderInfoAPI(this.order.TransWDAllOrderId).then(response => {
        this.info = response.data.data;
        this.getCashLog();
      });
    },
    getCashLog() {
      getWithdrawOrderCashLogAPI({
        member_id: this.order.TransWDAllMemberId,
        start_time: this.info.searchStartTime,
        end_time: this.info.searchEndTime
      })
      .then(response => {
        this.cashLog = response.data.data.slice(0, 5);
      });
    },
    addMemberNote() {
      this.memberNoteDialog.note = '';
      this.memberNoteDialog.visible = true;
    },
    handleAddMemberNote() {
      if (! this.memberNoteDialog.note.trim()) {
        return this.$message.error('风控備註不得為空');
      }

      addMemberNoteAPI({
        member_id: this.member.id,
        type: 'RISKCONTROL',
        note: this.memberNoteDialog.note
      })
      .then(() => {
        this.$message.success('备注新增成功');
        this.getMember();
        this.memberNoteDialog.visible = false;
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
          return handleWithdrawOrderAPI.riskSuccess(this.order.id);
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
        input: 'textarea',
        inputValidator: remark => ! remark && '必须填写退回原因'
      }).then(({ value: remark }) => {
        if (remark) {
          return handleWithdrawOrderAPI.riskFail(this.order.id, { remark });
        }

        return Promise.reject();
      }).then(response => {
        this.order = response.data.data[0];
        this.$swal('成功！', '此提款单已退回', 'success');
      }).catch(() => {});
    },
    addNewGroup() {
      new Promise(resolve => {
        if (this.needFetchGroups) {
          getMemeberGroupFullListAPI(this.$route.query.id).then(response => {
            this.groups = response.data.data;
            this.needFetchGroups = false;
            resolve();
          })
        } else {
          resolve();
        }
      })
      .then(() => {
        this.addNewGroupVisible = true;
        this.$nextTick(() => {
          this.$refs.addNewGroupCascader.toggleDropDownVisible();
        });
      });
    },
    handleAddNewGroupCascaderDropdownVisibleChange(visible) {
      this.addNewGroupVisible = visible;
    },
    handleAddNewGroup(group) {
      addMemberGroupToMemberAPI({
        member_id: this.$route.query.id,
        group_id: group[1]
      })
      .then(() => {
        this.$message.success('新增群组成功');
        this.getMember();
        this.needFetchGroups = true;
      });
    },
    removeGroup(group) {
      this.$swal({
        title: '确定移除群组？',
        text: `您即将移除 ${group.memberGroupGroupName} 群族`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认移除！',
        cancelButtonText: '取消'
      })
      .then(result => {
        if (result.value) {
          return deleteMemberGroupMemberAPI(group.list_id);
        }

        return Promise.reject();
      })
      .then(() => {
        this.getMember();
        this.$message.success('群族移除成功！');
      })
      .catch(() => {})
    },
    editWithSingle() {
      this.editWithSingleDialog.withSingleMin = 0;
      this.editWithSingleDialog.withSingleMax = 0;
      this.editWithSingleDialog.visible = true;
    },
    editWithDay() {
      this.editWithDayDialog.limit = 0;
      this.editWithDayDialog.visible = true;
    },
    handleEditWithDay() {
      if (! this.editWithDayDialog.limit) {
        return this.$message.error('请填写单日提款限额');
      }

      editMemberWithdrawLimitAPI(this.member.id, {
        day_max: this.editWithDayDialog.limit
      })
      .then(response => {
        this.member.backendMemberLimitation.withDayMax = response.data.data[0].dayMax;
        this.editWithDayDialog.visible = false;
        this.$message.success('更改单日提款限额成功');
      });
    },
    handleEditWithSingle() {
      if (! this.editWithSingleDialog.withSingleMin || ! this.editWithSingleDialog.withSingleMax) {
        return this.$message.error('请填写单笔提款限额');
      }

      editMemberWithdrawLimitAPI(this.member.id, {
        single_min: Math.min(this.editWithSingleDialog.withSingleMin, this.editWithSingleDialog.withSingleMax),
        single_max: Math.max(this.editWithSingleDialog.withSingleMin, this.editWithSingleDialog.withSingleMax)
      })
      .then(response => {
        this.member.backendMemberLimitation.withSingleMin = response.data.data[0].singleMin;
        this.member.backendMemberLimitation.withSingleMax = response.data.data[0].singleMax;
        this.editWithSingleDialog.visible = false;
        this.$message.success('更改单笔提款限额成功');
      });
    },
  }
}
</script>
