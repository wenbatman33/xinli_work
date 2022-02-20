<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 {{OfferName}} 每日優惠明細
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
            el-table-column(prop='CalcDate', label='日期')
            el-table-column(prop='TotalCnt', label='總筆數')
              template(slot-scope='scope')
                span {{scope.row.TotalCnt | commaFormat}}
            el-table-column(prop='DeliveryCnt', label='已派發筆數')
              template(slot-scope='scope')
                span {{scope.row.DeliveryCnt | commaFormat}}
            el-table-column(prop='DeliveryTotal', label='已派發金額')
              template(slot-scope='scope')
                span {{scope.row.DeliveryTotal | commaFormat}}
            el-table-column(prop='PeddingCnt', label='未申請筆數')
              template(slot-scope='scope')
                span {{scope.row.PeddingCnt | commaFormat}}
            el-table-column(prop='PeddingTotal', label='未申請金額')
              template(slot-scope='scope')
                span {{scope.row.PeddingTotal | commaFormat}}
            el-table-column(prop='ApplyCnt', label='待審核筆數')
              template(slot-scope='scope')
                span {{scope.row.ApplyCnt | commaFormat}}
            el-table-column(prop='ApplyTotal', label='待審核金額')
              template(slot-scope='scope')
                span {{scope.row.ApplyTotal | commaFormat}}
            el-table-column(prop='SuccessCnt', label='待派發筆數')
              template(slot-scope='scope')
                span {{scope.row.SuccessCnt | commaFormat}}
            el-table-column(prop='SuccessTotal', label='待派發金額')
              template(slot-scope='scope')
                span {{scope.row.SuccessTotal | commaFormat}}
            el-table-column(prop='RejectCnt', label='拒絕筆數')
              template(slot-scope='scope')
                span {{scope.row.RejectCnt | commaFormat}}
            el-table-column(prop='RejectTotal', label='拒絕金額')
              template(slot-scope='scope')
                span {{scope.row.RejectTotal | commaFormat}}
            el-table-column(prop='Manual', label='人工審核筆數')
              template(slot-scope='scope')
                span {{scope.row.Manual | commaFormat}}
            el-table-column(prop='Auto', label='系統審核筆數')
              template(slot-scope='scope')
                span {{scope.row.Auto | commaFormat}}
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
        url: process.env.VUE_APP_APIHOST + "Admin/GetDailyOfferDetail",
        data: {
          Sn: self.search_sn,
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1]
        }
      })
        .then(function(response) {
          self.tableData = response.data.data;
          // console.log(response.data.data.data);
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
