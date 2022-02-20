<template lang="pug">
  .container-fluid
    // === title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理日報
    // === search ===
    .row.no-gutters.px-3.py-3.d-flex
      el-form(ref="form.search" :model="form.search" :inline="true")
        // radio-button
        el-form-item
          el-radio-group(v-model="form.search.AgencyType", size="medium",@change="getData()")
            el-radio-button(:label="0") 全部
            el-radio-button(:label="1") 佣金
            el-radio-button(:label="2") 電銷
        // date-picker
        el-form-item
          el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='form.search.Time', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
        // button
        el-form-item
            el-button.button-wstyle(size="medium", type='primary', @click=' isLoading = true,getData(1)', :loading='isLoading') 搜 尋
    // === main ===
    .row.no-gutters.px-3
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      // table list
      .col-12
        template
          el-table(:data='dataList', stripe='', border='', style='width:100%',:summary-method="setSummaries",    show-summary)
            el-table-column(prop='Date', label='日期', width='120' )
            el-table-column(prop='RegistrNumTotal', label='總註冊數')
            el-table-column(prop='RegistrNum', label='註冊人數')
            el-table-column(prop='ActiveNum', label='活躍人數')
            el-table-column(prop='BettingAmount', label='總流水')
            el-table-column(prop='Difference', label='存提差') 
            el-table-column(prop='DepositAmount', label='存款總額') 
            el-table-column(prop='DepositNum', label='存款人數') 
            el-table-column(prop='WithdrawAmount', label='提款總額') 
            el-table-column(prop='WithdrawNum', label='提款人數') 
            el-table-column(prop='BalanceAmount', label='公司輸贏') 
            el-table-column(prop='AgencyCash', label='代理錢包餘額')
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
</template>
<script>
let Today = new Date();
let year = Today.getFullYear();
let month = Today.getMonth() + 1;
month = ("0" + month).slice(-2);
let StartOfMonth = year + "-" + month + "-01";
let TodayStr = year + "-" + month + "-" + ("0" + Today.getDate()).slice(-2);

export default {
  name: "tgAgencyReport",
  data() {
    return {
      isLoading: false,
      dataList: [],
      Summaries: [],
      SummariesKeys: [],
      pages: {
        now: 1,
        tatal: 0,
        size: "30"
      },
      form: {
        search: {
          AgencyType: "0",
          Time: [StartOfMonth, TodayStr]
        }
      },
      rules: {},
      dialog: {}
    };
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData(now_page) {
      let self = this;
      if (now_page) self.pages.now = now_page;
      let formData = new FormData();
      formData.append("Page", self.pages.now);
      formData.append("PageLimit", self.pages.size);
      if (self.form.search.AgencyType != 0)
        formData.append("AgencyType", self.form.search.AgencyType);
      formData.append("Date_S", self.form.search.Time[0]);
      formData.append("Date_E", self.form.search.Time[1]);
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetAgencyReport/",
        data: formData
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.pages.total = parseInt(response.data.data.total_rows);
            self.dataList = response.data.data.data_list;
            self.Summaries = response.data.data.total_data;
            if (typeof self.Summaries === "object" && self.Summaries !== null) {
              self.SummariesKeys = Object.keys(self.Summaries);
            }
          }
          self.isLoading = false;
        })
        .catch(function(error) {
          console.log(error);
        });
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
  }
};
</script>
