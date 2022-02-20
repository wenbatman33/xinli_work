<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 平台日報
    .row.no-gutters.px-3.py-md-3.pt-3.pb-2
      .col-md-12.col-12
        el-radio-group(v-model='GameGroupId', size='medium', @change='changeSwitch')
          el-radio-button.radio-style(v-for='(item, key) in game_group_option', :label='item.value', :key='key') {{item.label}}
           span(v-if="item.timezone" ) &nbsp;
             i(class="el-icon-location-outline" ) {{item.timezone}}
    .row.no-gutters.px-3.pb-3.d-flex.justify-content-between
      .col-md-5.col-12
        .row.no-gutters
          .col-md-10.col-12
            el-date-picker(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
          .col-md-2.col-12.px-md-2.px-0.py-md-0.py-2
            el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total,sizes, prev, pager, next', :current-page='now_page',  :total='total_page', @current-change='get_data', @size-change='handleSizeChange', :page-sizes='[10, 30, 50, 100]', :page-size='parseInt(page_size)')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', show-summary='', :summary-method="getSummaries", style='width:100%')
            el-table-column(prop='Date', label='報表日期	', width='180')
            el-table-column(prop='GameGroupId', label='遊戲群組ID', align='right')
            el-table-column(prop='BetPeople', label='唯一投注人數	', align='right')
              template(slot-scope='scope')
                span {{scope.row.BetPeople | commaFormat}}
            el-table-column(prop='BetCount', label='投注次數', align='right')
              template(slot-scope='scope')
                span {{scope.row.BetCount | commaFormat}}
            el-table-column(prop='GameCount', label='投注遊戲數', align='right')
              template(slot-scope='scope')
                span {{scope.row.GameCount | commaFormat}}
            el-table-column(prop='GameCash', label='會員錢包餘額', align='right')
              template(slot-scope='scope')
                span {{scope.row.GameCash | commaFormat}}
            el-table-column(prop='BetAmount', label='總流水', align='right')
              template(slot-scope='scope')
                span {{scope.row.BetAmount | commaFormat}}
            el-table-column(prop='KillNumber', label='殺數%', align='right')
            el-table-column(prop='BalanceAmount', label='盈利', align='right')    
              template(slot-scope='scope')
                span {{scope.row.BalanceAmount | commaFormat}}
      .col-12.py-3.d-flex.justify-content-end
        el-pagination(background='', layout='total,sizes, prev, pager, next', :current-page='now_page',  :total='total_page', @current-change='get_data', @size-change='handleSizeChange', :page-sizes='[10, 30, 50, 100]', :page-size='parseInt(page_size)')
</template>
<script>
export default {
  name: "tgPlatform",
  mounted() {
    this.formInit();
    //this.get_game_group_option();
    let self = this;
    axios({
      method: "post",
      url: process.env.VUE_APP_APIHOST + "Web_Page/GameGroup",
      data: {}
    })
      .then(function(response) {
        response.data.data = response.data.data.filter(function(
          item,
          index,
          array
        ) {
          return item.GroupId != 4;
        });
        //AG、XIN、YOPLAY
        let differentTimezone = [24, 25, 26];
        response.data.data.forEach(function(item, index, array) {
          self.game_group_option.push({
            value: item.GroupId,
            label: item.CompanyName
          });
          if (differentTimezone.indexOf(parseInt(item.GroupId)) >= 0) {
            self.game_group_option.push({
              value: item.GroupId + "_custom",
              label: item.CompanyName,
              timezone: "-4"
            });
          }
        });
        //console.log(self.game_group_option);

        self.get_data(1);
      })
      .catch(function(error) {
        self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
        // console.log(error);
      });
  },
  methods: {
    // get_game_group_option() {
    //   let self = this;
    //   axios({
    //     method: "post",
    //     url: process.env.VUE_APP_APIHOST + "Web_Page/GameGroup",
    //     data: {}
    //   })
    //     .then(function(response) {
    //       response.data.data = response.data.data.filter(function(
    //         item,
    //         index,
    //         array
    //       ) {
    //         return item.GroupId != 4;
    //       });
    //       response.data.data.forEach(function(item, index, array) {
    //         self.game_group_option.push({
    //           value: item.GroupId,
    //           label: item.CompanyName
    //         });
    //       });
    //       // console.log(response.data.data);
    //     })
    //     .catch(function(error) {
    //       self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
    //       // console.log(error);
    //     });
    // },
    changeSwitch(value) {
      this.GameGroupId = value;
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
    handleSizeChange(val) {
      this.page_size = val;
      this.get_data(1);
    },
    get_data(now_page) {
      this.lock_btn = true;
      let self = this;

      let payload = {
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        Type: "Sum",
        Page: now_page,
        PageLimit: self.page_size,
        GameGroupId: self.GameGroupId,
        Timezone: ""
      };
      let strSplit = self.GameGroupId.toString().split("_");
      if (strSplit.length == 2) {
        payload.GameGroupId = strSplit[0];
        payload.Timezone = strSplit[1] ? "custom" : "";
      }

      axios
        .post(process.env.VUE_APP_APIHOST + "/Admin/GetBetReport/", payload)
        .then(function(response) {
          // self.now_page = now_page;
          self.total = response.data.data.Total[0];
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
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
        sums[index] = self.total[column.property];
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
      lock_btn: false,
      now_page: 1,
      GameGroupId: 1,
      total_page: 0,
      page_size: "30",
      search_time_range: [],
      //search_pay_type: 2, // 1.提款報表 2.提款報表
      search_pay_channel_id: "",
      game_group_option: [],
      total: "",
      tableData: [],
      tableData2: [],
      typeoption: [
        { value: "", label: "不限提款方式" },
        { value: "1", label: "極速通道" },
        { value: "2", label: "銀聯" },
        { value: "3", label: "網銀" },
        { value: "4", label: "第三方支付" }
      ]
    };
  }
};
</script>