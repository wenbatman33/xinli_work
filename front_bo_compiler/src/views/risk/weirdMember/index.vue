<template lang="pug">
  .container-fluid
    el-form(:model='formData', :inline='true', :rules='rules', ref='formData')
      .row
        .col-12
          el-date-picker.d-flex.align-items-center(
          v-model='datePicker',
          type='daterange'
          range-separator='至'
          start-placeholder='开始日期'
          end-placeholder='结束日期',
          value-format='yyyy-MM-dd'
        )
        .col-12.conditionSelector
          div
            el-checkbox.m-2(v-model="checkboxList[0]", @change='(!checkboxList[0])? formData.winFilter="":  formData.betFilter=formData.winFilter')
            el-form-item(label='盈利 > ¥', prop='name', :disabled='!checkboxList[0]')
              span
                el-input(v-model="formData.winFilter", size='small', style='width:100px', :disabled='!checkboxList[0]')
              span.mx-2 万
            el-checkbox.m-2(v-model="checkboxList[1]", @change='(!checkboxList[1])? formData.betFilter="":  formData.betFilter=formData.betFilter')
            el-form-item(label='流水 > 存款', prop='name', :disabled='!checkboxList[1]')
              span
                el-input(v-model="formData.betFilter", size='small', style='width:100px', :disabled='!checkboxList[1]')
              span.mx-2 倍
            el-checkbox.m-2(v-model="checkboxList[2]", @change='(!checkboxList[2])? formData.loginFilter="":  formData.loginFilter=formData.loginFilter')
            el-form-item(label='活跃程度成功登入次数 >', prop='name')
              span
                el-input(v-model="formData.loginFilter", size='small', style='width:100px', :disabled='!checkboxList[2]')
              span.mx-2 次
          div
            el-checkbox.m-2(v-model="checkboxList[3]", @change='(!checkboxList[3])? formData.fingerFilter="":  formData.betFilter=formData.fingerFilter')
            el-form-item(label='同装置成功登入次数 >', prop='name')
              span
                el-input(v-model="formData.fingerFilter", size='small', style='width:100px', :disabled='!checkboxList[3]')
              span.mx-2 个帐号
            el-checkbox.m-2(v-model="checkboxList[4]", @change='(!checkboxList[4])? formData.ipFilter="":  formData.betFilter=formData.ipFilter')
            el-form-item(label='IP成功登入次数 >', prop='name')
              span
                el-input(v-model="formData.ipFilter", size='small', style='width:100px', :disabled='!checkboxList[4]')
              span.mx-2 个帐号
          el-button(type="primary", size='mini', @click='getWeirdMember', :disabled='formDataNotYet') 确定
    .row.no-gutters
      el-table(:data="tableData", style="width: 100%", height="550")
        el-table-column(prop="memberUserAccount", label="帐号")
        el-table-column(prop="riskManagerIp", label="IP")
        el-table-column(prop="riskManagerFinger", label="装置ID")
        el-table-column(prop="riskManagerPlace", label="装置位置")
        el-table-column(prop="riskManagerCreatedAt", label="注册时间")
        el-table-column(prop="riskManagerWin", label="盈利金额")
        el-table-column(label="管理", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link.mx-1.text-primary(@click='addNote(row)') 备注
              el-link.mx-1.text-primary(@click='openGroupDialog(row)') 群组
    //- 修改備註 dialog
    el-dialog(:visible.sync="addNoteDialogVisible", title="修改备注")
      el-form(:model="addNoteDialogFormData")
        el-form-item
          el-input(type="textarea", v-model="addNoteDialogFormData.note", :autosize="{ minRows: 6, maxRows: 10}")
        el-form-item
          el-button(@click="handleAddNote()") 储存
    el-dialog(:visible.sync="addGroupDialogVisible", title="增加群组")
      .d-flex.flex-wrap
        el-tag.m-1(
          v-for="group in memberOwnGroups",
          :key="group.list_id",
          size="mini",
          :closable="true",
          @close="removeGroup(group)"
        ) {{ group.label }}
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
      //- 群组内层 dialog (移除确认)
      el-dialog(title="确认移除群族？", append-to-body, :visible.sync="removeGrouppVisible")
        .d-flex.justify-content-end
          el-button(@click="removeGrouppVisible = false") 取消
          el-button(type="warning", @click="handleRemoveGroup") 确认
</template>

<script>
import { filterSelection, addCertNote } from '@/api/risk/firstCert'
import {
  getMemeberGroupFullListAPI,
  deleteMemberGroupMemberAPI,
  addMemberGroupToMemberAPI
} from '@/api/member/memberGroup'
import { getMemberOwnGroupAPI } from '@/api/member/member';

export default {
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  data() {
    return {
      datePicker: [],
      checkboxList:[],
      formData: {
        startDate: '',
        endDate: '',
        betFilter: '',
        winFilter: '',
        loginFilter: '',
        ipFilter: '',
        fingerFilter: ''
      },
      rules: {},
      tableData:[],
      addNoteDialogVisible: false,
      addNoteDialogFormData: {
        member_id: 0,
        note: '',
        type:'RISKCONTROL'
      },
      addGroupDialogVisible: false,
      addNewGroupVisible: false,
      openMemberGroupId: 0,
      groups: [],
      memberOwnGroups: [],
      removeGrouppVisible: false,
      removeGroupId: '',
    }
  },
  computed: {
    formDataNotYet() {
      const isformDataComplete = (this.formData.datePicker !== []) && (this.formData.betFilter !== '' | this.formData.winFilter !== '' | this.formData.loginFilter !== '' | this.formData.ipFilter !== '' | this.formData.fingerFilter !== '')
      // const isformDataComplete = (this.formData.datePicker != []) && (this.formData.betFilter !="")
      return !isformDataComplete
    }
  },
  methods: {
    getWeirdMember() {
      this.formData.startDate = this.datePicker[0]
      this.formData.endDate = this.datePicker[1]

      filterSelection( this.formData ).then(response => {
        this.tableData = response.data.data
      })
    },
    addNote(order) {
      this.addNoteDialogFormData.member_id = order.memberId
      this.addNoteDialogFormData.note = ''
      this.addNoteDialogVisible = true
    },
    handleAddNote() {
      addCertNote(this.addNoteDialogFormData).then(() => {
        this.addNoteDialogVisible = false
        this.$message.success('修改备注成功')
      })
    },
    async openGroupDialog(order) {
      if (this.openMemberGroupId !== order.memberId) {
        this.openMemberGroupId = order.memberId;
        await this.getMemberOwnGroup();
      }
      this.addGroupDialogVisible = true;
    },
    getMemberOwnGroup() {
      return getMemberOwnGroupAPI(this.openMemberGroupId).then(response => {
        this.memberOwnGroups = response.data.data.reduce((groups, type) => {
          return [...groups, ...type.children];
        }, [])
      });
    },
    handleAddNewGroupCascaderDropdownVisibleChange(visible) {
      this.addNewGroupVisible = visible;
    },
    async addNewGroup() {
      await getMemeberGroupFullListAPI(this.openMemberGroupId).then(response => {
        this.groups = response.data.data;
      });

      this.addNewGroupVisible = true;
      this.$nextTick(() => {
        this.$refs.addNewGroupCascader.toggleDropDownVisible();
      });
    },
    handleAddNewGroup(group) {
      addMemberGroupToMemberAPI({
        member_id: this.openMemberGroupId,
        group_id: group[1]
      })
      .then(() => {
        return this.getMemberOwnGroup();
      })
      .then(() => {
        this.$message.success('新增群组成功');
      });
    },
    removeGroup(group) {
      this.removeGrouppVisible = true;
      this.removeGroupId = group.list_id;
    },
    handleRemoveGroup() {
      deleteMemberGroupMemberAPI(this.removeGroupId).then(() => {
        this.getMemberOwnGroup().then(() => {
          this.$message.success('群组移除成功');
          this.removeGrouppVisible = false;
        });
      });
    },
  }
}
</script>
<style lang="scss" scoped>
.conditionSelector{
  margin: 10px 0;
  padding: 10px;
  background: #f9f9f9;
}
.tableWarp{
  overflow: hidden;
  overflow-y: auto;
  background: #ccc;
  min-height: 500px;
}
</style>
