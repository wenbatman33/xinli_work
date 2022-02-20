<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.addGreetings", @click="$router.push('/greetingsEdit?title=新增欢迎词')") 新增欢迎词
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
        el-table-column(label="编号", prop="id", align="center")
        el-table-column(v-if="fieldPerms.greetContent", prop="greetContent", label="文案", align="center", width="160")
        el-table-column(v-if="fieldPerms.greetPeriod && periodsDescription.length", align="center", width="120")
          template(slot-scope="{ row }")
            span(slot="reference") {{ row.greetPeriod.display }}
          template(slot="header")
            el-popover(trigger="hover", placement="right")
              span(slot="reference").pl-3 显示时间
                i.el-icon-question.mx-1
              el-table(:data="periodsDescription")
                el-table-column(prop="display", label="显示时间", align="center")
                el-table-column(prop="period", label="时段", width="120", align="center")
        el-table-column(v-if="fieldPerms.greetStartDate", label="上架时间", align="center", width="180")
          template(slot-scope="{ row }")
            | {{ row.greetStartDate || '--' }}
        el-table-column(v-if="fieldPerms.greetEndDate", label="下架时间", align="center", width="180")
          template(slot-scope="{ row }")
            | {{ row.greetEndDate || '--' }}
        el-table-column(v-if="fieldPerms.greetStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.greetStatus.value === 0", type="danger") {{ row.greetStatus.display }}
            el-tag(v-if="row.greetStatus.value === 1", type="success") {{ row.greetStatus.display }}
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link.text-danger(v-if="buttonPerms.deleteGreetings", @click="deleteGreetings(row)") 删除
              template(v-if="buttonPerms.editGreetingsStatus && fieldPerms.greetStatus")
                el-link.mx-1.text-success(
                  v-if="row.greetStatus.value === 0",
                  @click="editGreetingsStatus(row.id)"
                ) 启用
                el-link.mx-1(
                  v-if="row.greetStatus.value === 1",
                  @click="editGreetingsStatus(row.id)"
                ) 停用
              el-link
                router-link.links.mx-1(
                  :to="{ path:'greetingsEdit', query: { title: `欢迎词 - ${row.id}`, id: row.id } }"
                ) 编辑
</template>

<script>
import { getGreetingsListAPI, editGreetingsStatusAPI, getPeriodsAPI, deleteGreetingsAPI } from '@/api/site/greetings';

export default {
  data() {
    return {
      periods: {},
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
            options: { 'all': '全部', 0: '关闭', 1: '开启' },
          },
        },
        { label: '文案', model: 'content', component: 'filterInput', props: { type: 'text' }},
      ]
    }
  },
  computed: {
    periodsDescription() {
      return Object.keys(this.periods)
        .map(periodKey => this.periods[periodKey])
        .filter(period => period.display !== '全日');
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    getPeriodsAPI().then(response => {
      this.periods = response.data.data;
    });

    this.getData();

  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        // platform: 1
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getGreetingsListAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    deleteGreetings(greetings) {
      this.$swal({
        title: '确定删除？',
        text: `您即将删除 ${greetings.id} - ${greetings.greetContent || '欢迎词'}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认删除！',
        cancelButtonText: '取消'
      })
        .then(result => {
          if (result.value) {
            return deleteGreetingsAPI(greetings.id);
          }

          return Promise.reject();
        })
        .then(() => {
          this.getData();
          this.$message.success('欢迎词 - 删除成功！');
        })
        .catch(() => {})
    },
    editGreetingsStatus(id) {
      editGreetingsStatusAPI(id).then(response => {
        const responseGreetings = response.data.data[0];
        this.tableData.find(greetings => greetings.id === responseGreetings.id).greetStatus = responseGreetings.greetStatus;
      })
    }
  }
}
</script>
