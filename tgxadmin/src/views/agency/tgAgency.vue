<template lang="pug">
  .container-fluid
    // === title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理會員
    // === search ===
    .row.no-gutters.px-3.py-3.d-flex
      el-form(ref="form.search" :model="form.search" , status-icon,label-suffix="：" ,:inline="true")
        el-form-item(label = '月份')
          el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月", value-format="yyyy-MM", v-model='form.search.Ym', type='month',placeholder='選擇月份')
        el-form-item(label = '會員帳號')
          el-input(size='medium', v-model='form.search.UserName', clearable='', placeholder='會員帳號')
        el-form-item(label = '代理帳號')
          el-input(size='medium', v-model='form.search.AgencyId', clearable='', placeholder='代理帳號')

        br
        el-form-item(label = '排序')
          el-select(v-model='form.search.Sort', size='medium', placeholder='選擇類型')
            el-option(v-for='(value,key) in sortType', :key='key', :label='value', :value='key')
        el-form-item
          el-radio-group(v-model="form.search.SortBy", size="medium",@change="getData()")
            el-radio-button(:label="0") 正序
            el-radio-button(:label="1") 倒序
        el-form-item
            el-radio-group(v-model="form.search.Show", size="medium")
              el-radio-button(v-for='(value, key)  in showType',:label="key") {{value}}
        br
        el-form-item
            el-button.button-wstyle(size="medium", type='primary', @click='submitSearchForm()', :loading='isLoading') 搜 尋
    // === main ===
    .row.no-gutters.px-3
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      // table list
      .col-12
        template
          el-table(:data='dataList', stripe='', border='', style='width:100%', :summary-method="setSummaries",    show-summary)
            el-table-column(prop='Date', label='日期', width='120' )
            el-table-column(prop='UserName', label='會員帳號')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='RealName', label='會員姓名')
            el-table-column(prop='AgencyId', label='代理帳號')
            el-table-column(prop='ActiveStatus', label='活躍狀態')
            el-table-column(prop='DepositCnt', label='存款次數')
            el-table-column(prop='DepositAmount', label='存款金額')
            el-table-column(prop='WithdrawCnt', label='提款次數')
            el-table-column(prop='WithdrawAmount', label='提款金額')
            el-table-column(prop='Fee', label='存提手續費')
            el-table-column(prop='BettingAmount', label='總流水')
            el-table-column(prop='BalanceAmount', label='公司輸贏')
            el-table-column(prop='BonusAmount', label='總紅利')
            el-table-column(label='操作')
              template(slot-scope='scope')
                a.links( @click="getAgencyBetting(scope.row.AgencyId,scope.row.UserName,scope.row.Date)") 流水紀錄
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
      el-dialog(title='流水紀錄', :visible.sync='dialog.agencyBetting',width="40%")
        template
          el-table(:data='dataBettingList', stripe='', border='', style='width:100%')
            el-table-column(prop='GameGroupName', label='平台' )
            el-table-column(prop='BettingAmount', label='流水')
            el-table-column(prop='BalanceAmount', label='公司輸贏')
        .dialog-footer(slot='footer')
          el-button(@click='dialog.agencyBetting = false') 關閉
</template>
<script>
let Today = new Date();
let year = Today.getFullYear();
let month = Today.getMonth() + 1;
month = ("0" + month).slice(-2);

export default {
  name: "tgAgencyOperation",
  data() {
    return {
      isLoading: false,
      dataList: [],
      dataBettingList: [],
      Summaries: {},
      SummariesKeys: [],
      pages: {
        now: 1,
        tatal: 0,
        size: "30"
      },
      form: {
        search: {
          AgencyId: "",
          AgencyType: "",
          UserName: "",
          Ym: year + "-" + month,
          Sort: "BettingAmount",
          Show: 1,
          SortBy: 1
        }
      },
      rules: {},
      dialog: { agencyBetting: false },
      sortType: {
        BettingAmount: "總流水",
        DepositAmount: "存款金額",
        WithdrawAmount: "提款金額",
        BalanceAmount: "公司輸贏",
        BonusAmount: "總紅利"
      },
      showType: { 1: "月報", 2: "日報" },
      activeStatusType: { 0: "否", 1: "是" }
    };
  },
  mounted() {
    if (this.$route.query.AgencyId) {
      this.form.search.AgencyId = this.$route.query.AgencyId;
    }
    this.getData(1);
  },
  methods: {
    getData(now_page) {
      let self = this;
      if (now_page) self.pages.now = now_page;
      let formData = new FormData();
      if (self.form.search.AgencyId != "")
        formData.append("AgencyId", self.form.search.AgencyId);

      if (self.form.search.AgencyType != "")
        formData.append("AgencyType", self.form.search.AgencyType);

      formData.append("Ym", self.form.search.Ym);
      let sortBy = "desc";
      if (self.form.search.SortBy == "0") {
        sortBy = "asc";
      }
      formData.append("Show", self.form.search.Show);
      formData.append("SortBy", sortBy);
      formData.append("Sort", self.form.search.Sort);
      formData.append("Page", self.pages.now);
      formData.append("PageLimit", self.pages.size);
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetAgencyMember/",
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
    submitSearchForm() {
      this.isLoading = true;
      this.getData(1);
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
    },
    getAgencyBetting(AgencyId, UserName, date) {
      let self = this;
      let Date_S = "";
      let Date_E = "";
      let dateSplit = date.split("-");

      if (date.length == 7) {
        Date_S = date + "-01";
        let StarOfMonth = new Date(dateSplit[0], parseInt(dateSplit[1]), 0);

        let EndOfMonth = new Date(
          StarOfMonth.getFullYear(),
          StarOfMonth.getMonth() + 1,
          0
        );
        Date_E = date + "-" + ("0" + EndOfMonth.getDate()).slice(-2);
      } else {
        Date_S = Date_E = date;
      }
      let formData = new FormData();
      formData.append("Date_S", Date_S);
      formData.append("Date_E", Date_E);
      formData.append("UserName", UserName);
      formData.append("AgencyId", AgencyId);
      self.dialog.agencyBetting = true;
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetAgencyBetting/",
        data: formData
      })
        .then(function(response) {
          if (response.data.status == 1) {
            self.dataBettingList = response.data.data;
            self.dialog.agencyBetting = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
