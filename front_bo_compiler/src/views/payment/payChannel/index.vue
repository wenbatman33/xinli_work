<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
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
      el-table(:data="tableData", height="75vh", @sort-change="sortChange", ref="table")
        el-table-column(v-if="fieldPerms.gateSort", prop="sort", label="排序", align="center", width="70", sortable="custom")
          span(slot-scope="{ row }") {{ row.gateSort }}
        el-table-column(v-if="fieldPerms.gateName", prop="gateName", label="通道名称", align="center", width="240")
        el-table-column(v-if="fieldPerms.gateServiceCode", prop="gateService", label="支付方式", align="center", width="120")
          template(slot-scope="{ row }")
            span {{ row.gateService.display }}
        el-table-column(v-if="fieldPerms.gateSn", prop="gateSn", label="商号", align="center", width="140")
        el-table-column(
          v-if="fieldPerms.gateRemainAmount",
          label="剩馀可用馀额",
          align="center",
          width="160",
          sortable="custom",
          prop="remain_amount",
        )
          template(slot-scope="{ row }")
            span {{ row.gateRemainAmount | formatMoney}}
        el-table-column(v-if="fieldPerms.gateGroup" label="三方金流群组", align="center", width="160")
          template(slot-scope="{ row }")
            el-tooltip(v-if="row.gateGroups.length > 2")
              div(slot="content")
                el-tag.m-1(v-for="(group, index) in row.gateGroups", :key="index") {{ group }}
              el-badge.mt-2(:value="row.gateGroups.length", type="warning")
                el-tag {{ row.gateGroups[0] && row.gateGroups[0] }}
            el-tag.m-1(v-else, v-for="(group, index) in row.gateGroups", :key="index") {{ group }}
        el-table-column(v-if="fieldPerms.gateShow", label="前台显示", align="center")
          template(slot-scope="{ row }")
            el-tag(:type="['danger', 'success'][row.gateShow.value]") {{ row.gateShow.display }}
        el-table-column(v-if="fieldPerms.gateStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            el-tag(:type="['danger', 'success'][row.gateStatus.value]") {{ row.gateStatus.display }}
        el-table-column(v-if="fieldPerms.gateNote", prop="gateNote", label="备注", align="center", show-overflow-tooltip)
        el-table-column(label="操作", width="200", align="center")
          template(slot-scope="{ row }")
            .text-left
              el-link(v-if="fieldPerms.gateName && buttonPerms.showPayChannelDetail")
                router-link.links.mx-1(
                  :to="{ path:'payChannelLog', query: { title: `通道明细 - ${row.gateName}`, id: row.id } }"
                ) 明細
              el-link(v-if="fieldPerms.gateName && buttonPerms.editChannel")
                router-link.links.mx-1(
                  :to="{ path:'payChannelEdit', query: { title: `通道 - ${row.gateName}`, id: row.id } }"
                ) 编辑
              el-link.mx-1(
                v-if="buttonPerms.editChannelStatus && fieldPerms.gateStatus",
                :class="['text-success', 'text-danger'][row.gateStatus.value]",
                @click="editChannelStatus(row.id)"
              ) {{ ['上架', '下架'][row.gateStatus.value] }}
</template>

<script>
import { searchChannelsAPI, editChannelStatusAPI, getPayServiceListAPI } from '@/api/payment/payChannel';

export default {
  data() {
    return {
      tableData: [],
      pageSize: 100,
      dataTotal: 0,
      currentPage: 1,
      tableSort: null,
      sortColumn: null,
      filterList: [
        {
          label: '状态',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '下架', 1: '上架' },
          },
        },
        {
          label: '前台显示',
          model: 'show',
          component: 'filterSelect',
          props: {
            options: { 'all': '全部', 0: '隐藏', 1: '显示' },
          },
        },
        {
          label: '支付方式',
          model: 'service_code',
          component: 'filterSelect',
          props: {
            options: {},
          },
        },
        {
          label: '通道名称',
          model: 'name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '商号',
          model: 'merchant_sn',
          component: 'filterInput',
          props: { type: 'text' }
        },

      ]
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
    getPayServiceListAPI().then(response => {
      this.filterList.find(filter => filter.model === 'service_code').props.options = response.data.data[0];
    })
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage,
        group_id: 1,
        category: 1
      }

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      if (this.tableSort) {
        APIParams.sort = this.sortColumn;
        APIParams.dir = this.tableSort;
      }

      searchChannelsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    },
    editChannelStatus(id) {
      editChannelStatusAPI(id, {status,}).then(response => {
        const responseChannel = response.data.data[0];
        this.tableData.find(channel => channel.id === responseChannel.id).gateStatus = responseChannel.gateStatus;
      })
    },
    sortChange({ order, prop }) {
      const sort = {
        descending: 'DESC',
        ascending: 'ASC'
      }

      this.tableSort = sort[order] || '';
      this.sortColumn = prop;
      this.currentPage = 1;
      this.getData();
      this.$refs.table.bodyWrapper.scrollTop = 0;
    }
  }
}
</script>
