<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 {{OfferName}} 優惠派發名單
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size="medium", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='至', start-placeholder='開始日期', end-placeholder='結束日期')
      .col-md-1.col-12.px-1.py-1
        el-button(size='medium', type='primary', @click="get_data()", :loading='lock_btn') 搜尋
    //--Table
    .row.no-gutters.px-3
      .col-12
        template
          el-table(:data='tableData', border='', style='width: 100%')
            el-table-column(prop='UserName', label='帳號')
              template(slot-scope='scope')
                router-link(style="font-weight: 500; text-decoration: none;	", :to="{name:'tgMemberList', query:{user_name: scope.row.UserName}}") {{scope.row.UserName}}
            el-table-column(prop='TagName', label='會員標籤')
              template(slot-scope='scope')
                el-tag {{scope.row.TagName}}
            el-table-column(prop='DepositAmount', label='期間內存款')
              template(slot-scope='scope')
                span {{scope.row.DepositAmount | commaFormat}}
            el-table-column(prop='WithdrawAmount', label='期間內取款')
               template(slot-scope='scope')
                span {{scope.row.WithdrawAmount | commaFormat}}
            el-table-column(prop='BettingAmount', label='期間內流水')
              template(slot-scope='scope')
                span {{parseInt(scope.row.BettingAmount) | commaFormat}}
            el-table-column(prop='BalanceAmount', label='期間內營利')
              template(slot-scope='scope')
                span {{scope.row.BalanceAmount | commaFormat}}
            el-table-column(prop='Aid', label='來源')
            el-table-column(prop='LastLogin', label='最後登入時間')
            el-table-column(prop='Register_At', label='註冊時間')
</template>
<script>
export default {
  name: "tgOfferDetail",
  mounted() {
    if (this.$route.query.Sn) {
      this.search_sn = this.$route.query.Sn;
      this.OfferName = this.$route.query.OfferName;
      if (this.$route.query.Date_S && this.$route.query.Date_E) {
        this.search_time_range = [
          this.$route.query.Date_S,
          this.$route.query.Date_E
        ];
      }
      this.get_data();
    } else {
      this.$router.push({ name: "tgOffer" });
    }
  },
  data() {
    return {
      tableData: [],
      search_sn: "",
      search_time_range: null,
      lock_btn: false,
      OfferName: ""
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
        url: process.env.VUE_APP_APIHOST + "Admin/GetOfferReportList",
        data: {
          Sn: self.search_sn,
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1]
        }
      })
        .then(function(response) {
          self.tableData = response.data.data.data_list;
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        })
        .finally(function() {
          self.lock_btn = false;
        });
    }
  }
};
</script>
