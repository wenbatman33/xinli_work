<template lang="pug">
  .container-fluid
    .row.my-3
      span.demonstration.mt-2.mr-3 时间选择:
      el-date-picker(v-model='DateValue', value-format="yyyy-M" type='month', placeholder='时间选择', @change='getData')
      //- 分页 表格上方
    .row(v-if='tableData.length>0')
      table.report#report(border='1')
        thead(border='1')
          tr
            th.tdTitle(colspan="4")
            th(colspan="2", v-for='(item, index) in tableData[0][0][0]', v-if='item')
              span(v-if='item ==="每日合计"') {{item}}
              el-link.text-primary(v-else, @click='openDetailDialogVisible(item)') {{item}}
        tbody(border='1')
          tr(v-for='(item, index) in tableData[0][1]')
            td(v-for='(subItem, subIndex) in item', :class='[((item.includes("总计")) ? "subTotal" : ""),((item.includes("银行别")) ? "grayTotal" : "")]')
              div.text-right(v-html='(subItem==="")? "&nbsp": subItem.toLocaleString()', :class='[(subIndex<2) ? "tdTitle" : ""]')
    .row(v-else)
      .col-12
        h5.text-center 暂无数据

    el-dialog(:visible.sync="detailDialogVisible", :title='detailDialogTitle', width='90%')
      .row(v-if='detailData.length>0')
        .col-12.detailTable
          table.report(border='1')
            thead(border='1')
              tr
                th.tdTitle(colspan="5")
                th(colspan="8", v-for='(item, index) in detailData[0][0][0]', v-if='item') {{item}}
                th.tdTitle(colspan="5")
            tbody(border='1')
              tr(v-for='(item, index) in detailData[0][1]')
                td(v-for='(subItem, subIndex) in item', :class='[((item.includes("总计")) ? "subTotal" : ""),((item.includes("银行别")) ? "grayTotal" : "")]')
                  div.text-right(v-html='(subItem==="")? "&nbsp": subItem.toLocaleString()', :class='[(subIndex<2) ? "tdTitle" : ""]')
</template>

<script>
import { getReportBankCardTotal, getReportBankCardTotalByDate } from '@/api/payChannel/report'

export default {
  data() {
    return {
      // 銀行卡別，存款卡:1、出款卡:2,中轉:3，三方結帳:4，倉庫卡:5
      card_type:{
        'depositCardSummary':1,
        'withdrawalCardSummary':2,
        'transferCardSummary':3,
        'thirdCardSummary':4,
        'warehouseCardSummary':5,
      },

      tableData: [],
      detailData: [],
      filterList: [],
      DateValue:'',
      detailDialogVisible: false,
      detailDialogTitle: '',
    }
  },
  created() {
    this.DateValue = `${new Date().getFullYear()}-${(new Date().getMonth() + 1 < 10 ? '0' : '') + (new Date().getMonth()+1)}`;
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        date: this.DateValue,
        card_type: this.card_type[this.$route.params.pathMatch]
      }
      getReportBankCardTotal(APIParams).then(response => {
        this.tableData = [response.data.data]
      })
    },
    openDetailDialogVisible(date){
      const APIParams = {
        date: date,
        card_type: this.card_type[this.$route.params.pathMatch]
      }

      getReportBankCardTotalByDate(APIParams).then(response => {
        this.detailData = [response.data.data]
        this.detailDialogVisible=true;
        this.detailDialogTitle= `${date} 銀行卡明細`;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.report{
  th, tr, td{
    padding: 0;
    border-collapse:collapse;
    border: 1px solid #999;
    min-width: 80px;
  }
}
.tHead{
  min-width: 80px;
}
.tdTitle{
  width: 150px;
}
.report{
  td,th{
    color:#333;
    padding: 4px;
  }
  tr:nth-child(even) {
    background: #F3F3F3;
  }
}
.grayTotal{
  color: #fff !important;
  background: #ccc;
}
.subTotal{
  background: #FCF2D0;
}
.detailTable{
  padding: 10px;
  height: 500px;
  overflow: auto;
}
</style>
