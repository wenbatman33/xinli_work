<template lang="pug">
  .container-fluid
    //- 过滤资料
    data-filter.mt-3(ref="dataFilter", :filterList="filterList", @change="getData()")
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
    //- Table
    .row
      el-table(:data="tableData", height="73vh")
        el-table-column(v-if="fieldPerms.gateName", prop="gateName", label="通道名称", align="center", width="250")
        el-table-column(v-if="fieldPerms.gateServiceCode", label="支付方式", align="center", width="120")
          template(slot-scope="{ row }")
            | {{ row.gateService.display }}
        el-table-column(v-if="fieldPerms.gateSn", prop="gateSn", label="商户编号", align="center", width="180")
        el-table-column(v-if="fieldPerms.gateRemainAmount", label="剩馀可用馀额", align="center", width="120")
          template(slot-scope="{ row }")
            | {{ row.gateRemainAmount | formatMoney }}
        el-table-column(v-if="fieldPerms.gateStatus", label="上下架", align="center")
          template(slot-scope="{ row }")
            | {{ row.gateStatus.display }}
        el-table-column(v-if="fieldPerms.gateShow", label="状态", align="center")
          template(slot-scope="{ row }")
            | {{ row.gateShow.display }}
        el-table-column(v-if="fieldPerms.gateNote", label="备注", align="center")
          template(slot-scope="{ row }")
            line-clamp(:content="row.gateNote")
        el-table-column(v-if="buttonPerms.deletePaymentChannelInGroup", label="管理", align="center")
          template(slot-scope="{ row }")
              el-link.text-primary(@click="addChannel(row)") 加入
</template>

<script>
import {
  getPaymentChannelWithoutGroup,
  addChannelIntoGroupAPI
} from '@/api/payment/paymentGroup';

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
          model: 'show',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '隐藏', 1: '显示' }
          }
        },
        {
          label: '上下架',
          model: 'status',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '下架', 1: '上架' }
          }
        },
        {
          label: '支付方式',
          model: 'service_code',
          component: 'filterSelect',
          props: {
            options: {}
          }
        },
        {
          label: '通道名称',
          model: 'name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '商户编号',
          model: 'merchant_sn',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ],
    };
  },
  props: ['fieldPerms', 'buttonPerms', 'blockPerms'],
  computed: {
    serviceCode() {
      return this.$store.state.payment.serviceCode;
    }
  },
  watch: {
    serviceCode: {
      handler() {
        this.filterList.find(filter => filter.model === 'service_code').props.options = this.serviceCode;
      },
      immediate: true
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        per_page: this.pageSize,
        page: this.currentPage
      };

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getPaymentChannelWithoutGroup(this.$route.query.id, APIParams).then(
        response => {
          this.tableData = response.data.data;
          this.dataTotal = response.data.meta.pagination.total;
          this.currentPage = response.data.meta.pagination.current_page;
        }
      );
    },
    addChannel(channel) {
      addChannelIntoGroupAPI(this.$route.query.id, { pay_channel_service_id: channel.id }).then(response => {
        const index = this.tableData.findIndex(channel => channel.id === response.data.data[0].id);
        this.tableData.splice(index, 1);
        this.$message.success('通道加入成功');
      });
    }
  }
};
</script>
