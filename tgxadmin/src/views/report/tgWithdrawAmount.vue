<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 提款日報
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-10.col-12
        .row.no-gutters
          .col-md-2.col-12.px-1.py-1
            el-radio-group(v-model='tableSwitch', size='medium', @change='changeSwitch')
              el-radio-button.radio-style(label=1) 提款報表
              el-radio-button.radio-style(label=2) 筆數區間
          .col-md-5.col-12.px-1.py-1
            el-date-picker(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
          .col-md-3.col-12.px-1.py-1
            el-select(size='medium', v-model='search_pay_channel_id', filterable='', placeholder='選擇提款方式')
              el-option(key='', label='不指定提款方式', value='')
              el-option(v-for='item in typeoption', :key='item.ChannelId', :label='item.ChannelName', :value='item.ChannelId')
          .col-md-1.col-12.px-1.py-1
            el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(v-if='tableSwitch == 1' :data='tableData', stripe='', border='', show-summary='', :summary-method="getSummaries", style='width:100%')
            el-table-column(prop='Date', label='日期', width='180')
            el-table-column(prop='OnlyPeople', label='唯一提款人數(人)', align='right')
              template(slot-scope='scope')
                span {{scope.row.OnlyPeople | commaFormat}}
            el-table-column(prop='FirstPeople', label='新增提款人數(人)', align='right')
              template(slot-scope='scope')
                span {{scope.row.FirstPeople | commaFormat}}
            el-table-column(prop='PayCount', label='提款次數(次)', align='right')
              template(slot-scope='scope')
                span {{scope.row.PayCount | commaFormat}}
            el-table-column(prop='Amount', label='提款金額(¥)', align='right')
              template(slot-scope='scope')
                span {{scope.row.Amount | commaFormat}}
            el-table-column(prop='AvgAmount', label='人均提款金額(¥)', align='right')
              template(slot-scope='scope')
                span {{scope.row.AvgAmount | commaFormat}}
            el-table-column(prop='Fee', label='手續費(¥)', align='right')
              template(slot-scope='scope')
                span {{scope.row.Fee | commaFormat}}
            el-table-column(prop='ActualAmount', label='實付金額(¥)', align='right')
              template(slot-scope='scope')
                span {{scope.row.ActualAmount | commaFormat}}

          el-table(v-if='tableSwitch == 2' :data='tableData2', stripe='', border='', show-summary='', :summary-method="getSummaries", style='width:100%')
            el-table-column(prop='Date', label='日期', width='180')
            el-table-column(prop='Cash_0_100', label='0～100', align='right')
              template(slot-scope='scope')
                span {{scope.row.Cash_0_100 | commaFormat}}
            el-table-column(prop='Cash_101_500', label='101～500', width='120', align='right')
              template(slot-scope='scope')
                span {{scope.row.Cash_101_500 | commaFormat}}
            el-table-column(prop='Cash_501_1000', label='501～1,000', width='120', align='right')
              template(slot-scope='scope')
                span {{scope.row.Cash_501_1000 | commaFormat}}
            el-table-column(prop='Cash_1001_2000', label='1,001～2,000', width='120', align='right')
              template(slot-scope='scope')
                span {{scope.row.Cash_1001_2000 | commaFormat}}
            el-table-column(prop='Cash_2001_6000', label='2,001～6,000', width='120', align='right')
              template(slot-scope='scope')
                span {{scope.row.Cash_2001_6000 | commaFormat}}
            el-table-column(prop='Cash_6001_10000', label='6,001～10,000', width='130', align='right')
              template(slot-scope='scope')
                span {{scope.row.Cash_6001_10000 | commaFormat}}
            el-table-column(prop='Cash_10001_20000', label='10,001～20,000', width='140', align='right')
              template(slot-scope='scope')
                span {{scope.row.Cash_10001_20000 | commaFormat}}
            el-table-column(prop='Cash_20000_UP', label='2 萬以上', align='right')
              template(slot-scope='scope')
                span {{scope.row.Cash_20000_UP | commaFormat}}
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgWithdrawAmount",
  mounted() {
    this.formInit();
    this.get_data(1);
    this.get_pay_type_option();
  },
  methods: {
    get_pay_type_option() {
      let self = this;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/QueryConditions",
        data: {}
      })
        .then(function(response) {
          self.typeoption = response.data.data.deposit;
          // console.log(response.data.data.deposit);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    },
    changeSwitch(value) {
      this.tableSwitch = value;
      this.search_pay_channel_id = "";
      this.get_data(1);
    },
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
        PayType: self.search_pay_type,
        PayChannelId: self.search_pay_channel_id,
        Page: now_page,
        PageLimit: self.page_size
      };

      if (this.tableSwitch == 1) {
        axios
          .post(
            process.env.VUE_APP_APIHOST + "Admin/GetTransactionReport/",
            payload
          )
          .then(function(response) {
            self.total = response.data.data;
            self.now_page = now_page;
            self.total_page = parseInt(response.data.data.total_rows);
            self.tableData = response.data.data.data_list;
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          })
          .finally(function() {
            self.lock_btn = false;
          });
      } else {
        axios
          .post(
            process.env.VUE_APP_APIHOST + "Admin/GetTransactionQuantity/",
            payload
          )
          .then(function(response) {
            self.total = response.data.data;
            self.now_page = now_page;
            self.total_page = parseInt(response.data.data.total_rows);
            self.tableData2 = response.data.data.data_list;
          })
          .catch(function(error) {
            self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          })
          .finally(function() {
            self.lock_btn = false;
          });
      }
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
        if (self.tableSwitch == 1) {
          sums[index] = self.total[column.property + "Total"];
        } else {
          sums[index] = self.total[column.property + "_Total"];
        }
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
  },
  data() {
    return {
      tableSwitch: 1, //1.提款報表 2.筆數區間
      lock_btn: false,
      now_page: 1,
      total_page: 0,
      page_size: "30",
      search_time_range: [],
      search_pay_type: 2, // 1.提款報表 2.提款報表
      search_pay_channel_id: "",
      total: "",
      tableData: [],
      tableData2: [],
      typeoption: []
    };
  }
};
</script>