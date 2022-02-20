<template lang="pug">
  .container-fluid
    data-filter(ref="dataFilter", :filterList="filterList", @change="getData()")
      el-button.ml-2(v-if="buttonPerms.addPromotion", @click="$router.push('/promotionEdit?title=新增优惠')") 新增优惠
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
        el-table-column(v-if="fieldPerms.id", prop="id", label="代号", align="center", width="100")
        el-table-column(v-if="fieldPerms.promotionRuleTimeStatus", align="center", width="80")
          template(slot-scope="{ row }")
            el-tag(:type="{ 1: 'primary', 2: 'success', 3: 'info' }[row.promotionRuleTimeStatus.value]")
              | {{ row.promotionRuleTimeStatus.display }}
        el-table-column(
          v-if="fieldPerms.promotionRuleTimeStart && fieldPerms.promotionRuleTimeEnd",
          label="活动日期",
          align="center",
          width="160"
        )
          span(slot-scope="{ row }") {{ row.promotionRuleTimeStart }} <br>~<br> {{ row.promotionRuleTimeEnd }}
        el-table-column(
          v-if="fieldPerms.promotionTimeStart && fieldPerms.promotionTimeEnd",
          label="上架日期",
          align="center",
          width="160"
        )
          span(slot-scope="{ row }") {{ row.promotionTimeStart }} <br>~<br> {{ row.promotionTimeEnd }}
        el-table-column(v-if="fieldPerms.promotionType", label="优惠类型", align="center", width="100")
          template(slot-scope="{ row }")
            span {{ row.promotionType.display }}
        el-table-column(v-if="fieldPerms.promotionTitle", prop="promotionTitle", label="优惠名称", align="center")
        el-table-column(v-if="fieldPerms.promotionSort", prop="promotionSort", label="排序", align="center", width="60")
        el-table-column(v-if="fieldPerms.promotionCycle", label="周期", align="center", width="60")
          template(slot-scope="{ row }")
            span {{ row.promotionCycle.display }}
        el-table-column(v-if="fieldPerms.promotionStatus", label="状态", align="center", width="70")
          el-tag(slot-scope="{ row }", :type="row.promotionStatus.value === 0 ? 'danger' : 'success'")
            | {{ row.promotionStatus.display }}
        el-table-column(label="操作", width="100", align="center")
          template(slot-scope="{ row }")
            el-link(v-if="fieldPerms.depGMerchantName && buttonPerms.editPromotion")
              router-link.links.mx-1(
                :to="{ path:'promotionEdit', query: { title: `优惠 - ${row.promotionTitle}`, id: row.id } }"
              ) 编辑
</template>

<script>
import { getPromotionsAPI, getPromotionTypesAPI } from '@/api/promotion/promotion';

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
        {
          label: '代号',
          model: 'id',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '优惠类型',
          model: 'promotion_type',
          component: 'filterSelect',
          props: {
            options: {}
          },
        },
        {
          label: '优惠名称',
          model: 'title',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ]
    }
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  created() {
    this.getData();
    getPromotionTypesAPI().then(response => {
      this.filterList.find(filter => filter.model === 'promotion_type').props.options = response.data.data;
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

      getPromotionsAPI(APIParams).then(response => {
        this.tableData = response.data.data;
        this.dataTotal = response.data.meta.pagination.total;
        this.currentPage = response.data.meta.pagination.current_page;
      });
    }
  }
}
</script>
