<template lang="pug">
  .container-fluid
    .d-flex.justify-content-end(v-if="order.TransWDAllFinanceCheck")
      template(v-if="order.TransWDAllFinanceCheck.value === 1")
        el-button(v-if="buttonPerms.checkWithdrawOrderFail", type="danger", @click="fail()") 退回
        el-button.ml-2(v-if="buttonPerms.checkWithdrawOrderPass", @click="passToRisk()") 通过并提交风控
        el-button.ml-2(v-if="buttonPerms.checkWithdrawOrderSuccess", @click="success()") 通过
      span(v-else) {{ order.TransWDAllFinanceCheck.display }}

    el-card.my-2(shadow="always", v-if="buttonPerms.checkWithdrawOrderDetailBlock")
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
        i.el-icon-edit.ml-1.c-pointer(
          v-if="buttonPerms.checkWithdrawOrderEditNote", @click="editNote()" style="line-height: unset"
        )

    el-card.my-2(shadow="always", v-if="Object.keys(info).length && buttonPerms.checkWithdrawOrderCheckBlock")
      div(slot="header") 提款审核
      .d-flex
        .col-4 系统建议：
          el-tag(v-if="info.systemSuggest", type="success", size="mini") 通过
          el-tag(v-else, type="danger", size="mini") 退回
        .col-4 有效/限制流水： {{ info.betAmount | formatMoney }} / {{ info.withdrawLimit | formatMoney }}
        .col-4 备注： {{ order.TransWDAllNote }}
      .d-flex.mt-2
        .col-4 提款限额：
          i.el-icon-circle-check.ml-1.text-success(v-if="info.withdrawFlag")
          i.el-icon-circle-close.ml-1.text-danger(v-else)
        .col-4 流水差额： {{ info.betShort | formatMoney }}
          i.el-icon-circle-check.ml-1.text-success(v-if="info.betFlag")
          i.el-icon-circle-close.ml-1.text-danger(v-else)
      hr
      .d-flex.align-items-center 流水计算区间： {{ info.searchStartTime }} ~ {{ info.searchEndTime }}
        el-button.ml-2(
          v-if="buttonPerms.checkWithdrawOrderGameLog", @click="gameLogdrawerVisible = true", type="mini"
        ) 查看遊戲紀錄
      hr
      .d-flex.align-items-center 流水总限制： {{ info.withdrawLimit | formatMoney }}
        el-button.ml-2(
          v-if="buttonPerms.checkWithdrawOrderCashLoh", @click="cashLogdrawerVisible = true", type="mini"
        ) 查看资金明细
      //- 资金概况(5笔) MARK: 目前资料没绑权限 若是绑了 table 需改写
      .row
        el-table(:data="cashLog")
          el-table-column(label="时间", prop="date", align="center", width="180")
          el-table-column(label="类型", prop="type.display", align="center", width="100")
          el-table-column(label="金额", align="center", width="160")
            span(slot-scope="{ row: { amount } }") {{ amount | formatMoney }}
          el-table-column(label="流水限制", align="center", width="120")
            span(slot-scope="{ row: { widthdrawLimit } }") {{ widthdrawLimit | formatMoney }}
          el-table-column(label="有效流水", align="center", width="120")
            span(slot-scope="{ row: { betAmount } }") {{ betAmount | formatMoney }}
          el-table-column(label="备注", prop="remark", align="center", show-overflow-tooltip)
    el-card.my-2(shadow="always", v-if="buttonPerms.checkWithdrawOrderMemberBlock")
      div(slot="header") 玩家资讯
      .d-flex
        .w-25 姓名： {{ member.backendMemberRealname }}
        .w-25 单笔提款限额： {{ withdrawSingleLimit }}
        .w-25 单日提款上限： {{ withdrawDayLimit }}
        .w-25 存款限制： {{ depositLimit }}
      el-divider(content-position="left") 群组
      .d-flex.flex-wrap.align-items-center(v-for="(groupList, groupCategory) in member.backendMemberGroupList") {{ groupCategory }}:
        el-tag.m-1(v-for="group in groupList", :key="group.id", size="mini") {{ group.memberGroupGroupName }}

    el-card.my-2(shadow="always", v-if="buttonPerms.checkWithdrawOrderMemberNoteBlock")
      div(slot="header") 玩家备注
        el-button.mx-2(v-if="buttonPerms.checkWithdrawOrderAddNote", size="mini", @click="addMemberNote") 新增财务备注
      .member--note.mb-2(v-for="note in displayMemberNote", :key="note.id")
        .member--note--type.mr-2 {{ note.memberNoteType.display[0] }}
        .member--note--content
          .member--note--datetime {{ note.memberNoteCreatedAt }}
          line-clamp(:content="note.memberNoteNote")
      template(v-if="member.backendMemberMemberNote && member.backendMemberMemberNote.length > 10")
        el-link.text-primary(v-if="! expandNote", @click="expandNote = true") 查看所有备注
        el-link.text-primary(v-else, @click="expandNote = false") 收回 👆🏽

    //- 修改備註 dialog
    el-dialog(:visible.sync="editNoteDialogVisible", title="修改备注")
      el-input(type="textarea", v-model="editNoteData", :autosize="{ minRows: 6, maxRows: 10 }")
      el-button.mt-2(@click="handleEditNote()") 储存
    //- 会员备注 dialog
    el-dialog(:visible.sync="memberNoteDialog.visible", title="新增财务备注")
      el-input(type="textarea", v-model="memberNoteDialog.note", :autosize="{ minRows: 6, maxRows: 10 }")
      el-button.mt-2(@click="handleAddMemberNote()") 储存
    //- 遊戲紀錄 抽屜
    el-drawer(:visible.sync="gameLogdrawerVisible", size="90%" title="游戏纪录" direction="rtl")
      betRecord(
        :memberInfo="member",
        :fieldPerms="fieldPerms",
        :canShowBetRecordLog="Object.prototype.hasOwnProperty.call(buttonPerms, 'checkWithdrawOrderGameLogDetail')",
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
  editWithdrawOrderAPI,
  handleWithdrawOrderAPI,
  getWithdrawOrderInfoAPI,
  getWithdrawOrderCashLogAPI
} from '@/api/capitalFlow/withdrawOrder';
import { getMemberAPI } from '@/api/member/member';
import { addMemberNoteAPI } from '@/api/member/memberNote';
import betRecord from '@/components/Records/betRecord.vue';
import cashRecord from '@/components/Records/cashRecord.vue';

export default {
  components: { betRecord, cashRecord },
  data() {
    return {
      order: {},
      member: {},
      info: {},
      cashLog: [],
      editNoteDialogVisible: false,
      editNoteData: {
        id: 0,
        note: ''
      },
      memberNoteDialog: {
        visible: false,
        note: ''
      },
      expandNote: false,
      gameLogdrawerVisible: false,
      cashLogdrawerVisible: false
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
    addMemberNote() {
      this.memberNoteDialog.note = '';
      this.memberNoteDialog.visible = true;
    },
    handleAddMemberNote() {
      if (! this.memberNoteDialog.note.trim()) {
        return this.$message.error('财务備註不得為空');
      }

      addMemberNoteAPI({
        member_id: this.member.id,
        type: 'FINANCE',
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
    passToRisk() {
      this.$swal({
        title: '系统提示',
        text: '是否将提款单提交风控',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '提交',
        cancelButtonText: '取消',
        reverseButtons: true,
        input: 'textarea',
        inputValidator: remark => ! remark && '必须填写提交原因'
      }).then(({ value: remark }) => {
        if (remark) {
          return handleWithdrawOrderAPI.pass(this.order.id, { remark });
        }

        return Promise.reject();
      }).then(response => {
        this.order = response.data.data[0];
        this.$swal('成功！', '已提交此单给风控', 'success');
      }).catch(() => {});
    },
  }
}
</script>
