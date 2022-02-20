<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.addMemberGroupType", @click="addType()") 新增类型
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
      el-table(:data="tableData", height="75vh")
        el-table-column(v-if="fieldPerms.memberGroupTypeName", prop="memberGroupTypeName", label="类型", align="center")
        el-table-column(v-if="fieldPerms.memberGrpupTypeGroups", label="群组", align="center")
          template(slot-scope="{ row }")
            el-tooltip(v-if="row.memberGrpupTypeGroups.length > 3")
              div(slot="content")
                el-tag.m-1(v-for="group in row.memberGrpupTypeGroups", :key="group.id") {{ group.memberGroupGroupName }}
              el-badge.mt-2(:value="row.memberGrpupTypeGroups.length", type="warning")
                el-tag {{ row.memberGrpupTypeGroups[0] && row.memberGrpupTypeGroups[0].memberGroupGroupName }}
            el-tag.m-1(v-else, v-for="group in row.memberGrpupTypeGroups", :key="group.id") {{ group.memberGroupGroupName }}
        el-table-column(v-if="fieldPerms.memberGroupTypeItem", label="项目", align="center")
          template(slot-scope="{ row }")
            span {{ row.memberGroupTypeItem.display }}
        el-table-column(v-if="fieldPerms.memberGroupTypeIsUnique", label="唯一", align="center")
          template(slot-scope="{ row }")
            i.el-icon-circle-check.text-success.h5(v-if="row.memberGroupTypeIsUnique")
            i.el-icon-circle-close.text-danger.h5(v-else)
        el-table-column(
          v-if="fieldPerms.memberGroupTypePersonCount",
          prop="memberGroupTypePersonCount",
          label="人数",
          align="center",
          width="50"
        )
        el-table-column(v-if="fieldPerms.memberGroupTypeNote", label="备注", align="center")
          template(slot-scope="{ row }")
            line-clamp(:content="row.memberGroupTypeNote")
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link(v-if="buttonPerms.showMemberGroupType")
                router-link.links.mx-1(
                  :to="{ path:'memberGroupGroup', query: { title: `类型 - ${row.memberGroupTypeName}`, id: row.id } }"
                ) 查看
              el-link.text-primary.mx-1(
                v-if="buttonPerms.editMemberGroupType && ! isCashflow(row.memberGroupTypeItem)",
                @click="editType(row)"
              ) 修改
              el-link
                router-link.links.mx-1(
                  :to="{ path:'memberGroupTypeList', query: { title: `${row.memberGroupTypeName} - 名单`, id: row.id } }"
                ) 查看名单
    //- form dialog
    el-dialog(
      :title="`${dialog.action}类型`",
      :visible.sync="dialog.visible",
      width="50%",
      top="10vh"
      :modal-append-to-body="false",
      @closed="resetDialog()"
    )
      el-form(:model="formData", ref="form", label-width="100px", :rules="rules", status-icon)
        el-form-item(label="类型名称", prop="name")
          el-input(v-model="formData.name")
        el-form-item(label="项目", prop="item")
          el-select(v-model="formData.item")
            el-option(v-for="(item, key) in items", :key="key", :label="item", :value="key")
        el-form-item(label="备注", prop="note")
          el-input(type="textarea", v-model="formData.note", :autosize="{ minRows: 2, maxRows: 6}")
        el-form-item(prop="is_unique")
          template(slot="label")
            span 唯一
            el-popover(trigger="hover", placement="bottom-start")
              span 玩家此类型底下的群组只能设定一个
              i.el-icon-info(slot="reference")
          el-switch(
            v-model="formData.is_unique",
            active-text="启用",
            :active-value="true",
            inactive-text="停用",
            :inactive-value="false",
            inactive-color="red"
          )
      .dialog-footer(slot="footer")
        el-button(type="primary" @click="submitForm()") 确认{{ dialog.action }}
</template>

<script>
import {
  getMemberGroupTypesAPI,
  getMemberGroupItemAPI,
  addMemberGroupTypeAPI,
  editMemberGroupTypeAPI
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
          label: '唯一',
          model: 'is_unique',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '否', 1: '是' }
          },
        },
        {
          label: '项目',
          model: 'item',
          component: 'filterSelect',
          props: {
            options: {}
          },
        },
        { label: '类型', model: 'name', component: 'filterInput', props: { type: 'text' }},
      ],
      items: {},
      dialog: {
        visible: false,
        action: '新增'
      },
      formData: {
        name: '',
        item: '',
        note: '',
        is_unique: false
      },
      editId: 0,
      rules: {
        name: [
          { required: true, message: '类型名称为必填' }
        ],
        item : [
          { required: true, message: '必须选择一种项目' }
        ]
      }
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
    getMemberGroupItemAPI().then(response => {
      this.items = response.data.data[0];
      this.filterList.find(filter => filter.model === 'item').props.options = response.data.data[0];
    })
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

      getMemberGroupTypesAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    // Item 为金流 "CASHFLOW" 不可修改
    isCashflow(item) {
      return item && item.value === 'CASHFLOW';
    },
    addType() {
      this.dialog.visible = true;
    },
    editType(type) {
      this.dialog.action = '修改';
      this.editId = type.id;
      this.formData.name = type.memberGroupTypeName;
      this.formData.item = type.memberGroupTypeItem ? type.memberGroupTypeItem.value : '';
      this.formData.note = type.memberGroupTypeNote;
      this.formData.is_unique = type.memberGroupTypeIsUnique;

      this.dialog.visible = true;
    },
    resetDialog() {
      this.$refs.form.resetFields();
      this.dialog.visible = false;
      this.editId = 0;
      this.dialog.action = '新增';
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.editId === 0 ? this.handleCreate() : this.handleUpdate();
        }
      })
    },
    handleCreate() {
      addMemberGroupTypeAPI(this.formData).then(() => {
        this.$message.success('类型-新增成功')
        this.currentPage = 1;
        this.getData();
        this.resetDialog();
      });
    },
    handleUpdate() {
      editMemberGroupTypeAPI(this.editId, this.formData).then(response => {
        const responseType = response.data.data[0];
        this.$set(this.tableData, this.tableData.findIndex(type => type.id === responseType.id), responseType)
        this.resetDialog();
        this.$message.success('类型-修改成功');
      });
    },
  }
}
</script>
