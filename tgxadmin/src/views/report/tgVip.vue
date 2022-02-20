<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 VIP日報
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card(shadow='never')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye VIP會員統計
        .item.row
          .col-12
            template
              el-table(:data='num_tableData', stripe='', border='', style='width: 100%')
                el-table-column(prop='Lv1', label='鐵會員', align='center')
                el-table-column(prop='Lv2', label='1★', align='center')
                el-table-column(prop='Lv3', label='2★', align='center')
                el-table-column(prop='Lv4', label='3★', align='center')
                el-table-column(prop='Lv5', label='4★', align='center')
                el-table-column(prop='Lv6', label='5★', align='center')
                el-table-column(prop='Lv7', label='6★', align='center')
                el-table-column(prop='Lv8', label='7★', align='center')
                el-table-column(prop='Lv9', label='8★', align='center')
                el-table-column(prop='Vip_Total', label='VIP總數', align='center')
    .row.no-gutters.pt-3.px-3
      el-card.col.box-card(shadow='never')
        .row.no-gutters(slot='header')
          .col-md-6.col-12.py-1.d-flex.justify-content-center.flex-column.text-left
            span.cardtitle-stlye VIP成長率
        .item.row
          .col-4.py-3.d-flex
            el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期', @change="get_data()")
          //- .col-9.py-3.d-flex.justify-content-end  
            el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
          .col-12
            template
              el-table(:data='tableData', stripe='', border='', show-summary='', :summary-method="getSummaries", style='width: 100%')
                el-table-column(prop='Date', label='日期', align='center', width="120")
                el-table-column(label='鐵會員', align='center')
                  el-table-column(prop='Lv1_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv1_Total | commaFormat}}
                  el-table-column(prop='Lv1_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv1_Add | commaFormat}}
                  el-table-column(prop='Lv1_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv1_Growth * 100 | commaFormat | floatFormat }}%
                el-table-column(label='1★', align='center')
                  el-table-column(prop='Lv2_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv2_Total | commaFormat}}
                  el-table-column(prop='Lv2_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv2_Add | commaFormat}}
                  el-table-column(prop='Lv2_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv2_Growth * 100 | commaFormat | floatFormat }}%
                el-table-column(label='2★', align='center')
                  el-table-column(prop='Lv3_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv3_Total | commaFormat}}
                  el-table-column(prop='Lv3_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv3_Add | commaFormat}}
                  el-table-column(prop='Lv3_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv3_Growth * 100 | commaFormat | floatFormat }}%
                el-table-column(label='3★', align='center')
                  el-table-column(prop='Lv4_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv4_Total | commaFormat}}
                  el-table-column(prop='Lv4_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv4_Add | commaFormat}}
                  el-table-column(prop='Lv4_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv4_Growth * 100 | commaFormat | floatFormat }}%
                el-table-column(label='4★', align='center')
                  el-table-column(prop='Lv5_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv5_Total | commaFormat}}
                  el-table-column(prop='Lv5_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv5_Add | commaFormat}}
                  el-table-column(prop='Lv5_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv5_Growth * 100 | commaFormat | floatFormat }}%
                el-table-column(label='5★', align='center')
                  el-table-column(prop='Lv6_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv6_Total | commaFormat}}
                  el-table-column(prop='Lv6_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv6_Add | commaFormat}}
                  el-table-column(prop='Lv6_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv6_Growth * 100 | commaFormat | floatFormat }}%
                el-table-column(label='6★', align='center')
                  el-table-column(prop='Lv7_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv7_Total | commaFormat}}
                  el-table-column(prop='Lv7_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv7_Add | commaFormat}}
                  el-table-column(prop='Lv7_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv7_Growth * 100 | commaFormat | floatFormat }}%
                el-table-column(label='7★', align='center')
                  el-table-column(prop='Lv8_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv8_Total | commaFormat}}
                  el-table-column(prop='Lv8_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv8_Add | commaFormat}}
                  el-table-column(prop='Lv8_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv8_Growth * 100 | commaFormat | floatFormat }}%
                el-table-column(label='8★', align='center')
                  el-table-column(prop='Lv9_Total', label='總人數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv9_Total | commaFormat}}
                  el-table-column(prop='Lv9_Add', label='新增數', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv9_Add | commaFormat}}
                  el-table-column(prop='Lv9_Growth', label='新增率', align='center')
                    template(slot-scope='scope')
                      span {{scope.row.Lv9_Growth * 100 | commaFormat | floatFormat }}%
          //- .col-12.py-3.d-flex.justify-content-end  
            el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
        .item.row
</template>
<script>
export default {
  name: "tgVip",
  mounted() {
    this.get_vip_num_data();
    // this.get_data();
  },
  data() {
    // let today = new Date();
    // let last;
    // let y = today.getFullYear();
    // let m = today.getMonth() + 1;
    // let d = today.getDate();
    // m < 10 && (m = "0" + m);
    // d < 10 && (d = "0" + d);
    // let date_s = y + "-" + m + "-" + d;
    // let date_e = y + "-" + m + "-" + d;

    // last = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    // y = last.getFullYear();
    // m = last.getMonth() + 1;
    // d = last.getDate();
    // m < 10 && (m = "0" + m);
    // d < 10 && (d = "0" + d);
    // date_s = y + "-" + m + "-" + d;
    return {
      num_tableData: [],
      tableData: [],
      // search_time_range: [date_s, date_e]
      search_time_range: [],
      total: ""
      // now_page: 1,
      // total_page: 0,
      // page_size: "30"
    };
  },
  methods: {
    get_vip_num_data() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetVipStatistics/VIP",
        data: {}
      })
        .then(function(response) {
          self.num_tableData = [response.data.data];
          // console.log(response.data.data);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    get_data() {
      let self = this;
      if (self.search_time_range == null) {
        //   let today = new Date();
        //   let last;
        //   let y = today.getFullYear();
        //   let m = today.getMonth() + 1;
        //   let d = today.getDate();
        //   m < 10 && (m = "0" + m);
        //   d < 10 && (d = "0" + d);
        //   let date_s = y + "-" + m + "-" + d;
        //   let date_e = y + "-" + m + "-" + d;

        //   last = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        //   y = last.getFullYear();
        //   m = last.getMonth() + 1;
        //   d = last.getDate();
        //   m < 10 && (m = "0" + m);
        //   d < 10 && (d = "0" + d);
        //   date_s = y + "-" + m + "-" + d;
        //   self.search_time_range = [date_s, date_e];
        return;
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetVipReport",
        data: {
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1]
          // Page: now_page,
          // PageLimit: self.page_size
        }
      })
        .then(function(response) {
          self.total = response.data.data.Total;
          // self.now_page = now_page;
          // self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    getSummaries(param) {
      let self = this;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        if (index % 3 == 0) {
          sums[index] = self.total[column.property + "Sum"] * 100 + "%";
          return;
        }
        sums[index] = self.total[column.property + "Sum"];
        if (!Number.isNaN(sums[index]) && sums[index] !== undefined) {
          sums[index] = sums[index]
            .toString()
            .replace(
              /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
              (all, pre, groupOf3Digital) =>
                pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
            );
        }
      });
      return sums;
    }
  }
};
</script>
