<template lang="pug">
  .container-fluid
    .row.my-3
      .col-12
        span.demonstration.mt-2.mr-3 时间选择: {{DateValue}}
        el-date-picker(v-model='DateValue', value-format="yyyy-MM" type='month', placeholder='时间选择', @change='getData')
        el-button.float-right(v-if='tableData.length>0',size="small", @click='openChartDialogVisible') 查看分析圖
    //- 分页 表格上方
    .row(v-if='tableData.length>0')
      .col-12.reportTable.my-3
        table.report#report(border='1')
          thead(border='1')
            tr
              th.tdTitle(colspan="1")
              th(v-for='(item, index) in tableData[0][0][0]',:colspan='(item=="合计")?"1":"3"', v-if='item') {{item}}
          tbody(border='1')
            tr(v-for='(item, index) in tableData[0][1]')
              td(v-for='(subItem, subIndex) in item', :class='[((item.includes("各班交易数量小计")) ? "subTotal" : ""),((item.includes("群组名称")) ? "grayTotal" : "")]') 
                div.text-right(v-html='(subItem==="")? "&nbsp": subItem.toLocaleString()', :class='[(subIndex<2) ? "tdTitle" : ""]')
    .row(v-else)
      .col-12
        h5.text-center 暂无数据
    el-dialog(:visible.sync="chartDialogVisible", title='查看分析圖', width='80%')
      p {{chartData.length}}
      .row
        .col-6(v-for='(item, key) in chartData')
          p.text-center {{key}}
          ve-histogram(:data='item', :settings="chartSetting")
</template>

<script>
import { getReportBankCard, getReportBankCardChart } from '@/api/payChannel/report'

export default {
  data() {
    return {
      // 銀行卡別，存款卡:1、出款卡:2
      card_type:{ 'payChannelDeposit':1, 'payChannelWithdrawal':2},
      DateValue:'',
      chartDialogVisible: false,
      tableData: [],
      filterList: [],
      chartSetting:{
        showLine: ['交易数量'],
        axisSite: { right: ['交易数量'] },
        yAxisName: ['交易金额', '交易数量']
      },
      chartData: {},
    }
  },
  created() {
    this.DateValue = `${new Date().getFullYear()}-${(new Date().getMonth() < 9 ? '0' : '') + (new Date().getMonth()+1)}`;
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        date: this.DateValue,
        card_type: this.card_type[this.$route.params.pathMatch]
      }
      
      getReportBankCard(APIParams).then(response => {
        response.data.data.length > 0  ? this.tableData = [response.data.data]: this.tableData = []
      })
    },
    openChartDialogVisible(){
      const APIParams = {
        date: this.DateValue,
        card_type: this.card_type[this.$route.params.pathMatch]
      }
      getReportBankCardChart(APIParams).then(response => {
        this.chartData = response.data.data
        this.chartDialogVisible=true;
      })
    }
  },
  
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
.reportTable{
  overflow-x: auto;
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
</style>
