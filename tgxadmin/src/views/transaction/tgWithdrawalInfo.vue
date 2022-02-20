<template lang="pug">
  el-container
    el-header
      img.pl-3(src="@/assets/img/logo.svg")
    el-container
      el-main.el-main-style
        .subnav-style.row.no-gutters.d-flex.align-items-center
          h6.col-sm-12.col-md-12.mt-2.mb-2 交易單號：{{this.$route.query.OrderId}}
            el-button.pl-2(type='text', @click="show_account_log()") 查看遊戲帳號
        .content-level2.row.no-gutters.pl-3.pr-3.pt-3
          .col-10(label='日期區間')
            el-date-picker.select-wstyle(v-model='search_time_range', type='datetimerange', align='right', value-format="yyyy-MM-dd HH:mm:ss", start-placeholder='开始日期', end-placeholder='结束日期', :default-time="['00:00:00', '23:59:59']")
          .col-2.pl-2
            el-button.button-wstyle(size="medium", type='primary', @click='get_data') 搜尋
          el-card(shadow='never').box-card.col-12.mt-3.mb-3
            .card-text.item.row.pl-2.pr-2
              template
                el-table(:data='gridData', stripe='', border='', show-summary='', :summary-method="getSummaries", style='width:100%')
                  el-table-column(property='GameGroup', label='平台 / Product', align='center')
                  el-table-column(property='GameName', label='遊戲名稱 / GameName', align='right')
                  el-table-column(property='GameAccount', label='遊戲帳號 / GameAccount', align='right')
                  el-table-column(property='BetAmount', label='有效流水 / Effective Stake', align='right')
                    template(slot-scope='scope')
                      span {{scope.row.BetAmount | commaFormat}}
                  el-table-column(property='BetNAmount', label='無效流水 / Invalid Stake', align='right')
                    template(slot-scope='scope')
                      span {{scope.row.BetNAmount | commaFormat}}
                  el-table-column(property='WinLose', label='輸贏 / Win & Loss', align='right')
                    template(slot-scope='scope')
                      span {{scope.row.WinLose | floatFormat | commaFormat }}
    el-dialog(title='遊戲帳號', :visible.sync='logDialog')
      el-form.mr-3
        el-table.mr-3(:data='logData')
          el-table-column(property='key', label='平台')
          el-table-column(property='value', label='遊戲帳號')
</template>
<script>
export default {
  name: "tgWithdrawalInfo",
  mounted() {
    this.UserId = this.$route.query.UserId;
    this.DateTime_S = this.$route.query.Date_S;
    this.DateTime_E = this.$route.query.Date_E;
    this.search_time_range = [
      this.$route.query.Date_S,
      this.$route.query.Date_E
    ];
    this.get_data();
  },
  data() {
    return {
      gridData: [],
      logData: [],
      UserId: "",
      DateTime_S: "",
      DateTime_E: "",
      search_time_range: [],
      total: "",
      logDialog: false
    };
  },
  methods: {
    get_data() {
      let self = this;
      self.lock_btn = true;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Payment/QueryBetSerial",
        data: {
          UserId: self.UserId,
          DateTime_S: self.search_time_range[0],
          DateTime_E: self.search_time_range[1]
        }
      })
        .then(function(response) {
          self.total = response.data.data.Total;
          self.gridData = [];
          Object.keys(response.data.data.data_list).map(function(
            objectKey,
            index
          ) {
            self.gridData.push(response.data.data.data_list[objectKey]);
          });
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
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
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (index >= 3 && index <= 5) {
              return (parseFloat(prev) + parseFloat(curr)).toFixed(2);
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
    show_account_log() {
      this.logDialog = true;
      this.get_log();
    },
    get_log() {
      let self = this;
      self.lock_btn = true;
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "Member_All/GetGameAccount",
        data: {
          UserId: self.UserId
        }
      })
        .then(function(response) {
          self.logData = Object.entries(response.data.data).map(
            ([key, value]) => ({ key, value })
          );
          // console.log(response.data.data.data_list);
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
          // console.log(error);
        });
    }
  }
};
</script>
