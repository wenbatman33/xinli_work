<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 優惠日報
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size="medium", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='至', start-placeholder='開始日期', end-placeholder='結束日期')
      .col-md-1.col-12.px-1.py-1
        el-button(size='medium', type='primary', @click="get_data()", :loading='lock_btn') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%', show-summary='', :summary-method="getSummaries")
            el-table-column(prop='Sn', label='優惠代號', width="80", align="center")
            el-table-column(prop='OfferName', label='優惠名稱')
            el-table-column(prop='OfferType_str', label='優惠類型', width="190")
            el-table-column(prop='Cnt', label='派發人數', width="100", align="right")
              template(slot-scope='scope')
                router-link.links(:to='{name:"tgOfferList", query:{"Date_S":search_time_range[0], "Date_E":search_time_range[1], "Sn":scope.row.Sn, "OfferName":scope.row.OfferName}}') {{scope.row.Cnt | commaFormat}}
            el-table-column(prop='Total', label='派發金額', width="130", align="right")
              template(slot-scope='scope')
                span {{scope.row.Total | commaFormat}}
            el-table-column(prop='StartDate', label='開始時間', width="160")
            el-table-column(prop='EndDate', label='結束時間', width="160")
            el-table-column(label='操作', width="80")
              template(slot-scope='scope')
                router-link.links(:to='{name:"tgOfferDetail", query:{"Date_S":search_time_range[0], "Date_E":search_time_range[1], "Sn":scope.row.Sn, "OfferName":scope.row.OfferName}}') 查看
</template>
<script>
export default {
  name: "tgOffer",
  mounted() {
    this.get_data();
  },
  data() {
    let today = new Date();
    let last;
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    let date_s = y + "-" + m + "-" + d;
    let date_e = y + "-" + m + "-" + d;

    last = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    y = last.getFullYear();
    m = last.getMonth() + 1;
    d = last.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    date_s = y + "-" + m + "-" + d;
    return {
      tableData: [],
      search_time_range: [date_s, date_e],
      lock_btn: false
    };
  },
  methods: {
    get_data() {
      let self = this;
      self.lock_btn = true;
      if (self.search_time_range == null) {
        self.search_time_range = [];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetOfferReport",
        data: {
          StartDate: self.search_time_range[0],
          EndDate: self.search_time_range[1]
        }
      })
        .then(function(response) {
          response.data.data.forEach(function(item, index, array) {
            item["OfferType_str"] =
              response.data.other.OfferType[item["OfferType"]];
          });
          self.tableData = response.data.data;
          // console.log(response.data.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合計";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (index === 4) {
              return (parseFloat(prev) + parseFloat(curr)).toFixed(2);
            }
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          if (!Number.isNaN(sums[index]) && sums[index] !== undefined) {
            sums[index] = sums[index]
              .toString()
              .replace(
                /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
                (all, pre, groupOf3Digital) =>
                  pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
              );
          }
        }
      });
      return sums;
    }
  }
};
</script>
