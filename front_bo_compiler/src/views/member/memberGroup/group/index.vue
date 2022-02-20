<template lang="pug">
  .container-fluid
    //- Group 修改
    .alert.alert-dark(v-if="editTypeBlock.visible")
      .position-absolute(style="top: 0 ;right: 10px")
        el-link.mx-3(:underline="false")
          i.el-icon-close(@click="editTypeBlock.visible = false; editTypeBlock.data = {}")
        el-link(:underline="false")
          i.el-icon-check(@click="submitEditType()")
      .d-flex.flex-row
        el-form(:model="editTypeBlock.data", :inline="true", size="mini", ref="form")
          el-form-item(
            v-if="fieldPerms.memberGroupTypeName",
            label="类型名称",
            prop="name",
            :rules="[{ required: true, message: '类型名称为必填' }]"
          )
            el-input(v-model="editTypeBlock.data.name")
          el-form-item(label="项目", prop="item")
            el-select(v-model="editTypeBlock.data.item")
              el-option(v-for="(item, key) in items", :key="key", :label="item", :value="key")
          el-form-item(label="备注", prop="note")
            el-input(type="textarea", v-model="editTypeBlock.data.note", :autosize="{ minRows: 2, maxRows: 6 }")
          el-form-item(v-if="fieldPerms.memberGroupTypeIsUnique")
            el-switch(
              v-model="editTypeBlock.data.is_unique",
              active-text="唯一",
              :active-value="true",
              :inactive-value="false",
              inactive-color="#ff4949",
            )
    //- Group 显示
    .alert.alert-secondary(v-else)
      .position-absolute(v-if="canEdit", style="top: 0 ;right: 10px")
        el-link(:underline="false")
          i.el-icon-edit(@click="editType()")
      .d-flex.flex-row
        .mx-3(v-if="fieldPerms.memberGroupTypeName") 类型名称: {{ type.memberGroupTypeName }}
        .mx-3(
          v-if="fieldPerms.memberGroupTypeItem && type.memberGroupTypeItem"
        ) 项目: {{ type.memberGroupTypeItem.display }}
        .mx-3(v-if="fieldPerms.memberGroupTypeNote && type.memberGroupTypeNote")
          span 备注: {{ type.memberGroupTypeNote }}
        el-switch.mx-3(
          v-if="fieldPerms.memberGroupTypeIsUnique",
          v-model="type.memberGroupTypeIsUnique",
          disabled,
          active-text="唯一",
          :active-value="true",
          :inactive-value="false",
          inactive-color="#ff4949",
        )
    //- 过滤资料
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.addMemberGroupGroup", @click="addGroup()") 新增群组
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
    //- Table
    .row
      el-table(:data="tableData", height="65vh")
        el-table-column(v-if="fieldPerms.memberGroupGroupName", prop="memberGroupGroupName", label="群组", align="center")
        el-table-column(v-if="fieldPerms.memberGroupGroupActive", label="状态", align="center", width="120")
          template(slot-scope="{ row }")
            el-tag(v-if="row.memberGroupGroupActive", type="success") 正常
            el-tag(v-else, type="danger") 停用
        el-table-column(v-if="fieldPerms.memberGroupGroupPersonCount", prop="memberGroupGroupPersonCount", label="人数", align="center")
        el-table-column(v-if="fieldPerms.memberGroupGroupNote", label="备注", align="center")
          template(slot-scope="{ row }")
            line-clamp(:content="row.memberGroupGroupNote")
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link.text-primary.mx-1(v-if="buttonPerms.editMemberGroupGroup", @click="editGroup(row)") 修改
              el-link(v-if="buttonPerms.showMemberGroupListByGroup")
                router-link.links.mx-1(
                  :to="{path:'memberGroupList', query: {title: `${row.memberGroupGroupName} - 名单`, id: row.id, parent}}"
                ) 查看名单
    //- form dialog
    el-dialog(
      :title="`${dialog.action}群组`",
      :visible.sync="dialog.visible",
      width="50%",
      top="10vh"
      :modal-append-to-body="false",
      @closed="resetDialog()"
    )
      el-form(:model="dialogData", ref="dialogForm", label-width="100px", status-icon)
        el-form-item(label="群组名称", prop="name", :rules="{required: true, message: '群组名称为必填'}")
          el-input(v-model="dialogData.name")
        el-form-item(label="备注", prop="note")
          el-input(type="textarea", v-model="dialogData.note", :autosize="{ minRows: 2, maxRows: 6}")
      .dialog-footer(slot="footer")
        el-button(type="primary" @click="submitDialogForm()") 确认{{ dialog.action }}
</template>

<script>
import {
  getMemberGroupTypeAPI,
  getMemberGroupItemAPI,
  editMemberGroupTypeAPI,
  getMemberGroupGroupByTypeAPI,
  addMemberGroupGroupAPI,
  editMemberGroupGroupAPI
} from '@/api/member/memberGroup';

export default {
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
            options: { 'all': '全部', 0: '关闭', 1: '开启' }
          },
        },
        { label: '群组名', model: 'name', component: 'filterInput', props: { type: 'text' }},
      ],
      type: {},
      items: {},
      editTypeBlock: {
        visible: false,
        data: {
          id: 0,
          name: '',
          item: '',
          note: '',
          is_unique: false
        }
      },
      dialog: {
        visible: false,
        action: '新增'
      },
      dialogData: {
        id: 0,
        name: '',
        note: '',
      },
    }
  },
  computed: {
    canEdit() {
      return this.buttonPerms.editMemberGroupTypeInGroup
        && this.type.memberGroupTypeItem
        && this.type.memberGroupTypeItem.value !== 'CASHFLOW';
    },
    parent() {
      return JSON.stringify({ title: this.$route.query.title,path: this.$route.fullPath });
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    if (! this.$route.query.id) {
      this.$store.dispatch('menu/removeTab', this.$route.fullPath);
      this.$message.error('无此类型！');
    }

    getMemberGroupTypeAPI(this.$route.query.id).then(response => {
      this.type = response.data.data[0];
    });

    getMemberGroupItemAPI().then(response => {
      this.items = response.data.data[0];
    });

    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getMemberGroupGroupByTypeAPI(this.$route.query.id, APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    editType() {
      this.editTypeBlock.data = {
        id: this.type.id,
        name: this.type.memberGroupTypeName,
        item: this.type.memberGroupTypeItem ? this.type.memberGroupTypeItem.value : '',
        note: this.type.memberGroupTypeNote,
        is_unique: this.type.memberGroupTypeIsUnique
      }
      this.editTypeBlock.visible = true;
    },
    submitEditType() {
      if (! this.canEdit) return;

      this.$refs.form.validate(valid => {
        if (! valid) return;

        editMemberGroupTypeAPI(this.editTypeBlock.data.id, this.editTypeBlock.data).then(response => {
          // todo: 改类型名称后 tab 有误
          // this.$router.push({ query: { title: 123 } })
          this.type = response.data.data[0];
          this.editTypeBlock.visible = false;
          this.$message.success('玩家类型修改成功');
        });
      })
    },
    addGroup() {
      this.dialog.visible = true;
    },
    editGroup(group) {
      this.dialog.action = '修改';
      this.dialogData.id = group.id;
      this.dialogData.name = group.memberGroupGroupName;
      this.dialogData.note = group.memberGroupGroupNote;

      this.dialog.visible = true;
    },
    submitDialogForm() {
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.dialogData.id === 0 ? this.handleCreate() : this.handleUpdate();
        }
      })
    },
    resetDialog() {
      this.$refs.dialogForm.resetFields();
      this.dialog.visible = false;
      this.dialogData.id = 0;
      this.dialog.action = '新增';
    },
    handleCreate() {
      this.dialogData['type_id'] = this.$route.query.id;

      addMemberGroupGroupAPI(this.dialogData).then(() => {
        this.$message.success('群组-新增成功')
        this.currentPage = 1;
        this.getData();
        this.resetDialog();
      });
    },
    handleUpdate() {
      editMemberGroupGroupAPI(this.dialogData.id, this.dialogData).then(response => {
        const responseGroup = response.data.data[0];
        this.$set(this.tableData, this.tableData.findIndex(group => group.id === responseGroup.id), responseGroup)
        this.resetDialog();
        this.$message.success('群组-修改成功');
      });
    },
  }
}
</script>
