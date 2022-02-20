<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-5.pt-1
        h5 轉帳日報
      //- div {{tableData[0]}}
    .row.no-gutters.px-3.py-3.d-flex.justify-content-between
      .col-md-10.col-12
        .row.no-gutters
          .col-md-5.col-12.px-1.py-1
            el-date-picker(size="medium", format="yyyy 年 MM 月 dd 日", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='～', start-placeholder='開始日期', end-placeholder='結束日期')
          .col-md-5.col-12.px-1.py-1
            el-select(size='medium', v-model='search_game_group_id', placeholder='選擇遊戲平台')
              el-option(label='中心錢包', value='')
              el-option(label='18luck', value='4')
              el-option(v-for='item in gameGroup' :key="item.GroupId" :label='item.GroupName', :value='item.GroupId')
          .col-md-2.col-12.px-1.py-1
            el-button(size="medium", type='primary', @click='get_data(1)', :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', show-summary='', :summary-method="getSummaries", style='width:100%')
            el-table-column(prop='Date', label='日期', width='180')
            el-table-column(prop='TrferInPeople', label='轉入人數(人)', align='right')
              template(slot-scope='scope')
                span {{scope.row.TrferInPeople | commaFormat}}
            el-table-column(prop='TrferInCount', label='轉入次數(次)', align='right')
              template(slot-scope='scope')
                span {{scope.row.TrferInCount | commaFormat}}
            el-table-column(prop='TrferInCash', label='轉入金額(¥)', align='right')
              template(slot-scope='scope')
                span {{scope.row.TrferInCash | commaFormat}}
            el-table-column(prop='TrferOutPeople', label='轉出人數(人)', align='right')
              template(slot-scope='scope')
                span {{scope.row.TrferOutPeople | commaFormat}}
            el-table-column(prop='TrferOutCount', label='轉出次數(次)', align='right')
              template(slot-scope='scope')
                span {{scope.row.TrferOutCount | commaFormat}}
            el-table-column(prop='TrferOutCash', label='轉出金額(¥)', align='right')
              template(slot-scope='scope')
                span {{scope.row.TrferOutCash | commaFormat}}
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type3', :page-size='parseInt(page_size)', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgTransfer",
  mounted() {
    this.formInit();
    this.get_game_group();
    this.get_data(1);
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
    get_data(now_page) {
      this.lock_btn = true;
      let self = this;
      let payload = {
        Date_S: self.search_time_range[0],
        Date_E: self.search_time_range[1],
        GameGroupId: self.search_game_group_id,
        Page: now_page,
        PageLimit: self.page_size
      };
      axios
        .post(process.env.VUE_APP_APIHOST + "Admin/GetTransferReport/", payload)
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
    },
    get_game_group() {
      let self = this;
      axios
        .post(process.env.VUE_APP_APIHOST + "Web_Page/GameGroup/")
        .then(function(response) {
          self.gameGroup = response.data.data;
        })
        .catch(function(error) {
          self.$message.error("很抱歉，系統出錯，請聯絡客服人員協助");
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
        sums[index] = self.total[column.property + "Total"];
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
      tableData: [],
      gameGroup: [],
      total: "",
      lock_btn: false,
      now_page: 1,
      total_page: 0,
      page_size: "30",
      search_time_range: [],
      search_game_group_id: ""
    };
  }
};
</script>