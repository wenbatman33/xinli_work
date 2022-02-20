<template lang="pug">
  .container-fluid
    // === title ===
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 代理營運報表
    // === search ===
    .row.no-gutters.px-3.py-3.d-flex
      el-form(ref="form.search" :model="form.search" , status-icon,label-suffix="：" ,:inline="true")
        el-form-item(label = '月份')
          el-date-picker.select-wstyle(size="medium", format="yyyy 年 MM 月", value-format="yyyy-MM", v-model='form.search.Ym', type='month',placeholder='選擇月份')
        el-form-item(label = '代理帳號')
          el-input(size='medium', v-model='form.search.AgencyId', clearable='', placeholder='代理帳號')
        el-form-item(label = '代理類型')
          el-select(v-model='form.search.AgencyType', size='medium', placeholder='選擇類型')
            el-option(label='全部', value="" ,key="")
            el-option(v-for='item in agencyTypeOption', :key='item.value', :label='item.label', :value='item.value')
        br
        // sort
        el-form-item(label = '排序')
          el-select(v-model='form.search.Sort', size='medium', placeholder='選擇類型')
            el-option(v-for='item in sortOption', :key='item.value', :label='item.label', :value='item.value')
        el-form-item
          el-radio-group(v-model="form.search.SortBy", size="medium",@change="getData()")
            el-radio-button(:label="0") 正序
            el-radio-button(:label="1") 倒序
        // button
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
            el-table-column(prop='AgencyId', label='代理帳號')
            el-table-column(prop='AgencyName', label='代理名稱')
            el-table-column(prop='AgencyType', label='代理類型')
              template(slot-scope='scope') {{agencyTypeLabel[scope.row.AgencyType]}}
            el-table-column(prop='Level', label='代理等級')
            el-table-column(prop='RegistrNum', label='註冊人數')
            el-table-column(prop='ActiveNum', label='活躍人數')
            el-table-column(prop='DepositAmount', label='存款金額',width="150")
              template(slot-scope='scope')
                el-popover(placement="bottom-start",trigger="hover",content="br" ,slot="reference")
                  el-table(:data="[{DepositNum:scope.row.DepositNum,DepositCnt:scope.row.DepositCnt,DepositAmount:scope.row.DepositAmount}]")
                    el-table-column(width="150" property="DepositNum" label="存款人數")
                    el-table-column(width="150" property="DepositCnt" label="存款次數")
                    el-table-column(width="150" property="DepositAmount" label="存款金額")
                  span(slot="reference") {{scope.row.DepositAmount}}
            el-table-column(prop='WithdrawAmount', label='提款金額')
              template(slot-scope='scope')
                el-popover(placement="bottom-start",trigger="hover",content="br" ,slot="reference")
                  el-table(:data="[{WithdrawNum:scope.row.WithdrawNum,WithdrawCnt:scope.row.WithdrawCnt,WithdrawAmount:scope.row.WithdrawAmount}]")
                    el-table-column(width="150" property="WithdrawNum" label="提款人數")
                    el-table-column(width="150" property="WithdrawCnt" label="提款次數")
                    el-table-column(width="150" property="WithdrawAmount" label="提款金額")
                  span(slot="reference") {{scope.row.WithdrawAmount}}
            el-table-column(prop='BettingAmount', label='總流水')
            el-table-column(prop='BalanceAmount', label='公司輸贏')
            el-table-column(prop='BonusAmount', label='總紅利')
              template(slot-scope='scope')
                el-popover(placement="bottom-start",trigger="hover",content="br" ,slot="reference")
                  el-table(:data="[{BonusNum:scope.row.BonusNum}]")
                    el-table-column(width="150" property="BonusNum" label="紅利人數")
                  span(slot="reference") {{scope.row.BonusAmount}}
            el-table-column(prop='NetEarnings', label='公司淨盈利')
              template(slot-scope='scope')
                el-popover(placement="bottom-start",trigger="hover",content="br" ,slot="reference")
                  el-table(:data="[{BonusAmount:scope.row.BonusAmount  ,PlatformFee:scope.row.PlatformFee   ,Fee:scope.row.Fee}]")
                    el-table-column(width="150" property="BonusAmount" label="總紅利")
                    el-table-column(width="150" property="PlatformFee" label="平台費")
                    el-table-column(width="150" property="Fee" label="存提手續費")
                  span(slot="reference") {{scope.row.NetEarnings}}
            el-table-column(prop='BelowNum', label='二級代理人數')
            el-table-column(label='操作')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgAgency', query:{AgencyId: scope.row.AgencyId}}") 下線清單
      // pages
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='pages.now', @current-change='getData', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(pages.size)', @size-change="(val) => { pages.size = val; getData(1) }", :total='pages.total')
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
          Ym: year + "-" + month,
          Sort: "NetEarnings",
          SortBy: 1
        }
      },
      rules: {},
      dialog: {},
      agencyTypeOption: [
        { value: "1", label: "佣金" },
        { value: "2", label: "電銷" }
      ],
      agencyTypeLabel: [],
      sortOption: [
        { value: "NetEarnings", label: "公司淨盈利" },
        { value: "Level", label: "代理等級" },
        { value: "BelowNum", label: "二級代理人數" },
        { value: "RegistrNum", label: "注冊人數" },
        { value: "ActiveNum", label: "活躍人數" },
        { value: "DepositAmount", label: "存款金額" },
        { value: "WithdrawAmount", label: "提款金額" },
        { value: "BettingAmount", label: "總流水" },
        { value: "BalanceAmount:", label: "公司輸贏" }
      ]
    };
  },
  mounted() {
    let agencyTypeLabel = this.agencyTypeLabel;
    this.agencyTypeOption.forEach(function(element) {
      agencyTypeLabel[element.value] = element.label;
    });
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

      formData.append("SortBy", sortBy);
      formData.append("Sort", self.form.search.Sort);
      formData.append("Page", self.pages.now);
      formData.append("PageLimit", self.pages.size);
      return axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Admin/GetAgencyOperationReport/",
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
    }
  }
};
</script>
