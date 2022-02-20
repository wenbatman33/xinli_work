<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 包台日報
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
      .col-md-1.col-12.px-1.py-1
        el-button(@click='get_data(1)', size="medium", type='primary', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', show-summary='', :summary-method="getSummaries", stripe='', border='', style='width:100%')
            el-table-column(prop='Date', label='日期', align='right')
            el-table-column(prop='GroupName', label='平台', align='right')
            el-table-column(prop='GameName', label='遊戲名稱', align='right')
            el-table-column(prop='BetPeople', label='唯一投注人數', align='right')
              template(slot-scope='scope')
                span {{scope.row.BetPeople | commaFormat}}
            el-table-column(prop='BetCount', label='投注次數', align='right')
              template(slot-scope='scope')
                span {{scope.row.BetCount | commaFormat}}
            el-table-column(prop='BetAmount', label='總流水', align='right')
              template(slot-scope='scope')
                span {{scope.row.BetAmount | commaFormat}}
            el-table-column(prop='KillAvg', label='殺數', align='right')
              template(slot-scope='scope')
                span {{scope.row.KillAvg | commaFormat}}
            el-table-column(prop='BalanceAmount', label='營利', align='right')
              template(slot-scope='scope')
                span {{scope.row.BalanceAmount | commaFormat}}
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgGameMachine",
  mounted() {
    this.get_data(1);
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
      now_page: 1,
      page_size: 100,
      total_page: 1,
      lock_btn: false,
      total: ""
    };
  },
  methods: {
    get_data(now_page) {
      let self = this;
      if (self.search_time_range == null) {
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

        self.search_time_range = [date_s, date_e];
      }
      let payload = {
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        Page: now_page,
        PageLimit: self.page_size
      };
      this.lock_btn = true;
      axios
        .post(process.env.VUE_APP_APIHOST + "Admin/GetMachineReport", payload)
        .then(function(response) {
          if (response.data.status === 1) {
            self.now_page = now_page;
            self.total_page = parseInt(response.data.data.total_rows);
            self.tableData = response.data.data.data_list;
            self.total = response.data.data.Total[0];
          } else {
            self.$message.error(response.data.error_message);
          }
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          self.lock_btn = false;
        });
    },
    getSummaries(param) {
      let self = this;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合計";
          return;
        }
        sums[index] = self.total[column.property];
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

