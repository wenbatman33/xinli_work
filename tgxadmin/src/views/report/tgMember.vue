<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 會員日報
      .col-7.d-flex.justify-content-center.flex-column.text-right
        h6 累計會員數： {{ totalMember | commaFormat}} 人
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-5.col-12
        .row.no-gutters
          .col-md-10.col-12.px-1.py-1
            el-date-picker(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
          .col-md-2.col-12.px-1.py-1
            el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', :summary-method="setSummaries",    show-summary, style='width:100%')
            el-table-column(prop='Date', label='日期', width='110')
            el-table-column(prop='RegisterCnt', label='註冊人數', width='110', align='right')
              template(slot-scope='scope')
                span {{scope.row.RegisterCnt | commaFormat}}
            el-table-column(prop='RegisterPayCnt', label='註冊且首存', width='110', align='right')
              template(slot-scope='scope')
                span {{scope.row.RegisterPayCnt | commaFormat}}
            el-table-column(prop='RegisterNotPayCnt', label='首存非註冊', width='110', align='right')
              template(slot-scope='scope')
                span {{scope.row.RegisterNotPayCnt | commaFormat}}
            el-table-column(prop='LoginCnt', label='一日登陸', width='110', align='right')
              template(slot-scope='scope')
                span {{scope.row.LoginCnt | commaFormat}}
            el-table-column(prop='SecondLoginPercent', label='次日存留(%)', width='110', align='right')
            el-table-column(prop='ThirdLoginPercent', label='三日存留(%)', width='110', align='right')
            el-table-column(prop='SeventhLoginPercent', label='七日存留(%)', width='110', align='right')
            el-table-column(label='VIP會員人數', width='110', align='right')
              template(slot-scope='scope')
                span {{vip_tableData[scope.row.Date]}}
            el-table-column(prop='TotalMemberCnt', label='總會員數', align='right' width='110')
              template(slot-scope='scope')
                span {{scope.row.TotalMemberCnt | commaFormat}}
            el-table-column(prop='RealTotalCash', label='總餘額', width='180', align='right' )
              template(slot-scope='scope')
                span {{scope.row.RealTotalCash | commaFormat}}
            el-table-column(prop='PhoneVertifyCnt', label='手機認證', align='right'  width='110')
              template(slot-scope='scope')
                span {{scope.row.PhoneVertifyCnt | commaFormat}}
            el-table-column(prop='MailVertifyCnt', label='郵箱認證', align='right'  width='110')
              template(slot-scope='scope')
                span {{scope.row.MailVertifyCnt | commaFormat}}
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgMember",
  mounted() {
    this.formInit();
    this.init();
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
    async init() {
      await this.get_vip_data();
      this.get_data(1);
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
        .post(process.env.VUE_APP_APIHOST + "Admin/GetVipReport/VIP", payload)
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            self.vip_tableData[item.Date] =
              Number(item.Lv2_Total) +
              Number(item.Lv3_Total) +
              Number(item.Lv4_Total) +
              Number(item.Lv5_Total) +
              Number(item.Lv6_Total) +
              Number(item.Lv7_Total) +
              Number(item.Lv8_Total) +
              Number(item.Lv9_Total);
          });
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        })
        .finally(function() {
          axios
            .post(
              process.env.VUE_APP_APIHOST + "Admin/GetMemberReport/",
              payload
            )
            .then(function(response) {
              self.now_page = now_page;
              self.total_page = parseInt(response.data.data.total_rows);
              self.tableData = response.data.data.data_list;
              self.totalMember =
                self.totalMember == 0 && response.data.data.data_list[0]
                  ? response.data.data.data_list[0].TotalMemberCnt
                  : self.totalMember;
              self.Summaries = response.data.data.sum;
              if (
                typeof self.Summaries === "object" &&
                self.Summaries !== null
              ) {
                self.SummariesKeys = Object.keys(self.Summaries);
              }
            })
            .catch(function(error) {
              self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
            })
            .finally(function() {
              self.lock_btn = false;
            });
        });
    },
    get_vip_data() {
      this.lock_btn = true;
      let self = this;
      let payload = {
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1]
      };
      return axios
        .post(process.env.VUE_APP_APIHOST + "Admin/GetVipReport/VIP", payload)
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            self.vip_tableData[item.Date] =
              Number(item.Lv2_Total) +
              Number(item.Lv3_Total) +
              Number(item.Lv4_Total) +
              Number(item.Lv5_Total) +
              Number(item.Lv6_Total) +
              Number(item.Lv7_Total) +
              Number(item.Lv8_Total) +
              Number(item.Lv9_Total);
          });
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
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
        if (index >= 5 && index <= 9) {
          sums[index] = "";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (index === 9) {
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
            : "";
      });
      return sums;
    }
  },
  data() {
    return {
      tableData: [],
      vip_tableData: {},
      lock_btn: false,
      now_page: 1,
      total_page: 0,
      page_size: "30",
      search_time_range: [],
      totalMember: 0,
      Summaries: [],
      SummariesKeys: []
    };
  }
};
</script>