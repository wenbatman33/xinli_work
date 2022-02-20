<template lang="pug">
  .container-fluid
    .row
      data-filter.member--batch--filter.w-100(ref="dataFilter", :filterList="filterList", :filterShow="filterShow", @change="getData()")
        transition(name="fade")
          .member--batch--block.d-flex.justify-content-around.align-items-center(v-if="selection.length")
            el-button(v-if="buttonPerms.batchEditLoginStatus", type="info", plain, round, @click="batch(0)") 登入
              i.el-icon-lock.el-icon--right
            el-button(v-if="buttonPerms.batchEditWithdrawalStatus", type="info", plain, round, @click="batch(1)") 提款
              i.el-icon-lock.el-icon--right
            el-button(v-if="buttonPerms.batchEditDepositStatus", type="info", plain, round, @click="batch(2)") 存款
              i.el-icon-lock.el-icon--right
            el-button(v-if="buttonPerms.batchEditGameStatus", type="info", plain, round, @click="fetchGameGroups();batch(3)") 进入游戏
              i.el-icon-lock.el-icon--right
            el-button(v-if="buttonPerms.batchAddCashGroup", type="info", plain, round, @click="fetchCashGroups(); batch(4)") 金流群组
              i.el-icon-price-tag.el-icon--right
            el-button(v-if="buttonPerms.batchAddGroup", type="info", plain, round, @click="fetchMemberGroups(); batch(5)") 玩家群组
              i.el-icon-price-tag.el-icon--right
    .row
      el-table(:data="tableData", border, stripe, height="70vh", @selection-change="selectionChange", ref="table")
        el-table-column(type="selection", align="center")
        el-table-column(v-if="fieldPerms.memberUserAccount", label="帐号", align="center", width="140")
          member-display(
            slot-scope="{ row }",
            :memberName="row.memberUserAccount",
            :memberId="row.memberId",
            :groups="row.backendMemberGroupList"
          )
        el-table-column(v-if="fieldPerms.loginLogSignAt", label="注册时间", prop="loginLogSignAt", align="center", width="160")
        el-table-column(v-if="fieldPerms.loginLogIp", label="最后登入IP", prop="loginLogIp", align="center", width="130")
        el-table-column(v-if="fieldPerms.backendMemberLastLoginAt", label="最后登入时间", prop="backendMemberLastLoginAt", align="center", width="160")
        el-table-column(v-if="fieldPerms.loginLogLogIn", label="最后登入地点", align="center")
          span(slot-scope="{ row }") {{ row.loginLogLogIn && Object.values(row.loginLogLogIn).filter(Boolean).join(' | ') }}
        el-table-column(v-if="fieldPerms.memberAgency", label="代理来源", prop="memberAgency", align="center", width="160")
        el-table-column(label="操作", align="center", width="100")
          router-link(slot-scope="{ row }", :to="{path:'memberLoginLog', query:{ account: row.memberUserAccount }}") 查看登入记录
    //- dialog
    el-dialog(:visible.sync="dialogVisible", :title="`批次管理-${nowAction.label}`", top="5vh", width="70%", @close="closeDialog()")
      el-form(:model="dialogData", ref="form", label-width="auto", :rules="rules", status-icon)
        el-form-item(v-if="fieldPerms.memberUserAccount", label="玩家", prop="account")
          .d-flex.flex-wrap.align-items-center
            span 共 {{ selection.length }} 位玩家
            el-tooltip(v-if="selection.length > 20", content="超过20位玩家，帐号不显示")
              i.el-icon-info.ml-3(style="font-size: 1.4rem")
            template(v-else)
              el-tag.m-2(
                v-for="member in selection",
                :key="member.memberId",
                closable,
                @close="removeMember(member)",
                :disable-transitions="true",
                effect="plain",
              ) {{ member.memberUserAccount }}
        //- 金流群組
        template(v-if="nowAction.key === 'CashGroup'")
          el-form-item(label="银行卡群组", prop="bankCardGroup")
            el-select(v-model="dialogData.bankCardGroup")
              el-option(v-for="group in bankCardGroupOptions", :key="group.value", :label="group.label", :value="group.value")
          el-form-item(label="三方金流群组", prop="thirdGroup")
            el-select(v-model="dialogData.thirdGroup")
              el-option(v-for="group in thirdGroupOptions", :key="group.value", :label="group.label", :value="group.value")
        //- 玩家群组
        template(v-else-if="nowAction.key === 'MemberGroup'")
          el-form-item(label="操作", prop="")
            el-radio-group(v-model="dialogData.action")
              el-radio-button(label="add") 增加群组
              el-radio-button(label="remove") 移除群组
          el-form-item(label="群组", prop="memberGroups")
            el-cascader.w-100(v-model="dialogData.memberGroups", :props="{ multiple: true }", :options="memberGroupOptions")
        //- 游戏登入
        el-form-item(v-else-if="nowAction.key === 'GameLogin'", label="狀態", prop="gameGroups")
          .board
            Kanban.kanban.enable(:list="dialogData.enable", group="gameGroup", header-text="开启", name="gameManGroupName")
            Kanban.kanban.list.mx-2(:list="gameGroupsClone", group="gameGroup", header-text="列表", name="gameManGroupName")
            Kanban.kanban.disable(:list="dialogData.disable", group="gameGroup", header-text="关闭", name="gameManGroupName")
        //- 登入 存款 提款
        el-form-item(v-else, :label="nowAction.label", prop="status")
          el-radio-group(v-model="dialogData.status", required)
            el-radio(:label="true") 开启
            el-radio(:label="false") 关闭
        el-form-item(label="备注类型", prop="type")
          el-select(v-model="dialogData.type")
            //- MARK: value 在 dialog close 時觸發 resetFields() 會噴錯 => 需求數字或字串 但給陣列
            el-option(v-for="(type, key) in memberNoteTypes", :key="key", :label="type", :value="typeof key === 'Array' ? '' : key")
        el-form-item(label="备注内容", prop="note")
          el-input(type="textarea", v-model="dialogData.note", :autosize="{ minRows: 2, maxRows: 6 }")
        el-form-item(prop="")
          el-button(type="success", @click="handlleUpdateStatus(true)") 储存
          el-button(type="success", size="mini", plain, @click="handlleUpdateStatus()") 储存，并进行其他批次操作
</template>

<script>
import {
  getBatchMembersAPI,
  batchFrozenMemberAPI,
  batchEditMemberCashStatusAPI,
  editMemberGameStatusAPI,
} from '@/api/member/member.js';
import {
  getMemeberGroupFullListAPI,
  batchAddMemberGroupAPI,
  batchRemoveMemberGroupAPI,
} from '@/api/member/memberGroup';
import { getGameGroupsAPI } from '@/api/site/gameGroup';
import Kanban from '@/components/DragKanban';

export default {
  components: { Kanban },
  data() {
    const checkGameGroup = (rule, value, callback) => {
      if (this.dialogData.enable.length === 0 && this.dialogData.disable.length === 0) {
        callback(new Error('最少需操作一个项目'));
      }

      callback();
    }

    return {
      tableData: [],
      filterList: [
        { label: '代理来源', model: 'agency', component: 'filterInput', props: { type: 'text' }},
        { label: '注册时间', model: 'signup', component: 'filterDatePicker', props: { type: 'datetimerange' }},
      ],
      filterShow: [
        { label: 'IP', model: 'ip', component: 'filterInput', props: { type: 'text' }},
        { label: '装置ID', model: 'finger', component: 'filterInput', props: { type: 'text' }},
        { label: '登入地点', model: 'location', component: 'filterInput', props: { type: 'text' }},
        { label: '登入时间', model: 'login', component: 'filterDatePicker', props: { type: 'datetimerange' }},
      ],
      selection: [],
      memberNoteTypes: {
        CUSTOMERSERVICE: '客服',
        FINANCE: '財務',
        MARKETING: '市場',
        RISKCONTROL: '風控',
      },
      dialogVisible: false,
      dialogData: {
        enable: [],
        disable: [],
        action: 'add',
        memberGroups: [],
        status: true,
        type: '',
        note: '',
        bankCardGroup: '',
        thirdGroup: '',
      },
      rules: {
        type: [
          { required: true, message: '请选择备注类型', trigger: 'submit' }
        ],
        note: [
          { required: true, message: '请填写备注内容', trigger: 'submit' }
        ],
        memberGroups: [
          { required: true, message: '最少需选一个群组', trigger: 'submit' }
        ],
        gameGroups: [
          { required: true, validator: checkGameGroup, trigger: 'submit'}
        ],
        bankCardGroup: [
          { required: true, message: '请选择银行卡群组', trigger: 'submit' }
        ],
        thirdGroup: [
          { required: true, message: '请选择三方金流群组', trigger: 'submit' }
        ],
      },
      nowAction: {},
      needFetchCashGroups: true,
      thirdGroupOptions: [],
      bankCardGroupOptions: [],
      needFetchMemberGroups: true,
      memberGroupOptions: [],
      gameGroups: [],
      gameGroupsClone: [],
      needFetchGameGroups: true,
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = this.$refs.dataFilter.getFilterData();

      if (APIParams.login) {
        APIParams.login_s = APIParams.login[0];
        APIParams.login_e = APIParams.login[1];
        delete APIParams.login;
      }

      if (APIParams.signup) {
        APIParams.signup_s = APIParams.signup[0];
        APIParams.signup_e = APIParams.signup[1];
        delete APIParams.signup;
      }

      if (Object.keys(APIParams).length) {
        getBatchMembersAPI(APIParams).then(response => {
          this.tableData = response.data.data;
        })
      } else {
        this.tableData = [];
      }
    },

    selectionChange(selection) {
      this.selection = selection;
    },

    removeMember(member) {
      this.$refs.table.toggleRowSelection(member);
      if (this.selection.length === 0) {
        this.dialogVisible = false;
      }
    },

    closeDialog() {
      this.gameGroupsClone = this.gameGroups.slice();
      this.dialogData.disable = [];
      this.dialogData.enable = [];
      this.$refs.form.resetFields();
    },

    fetchCashGroups() {
      if (this.needFetchCashGroups) {
        getMemeberGroupFullListAPI(null, { mode: 1 }).then(response => {
          // MARK: 目前没有可以确保的key 拿到正确的群组, 若各环境资料库 确定不变 可用 value 7:三方 8:银行卡
          this.thirdGroupOptions = response.data.data[0].children;
          this.bankCardGroupOptions = response.data.data[1].children;
          this.needFetchCashGroups = false;
        })
      }
    },

    fetchMemberGroups() {
      if (this.needFetchMemberGroups) {
        getMemeberGroupFullListAPI(null, { mode: 2 }).then(response => {
          this.memberGroupOptions = response.data.data;
          this.needFetchMemberGroups = false;
        })
      }
    },

    fetchGameGroups() {
      if (this.needFetchGameGroups) {
        getGameGroupsAPI({ per_page: 500, page: 1 }).then(response => {
          this.gameGroups = this.fieldPerms.gameManGroupStatus
            ? response.data.data.filter(group => group.gameManGroupStatus.value === 1)
            : response.data.data;
            this.gameGroupsClone = this.gameGroups.slice();
          this.needFetchGameGroups = false;
        });
      }
    },

    batch(index) {
      this.nowAction = [
        { label: '登入状态', key: 'Login' },
        { label: '提款状态', key: 'Withdrawal' },
        { label: '存款状态', key: 'Deposit' },
        { label: '游戏登入', key: 'GameLogin' },
        { label: '金流群组', key: 'CashGroup' },
        { label: '玩家群组', key: 'MemberGroup' },
      ][index];
      this.dialogVisible = true;
    },

    handlleUpdateStatus(needClearSelection = false) {
      this.$refs.form.validate(valid => {
        if (valid) {
          this[`handleEdit${this.nowAction.key}`]()
          .then(() => {
            if (needClearSelection) {
              this.$refs.table.clearSelection();
            }

            this.$message.success('批次操作成功');
            this.dialogVisible = false;
          });
        }
      });
    },

    handleEditLogin() {
      return batchFrozenMemberAPI({
        members: this.selection.map(member => member.memberId),
        type: this.dialogData.status ? 'unlock' : 'freeze',
        note_type: this.dialogData.type,
        note: this.dialogData.note,
      });
    },

    handleEditDeposit() {
      return this.handleEditWithdrawalOrDeposit(1)
    },

    handleEditWithdrawal() {
      return this.handleEditWithdrawalOrDeposit(2);
    },

    // MARK: API 同一支(type => 1:存款 2:提款)
    handleEditWithdrawalOrDeposit(type) {
      return batchEditMemberCashStatusAPI({
        type,
        members: this.selection.map(member => member.memberId),
        is_open: this.dialogData.status,
        note_type: this.dialogData.type,
        note: this.dialogData.note,
      });
    },

    handleEditGameLogin() {
      return editMemberGameStatusAPI({
        memberList: this.selection.map(member => member.memberId),
        lockData: Object.assign(
          {},
          this.dialogData.enable.reduce((result, gameGroup) => {
            result[gameGroup.id] = 1;
            return result;
          }, {}),
          this.dialogData.disable.reduce((result, gameGroup) => {
            result[gameGroup.id] = 0;
            return result;
          }, {}),
        ),
        type: this.dialogData.type,
        note: this.dialogData.note,
      });
    },

    handleEditCashGroup() {
      this.dialogData.action = 'add';

      return this.sendEditGroupAPI({
        member_list: this.selection.map(member => member.memberId),
        group_list: [this.dialogData.thirdGroup, this.dialogData.bankCardGroup],
        type: this.dialogData.type,
        note: this.dialogData.note,
      });
    },

    handleEditMemberGroup() {
      return this.sendEditGroupAPI({
        member_list: this.selection.map(member => member.memberId),
        group_list: this.dialogData.memberGroups.map(groups => groups[groups.length - 1]),
        type: this.dialogData.type,
        note: this.dialogData.note,
      })
    },

    sendEditGroupAPI(APIData) {
      return this.dialogData.action === 'add' ? batchAddMemberGroupAPI(APIData) : batchRemoveMemberGroupAPI(APIData);
    },
  }
}
</script>

<style lang="scss" scoped>
.member--batch--filter {
  position: relative;
  z-index: 10;
}

.member--batch--block {
  position: absolute;
  top: -18px;
  left: 0;
  width: 100%;
  height: calc(100% + 18px);
  z-index: 100;
  background-color: #f8f9fa;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

</style>

<style lang="scss">
.board {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  align-items: flex-start;

  .kanban {
    &.enable {
      .board-column-header {
        background: #2ac06d;
      }
    }
    &.list {
      .board-column-header {
        background: #4A9FF9;
      }
    }
    &.disable {
      .board-column-header {
        background: #f9944a;
      }
    }
  }
}
</style>
