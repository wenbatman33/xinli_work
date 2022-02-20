<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 營運日報
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-5.col-12
        .row.no-gutters
          .col-md-10.col-12.px-1.py-1
            el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
          .col-md-2.col-12.px-1.py-1
            el-button.button-wstyle(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%', show-summary, :summary-method="setSummaries")
            el-table-column(prop='Date', label='日期', width='100')
            el-table-column(prop='BetAmount', label='總流水(¥)', width='140',align='right')
              template(slot-scope='scope')
                span {{scope.row.BetAmount | commaFormat}}
            el-table-column(prop='KillNumber', label='殺數(%)', width='80',align='right')
            el-table-column(prop='BalanceAmount', label='盈利(¥)', width='140',align='right')
              template(slot-scope='scope')
                span {{scope.row.BalanceAmount | commaFormat}}
            el-table-column(prop='Difference', label='存提差(¥)', width='140',align='right')
              template(slot-scope='scope')
                span {{scope.row.Difference | commaFormat}}
            el-table-column(prop='DepositAmount', label='存款總額(¥)', width='140',align='right')
              template(slot-scope='scope')
                span {{scope.row.DepositAmount | commaFormat}}
            el-table-column(prop='DepositPeople', label='存款人數', width='80',align='right')
              template(slot-scope='scope')
                span {{scope.row.DepositPeople | commaFormat}}
            el-table-column(prop='FirstDeposit', label='首存人數', width='80',align='right')
              template(slot-scope='scope')
                span {{scope.row.FirstDeposit | commaFormat}}
            el-table-column(prop='FirstPayAmount', label='首存用戶存款總額(￥)', width='180',align='right')
              template(slot-scope='scope')
                span {{scope.row.FirstPayAmount | commaFormat}}
            el-table-column(prop='WithDrawAmount', label='提款總額(¥)', width='140',align='right')
              template(slot-scope='scope')
                span {{scope.row.WithDrawAmount | commaFormat}}
            el-table-column(prop='WithDrawPeople', label='提款人數', width='80',align='right')
              template(slot-scope='scope')
                span {{scope.row.WithDrawPeople | commaFormat}}
            el-table-column(prop='TotalCash', label='錢包總餘額(¥)', width='140', align='right')
              template(slot-scope='scope')
                span {{scope.row.TotalCash | commaFormat}}
            el-table-column(prop='BetCount', label='投注次數', width='140', align='right')
              template(slot-scope='scope')
                span {{scope.row.BetCount | commaFormat}}
            el-table-column(prop='BetPeople', label='唯一投注人數', width='140', align='right')
              template(slot-scope='scope')
                span {{scope.row.BetPeople | commaFormat}}
            el-table-column(prop='ARPPU', label='ARPPU(¥)', width='140', align='right')
              template(slot-scope='scope')
                span {{scope.row.ARPPU | commaFormat}}
            el-table-column(prop='AgencyTransferAmount(¥)', label='代理上分金額', width='140', align='right')
              template(slot-scope='scope')
                span {{scope.row.AgencyTransferAmount | commaFormat}}
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgOperation",
  mounted() {
    this.formInit();
    this.get_data(1);
  },
  methods: {
    formInit() {
      let today = new Date();
      let day = today.getDate() - 1;
      let date_s = new Date(today.getTime() - day * 24 * 60 * 60 * 1000)
        .toLocaleDateString()
        .replace(/\//g, "-");
      date_s =
        date_s.split("-")[0] +
        "-" +
        (date_s.split("-")[1] < 10
          ? "0" + date_s.split("-")[1]
          : date_s.split("-")[1]) +
        "-" +
        (date_s.split("-")[2] < 10
          ? "0" + date_s.split("-")[2]
          : date_s.split("-")[2]);
      let date_e = today.toLocaleDateString().replace(/\//g, "-");
      date_e =
        date_e.split("-")[0] +
        "-" +
        (date_e.split("-")[1] < 10
          ? "0" + date_e.split("-")[1]
          : date_e.split("-")[1]) +
        "-" +
        (date_e.split("-")[2] < 10
          ? "0" + date_e.split("-")[2]
          : date_e.split("-")[2]);
      this.search_time_range = [date_s, date_e];
    },
    get_data(now_page) {
      this.lock_btn = true;
      let self = this;
      let payload = {
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        Page: now_page,
        PageLimit: self.page_size
      };
      axios
        .post(
          process.env.VUE_APP_APIHOST + "Admin/GetOperationReport/",
          payload
        )
        .then(function(response) {
          self.total = response.data.data.Total[0];
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;

          self.Summaries = response.data.data.Total[0];
          if (typeof self.Summaries === "object" && self.Summaries !== null) {
            self.SummariesKeys = Object.keys(self.Summaries);
            self.SummariesKeys.splice(
              self.SummariesKeys.indexOf("TotalCash"),
              1
            );
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
        sums[index] =
          self.total[column.property] == null ? 0 : self.total[column.property];

        // console.log(sums);

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
    },
    setSummaries(param) {
      let self = this;
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合計";
          return;
        }

        sums[index] =
          self.SummariesKeys.indexOf(column.property) >= 0
            ? self.Summaries[column.property]
                .toString()
                .replace(
                  /^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/,
                  (all, pre, groupOf3Digital) =>
                    pre + groupOf3Digital.replace(/\d{3}/g, ",$&")
                )
            : "";
      });
      return sums;
    }
  },
  data() {
    return {
      tableData: [],
      total: "",
      lock_btn: false,
      now_page: 1,
      total_page: 0,
      page_size: "30",
      search_time_range: [],
      Summaries: [],
      SummariesKeys: []
    };
  }
};
</script>
