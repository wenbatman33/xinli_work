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
        el-table-column(v-if="fieldPerms.gameManTypeNamePc", prop="gameManTypeNamePc", label="PC 中文", align="center")
        el-table-column(
          v-if="fieldPerms.gameManTypeNameMobile",
          prop="gameManTypeNameMobile",
          label="Mobile 中文",
          align="center"
        )
        el-table-column(v-if="fieldPerms.gameManTypeGroupCount", prop="gameManTypeGroupCount", label="厂商数", align="center")
        el-table-column(v-if="fieldPerms.gameManTypeGameCount", prop="gameManTypeGameCount", label="游戏数", align="center")
        el-table-column(v-if="fieldPerms.gameManTypeStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.gameManTypeStatus.value === 0", type="danger") {{ row.gameManTypeStatus.display }}
            el-tag(v-if="row.gameManTypeStatus.value === 1", type="success") {{ row.gameManTypeStatus.display }}
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              template(v-if="buttonPerms.editGameTypeStatus && fieldPerms.gameManTypeStatus")
                el-link.mx-1.text-success(
                  v-if="row.gameManTypeStatus.value === 0",
                  @click="editGameTypeStatus(row.id, 1)"
                ) 启用
                el-link.mx-1(
                  v-if="row.gameManTypeStatus.value === 1",
                  @click="editGameTypeStatus(row.id, 0)"
                ) 停用
              el-link(v-if="buttonPerms.editGameType")
                router-link.links.mx-1(
                  :to="{ path:'gameTypeEdit', query: { title: `游戏类型 - ${row.gameManTypeNamePc}`, id: row.id } }"
                ) 编辑
</template>

<script>
import { getGameTypesAPI, editGameTypeAPI } from '@/api/site/gameType'

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

      getGameTypesAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    },
    editGameTypeStatus(id, status) {
      editGameTypeAPI(id, { status }).then(response => {
        const responseGameType = response.data.data[0];

        this.tableData.find(gameType => gameType.id === responseGameType.id).gameManTypeStatus = responseGameType.gameManTypeStatus;
        this.$message.success('状态修改成功');
      })
    }
  }
}
</script>
