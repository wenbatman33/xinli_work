<template lang="pug">
  .container-fluid
    div(style="position: sticky; top: -15px; z-index: 1000")
      el-card(shadow="always", body-style="padding: 8px")
        .d-flex.justify-content-around
          el-button(
            v-if="buttonPerms.memberDetailWalletRecord"
            @click="openFloatingSideBar('wallet')",
            size="mini"
          ) 錢包记录
          el-button(
            v-if="buttonPerms.memberDetailCashRecord"
            @click="openFloatingSideBar('cash')",
            size="mini"
          ) 资金记录
          el-button(
            v-if="buttonPerms.memberDetailBetRecord"
            @click="openFloatingSideBar('bet')",
            size="mini"
          ) 游戏记录
          el-button(
            v-if="buttonPerms.memberDetailUseRecord"
            @click="openFloatingSideBar('use')",
            size="mini"
          ) 操作记录
          el-button(
            v-if="buttonPerms.memberDetailLoginRecord"
            @click="openFloatingSideBar('login')",
            size="mini"
          ) 登入记录
    //- 玩家资料
    el-card.member-detail.mt-3(v-if="buttonPerms.memberDetailShowDetail", shadow="always")
      div(slot="header") 玩家基本资料
        el-button.mx-2(v-if="buttonPerms.memberDetailEditPassword", size="mini", @click="resetPassword") 重设密码
      .row.mb-2
        .col-4 帐号：{{ member.memberUserAccount }}
        .col-4 姓名：{{ member.backendMemberRealname || '未设置' }}
          i.el-icon-edit.c-pointer.ml-1(v-if="buttonPerms.memberDetailEditRealname", @click="updateDetail('realname')")
        .col-4 地址：{{ member.memberAddress || '未设置' }}
      .row.mb-2
        .col-4 信箱：{{ member.memberEmail || '未设置' }}
          i.el-icon-edit.ml-1.c-pointer(v-if="buttonPerms.memberDetailEditEmail", @click="updateDetail('email')")
        .col-4 生日：{{ member.backendMemberBirthday || '未设置' }}
          i.el-icon-edit.c-pointer.ml-1(v-if="buttonPerms.memberDetailEditBirthday", @click="updateDetail('birthday')")
        .col-4 手机：{{ member.memberPhone || '未设置' }}
          i.el-icon-edit.ml-1.c-pointer(v-if="buttonPerms.memberDetailEditPhone", @click="updateDetail('phone')")
      .row.mb-2
        .col-4 注册IP： {{ member.backendMemberSignupIp }}
        .col-4 注册时间：{{ member.backendMemberCreatedAt }}
        .col-4(style="white-space: nowrap;") 来源域名： {{ member.backendMemberReferer }}
      .row.mb-2
        .col-4 最后登入IP： {{ member.backendMemberIp }}
        .col-4 最后成功登入：{{ member.backendMemberLastLoginAt || '--' }}
        .col-4 代理来源： {{ member.memberAgency }}
          i.el-icon-edit.ml-1.c-pointer(
            v-if="buttonPerms.memberDetailEditAgency && ! member.memberAgency",
            @click="updateAgency('agency')"
          )
      el-divider(content-position="left") 状态
      .d-flex.align-items-center(v-if="fieldPerms.backendMemberStatus")
        .col-4(v-for="(status, type) in member.backendMemberStatus", :key="type") {{ statusName[type] }}
          el-tag.mx-3(size="mini", :type="setStatusTagType(status.value)") {{ status.display }}
          i.el-icon-edit.c-pointer(v-if="buttonPerms[`memberDetailEditStatus_${type}`]", @click="updateStatus(type, status.value)")
      .row.my-2(v-if="fieldPerms.backendMemberGameLoginLock")
        .col-11.bg-light
          .d-flex.align-items-center.flex-wrap
            .w-20(v-for="group in memberGameGroups", :key="group.id") {{ group.gameManGroupName }}
              el-tag.m-2(size="mini", :type="gameStatusMap[group.gameLoginLock].type")
                | {{ gameStatusMap[group.gameLoginLock].display }}
        .col-1
          .el-icon-edit(v-if="buttonPerms.memberDetailEditGameStatus", @click="editGameStatus()")
      el-divider(content-position="left") 群组
        template(v-if="buttonPerms.memberDetailAddGroup")
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
          :closable="Object.prototype.hasOwnProperty.call(buttonPerms, 'memberDetailRemoveGroup')",
          @close="removeGroup(group)"
        ) {{ group.memberGroupGroupName }}
    //- 银行卡资料
    el-card.mt-3(v-if="buttonPerms.memberDetailShowBankCard", shadow="always")
      div(slot="header") 银行卡资讯
        el-button.mx-2(v-if="buttonPerms.memberDetailAddBankCard", size="mini", @click="addBankCard") 新增银行卡
      .alert.alert-secondary(v-for="bankCard in member.backendMemberBankCard")
        .d-flex.justify-content-between.align-items-center
          .w-25 户名：{{ bankCard.memberBankCardAccount }}
          .w-25 开户行：{{ bankCard.memberBankCardCode }}
          .w-25 分行地点：{{ bankCard.memberBankCardFullAddress }}
          .w-25.text-right.m-1
            el-button(v-if="buttonPerms.memberDetailRemoveBankCard", size="mini", @click="deleteBankCard(bankCard)") 移除
        .d-flex.justify-content-between.align-items-center
          .w-25 卡号：{{ bankCard.memberBankCardNo }}
          .w-25 状态：{{ bankCard.memberBankCardStatus ? bankCard.memberBankCardStatus.display : '--' }}
          .w-25 设定时间：{{ bankCard.memberBankCardUpdatedAt }}
          .w-25.text-right.m-1
            el-button(
              v-if="buttonPerms.memberDetailSetDafaultBankCard && ! bankCard.memberBankCardDefaultCard.value",
              size="mini",
              @click="setDefaultCard(bankCard)",
            ) 设为预设帐户
            el-button(v-if="buttonPerms.memberDetailEditBankCard", size="mini", @click="editBankCard(bankCard)") 修改
    //- 玩家資金
    member-wallet(
      :wallet="member.backentMemberWallet",
      :limitation="member.backendMemberLimitation",
      :account="member.memberUserAccount",
      :show="Object.prototype.hasOwnProperty.call(this.buttonPerms, 'memberDetailShowWallet')",
      :canAdjustCash="Object.prototype.hasOwnProperty.call(this.buttonPerms, 'memberDetailAddCashAdjust')",
      :canAdjustPoint="Object.prototype.hasOwnProperty.call(this.buttonPerms, 'memberDetailPointAdjust')",
      :canEditWithSingle="Object.prototype.hasOwnProperty.call(this.buttonPerms, 'memberDetailEditWithSingle')",
      :canEditWithDay="Object.prototype.hasOwnProperty.call(this.buttonPerms, 'memberDetailEditWithDay')",
      @updateLimitation="updateLimitation($event)",
      @getMember="getMember()",
    )
    //- 玩家备注
    el-card.mt-3(v-if="buttonPerms.memberDetailShowNote", shadow="always")
      div(slot="header") 备注
        el-button.mx-2(v-if="buttonPerms.memberDetailAddNote", size="mini", @click="addMemberNote") 新增备注
      .member--note.mb-2(v-for="note in member.backendMemberMemberNote", :key="note.id")
        .member--note--type.mr-2 {{ note.memberNoteType.display[0] }}
        .member--note--content
          .member--note--datetime {{ note.memberNoteCreatedAt }}
          line-clamp(:content="note.memberNoteNote")
    //- 资金纪录 drawer
    el-drawer(v-if="floatingSideBarDisplay === 'cash'" :visible.sync="drawer" custom-class="cash" size="90%" title="资金纪录" direction="rtl" @close="floatingSideBarDisplay = ''")
      cashRecord(:memberInfo="member" :fieldPerms="fieldPerms" :buttonPerms="buttonPerms" :blockPerms="blockPerms")
    //- 游戏纪录 drawer
    el-drawer(v-if="floatingSideBarDisplay === 'bet'" :visible.sync="drawer" custom-class="bet" size="90%" title="游戏纪录" direction="rtl" @close="floatingSideBarDisplay = ''")
      betRecord(
        :memberInfo="member",
        :fieldPerms="fieldPerms",
        :canShowBetRecordLog="Object.prototype.hasOwnProperty.call(buttonPerms, 'memberDetailBetRecordLog')"
      )
    //- 操作记录 drawer
    el-drawer(v-if="floatingSideBarDisplay === 'use'" :visible.sync="drawer" custom-class="bet" size="90%" title="操作纪录" direction="rtl" @close="floatingSideBarDisplay = ''")
      useRecord(:memberInfo="member")
    //- 钱包纪录 drawer
    el-drawer(v-if="floatingSideBarDisplay === 'wallet'", :visible.sync="drawer", size="90%", title="钱包记录", direction="rtl", @close="floatingSideBarDisplay = ''")
      walletRecord(:memberId="$route.query.id")
    //- 重设密码 dialog
    el-dialog(
      title="重设密码",
      :visible.sync="resetPasswordDialogVisible",
      @close="$refs.resetPasswordForm.resetFields()"
    )
      el-form(:model="resetPasswordData", ref="resetPasswordForm", label-width="100px", :rules="resetPasswordRules")
        el-form-item(label="新密码", prop="newPassword")
          el-input(type="password", v-model="resetPasswordData.newPassword", show-password)
        el-form-item(label="确认新密码", prop="checkPassword")
          el-input(type="password", v-model="resetPasswordData.checkPassword", show-password)
        el-form-item
          el-button(@click="handleResetPassword()") 储存
    //- 更改使用者资料 dialog
    el-dialog(
      :title="updateDetailDialog.title",
      :visible.sync="updateDetailDialog.visible",
      @close="updateDetailDialog.data = ''"
    )
      template(v-if="updateDetailDialog.field === 'birthday'")
        el-date-picker(
          v-model="updateDetailDialog.data",
          type="date",
          value-format="yyyy-MM-dd"
        )
        el-button.mx-2(type="medium", @click="handleUpdateDetail()", :disabled="! updateDetailDialog.data") 确认
      template(v-else)
        el-input(v-model="updateDetailDialog.data")
          el-button(
            slot="append",
            icon="el-icon-check",
            @click="handleUpdateDetail()",
            size="mini",
            :disabled="! updateDetailDialog.data"
          )
    //- 银行卡 dialog
    el-dialog(
      custom-class="member-bankcard-dialog"
      :title="bankCardDialog.title",
      :visible.sync="bankCardDialog.visible"
    )
      el-form(:model="bankCardDialog.data", ref="bankCardForm", label-width="100px", :rules="bankCardRules", status-icon)
        el-form-item(label="户名")
          span {{ member.backendMemberRealname }}
        el-form-item(label="银行卡号", prop="bank_no")
          el-input(v-model="bankCardDialog.data.bank_no")
        el-form-item(label="银行名称", prop="bank_code")
          el-select(v-model="bankCardDialog.data.bank_code")
            el-option(
              v-for="bank in banks",
              :key="bank.bankCode",
              :label="`${bank.bankName} - ${bank.bankCode}`",
              :value="bank.bankCode"
            )
        el-form-item(label="开户城市", prop="province")
          el-cascader(
            v-model="bankCardDialog.data.province",
            :options="provinceList",
            :props="{ expandTrigger: 'hover' }"
          )
        el-form-item(label="分行", prop="branch")
          el-input(v-model="bankCardDialog.data.branch")
        el-form-item
          el-button(@click="handleBankCardSubmit") 储存
    //- 会员备注 dialog
    el-dialog(
      title="新增备注",
      :visible.sync="memberNoteDialog.visible"
    )
      el-form(:model="memberNoteDialog.data", ref="noteForm", label-width="100px", :rules="noteRules", status-icon)
        el-form-item(label="会员帐号")
          span {{ member.memberUserAccount }}
        el-form-item(label="备注类型", prop="type")
          el-select(v-model="memberNoteDialog.data.type")
            el-option(
              v-for="(type, key) in memberNoteTypes",
              :key="key",
              :label="type",
              :value="key"
            )
        el-form-item(label="备注内容", prop="note")
          el-input(type="textarea", v-model="memberNoteDialog.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
        el-form-item
          el-button(@click="handleAddMemberNote") 储存
    //- 玩家狀態 dialog
    el-dialog(
      title="玩家状态",
      :visible.sync="statusDialog.visible"
    )
      el-form(:model="statusDialog.data", ref="statusForm", label-width="100px", :rules="noteRules", status-icon)
        el-form-item(:label="statusDialog.label")
          el-radio-group(v-model="statusDialog.data.frozen", required)
            el-radio(label="unlock") 开启
            el-radio(label="freeze") 关闭
        el-form-item(label="备注类型", prop="type")
          el-select(v-model="statusDialog.data.type")
            el-option(
              v-for="(type, key) in memberNoteTypes",
              :key="key",
              :label="type",
              :value="key"
            )
        el-form-item(label="备注内容", prop="note")
          el-input(type="textarea", v-model="statusDialog.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
        el-form-item
          el-button(@click="handlleUpdateStatus()") 储存
    //- 修改代理來源 dialog
    el-dialog(title="修改代理来源", :visible.sync="editAgencyDialogVisible")
      p 代理编号
      el-input(v-model="agency_code")
      el-button.my-2(@click="handlleUpdateAgency()") 储存
    //- 游戏登入状态 dialog
    el-dialog(title="游戏登入状态", :visible.sync="gameStatusDialog.visible", width="80%")
      el-form(:model="gameStatusDialog", ref="gameStatusForm", label-width="auto", :rules="noteRules")
        .d-flex.flex-wrap.align-items-center
          .w-20(v-for="group in memberGameGroups", :key="group.id")
            el-form-item(:label="group.gameManGroupName")
              el-switch(
                v-model="gameStatusDialog.data[group.id]",
                active-text="锁定",
                :active-value="0",
                active-color="red",
                inactive-text="开启",
                :inactive-value="1",
                inactive-color="#67C23A",
                :width="30"
              )
        el-form-item(label="备注类型", prop="type")
          el-select(v-model="gameStatusDialog.type")
            el-option(
              v-for="(type, key) in memberNoteTypes",
              :key="key",
              :label="type",
              :value="key"
            )
        el-form-item(label="备注内容", prop="note")
          el-input(type="textarea", v-model="gameStatusDialog.note", :autosize="{ minRows: 2, maxRows: 6 }")
        el-form-item
          el-button(@click="handlleUpdateGameStatus()") 储存
</template>

<script>
import { mapState } from 'vuex';
import { getBanksAPI } from '@/api/payment/bankCard';
import { addMemberNoteAPI } from '@/api/member/memberNote';
import {
  editMemberPasswordAPI,
  getMemberAPI,
  editDetailAPI,
  addMemberBankCardAPI,
  editMemberBankCardAPI,
  setDefaultBankCardAPI,
  deleteMemberBankCardAPI,
  frozenMemberAPI,
  editMemberAgencyAPI,
  editMemberCashStatusAPI,
  editMemberGameStatusAPI,
} from '@/api/member/member';
import {
  deleteMemberGroupMemberAPI,
  getMemeberGroupFullListAPI,
  addMemberGroupToMemberAPI
} from '@/api/member/memberGroup';
import { getGameGroupsAPI } from '@/api/site/gameGroup';
import betRecord from '@/components/Records/betRecord.vue';
import cashRecord from '@/components/Records/cashRecord.vue';
import useRecord from '@/components/Records/useRecord.vue';
import walletRecord from '@/components/Records/walletRecord.vue';
import memberWallet from './_wallet.vue';

export default {
  components: {
    betRecord,
    cashRecord,
    useRecord,
    walletRecord,
    memberWallet,
  },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value !== this.resetPasswordData.newPassword) {
        callback(new Error('两次密码不一致'));
      } else {
        callback();
      }
    }

    return {
      drawer: false,
      floatingSideBarDisplay: '',
      member: {},
      resetPasswordDialogVisible: false,
      resetPasswordData: {
        newPassword: '',
        checkPassword: ''
      },
      resetPasswordRules: {
        newPassword: [
          { required: true, message: '請填寫新密碼', trigger: 'submit' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'submit' },
        ],
        checkPassword: [
          { required: true, message: '請填寫确认新密码', trigger: 'submit' },
          { min: 8, max: 20, message: '长度限制为 8 - 20 个字元', trigger: 'submit' },
          { validator: validatePassword, trigger: 'submit' }
        ]
      },
      bankCardRules: {
        bank_no: [
          { required: true, message: '请填写银行卡号', trigger: 'submit' },
        ],
        bank_code: [
          { required: true, message: '请选择银行名称', trigger: 'submit' },
        ],
        province: [
          { required: true, message: '请选择开户城市', trigger: 'submit' },
        ],
        branch: [
          { required: true, message: '请填写分行', trigger: 'submit' },
        ]
      },
      noteRules: {
        type: [
          { required: true, message: '请选择备注类型', trigger: 'submit' }
        ],
        note: [
          { required: true, message: '请填写备注内容', trigger: 'submit' }
        ]
      },
      updateFieldMap: {
        realname: {
          title: '修改姓名',
          data: 'backendMemberRealname',
        },
        birthday: {
          title: '修改生日',
          data: 'backendMemberBirthday'
        },
        email: {
          title: '修改信箱',
          data: 'memberEmail'
        },
        phone: {
          title: '修改手机',
          data: 'memberPhone'
        }
      },
      updateDetailDialog: {
        title: '',
        visible: false,
        data: '',
        field: ''
      },
      addNewGroupVisible: false,
      needFetchGroups: true,
      groups: [],
      banks: [],
      needFetchBanks: true,
      bankCardDialog: {
        title: '',
        visible: false,
        data: {
          bank_code: '',
          bank_no: '',
          province: '',
          branch: '',
          bank_account: '',
          default_card: 0,
          status: 1,
        }
      },
      memberNoteDialog: {
        visible: false,
        needFetchNoteType: true,
        data: {
          type: '',
          note: ''
        }
      },
      memberNoteTypes: {
        CUSTOMERSERVICE: '客服',
        FINANCE: '財務',
        MARKETING: '市場',
        RISKCONTROL: '風控',
      },
      statusDialog: {
        visible: false,
        label: '',
        data: {
          frozen: '',
          type: '',
          note: ''
        }
      },
      editAgencyDialogVisible: false,
      agency_code: '',
      statusName: {
        is_frozen: '平台登入',
        openDeposit: '存款',
        openWithdraw: '提款',
      },
      memberGameGroups: {},
      gameStatusMap: {
        0: {
          type: 'danger',
          display: '锁定',
        },
        1: {
          type: 'success',
          display: '开启',
        },
      },
      gameStatusDialog: {
        visible: false,
        type: '',
        note: '',
        data: {},
      },
    }
  },
  computed: mapState('common', ['provinceList']),
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('无此玩家');
    } else {
      this.getMember();
    }

    this.$store.dispatch('common/fetchProvinceList');
  },
  methods: {
    getMember() {
      Promise.all([
        getMemberAPI(this.$route.query.id),
        getGameGroupsAPI({
          per_page: 500,
          page: 1,
        })
      ])
      .then(([memberResponse,  gameGroupResponse]) => {
        this.member = memberResponse.data.data[0];

        const result = this.fieldPerms.gameManGroupStatus
          ? gameGroupResponse.data.data.filter(group => group.gameManGroupStatus.value === 1)
          : gameGroupResponse.data.data;

        result.map(group => {
          return group.gameLoginLock = this.member.backendMemberGameLoginLock[group.id]
            ? this.member.backendMemberGameLoginLock[group.id].gameLoginLock
            : 1
        });

        this.memberGameGroups = result;
      })
    },
    resetPassword() {
      this.resetPasswordDialogVisible = true;
    },
    handleResetPassword() {
      this.$refs.resetPasswordForm.validate(valid => {
        if (valid) {
          editMemberPasswordAPI(this.$route.query.id, this.resetPasswordData)
          .then(() => {
            this.$message.success('重设密码成功！');
            this.resetPasswordDialogVisible = false;
          });
        }
      });
    },
    updateDetail(field) {
      this.updateDetailDialog.field = field;
      this.updateDetailDialog.title = this.updateFieldMap[field].title;
      this.updateDetailDialog.data = this.member[this.updateFieldMap[field].data];
      this.updateDetailDialog.visible = true;
    },
    handleUpdateDetail() {
      if (! this.updateDetailDialog.data.trim()) {
        this.$message.error('资料不得为空');
        return;
      }

      if (this.updateDetailDialog.field === 'email') {
        // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
        const emailRegular = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //eslint-disable-line

        if (! emailRegular.test(this.updateDetailDialog.data)) {
          this.$message.error('email 格式錯誤');
          return;
        }
      }

      editDetailAPI[this.updateDetailDialog.field](
        this.$route.query.id,
        { [this.updateDetailDialog.field]: this.updateDetailDialog.data }
      ).then(response => {
        this.member = response.data.data[0];
        this.$message.success('修改成功');
        this.updateDetailDialog.visible = false;
      });
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
    checkHasBanks() {
      return new Promise(resolve => {
        if (this.needFetchBanks) {
          getBanksAPI().then(response => {
            this.banks = response.data.data;
            this.needFetchBanks = false;
            resolve();
          })
        } else {
          resolve();
        }
      });
    },
    addBankCard() {
      if (! this.member.backendMemberRealname) {
        return this.$message.info('请先完成真实姓名编辑！')
      }

      this.checkHasBanks().then(() => {
        this.bankCardDialog.title = '新增银行卡';
        this.bankCardDialog.card_id = null;
        this.bankCardDialog.data.bank_code = '';
        this.bankCardDialog.data.bank_no = '';
        this.bankCardDialog.data.province = [];
        this.bankCardDialog.data.branch = '';
        this.bankCardDialog.data.default = 0;
        this.bankCardDialog.data.bank_account = this.member.backendMemberRealname;
        this.bankCardDialog.data.status = 1;
        this.bankCardDialog.visible = true;
      });
    },
    editBankCard(bankCard) {
      this.checkHasBanks().then(() => {
        this.bankCardDialog.title = '修改银行卡';
        this.bankCardDialog.card_id = bankCard.id;
        this.bankCardDialog.data.bank_code = bankCard.memberBankCardCode;
        this.bankCardDialog.data.bank_no = bankCard.memberBankCardNo;
        this.bankCardDialog.data.province = [bankCard.memberBankCardProvince, bankCard.memberBankCardCity];
        this.bankCardDialog.data.branch = bankCard.memberBankCardBranch;
        this.bankCardDialog.data.default = bankCard.memberBankCardDefaultCard ? bankCard.memberBankCardDefaultCard.value : 0;
        this.bankCardDialog.data.bank_account = bankCard.memberBankCardAccount;
        this.bankCardDialog.data.status = bankCard.memberBankCardStatus ? bankCard.memberBankCardStatus.value : 1;
        this.bankCardDialog.visible = true;
      });
    },
    handleBankCardSubmit() {
      this.$refs.bankCardForm.validate(valid => {
        if (valid) {
          const data = {
            bank_no: this.bankCardDialog.data.bank_no,
            bank_code: this.bankCardDialog.data.bank_code,
            province: this.bankCardDialog.data.province[0],
            city: this.bankCardDialog.data.province[1],
            branch: this.bankCardDialog.data.branch,
            member_id: parseInt(this.$route.query.id),
            bank_account: this.bankCardDialog.data.bank_account,
            default_card: this.bankCardDialog.data.default,
            status: this.bankCardDialog.data.status,
          }

          if (this.bankCardDialog.card_id) {
            this.handleEditBankCard(this.bankCardDialog.card_id, data);
          } else {
            this.handleCreateBankCard(data);
          }
        }
      })
    },
    handleCreateBankCard(data) {
      addMemberBankCardAPI(data).then(() => {
        this.$message.success('新增银行卡成功');
        this.bankCardDialog.visible = false;
        this.getMember();
      });
    },
    handleEditBankCard(id, data) {
      editMemberBankCardAPI(id, data).then(() => {
        this.$message.success('修改银行卡成功');
        this.bankCardDialog.visible = false;
        this.getMember();
      });
    },
    setDefaultCard(bankCard) {
      setDefaultBankCardAPI(bankCard.id).then(() => { this.getMember() });
    },
    deleteBankCard(bankCard) {
      this.$swal({
        title: '确认移除银行卡？',
        text: `您即将移除银行卡 ${bankCard.memberBankCardNo}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认移除！',
        cancelButtonText: '取消'
      })
      .then(result => {
        if (result.value) {
          return deleteMemberBankCardAPI(bankCard.id);
        }

        return Promise.reject();
      })
      .then(() => {
        this.getMember();
        this.$message.success('银行卡移除成功！');
      })
      .catch(() => {})
    },
    addMemberNote() {
      this.memberNoteDialog.data.type = '';
      this.memberNoteDialog.data.note = '';
      this.memberNoteDialog.visible = true;
    },
    handleAddMemberNote() {
      this.$refs.noteForm.validate(valid => {
        if (valid) {
          addMemberNoteAPI({
            member_id: this.$route.query.id,
            ...this.memberNoteDialog.data
          })
          .then(() => {
            this.$message.success('备注新增成功');
            this.getMember();
            this.memberNoteDialog.visible = false;
          });
        }
      });
    },
    openFloatingSideBar(type) {
      this.floatingSideBarDisplay = type;
      if (type === 'login') {
        this.$router.push({ path: '/memberLoginLog', query: { account: this.member.memberUserAccount } });
      } else {
        this.drawer = true;
      }
    },
    updateStatus(field, status) {
      // MARK: 登入 <=> 存提 狀態相反(型別也不同) 登入 true 是鎖定，存提 1 是開啟
      // MARK: 借用 html 顏色判斷開關
      // MARK: 登入是之前做的 欄位名稱延用
      this.editStatusField = field;
      this.statusDialog.data.type = '';
      this.statusDialog.data.note = '';
      this.statusDialog.data.frozen = this.setStatusTagType(status) === 'danger' ? 'freeze' : 'unlock';
      this.statusDialog.label = this.statusName[field];
      this.statusDialog.visible = true;
    },
    handlleUpdateStatus() {
      // MARK: 登入一隻API 存提一隻API 欄位要求不同
      this.$refs.statusForm.validate(valid => {
        if (valid) {
          let APIPromise;
          if (this.editStatusField === 'is_frozen') {
            APIPromise = frozenMemberAPI({
              member_id: this.$route.query.id,
              type: this.statusDialog.data.frozen,
              note_type: this.statusDialog.data.type,
              note: this.statusDialog.data.note,
            });
          } else {
            const transAPIParam = {
              openDeposit: 'open_deposit',
              openWithdraw: 'open_withdraw'
            }

            APIPromise = editMemberCashStatusAPI(this.$route.query.id, {
              [transAPIParam[this.editStatusField]]: +(this.statusDialog.data.frozen === 'unlock'),
              type: this.statusDialog.data.type,
              note: this.statusDialog.data.note,
            });
          }

          APIPromise.then(() => {
            this.$message.success('玩家状态修改成功！');
            this.$store.dispatch('menu/refreshTab');
          });
        }
      });
    },
    updateAgency() {
      this.editAgencyDialogVisible = true;
    },
    handlleUpdateAgency() {
      if (this.agency_code) {
        editMemberAgencyAPI(this.$route.query.id, { agency_code: this.agency_code })
        .then(() => {
          this.$message.success('代理来源修改成功！');
          this.$store.dispatch('menu/refreshTab');
        });
      } else {
        this.$message.error('请填写代理编号');
      }
    },
    updateLimitation(payload) {
      Object.keys(payload).map(key => {
        this.member.backendMemberLimitation[key] = payload[key]
      });
    },
    setStatusTagType(status) {
      if (typeof status === 'boolean') {
        status = ! status;
      }

      return status ? 'success' : 'danger';
    },
    editGameStatus() {
      this.memberGameGroups.map(group => {
        this.$set(this.gameStatusDialog.data, group.id, group.gameLoginLock);
      });
      this.gameStatusDialog.type = '',
      this.gameStatusDialog.note = '',
      this.gameStatusDialog.visible = true;
    },
    handlleUpdateGameStatus() {
      this.$refs.gameStatusForm.validate(valid => {
        if (valid) {
          editMemberGameStatusAPI({
            memberList: [this.$route.query.id],
            lockData: this.gameStatusDialog.data,
            type: this.gameStatusDialog.type,
            note: this.gameStatusDialog.note,
          }).then(() => {
            this.$message.success('玩家游戏登入状态修改成功！');
            this.$store.dispatch('menu/refreshTab');
          })
        }
      })
    },
  },
}
</script>

<style lang="scss">
.member-detail {
  .button-new-group {
    width: 60px;
  }

  .el-cascader > .el-input > .el-input__inner {
    width: 100px;
    height: 20px;
  }
}

.member-bankcard-dialog {
  .el-select, .el-cascader {
    display: block;
  }
}

.w-20 {
  width: 20% !important;
}
</style>
