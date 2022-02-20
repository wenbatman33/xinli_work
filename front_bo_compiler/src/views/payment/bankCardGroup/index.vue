<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.addBankCardGroup", @click="dialog.visible = true") 新增群组
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
        el-table-column(v-if="fieldPerms.GroupBCardName", label="群组名称", align="center")
          template(slot-scope="{ row }")
            router-link(
              :to="{ path: '/bankCardGroupDetail', query: { title: row.GroupBCardName, id: row.id } }"
            ) {{ row.GroupBCardName }}
        el-table-column(v-if="fieldPerms.GroupBCardCardNum", prop="GroupBCardCardNum", label="银行卡数", align="center")
        el-table-column(v-if="fieldPerms.GroupBCardMemberNum", prop="GroupBCardMemberNum", label="会员数", align="center")
        el-table-column(v-if="fieldPerms.GroupBCardUplimit || fieldPerms.GroupBCardLowerLimit", label="单笔限额", align="center")
          template(slot-scope="{ row }")
            | {{ row.GroupBCardLowerLimit }} ~ {{ row.GroupBCardUplimit }}
        el-table-column(
          v-if="fieldPerms.GroupBCardNote",
          prop="GroupBCardNote",
          label="备注",
          align="center",
          show-overflow-tooltip
        )
        el-table-column(v-if="buttonPerms.editBankCardGroup", label="管理", width="100", align="center")
          template(slot-scope="{ row }")
            el-link.text-primary(type="primary", @click="editBankCardGroup(row)") 编辑
    //- dialog
    el-dialog(:visible.sync="dialog.visible", :title="dialog.title", @closed="dialogClose", @open="dialogOpen")
      el-form(:model="formData", ref="form", label-width="160px", :rules="rules", status-icon)
        el-form-item(label="群组名称", prop="name")
          el-input(v-model="formData.name", placeholder="请输入群组名称", maxlength="20", show-word-limit)
        el-form-item(label="备注", prop="note")
          el-input(
            type="textarea",
            v-model="formData.note",
            :autosize="{ minRows: 6, maxRows: 20}",
            maxlength="200",
            show-word-limit
          )
        el-form-item(label="单笔限额", required)
          el-col(:span="11")
            el-form-item(prop="lower_limit")
              el-input(type="number", v-model.number="formData.lower_limit", min="0")
          el-col.text-center(:span="2") ~
          el-col(:span="11")
            el-form-item(prop="up_limit")
              el-input(type="number", v-model.number="formData.up_limit", min="0")
        el-form-item(label="群组分类", prop="category")
          el-select(v-model="formData.category")
            el-option(v-for="(category, index) in categories", :key="index", :value="index >> 0", :label="category")
        el-form-item(label="可转出的银行卡群组", prop="transfer_out_group")
          el-select(v-model="formData.transfer_out_group", multiple)
            el-option-group(label="🔄 点击重新获取群组 🔄", @click.native="fetchGroups()")
              el-option(v-for="group in transferGroups", :key="group.id", :value="group.id", :label="group.name")
        el-form-item
          el-button(@click="handleSubmit()") 储存
</template>

<script>
import { getBankCardGroupsAPI, addBankCardGroupAPI, editBankCardGroupAPI } from '@/api/payment/bankCardGroup';

export default {
  data() {
    const checkLowerLimit = (rule, value, callback) => {
      if (value > this.formData.up_limit) {
        callback(new Error('下限不得超过上限'));
      }

      callback();
    }

    const checkUpLimit = (rule, value, callback) => {
      if (value < this.formData.lower_limit) {
        callback(new Error('上限不得低于下限'));
      }

      callback();
    }

    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      needFetchGroups: true,
      groups: [],
      categories: {
        1: '存款卡',
        2: '出款卡',
        3: '中转卡',
        4: '三方结帐卡',
        5: '仓库卡'
      },
      dialog: {
        visible: false,
        title: '新增群组'
      },
      formData: {
        id: 0,
        name: '',
        note: '',
        lower_limit: 0,
        up_limit: 0,
        category: 1,
        transfer_out_group: []
      },
      rules: {
        name: [
          { required: true, message: '群组名称为必填', trigger: 'submit' },
          { max: 20, message: '群组名称最多20个字元' }
        ],
        note: [
          { max: 200, message: '群组名称最多200个字元' }
        ],
        lower_limit: [
          { required: true, message: '单笔下限为必填' },
          { type: 'number', message: '单笔下限为数字值'},
          { validator: checkLowerLimit, trigger: 'submit' }
        ],
        up_limit: [
          { required: true, message: '单笔上限为必填' },
          { type: 'number', message: '单笔上限为数字值'},
          { validator: checkUpLimit, trigger: 'submit' }
        ],
        category: [
          { required: true, message: '必须选择一个银行卡群组', trigger: 'submit' }
        ],
      },
      filterList: [
        {
          label: '群组名称',
          model: 'name',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ]
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
  },
  computed: {
    transferGroups(id = 0) {
      return this.groups.reduce((result, group) => {
        if (group.id !== id) {
          result.push({ id: group.id, name: group.GroupBCardName || group.id });
        }

        return result
      }, []);
    }
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

      getBankCardGroupsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    editBankCardGroup(row) {
      this.formData.id = row.id;
      this.formData.name = row.GroupBCardName;
      this.formData.note = row.GroupBCardNote;
      this.formData.lower_limit = row.GroupBCardLowerLimit;
      this.formData.up_limit = row.GroupBCardUplimit;
      this.formData.category = row.GroupBCardCategory ? row.GroupBCardCategory.value : 1;
      if (row.GroupBCardTransferOutGroup.length) {
        this.formData.transfer_out_group = row.GroupBCardTransferOutGroup.map(group => group.id);
      }

      this.dialog.visible = true;
      this.dialog.title = `编辑群组 - ${row.GroupBCardName}`;
    },
    dialogOpen() {
      if (this.$refs.form) {
        this.$refs.form.clearValidate();
      }

      if (this.needFetchGroups) {
        this.fetchGroups();
      }
    },
    fetchGroups() {
      getBankCardGroupsAPI().then(response => {
        this.groups = response.data.data;
        this.needFetchGroups = false;
      });
    },
    dialogClose() {
      this.formData.id = 0;
      this.formData.name = '';
      this.formData.note = '';
      this.formData.lower_limit = 0;
      this.formData.up_limit = 0;
      this.formData.category = 1;
      this.formData.transfer_out_group = [];
      this.dialog.title = '新增群组';
      this.$refs.form.clearValidate();
    },
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = {
            name: this.formData.name,
            note: this.formData.note,
            lower_limit: this.formData.lower_limit,
            up_limit: this.formData.up_limit,
            category: this.formData.category,
            show: 1,
            transfer_out_group: this.formData.transfer_out_group
          };

          this.formData.id ? this.handleUpdate(this.formData.id, data) : this.handleCreate(data);
        }
      })
    },
    handleCreate(data) {
      addBankCardGroupAPI(data).then(() => {
        this.$message.success('银行卡金流群组 - 新增成功');
        this.dialog.visible = false;
        this.needFetchGroups = true;
        this.getData();
      });
    },
    handleUpdate(id, data) {
      editBankCardGroupAPI(id, data).then(response => {
        this.$message.success('银行卡金流群组 - 编辑成功');
        this.dialog.visible = false;
        this.$set(
          this.tableData,
          this.tableData.findIndex(group => group.id === response.data.data[0].id),
          response.data.data[0]
        );
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.el-select {
  display: block;
}
/deep/ .el-select-group__title {
  cursor: pointer;
  color: #3f3f3f;
  font-weight: 600;
}
</style>

