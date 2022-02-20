<template lang="pug">
  .container-fluid
    .row.no-gutters.px-3.py-3.border-bottom
      .col-6.pt-1
        h5 錢包紀錄
    .row.no-gutters.px-3.py-3
      div.px-1.py-1(:style='width="400"')
        el-date-picker(size="medium", value-format="yyyy-MM-dd", v-model='search_time_range', type='daterange', range-separator='至', start-placeholder='開始日期', end-placeholder='結束日期')
      .col-md-4.col-12.px-1.py-1
        el-input(size='medium', placeholder='輸入會員帳號', v-model='search_account', @keyup.enter.native="get_data(1)")
      .col-md-1.col-12.px-1.py-1
        el-button(size="medium", type='primary', @click="get_data(1)", :loading='lock_btn') 搜 尋
    //--Table
    .row.no-gutters.px-3
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
      .col-12
        template
          el-table(:data='tableData', stripe='', border='', style='width:100%')
            el-table-column(prop='Create_At', label='日期', width='180')
            el-table-column(prop='ModifyType_str', label='交易類型', width='150', align='center')
            el-table-column(prop='ModifyCash', label='交易金額', align='right')
            el-table-column(prop='OldCash', label='交易前', align='right')
            el-table-column(prop='NewCash', label='交易後', align='right')
            el-table-column(prop='Notes', label='備註', align='right', show-overflow-tooltip)
            el-table-column(prop='ReferSn', label='交易單號', width='240', align='left')
            el-table-column(prop='ChannelName', label='交易渠道', width='120', align='center')
      .col-12.py-3.d-flex.justify-content-end  
        el-pagination(background='', layout='total, sizes, prev, pager, next', :current-page='now_page', @current-change='get_data', :page-sizes='$store.state.page_sizes_type2', :page-size='page_size', @size-change="(val) => { page_size = val; get_data(1) }", :total='total_page')
</template>
<script>
export default {
  name: "tgWalletList",
  data() {
    let today = new Date();
    let last;
    let y = today.getFullYear();
    let m = today.getMonth() + 1;
    let d = today.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    let date_s = y + "-" + m + "-" + d;
    let date_e = y + "-" + m + "-" + d;

    last = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
    y = last.getFullYear();
    m = last.getMonth() + 1;
    d = last.getDate();
    m < 10 && (m = "0" + m);
    d < 10 && (d = "0" + d);
    date_s = y + "-" + m + "-" + d;
    return {
      tableData: [],
      search_time_range: [date_s, date_e],
      search_account: "",
      now_page: 1,
      page_size: 100,
      total_page: 0,
      lock_btn: false
    };
  },
  computed: {},
  methods: {
    get_data(now_page) {
      let self = this;
      if (self.search_account == "") {
        self.$message.error("請輸入會員帳號");
        return;
      }
      self.lock_btn = true;
      if (self.search_time_range == null) {
        let today = new Date();
        let last;
        let y = today.getFullYear();
        let m = today.getMonth() + 1;
        let d = today.getDate();
        m < 10 && (m = "0" + m);
        d < 10 && (d = "0" + d);
        let date_s = y + "-" + m + "-" + d;
        let date_e = y + "-" + m + "-" + d;

        last = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        y = last.getFullYear();
        m = last.getMonth() + 1;
        d = last.getDate();
        m < 10 && (m = "0" + m);
        d < 10 && (d = "0" + d);
        date_s = y + "-" + m + "-" + d;

        self.search_time_range = [date_s, date_e];
      }
      axios({
        method: "post",
        url: process.env.VUE_APP_APIHOST + "WalletAll/GetCashLog/all",
        data: {
          UserId: self.search_account,
          UserName: self.search_account,
          Date_S: self.search_time_range[0],
          Date_E: self.search_time_range[1],
          Status: "0",
          Page: now_page,
          PageLimit: self.page_size
        }
      })
        .then(function(response) {
          response.data.data.data_list.forEach(function(item, index, array) {
            item["ModifyType_str"] =
              response.data.other.ModifyType[item["ModifyType"]];
          });
          self.now_page = now_page;
          self.total_page = parseInt(response.data.data.total_rows);
          self.tableData = response.data.data.data_list;
          // console.log(response.data.data.data_list);
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
