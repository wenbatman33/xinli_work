<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
    .justify-content-end
      el-pagination(
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
      el-table(:data="tableData", border, stripe, height="70vh")
        el-table-column(label="申请时间", prop="agencyApplyCreatedAt", align="center", width="160")
        el-table-column(label="更新时间", prop="agencyApplyUpdatedAt", align="center", width="160")
        el-table-column(label="代理编号", prop="agencyApplyCode", align="center")
        el-table-column(label="代理帐号", prop="agencyApplyAccount", align="center")
        el-table-column(label="代理名称", prop="agencyApplyName", align="center")
        el-table-column(label="Email", prop="agencyApplyEmail", align="center")
        el-table-column(label="联系电话", prop="agencyApplyPhone", align="center")
        el-table-column(label="QQ", prop="agencyApplyQq", align="center")
        el-table-column(label="推广方式描述", prop="agencyApplyContent", align="center")
        el-table-column(label="状态", prop="agencyApplyStatus.display", align="center")
        el-table-column(label="备注", prop="agencyApplyNote", align="center")
        el-table-column(label="操作人", prop="agencyApplyEditedUser.display", align="center")
        el-table-column(label="操作", align="center")
          template(slot-scope="{ row }")
            el-link.mx-1.text-primary(
              v-if="buttonPerms.agencyApplyAddAgency && row.agencyApplyStatus.value !== 2",
              @click="open(row)"
            ) 开通
            el-link.mx-1.text-primary(v-if="buttonPerms.agencyApplyEditStatus", @click="editNote(row)") 备注
    //- 修改备注 dialog
    el-dialog(:visible.sync="editNoteVisible", title="备注")
      el-form(label-width="auto")
        el-form-item(label="状态")
          el-select(v-model="editNoteStatus", :disabled="editNoteStatus === 2")
            el-option(label="新增", :value="0")
            el-option(label="已聯繫", :value="1")
            el-option(label="已開通", :value="2")
            el-option(label="放棄", :value="3")
        el-form-item(label="備註")
          el-input(type="textarea", v-model="editNoteNote", :autosize="{ minRows: 6, maxRows: 10 }")
      .text-right.mt-3
        el-button(@click="editNoteVisible = false") 取消
        el-button(type="primary", @click="handleEditNote()") 确认
    //- 开通 dialog
    el-dialog(:visible.sync="formVisible", title="开通代理", top="5vh")
      agencyForm(
        :data="agency"
        v-if="formVisible",
        @close="formVisible = false",
        @success="addAgencySuccess()"
      )

</template>

<script>
import { getAgencyApplyListAPI, editAgencyApplyStatusAPI } from '@/api/agency/apply';
import agencyForm from '../agency/_form.vue';

export default {
  components: { agencyForm },
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '新增', 1: '已联系', 2: '已开通', 3: '放弃' },
          },
        },
        { label: '代理帐号', model: 'account', component: 'filterInput', props: { type: 'text' }},
        { label: '代理编号', model: 'code', component: 'filterInput', props: { type: 'text' }},
        { label: '代理名称', model: 'name', component: 'filterInput', props: { type: 'text' }},
        { label: '联系电话', model: 'phone', component: 'filterInput', props: { type: 'text' }},
        { label: 'Email', model: 'email', component: 'filterInput', props: { type: 'text' }},
        { label: 'QQ', model: 'qq', component: 'filterInput', props: { type: 'text' }},
        { label: '申请时间', model: 'time', component: 'filterDatePicker', props: { type: 'datetimerange' } }
      ],
      editNoteVisible: false,
      editNoteNote: '',
      editNoteStatus: 1,
      formVisible: false,
      agency: {}
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
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

      if (APIParams.time) {
        APIParams.start_time = APIParams.time[0];
        APIParams.end_time = APIParams.time[1];
        delete APIParams.time;
      }

      getAgencyApplyListAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    open(row) {
      this.agency = {
        agencyCode: row.agencyApplyCode,
        agencyAccount: row.agencyApplyAccount,
        agencyName: row.agencyApplyName,
        agencyEmail: row.agencyApplyEmail,
        agencyIsFrozen: false,
        isApply: true
      }

      this.openId = row.agencyApplyId;
      this.formVisible = true;
    },
    addAgencySuccess() {
      // MARK: 後端沒做開通後處理 手动改为已开通
      editAgencyApplyStatusAPI(this.openId, { status: 2 }).then(() => {
        this.getData();
        this.formVisible = false;
      });
    },
    editNote(row) {
      this.editNoteId = row.agencyApplyId;
      this.editNoteNote = row.agencyApplyNote;
      this.editNoteStatus = row.agencyApplyStatus.value;
      this.editNoteVisible = true;
    },
    handleEditNote() {
      editAgencyApplyStatusAPI(this.editNoteId, {
        status: this.editNoteStatus,
        note: this.editNoteNote
      })
      .then(response => {
        this.editNoteVisible = false;
        this.$set(
          this.tableData,
          this.tableData.findIndex(item => item.agencyApplyId === response.data.data[0].agencyApplyId),
          response.data.data[0]
        )
        this.$swal('成功！', '修改成功', 'success');
      })
    }
  }
}
</script>
