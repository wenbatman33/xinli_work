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
      el-table(:data="tableData", height="82vh")
        el-table-column(
          v-if="fieldPerms.gameManGroupCompanyName", prop="gameManGroupCompanyName", label="厂商公司名", align="center"
        )
        el-table-column(
          v-if="fieldPerms.gameManGroupCompanyTag", prop="gameManGroupCompanyTag", label="厂商代号", align="center"
        )
        el-table-column(
          v-if="fieldPerms.gameManGroupName", prop="gameManGroupName", label="厂商显示名称", align="center", width="150"
        )
        el-table-column(v-if="fieldPerms.gameManGroupGameType", label="游戏分类", align="center")
          template(slot-scope="{ row }")
            | {{ row.gameManGroupGameType.display }}
        el-table-column(v-if="fieldPerms.gameManGroupPlayMode", label="游戏型态", align="center")
          template(slot-scope="{ row }")
            | {{ row.gameManGroupPlayMode.display }}
        el-table-column(v-if="fieldPerms.gameManGroupStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.gameManGroupStatus.value === 0", type="danger") {{ row.gameManGroupStatus.display }}
            el-tag(v-if="row.gameManGroupStatus.value === 1", type="success") {{ row.gameManGroupStatus.display }}
            el-tag(v-if="row.gameManGroupStatus.value === 2", type="warning") {{ row.gameManGroupStatus.display }}
        el-table-column(label="操作", width="100", align="center")
          template(slot-scope="{ row }")
            el-link(v-if="buttonPerms.editGameGroup")
              router-link.links.mx-1(
                :to="{ path:'gameGroupEdit', query: { title: `游戏厂商 - ${row.gameManGroupCompanyName}`, id: row.id } }"
              ) 编辑
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
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
      }

      require('@/api/site/gameGroup').getGameGroupsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    }
  }
}
</script>
