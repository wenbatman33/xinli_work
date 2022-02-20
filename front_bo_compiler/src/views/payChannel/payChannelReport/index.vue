<template lang="pug">
  .container-fluid
    .row.my-3
      span.demonstration.mt-2.mr-3 时间选择:
      el-date-picker(v-model='DateValue', value-format="yyyy-M" type='month', placeholder='时间选择', @change='getData')
      //- 分页 表格上方
    .row(v-if='tableData[0] && tableData[0][0].length>0')
      table.report#report(border='1')
        thead(border='1')
          tr
            th.tdTitle(colspan="2")
            th(colspan="3", v-for='(item, index) in tableData[0][0]') {{item}}
        tbody(border='1')
          tr(v-for='(item, index) in tableData[0][1]')
            td(v-for='(subItem, subIndex) in item', :class='[(item.includes("出款小計")|| item.includes("收款小計") ? "subTotal" : ""),(item.includes("商戶") ? "grayTotal" : "")]')
              div.text-right(v-html='(subItem==="")? "&nbsp": subItem.toLocaleString()', :class='[(subIndex<2) ? "tdTitle" : ""]')
    .row(v-else)
      .col-12
        h5.text-center 暂无数据
</template>

<script>
import { getReport } from '@/api/payChannel/report'

export default {
  data() {
    return {
      tableData: [],
      filterList: [],
      DateValue:'',
    }
  },
  created() {
    this.DateValue = `${new Date().getFullYear()}-${new Date().getMonth() + 1}`;
    this.getData();
  },
  methods: {
    getData() {
      const APIParams = {
        year: this.DateValue.split('-')[0],
        month: this.DateValue.split('-')[1],
      }
      this.tableData =[];
      getReport(APIParams).then(response => {
        this.tableData = [response.data.data];
        this.combineHead();
      })

    },
    combineHead(){
      setTimeout(() => {
        const table = window.document.getElementById('report');
        let headerCell = null;

        if (! table) return;

        for (let row of table.rows) {
          const firstCell = row.cells[0];
          if (headerCell === null || firstCell.innerText !== headerCell.innerText) {
            headerCell = firstCell;
          } else {
            headerCell.rowSpan++;
            firstCell.remove();
          }
        }
      }, 500);
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
</style>
