<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.addGame", @click="$router.push('/gameEdit?title=新增游戏')") 新增游戏
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
      el-table(:data="tableData", height="70vh")
        el-table-column(prop="id", label="流水号", align="center")
        el-table-column(v-if="fieldPerms.gameManListGameGroup", label="厂商名称", align="center")
          template(slot-scope="{ row }")
            | {{ row.gameManListGameGroup.display }}
        el-table-column(v-if="fieldPerms.gameManListGameName", prop="gameManListGameName", label="游戏名称", align="center")
        el-table-column(
          v-if="fieldPerms.gameManListBettingCode",
          prop="gameManListBettingCode",
          label="游戏原厂代号",
          align="center",
          width="110"
        )
        el-table-column(v-if="fieldPerms.gameManListGameCode", prop="gameManListGameCode", label="游戏代码", align="center")
        el-table-column(label="图示", width="200", align="center")
          template(slot-scope="{ row }")
            img.v-100.w-100(v-lazy="row.bannerImagePc || row.gameManListImages")
        el-table-column(v-if="fieldPerms.gameManListPopular", prop="gameManListPopular", label="热门度", align="center")
        el-table-column(v-if="fieldPerms.gameManListGameTag", label="标签", align="center", width="200")
          template(slot-scope="{ row }")
            el-tooltip(v-if="row.gameManListGameTag.length > 3")
              div(slot="content")
                el-tag.m-1(v-for="tag in row.gameManListGameTag", :key="tag.value") {{ tag.display }}
              el-badge.mt-2(:value="row.gameManListGameTag.length", type="warning")
                el-tag {{ row.gameManListGameTag[0] && row.gameManListGameTag[0].display }}
            el-tag.m-1(v-else, v-for="tag in row.gameManListGameTag", :key="tag.value") {{ tag.display }}
        el-table-column(v-if="fieldPerms.gameManListStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.gameManListStatus.value === 0", type="danger") {{ row.gameManListStatus.display }}
            el-tag(v-if="row.gameManListStatus.value === 1", type="success") {{ row.gameManListStatus.display }}
        el-table-column(v-if="fieldPerms.gameManListH5Game", label="H5 游戏", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.gameManListH5Game.value === 0", type="danger") {{ row.gameManListH5Game.display }}
            el-tag(v-if="row.gameManListH5Game.value === 1", type="success") {{ row.gameManListH5Game.display }}
        el-table-column(v-if="fieldPerms.gameManListReturnType", label="计算流水", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.gameManListReturnType.value === 0", type="danger") {{ row.gameManListReturnType.display }}
            el-tag(v-if="row.gameManListReturnType.value === 1", type="success") {{ row.gameManListReturnType.display }}
        el-table-column(v-if="fieldPerms.gameManListGamePlay", label="提供试玩", align="center")
          template(slot-scope="{ row }")
            el-tag(v-if="row.gameManListGamePlay.value === 0", type="danger") {{ row.gameManListGamePlay.display }}
            el-tag(v-if="row.gameManListGamePlay.value === 1", type="success") {{ row.gameManListGamePlay.display }}
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left(v-if="buttonPerms.editGame")
              el-link
                router-link.links.mx-1(
                  :to="{ path:'gameEdit', query: { title: `游戏 - ${row.gameManListGameName}`, id: row.id } }"
                ) 编辑
</template>

<script>
import { getGamesAPI } from '@/api/site/game'

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      filterList: [
        {
          label: 'H5 游戏',
          model: 'h5_game',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '否', 1: '是' }
          },
        },
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '关闭', 1: '开启' }
          }
        },
        {
          label: '提供试玩',
          model: 'game_play',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '否', 1: '是' }
          }
        },
        {
          label: '计算流水',
          model: 'return_type',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '否', 1: '是' }
          }
        },
        { label: '游戏名称', model: 'game_name', component: 'filterInput', props: { type: 'text' } },
        { label: '游戏原厂代号', model: 'betting_code', component: 'filterInput', props: { type: 'text' } },
        { label: '游戏代码', model: 'game_code', component: 'filterInput', props: { type: 'text' } }
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
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getGamesAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      })
    }
  }
}
</script>
