<template lang="pug">
  .container-fluid
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
      el-table(:data="tableData", border, stripe, height="75vh")
        el-table-column(label="流水号", prop="id", align="center", width="150")
        el-table-column(label="类型", prop="type.display", align="center", width="150")
        el-table-column(label="任务名称", prop="name", align="center")
        el-table-column(label="更新时间", prop="updated_at", align="center", width="180")
        el-table-column(label="状态", prop="status.display", align="center", width="100")
        el-table-column(label="操作", align="center", width="240")
          template(slot-scope="{ row }")
            el-link.mx-1.text-primary(@click="editDetail(row)") 任務條件
            el-link.mx-1.text-primary(@click="editContent(row)") 编辑文案
            el-link.mx-1.text-primary(@click="openParticipated(row)") 查看名单
            el-link.mx-1.text-danger(v-if="row.status.value", @click="editTaskStatus(row, 0)") 停用
            el-link.mx-1.text-success(v-else, @click="editTaskStatus(row, 1)") 开启
    //- Detail dialog
    el-dialog(:title="dialogTitle", :visible.sync="dialogVisible")
      //- MARK: dialog destroy-on-close 有bug, 关闭时销毁 component 会又再创一个! 先用 v-if 销毁!
      component(v-if="dialogVisible", :is="dialogComponent", @close="dialogVisible = false")
    //- 编辑文案 dialog
    el-dialog(:visible.sync="contentDialogVisible", title="编辑文案")
      el-form(:model="contentDialogData", ref="contentForm", label-width="auto", :rules="rules", status-icon)
        el-form-item(label="标题", prop="title")
          el-input(v-model="contentDialogData.title", maxlength="15", show-word-limit, placeholder="请输入标题")
        el-form-item(v-if="contentDialogVisible", label="内文", prop="content")
          ckeditor(v-model="contentDialogData.content")
      .text-right.mt-3
        el-button(@click="contentDialogVisible = false") 取消
        el-button(type="primary", @click="handleEditContent") 确认

</template>

<script>
import { getTasksAPI, editTaskAPI } from '@/api/dreamCity/task';
import ckeditor from '@/components/CKEditor';
const taskDetail =  require.context('./taskDetail', true, /\.vue$/i);

export default {
  components: {
    ...taskDetail.keys().reduce((result, key) => {
      result[key.split('/').pop().split('.')[0]] = taskDetail(key).default
      return result;
    }, {}),
    ckeditor
  },
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      dialogVisible: false,
      dialogComponent: 'task1',
      dialogTitle: '',
      contentDialogVisible: false,
      contentId: 0,
      contentDialogData: {
        title: '',
        content: ''
      },
      rules: {
        title: [
          { required: true, message: '标题为必填' }
        ],
        content: [
          { required: true, message: '内文为必填' }
        ]
      }
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      getTasksAPI({
        per_page: this.pageSize,
        page: this.currentPage,
      }).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    editTaskStatus(task, status) {
      editTaskAPI(task.id, {
        status,
        type: task.type.value,
        name: task.name
      }).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(task => task.id === response.data.data[0].id),
          response.data.data[0]
        )
        this.$swal('成功！', `任务【${task.name}】已成功${['停用', '开启'][status]}`, 'success');
      })
    },
    editDetail({ id, name }) {
      this.dialogTitle = name;
      this.dialogComponent = `task${id}`;
      this.dialogVisible = true;
    },
    openParticipated({ id, name }) {
      this.$router.push({
        path: '/taskParticipated',
        query: { id, title: name + '名单' }
      })
    },
    editContent(task) {
      this.contentDialogData = Object.assign({}, task);
      this.contentDialogVisible = true;
    },
    handleEditContent() {
      this.contentDialogData.status = this.contentDialogData.status.value;
      this.contentDialogData.type = this.contentDialogData.type.value;
      editTaskAPI(this.contentDialogData.id, this.contentDialogData).then(response => {
        this.$set(
          this.tableData,
          this.tableData.findIndex(task => task.id === response.data.data[0].id),
          response.data.data[0]
        );
        this.$message.success('文案编辑成功');
        this.contentDialogVisible = false;
      })
    }
  }
}
</script>
