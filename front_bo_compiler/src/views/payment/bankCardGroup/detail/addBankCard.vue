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
      el-table(:data="tableData", height="75vh")
        el-table-column(v-if="fieldPerms.BCardNo|| fieldPerms.BCardVirtualNo", label="卡号", align="center", width="180")
          template(slot-scope="{ row }")
            span(v-if="row.BCardNo") {{ row.BCardNo }}
            span(v-if="row.BCardVirtualNo") <br> ({{ row.BCardVirtualNo }})
        el-table-column(v-if="fieldPerms.BCardName", prop="BCardName", label="银行名称", align="center", width="140")
        el-table-column(v-if="fieldPerms.BCardHolder", prop="BCardHolder", label="户名", align="center", width="80")
        el-table-column(v-if="fieldPerms.BCardLimit", label="每日上限", align="center", width="120")
          template(slot-scope="{ row }")
            | {{ row.BCardLimit | formatMoney }}
        el-table-column(
          v-if="fieldPerms.BCardTransIn || fieldPerms.BCardTransOut",
          label="进/出",
          align="center",
          width="160"
        )
          template(slot-scope="{ row }")
            span(v-if="fieldPerms.BCardTransIn") {{ row.BCardTransIn }}
            span(v-else) --
            span &nbsp;/&nbsp;
            span(v-if="fieldPerms.BCardTransOut") {{ row.BCardTransOut }}
            span(v-else) --
        el-table-column(v-if="fieldPerms.BCardBalance", label="帐户馀额", align="center", width="80")
          template(slot-scope="{ row }")
            | {{ row.BCardBalance | formatMoney }}
        el-table-column(v-if="fieldPerms.BCardShow", label="上下架", align="center")
          template(slot-scope="{ row }")
            | {{ row.BCardShow.display }}
        el-table-column(v-if="fieldPerms.BCardStatus", label="状态", align="center")
          template(slot-scope="{ row }")
            | {{ row.BCardStatus.display }}
        el-table-column(v-if="fieldPerms.BCardNote", label="备注", align="center")
          template(slot-scope="{ row }")
            line-clamp(:content="row.BCardNote")
        el-table-column(v-if="buttonPerms.addBankCardInGroup", label="管理", align="center")
          template(slot-scope="{ row }")
              el-link.text-primary(@click="addBankCard(row)") 加入
</template>

<script>
import { getBankCardsAPI, addBankCardIntoGroupAPI } from '@/api/payment/bankCard';

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
            options: { all: '全部', 0: '下架', 1: '上架' }
          }
        },
        {
          label: '上下架',
          model: 'show',
          component: 'filterSelect',
          props: {
            options: { all: '全部', 0: '隐藏', 1: '显示' }
          }
        },
        {
          label: '卡号',
          model: 'bank_card_no',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '银行名称',
          model: 'bank_name',
          component: 'filterInput',
          props: { type: 'text' }
        },
        {
          label: '户名',
          model: 'bank_cardholder',
          component: 'filterInput',
          props: { type: 'text' }
        }
      ],
    };
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
        except_group_id: this.$route.query.id // 排除金流群組 id
      };

      if (this.$refs.dataFilter) {
        Object.assign(APIParams, this.$refs.dataFilter.getFilterData());
      }

      getBankCardsAPI(APIParams).then(
        response => {
          this.tableData = response.data.data;
          this.dataTotal = response.data.meta.pagination.total;
          this.currentPage = response.data.meta.pagination.current_page;
        }
      );
    },
    addBankCard(bankCard) {
      addBankCardIntoGroupAPI(bankCard.id, { group_id: this.$route.query.id }).then(response => {
        const index = this.tableData.findIndex(bankCard => bankCard.id === response.data.data[0].id);
        this.tableData.splice(index, 1);
        this.$message.success('银行卡加入成功');
      });
    }
  }
};
</script>
