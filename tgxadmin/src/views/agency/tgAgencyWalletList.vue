<template lang="pug">
  .container-fluid
    // === title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理錢包紀錄
    // === search ===
    .row.no-gutters.px-3.py-3.d-flex
      el-form(ref="form.search" :model="form.search" :inline="true",label-suffix="：")
        // date-picker
        el-form-item
          el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='form.search.Time', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
        // radio-button
        el-form-item(label = '代理帳號')
          el-input(size='medium', v-model='form.search.AgencyId', clearable='', placeholder='代理帳號')
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
          el-table(:data='dataList', stripe='', border='', style='width:100%')
            el-table-column(prop='Create_At', label='日期', width='120' )
            el-table-column(prop='AgencyCode', label='代理編號')
            el-table-column(prop='AgencyId', label='代理帳號')
            el-table-column(prop='AgencyName', label='代理名稱')
            el-table-column(prop='ModifyType', label='交易類型')
              template(slot-scope='scope') {{ModifyType[scope.row.ModifyType]}}
            el-table-column(prop='OldCash', label='交易前') 
            el-table-column(prop='NewCash', label='交易後') 
            el-table-column(prop='ModifyCash', label='交易金額') 
            el-table-column(prop='ReferSn', label='交易單號') 
            el-table-column(prop='Notes', label='備註') 
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
  name: "tgAgencyWalletList",
  data() {
    return {
      isLoading: false,
      dataList: [],
      Summaries: [],
      SummariesKeys: [],
      ModifyType: [],
      pages: {
        now: 1,
        tatal: 0,
        size: "30"
      },
      form: {
        search: {
          AgencyId: "",
          Time: [StartOfMonth, TodayStr]
        }
      },
      rules: {},
      dialog: {}
    };
  },
  mounted() {
    //this.getData(1);
  },
  methods: {
    getData(now_page) {
      let self = this;
      if (now_page) self.pages.now = now_page;

      if (self.form.search.AgencyId == "") {
        self.dataList = [];
        self.isLoading = false;
        return false;
      }
      let formData = new FormData();
      formData.append("Page", self.pages.now);
      formData.append("PageLimit", self.pages.size);
      formData.append("AgencyId", self.form.search.AgencyId);
      formData.append("Date_S", self.form.search.Time[0]);
      formData.append("Date_E", self.form.search.Time[1]);
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Agency_WalletAll/GetCashLog/",
        data: formData
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.pages.total = parseInt(response.data.data.total_rows);
            self.dataList = response.data.data.data_list;

            if (response.data.other.ModifyType && self.ModifyType.length == 0) {
              self.ModifyType = response.data.other.ModifyType;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        })
        .finally(function() {
          self.isLoading = false;
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
