<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.dreamCityAddNews", @click="$router.push('/dreamCityNewsCreate?title=新增公告')") 新增公告
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
        el-table-column(prop="id", label="ID", align="center", width="60")
        el-table-column(v-if="fieldPerms.newsMallTitle", prop="newsMallTitle", label="标题", align="center")
        el-table-column(v-if="fieldPerms.newsMallContent", label="内文", align="center")
          template(slot-scope="{ row }")
            line-clamp(:content="row.newsMallContent", :line="3")
        el-table-column(
          v-if="fieldPerms.newsMallTimeStart || fieldPerms.newsMallTimeEnd",
          label="上下架时间",
          width="180",
          align="center"
        )
          template(slot-scope="{ row }")
            span {{ row.newsMallTimeStart || '--' }}
            br
            span ~
            br
            span {{ row.newsMallTimeEnd || '--' }}
        el-table-column(v-if="fieldPerms.newsMallTop", label="置顶", align="center", width="50")
          template(slot-scope="{ row }")
            i.el-icon-circle-close.text-danger.h5(v-if="row.newsMallTop.value === 0")
            i.el-icon-circle-check.text-success.h5(v-else-if="row.newsMallTop.value === 1")
            i.el-icon-remove-outline(v-else)
        el-table-column(v-if="fieldPerms.newsMallStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.newsMallStatus.value === 0", type="danger") {{ row.newsMallStatus.display }}
            el-tag(v-if="row.newsMallStatus.value === 1", type="success") {{ row.newsMallStatus.display }}
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link.text-danger(v-if="buttonPerms.dreamCityDeleteNews", @click="deleteNews(row)") 删除
              template(v-if="buttonPerms.dreamCityEditNewsStatus && fieldPerms.newsMallStatus")
                el-link.mx-1.text-success(
                  v-if="row.newsMallStatus.value === 0",
                  @click="enableNews(row.id)"
                ) 启用
                el-link.mx-1(
                  v-if="row.newsMallStatus.value === 1",
                  @click="disableNews(row.id)"
                ) 停用
              el-link
                router-link.links.mx-1(
                  :to="{ path:'dreamCityNewsCreate', query: { title: `公告 - ${row.newsMallTitle}`, id: row.id } }"
                ) 编辑
</template>

<script>
import { getNewsListAPI, deleteNewsAPI, editNewsAPI } from '@/api/site/news';

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
            options: { 'all': '全部', 0: '关闭', 1: '开启' },
          },
        },
        { label: '标题', model: 'title', component: 'filterInput', props: { type: 'text' }},
      ]
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
        page: this.currentPage,
        platform: 3
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getNewsListAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    deleteNews(news) {
      this.$swal({
        title: '确定删除？',
        text: `您即将删除 ${news.newsMallTitle || '公告'}`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: '确认删除！',
        cancelButtonText: '取消'
      })
        .then(result => {
          if (result.value) {
            return deleteNewsAPI(news.id);
          }

          return Promise.reject();
        })
        .then(() => {
          this.getData();
          this.$message.success('公告 - 删除成功！');
        })
        .catch(() => {})
    },
    disableNews(id) {
      editNewsAPI(id, { status: 0 }).then(response => {
        const responseNews = response.data.data[0];
        this.tableData.find(news => news.id === responseNews.id).newsMallStatus = responseNews.newsMallStatus;
      })
    },
    enableNews(id) {
      editNewsAPI(id, { status: 1 }).then(response => {
        const responseNews = response.data.data[0];
        this.tableData.find(news => news.id === responseNews.id).newsMallStatus = responseNews.newsMallStatus;
      })
    }
  }
}
</script>
