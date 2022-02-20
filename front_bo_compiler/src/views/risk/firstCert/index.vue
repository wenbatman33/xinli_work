<template lang="pug">
  .container-fluid
    .d-flex.justify-content-between
      el-date-picker.d-flex.align-items-center(
        v-model="date",
        size="mini",
        type="date",
        value-format="yyyy-MM-dd",
        @change="getData()"
      )
      el-pagination.mr-0(
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
      el-table(:data="firstCert", style="width: 100%")
        el-table-column(v-if="fieldPerms.memberUserAccount", prop="memberUserAccount", label="帐号", width="150", align="center")
          template(slot-scope="{ row }")
            router-link(:to="{ path: '/memberDetail', query: { title: row.memberUserAccount, id: row.riskManagerMemberId } }")
              | {{ row.memberUserAccount }}
        el-table-column(v-if="fieldPerms.riskManagerIp", prop="riskManagerIp", label="IP", width="150", align="center")
          template(slot-scope="{ row }")
            el-link.text-primary.m-0(@click="linkIPList(row.riskManagerIp)") {{ row.riskManagerIp }}
            P.m-0.text-danger 帐号数：{{ row.riskManagerSameIpCount }}
        el-table-column(v-if="fieldPerms.riskManagerFinger", prop="riskManagerFinger", label="装置", width="350", align="center")
          template(slot-scope="{ row }")
            el-link.text-primary.m-0(@click="linkFingerList(row.riskManagerFinger)") {{ row.riskManagerFinger }}
            P.m-0.text-danger 帐号数：{{ row.riskManagerSameFingerCount }}
        el-table-column(v-if="fieldPerms.riskManagerPlace", prop="riskManagerPlace", label="位置", width="120", align="center")
        el-table-column(v-if="fieldPerms.riskManagerCreatedAt", prop="riskManagerCreatedAt", label="注册时间", width="200", align="center")
        el-table-column(v-if="fieldPerms.memberPhone", prop="memberPhone", label="行动电话", width="150", align="center")
        el-table-column(v-if="fieldPerms.memberEmail", prop="memberEmail", label="Email", width="150", align="center")
        el-table-column(label="管理", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link.mx-1.text-primary(v-if="buttonPerms.firstCertAddNote", @click='addNote(row)') 备注
              el-link.mx-1.text-primary(v-if="buttonPerms.firstCertEditGroup", @click='openGroupDialog(row)') 群组
              el-link.mx-1.text-primary(v-if="buttonPerms.firstCertEditGroup", @click='openCertificate(row)') 初审完成
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
import { getFirstCert, addCertNote, certThis } from '@/api/risk/firstCert'
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
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      firstCert: [],
      date: '',
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
  created() {
    this.date = new Date().toISOString().split('T')[0];
    this.getData();
  },
  methods: {
    getData() {
      getFirstCert({ created_at: this.date }).then(response => {
        this.firstCert = response.data.data
        this.dataTotal = response.data.meta.pagination.total
        this.currentPage = response.data.meta.pagination.current_page
      })
    },
    addNote(order) {
      this.addNoteDialogFormData.member_id = order.riskManagerMemberId
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
      if (this.openMemberGroupId !== order.riskManagerMemberId) {
        this.openMemberGroupId = order.riskManagerMemberId;
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
    openCertificate(order){
      this.$confirm('确认将此玩家「初审通过」？', '系统提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.certificate(order);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消初审'
          });
        });
    },
    certificate(order){
      certThis(order.id).then(() => {
        this.$message({
          type: 'success',
          message: '初审通过'
        });
        this.getData()
      })
    },
    linkIPList(IP) {
      this.$router.push({
        path: '/memberLoginLog',
        query: { IP }
      })
    },
    linkFingerList(finger) {
      this.$router.push({
        path: '/memberLoginLog',
        query: { finger }
      })
    }
  }
}
</script>
